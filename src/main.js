const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");
const { Configuration, OpenAIApi } = require("openai");
const axios = require("axios");
const fs = require("fs");

require("dotenv").config();

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 1000,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js"),
    },
    icon: path.join(__dirname, "../app/assets/icon.png"),
  });

  win.loadFile(path.join(__dirname, "../app/index.html"));
};

/* ---------DOCK MENU----------*/
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

ipcMain.on("generateText", async (event) => {

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

  try {
    /*---------OPEN AI API REQUEST----------*/
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content:
            "Create a short search prompt for Unplash to find a beautiful picture.",
        },
      ],
      temperature: 1,
      max_tokens: 50,
      top_p: 1,
    });

    const completion_text = completion.data.choices[0].message.content;
    console.log(completion_text);
    event.reply("textGenerated", completion_text); // Send reply with generated text

    /*---------Get Image from Unsplash API----------*/
    const response = await axios.get(
      "https://api.unsplash.com/photos/random?orientation=landscape&query=" +
        completion_text +
        "&client_id=" +
        process.env.UNSPLASH_API_KEY +
        "&count=3"
    );
    console.log(response.data[0]);

    /*---------Download Image Response URL----------*/
    const name = response.data[0].user.name;
    const username = `@${response.data[0].user.username}`;
    const instagram = `@${response.data[0].user.instagram_username}`;
    const description = response.data[0].description;
    const location = response.data[0].location.name;
    const imageURL = response.data[0].links.download;

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
        event.reply("variablesResponse", variables);
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
    /*------------------------------------------------------------------*/

  } catch (error) {
    console.log(`API Request Error: ${error.message}`);
    event.reply("textGeneratedError", error.message); // Send reply with error message
  }
});

ipcMain.on("requestVariables", async (event) => {
    const variablesFilePath = path.join(__dirname, '../app/data.json');
    if (fs.existsSync(variablesFilePath)) {
      const variables = JSON.parse(fs.readFileSync(variablesFilePath));
      event.reply("variablesResponse", variables);
    } else {
      // Default values for when there are no saved variables (customize these according to your needs)
      event.reply("variablesResponse", {
        name: "",
        username: "",
        instagram: "",
        description: "",
        location: "",
      });
    }
});

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