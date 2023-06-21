const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('myAPI',
    {
        /* Open AI req and error */
        generateText: () => {
            ipcRenderer.send("generateText");
        },
        onTextGenerated: (callback) => {
            ipcRenderer.on("textGenerated", (_, completionText) => {
                callback(completionText);
            });
        },
        onTextGeneratedError: (callback) => {
            ipcRenderer.on("textGeneratedError", (_, errorMessage) => {
                callback(errorMessage);
            });
        },

        /* Unsplash req and error */
        unsplashApiRequestSuccess: (callback) => {
            ipcRenderer.on("unsplashApiRequestSuccess", (_, responseData) => {
              callback(responseData);
            });
          },
          unsplashApiRequestError: (callback) => {
            ipcRenderer.on("unsplashApiRequestError", (_, errorMessage) => {
              callback(errorMessage);
            });
          }
    }
);