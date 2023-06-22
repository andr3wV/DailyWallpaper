const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('myAPI', {
      /* Open AI req and error */
      generateText: () => {
          ipcRenderer.send("generateText");
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
      },
      onVariablesResponse: (callback) => {
        ipcRenderer.on("variablesResponse", (event, data) => callback(data));
      },
      loadVariables: (callback) => {
        ipcRenderer.send("requestVariables");
        ipcRenderer.on("variablesResponse", (event, data) => callback(data));
      },

      /* Change tiles req and error */
      changeTiles: () => {
          ipcRenderer.send("changeTiles");
      },
      onTilesChanged: (callback) => {
          ipcRenderer.on("tilesChanged", (_, completionText) => {
              callback(completionText);
          });
      },
      onTilesChangedError: (callback) => {
          ipcRenderer.on("tilesChangedError", (_, errorMessage) => {
              callback(errorMessage);
          });
      },
    }
);