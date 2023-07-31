
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

## Running
  
This application uses the UnSplash API to download images. Because of this, my API key usage may be maxed out and the app will be broken. **If the app is not working properly, this is most likely the problem.**  To fix it, please navigate to [UnSplash's Developer Page](https://unsplash.com/developers) and make your own API key. Replace my key at the top of main.js with your key, and everything should be fixed!

Using `npm`,  make the application:

```bash
 $ npm install
 $ npm run make
```

Open Finder and navigate to the project: 

```
DailyWallpaper -> out -> Daily Wallpaper-XXX
```

Now drag the app icon into your dock or Applications folder and youre all set!

## Future Work

- Update UI for API Key entry
- Host API 
- Implement MenuBar
- Deploy to Homebrew
- Fix cron + make customizable
