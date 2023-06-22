const updateVariables = (data) => {
  data.name ? document.querySelector("#name").innerText = `Name: ${data.name}`: document.querySelector("#name").innerText = '';
  data.username ? document.querySelector("#username").innerText = `Username: ${data.username}`: document.querySelector("#username").innerText = '';
  data.instagram ? document.querySelector("#instagram").innerText = `Instagram: ${data.instagram}`: document.querySelector("#instagram").innerText = '';
  data.description ? document.querySelector("#description").innerText = `Description: ${data.description}`: document.querySelector("#description").innerText = '';
  data.location ? document.querySelector("#location").innerText = `Location: ${data.location}`: document.querySelector("#location").innerText = '';
};

document.addEventListener("DOMContentLoaded", () => {
  // Change the wallpaper
  const button = document.querySelector("#chatButton");

  button.addEventListener("click", () => {
    console.log("button clicked");
    window.myAPI.generateText(); // Use myAPI object to send request
  });

  window.myAPI.onTextGenerated((completionText) => {
    console.log("Received generated text:", completionText);
  });

  window.myAPI.onTextGeneratedError((errorMessage) => {
    console.log("API Request Error:", errorMessage);
  });

  window.myAPI.unsplashApiRequestSuccess((responseData) => {
    console.log("Unsplash API success:", responseData);
  });

  window.myAPI.unsplashApiRequestError((errorMessage) => {
    console.log("Unsplash API Request Error:", errorMessage);
  });

  // Load the saved variables from the JSON file
  window.myAPI.loadVariables((data) => {
    updateVariables(data);
  });

   // Update the onVariablesResponse callback
   window.myAPI.onVariablesResponse((data) => {
    updateVariables(data);
    document.querySelector("#mainImg").src = "../app/assets/image.jpg?timestamp=" + new Date().getTime();
  });

  // Change the tiles
  const button2 = document.querySelector("#changeTilesBtn");
  button2.addEventListener("click", () => {
    console.log("button2 clicked");
    window.myAPI.changeTiles(); // Use myAPI object to send request
  });

  window.myAPI.onTilesChanged((completionText) => {
    document.querySelector("img.tile-img.tile-img1").src = "../app/assets/gallery/image0.jpg?timestamp=" + new Date().getTime();
    document.querySelector("img.tile-img.tile-img2").src = "../app/assets/gallery/image1.jpg?timestamp=" + new Date().getTime();
    document.querySelector("img.tile-img.tile-img3").src = "../app/assets/gallery/image2.jpg?timestamp=" + new Date().getTime();
    document.querySelector("img.tile-img.tile-img4").src = "../app/assets/gallery/image3.jpg?timestamp=" + new Date().getTime();
    document.querySelector("img.tile-img.tile-img5").src = "../app/assets/gallery/image4.jpg?timestamp=" + new Date().getTime();
    document.querySelector("img.tile-img.tile-img6").src = "../app/assets/gallery/image5.jpg?timestamp=" + new Date().getTime();
    document.querySelector("img.tile-img.tile-img7").src = "../app/assets/gallery/image6.jpg?timestamp=" + new Date().getTime();
    document.querySelector("img.tile-img.tile-img8").src = "../app/assets/gallery/image7.jpg?timestamp=" + new Date().getTime();
    document.querySelector("img.tile-img.tile-img9").src = "../app/assets/gallery/image8.jpg?timestamp=" + new Date().getTime();
    document.querySelector("img.tile-img.tile-img10").src = "../app/assets/gallery/image9.jpg?timestamp=" + new Date().getTime();

    console.log("Received new tile images:", completionText);
  });

  window.myAPI.onTilesChangedError((errorMessage) => {
    console.log("API Request Error:", errorMessage);
  });

});