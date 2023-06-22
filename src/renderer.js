const updateVariables = (data) => {
  document.querySelector("#name").innerText = `Name: ${data.name}`;
  document.querySelector("#username").innerText = `Username: ${data.username}`;
  document.querySelector("#instagram").innerText = `Instagram: ${data.instagram}`;
  document.querySelector("#description").innerText = `Description: ${data.description}`;
  document.querySelector("#location").innerText = `Location: ${data.location}`;
};

document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector("#chatButton");

  button.addEventListener("click", () => {
    console.log("button clicked");
    window.myAPI.generateText(); // Use myAPI object to send request
  });

  window.myAPI.onTextGenerated((completionText) => {
    console.log("Received generated text:", completionText);
  });

  window.myAPI.unsplashApiRequestSuccess((responseData) => {
    console.log("Unsplash API success:", responseData);
  });

  window.myAPI.unsplashApiRequestError((errorMessage) => {
    console.log("Unsplash API Request Error:", errorMessage);
  });

  window.myAPI.onTextGeneratedError((errorMessage) => {
    console.log("API Request Error:", errorMessage);
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
});