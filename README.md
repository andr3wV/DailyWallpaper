
# Daily Wallpaper

Daily Wallpaper is a MacOS app that changes your wallpaper to a random atheistic image from UnSplash. 

>HTML/CSS/JS packaged with Electron

<img width="801" alt="Screenshot 2023-07-30 at 11 22 16 PM" src="https://github.com/andr3wV/DailyWallpaper/assets/77115975/d50dbb98-4924-4dce-b2fa-45a6172210cd">

 ## Requirements

  - `node` 5.0.0 or greater
 - `npm` latest version

 **Note**: Install the latest version `node` and `npm` from [here](https://nodejs.org/en/download/).

 ## Install
 
  Clone the repo and open the directory: 
  ```bash
  $ git clone https://github.com/andr3wV/DailyWallpaper.git
  $ cd daily-wallpaper
  ```
  Installs dependencies using `npm`:

  ```bash
  $ npm install 
  ```
  **Note**: you may have to force permissions (e.g. `sudo` on MacOS)

## Running
  This application uses GPT-3.5-turbo to randomize and the unSplash API to download images. Because of this, you will need both an OpenAI API key (paid but cheap) and an UnSplash API key (free).  

 Once you have both API keys, replace the X's in the two variables at the top of main.js with your actual keys. Then make sure to save the file. 

  **Note**:  Future updates will not need this step, but for now this is necessary. Sorry, I just don't want to host my API keys yet!

Using `npm`,  make the application:

```bash
 $ npm install
 $ npm run make
```

Open Finder and navigate to the project: 

```
DailyWallpaper -> out -> Daily Wallpaper-XXX
```

Now drag the app icon into your dock or Applications folder and you're all set!

## Future Work

- Update UI for API Key entry
- Host API 
- Implement MenuBar
- Deploy to Homebrew
- Fix cron + make customizable
