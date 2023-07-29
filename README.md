
# Daily Wallpaper

Daily Wallpaper is a MacOS app that changes your wallpaper to a random atheistic image from UnSplash. 

>HTML/CSS/JS packaged with Electron

![Homepage](https://imgur.com/5jlYeoH.jpg)
 ## Requirements

  - `node` 5.0.0 or greater
 - `npm` latest version

 **Note**: Install the latest version `node` and `npm` from [here](https://nodejs.org/en/download/).

 ## Install
 Click [here](https://github.com/andr3wV/DailyWallpaper/releases/download/v1.0.0/Daily.Wallpaper-darwin-arm64-1.0.0.zip) or go to the [releases](https://github.com/andr3wV/DailyWallpaper/releases/tag/v1.0.0) page and download the zip file. 

 ## Running
 Daily Wallpaper won't run right after download. There's an error with the signing because I don't have a Apple Developer Program Account. Because of this you will have to open terminal and run this command: 

```bash
$ xattr -cr <path_to_app>
``` 
<path_to_app> is the location the app downloaded to. It typically downloads to your Downloads folder so run this:

```bash
xattr -cr ~/Downloads/Daily\ Wallpaper.app
```

Then you should be able to run the app!

## Future Work

- Update UI for API Key entry 
- custom cronjob times
- Implement MenuBar
- Deploy to Homebrew
