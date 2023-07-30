module.exports = {
  packagerConfig: {
    "asar": {
      unpack: [
        "**/node_modules/wallpaper/**",
        "**/app/assets/gallery/**",
        "**/app/assets/image.jpg"
      ]
    },
    icon: 'app/assets/icons/icon'

    // NEED TO BE IN THE APPLE DEV PROGRAM TO GET A TEAM_ID
    
    // osxNotarize: {
    //   tool: 'notarytool',
    //   appleId: process.env.APPLE_ID,
    //   appleIdPassword: process.env.APPLE_PASSWORD,
    //   teamId: process.env.APPLE_TEAM_ID
    // }
  },
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'andr3wV',
          name: 'DailyWallpaper'
        },
        prerelease: false,
        draft: true
      }
    }
  ],
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],
};
