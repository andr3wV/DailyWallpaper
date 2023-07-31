const updateVariables = (data) => {
  data.name ? document.querySelector("#name").innerText = `Name: ${data.name}`: document.querySelector("#name").innerText = '';
  data.instagram ? document.querySelector("#instagram").innerText = `Instagram: ${data.instagram}`: document.querySelector("#instagram").innerText = '';
  data.description ? document.querySelector("#description").innerText = `Description: ${data.description}`: document.querySelector("#description").innerText = '';
  data.location ? document.querySelector("#location").innerText = `Location: ${data.location}`: document.querySelector("#location").innerText = '';
};

document.addEventListener("DOMContentLoaded", () => {
  // Tile logic
  var img1 = document.getElementById("img1");
  var img2 = document.getElementById("img2");
  var img3 = document.getElementById("img3");
  var img4 = document.getElementById("img4");
  var img5 = document.getElementById("img5");
  var img6 = document.getElementById("img6");
  var img7 = document.getElementById("img7");
  var img8 = document.getElementById("img8");
  var img9 = document.getElementById("img9");
  var img10 = document.getElementById("img10");

  img1.addEventListener('click', function() {
    console.log('Tile 1 clicked');
    window.myAPI.generateText(tileNumber = 1);
  });
  
  img2.addEventListener('click', function() {
    console.log('Tile 2 clicked');
    window.myAPI.generateText(tileNumber = 2);
  });
  
  img3.addEventListener('click', function() {
    console.log('Tile 3 clicked');
    window.myAPI.generateText(tileNumber = 3);
  });
  
  img4.addEventListener('click', function() {
    console.log('Tile 4 clicked');
    window.myAPI.generateText(tileNumber = 4);
  });
  
  img5.addEventListener('click', function() {
    console.log('Tile 5 clicked');
    window.myAPI.generateText(tileNumber = 5);
  });
  
  img6.addEventListener('click', function() {
    console.log('Tile 6 clicked');
    window.myAPI.generateText(tileNumber = 6);
  });
  
  img7.addEventListener('click', function() {
    console.log('Tile 7 clicked');
    window.myAPI.generateText(tileNumber = 7);
  });
  
  img8.addEventListener('click', function() {
    console.log('Tile 8 clicked');
    window.myAPI.generateText(tileNumber = 8);
  });
  
  img9.addEventListener('click', function() {
    console.log('Tile 9 clicked');
    window.myAPI.generateText(tileNumber = 9);
  });
  
  img10.addEventListener('click', function() {
    console.log('Tile 10 clicked');
    window.myAPI.generateText(tileNumber = 10);
  });
  
  // Button logic

  const button = document.querySelector("#chatButton");

  button.addEventListener("click", () => {
    console.log("button clicked");
    window.myAPI.generateText(); // Use myAPI object to send request
    button.style.pointerEvents = "none";  // disable the button after it's clicked
    
    // enable the button again after 5 seconds (5000 milliseconds)
    setTimeout(() => {
        button.style.pointerEvents = "auto";
    }, 5000);
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
    button2.style.pointerEvents = "none";  // disable the button after it's clicked
    
    // enable the button again after 5 seconds (5000 milliseconds)
    setTimeout(() => {
        button2.style.pointerEvents = "auto";
    }, 15000);
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

  window.myAPI.onVariablesResponse((data) => {
    updateVariables(data);
    document.querySelector("#mainImg").src = "../app/assets/image.jpg?timestamp=" + new Date().getTime();
  });

});