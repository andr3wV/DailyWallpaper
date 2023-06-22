require("dotenv").config();
const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");
const { Configuration, OpenAIApi } = require("openai");
const axios = require("axios");
const fs = require("fs");
const schedule = require('node-schedule');
let mainWindow;


/*----------------------------*/
/*------------WINDOW----------*/
/*----------------------------*/

/*----------Creat Window-----------*/
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 1000,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js"),
    },
    icon: path.join(__dirname, "../app/assets/icon.png"),
  });

  mainWindow.loadFile(path.join(__dirname, "../app/index.html"));
};

/* ---------Create DOCK MENU----------*/
const dockMenu = Menu.buildFromTemplate([
  {
    label: "New Window",
    click() {
      console.log("New Window");
    },
  },
  {
    label: "New Window with Settings",
    submenu: [
      { label: "Basic" },
      { label: "Pro" }
    ]
  },
  { label: "New Command..." }
]);

/*---------SEND ACTIONS TO RENDERER----------*/
ipcMain.on("generateText", async (event) => {
  updateWallpaper(event);
});

ipcMain.on("requestVariables", async (event) => {
    getImageData(event);
});

ipcMain.on("changeTiles", async (event) => {
    updateTiles(event)
});

//Schedule cron job to update wallpaper every minute
const updateWallpaperJob = schedule.scheduleJob('0 */2 * * *', () => {
  console.log('Updating wallpaper...');
  updateWallpaper();
  getImageData(null)
});

/*---------LAUNCH WINDOW----------*/  
app
  .whenReady()
  .then(() => {
    if (process.platform === "darwin") {
      app.dock.setMenu(dockMenu);
    }
  })
  .then(createWindow);

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


/*----------------------------*/
/*---------FUNCTIONS----------*/
/*----------------------------*/

/*----------Updates Wallpaper-----------*/
async function updateWallpaper(event = null) {
  
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);


  /*---------OPEN AI API REQUEST----------*/
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content:
          "Create a one word search prompt for Unplash to find an aesthetic picture.",
      },
    ],
    temperature: 2,
    max_tokens: 50,
    top_p: 1,
  });

  const completion_text = completion.data.choices[0].message.content;
  console.log(completion_text);
  
  /*---------Get Image from Unsplash API----------*/
  const response = await axios.get("https://api.unsplash.com/photos/random?orientation=landscape&query=" + completion_text + "&client_id=" + process.env.UNSPLASH_API_KEY );
  //console.log(response.data[0]);

  /*---------Download Image Response URL----------*/
  const name = response.data.user.name;
  const username = `@${response.data.user.username}`;
  const instagram = `@${response.data.user.instagram_username}`;
  const description = response.data.description;
  const location = response.data.location.name;
  const imageURL = response.data.links.download;

  const responseImage = await axios.get(imageURL, { responseType: "stream" });
  const file = fs.createWriteStream(
    path.join(__dirname, "../app/assets/image.jpg")
  );
  responseImage.data.pipe(file);
  file.on('error', (err) => {
      fs.unlink(path.join(__dirname, '../app/assets/image.jpg'), () => {
          console.error('Error downloading image:', err);
      });
  })
  .on('finish', () => {
      const variables = { name, username, instagram, description, location };
      fs.writeFileSync(path.join(__dirname, '../app/data.json'), JSON.stringify(variables));
      if (event) {
        event.reply("variablesResponse", variables);
      } else if (mainWindow) {
        mainWindow.webContents.send("variablesResponse", variables);
      }
  });

  /*---------Set Image as Wallpaper----------*/
  (async () => {
    const wallpaper = await import("wallpaper");
    await wallpaper
      .setWallpaper(path.join(__dirname, "../app/assets/image.jpg"))
      .then(() => {
        console.log("Image set as wallpaper!!");
      });
  })();
}

async function updateTiles(event = null) {
  try {
    const response = await axios.get("https://api.unsplash.com/photos/random?orientation=landscape&query=beautiful&client_id=" + process.env.UNSPLASH_API_KEY +"&count=10");
    
    const downloadPromises = response.data.map(async (item, i) => {
      const imageURL = item.links.download;
      const responseImage = await axios.get(imageURL, { responseType: "stream" });
      const file = fs.createWriteStream(
        path.join(__dirname, `../app/assets/gallery/image${i}.jpg`)
      );
      
      return new Promise((resolve, reject) => {
        responseImage.data.pipe(file);
        file.on('error', (err) => {
          fs.unlink(path.join(__dirname, `../app/assets/gallery/image${i}.jpg`), () => {
            console.error('Error downloading image:', err);
          });
          reject(err);
        });
        file.on('finish', () => {
          console.log(`Image${i} downloaded`);
          resolve();
        });
      });
    });

    // Wait for all the download promises to resolve
    await Promise.all(downloadPromises);

    event.reply("tilesChanged", "Tiles Changed");

  } catch (error) {
    console.error("Error in changeTiles event:", error);
    event.reply("tilesChangedError", error.message);
  }
}

async function getImageData(event){
  const variablesFilePath = path.join(__dirname, '../app/data.json');
    if (fs.existsSync(variablesFilePath)) {
      const variables = JSON.parse(fs.readFileSync(variablesFilePath));
      if (event) { // Check if the event object exists before calling event.reply()
        event.reply("variablesResponse", variables);
      }
      else if (mainWindow) {
        mainWindow.webContents.send("variablesResponse", variables);
      }    
    } else {
      // Default values for when there are no saved variables (customize these according to your needs)
      if (event){
        event.reply("variablesResponse", {
          name: "",
          username: "",
          instagram: "",
          description: "",
          location: "",
        });
      } else if (mainWindow) {
        mainWindow.webContents.send("variablesResponse", {
          name: "",
          username: "",
          instagram: "",
          description: "",
          location: "",
        });
      } 
    }
}