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
  });