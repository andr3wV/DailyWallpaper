class DailyWallpaper < Formula
    desc "Generates and recommends a daily beautiful random desktop wallpaper on MacOS."
    homepage "https://github.com/andr3wV/DailyWallpaper"
    url "https://github.com/andr3wV/DailyWallpaper/archive/refs/tags/v1.0.0.tar.gz"
    sha256 "971bcc5b97e2311867c2b5760cc5c10fa6c1d3f5d8dd3498632e0a0919b81ab9"
    license "MIT"
  
    depends_on "node"
    depends_on "yarn"
  
    def install
      system "yarn", "install"
      system "yarn", "make"
      prefix.install Dir["out/Daily Wallpaper-darwin-x64/*"]
      bin.install_symlink "#{prefix}/Daily Wallpaper.app/Contents/MacOS/Daily Wallpaper"
    end
  
    test do
      system "false"
    end
  end