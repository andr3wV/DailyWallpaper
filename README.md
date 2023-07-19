
# Daily Wallpaper

Daily Wallpaper is a MacOS app that changes your wallpaper to a random atheistic image from UnSplash. 

>HTML/CSS/JS packaged with Electron

![Homepage](https://imgur.com/5jlYeoH.jpg)
 ## Requirements

  - `node` 5.0.0 or greater
 - `npm` latest version

 **Note**: Install the latest version `node` and `npm` from [here](https://nodejs.org/en/download/).

 ## Install
 
 Clone the repo and open the directory: 
 ```bash
 $ git clone https://github.com/andr3wV/daily-wallpaper.git
 $ cd daily-wallpaper
 ```
 Installs dependencies using `npm`:

 ```bash
 $ npm install 
 ```
 **Note**: you may have to force permissions (e.g. `sudo` on MacOS)



 ## Running
 This application uses GPT-3.5-turbo to randomize and the unSplash API to download images. Because of this, you will need both an OpenAI API key (paid) and an unSplash API key (free).  

Once you have both API keys, update the .env file with both of the valid keys:

```
 OPENAI_API_KEY = YOUR-OPENAI-API-KEY-HERE
 UNSPLASH_API_KEY = YOUR-UNSPLASH-API-KEY-HERE
```
 **Note**:  Future updates will not need this step, but for now this is necessary.

 Using `npm`,  start the application:

 ```bash
 $ npm run start
 ```

The application will launch. Your wallpaper will now change your MacOS desktop wallpaper once a day, or you can change it using the 'Change Wallpaper' button. 

## Future Work

- Update UI for API Key entry 
- custom cronjob times

- Implement MenuBar

- Deploy to Homebrew
