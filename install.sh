#!/usr/bin/bash

APP=SimpleDeckyTDP-Desktop
RELEASE_URL=https://api.github.com/repos/aarron-lee/$APP/releases/latest

if [[ ! -d $HOME/.unofficial_homebrew/plugins ]]; then
  echo "Unofficial decky required. See https://github.com/aarron-lee/decky-loader for instructions. Exiting..."
  exit
fi

if [ "$EUID" -eq 0 ]
  then echo "Please do not run as root"
  exit
fi

if grep -q 'it.mijorus.gearlever' <<< $(flatpak list); then
    echo "GearLever installed, $APP install will proceed"

else
    read -p "$APP install script requires GearLever. Do you want to install GearLever? (y/n): " yn

    case $yn in
        [Yy]* )
            echo "Installing GearLever..."
            flatpak install it.mijorus.gearlever --system -y
            ;;
        [Nn]* )
            echo "GearLever Installation aborted."
            exit
            ;;
        * )
            echo "Please answer yes or no."
            exit
            ;;
    esac
fi

echo "removing previous SDTDP plugin install if it exists"

cd $HOME

sudo rm -rf $HOME/.unofficial_homebrew/plugins/SimpleDeckyTDP

FINAL_URL="https://api.github.com/repos/aarron-lee/SimpleDeckyTDP/releases/tags/v0.5.5"
echo $FINAL_URL
# download + install plugin
curl -L $(curl -s "${FINAL_URL}" | grep "browser_download_url" | cut -d '"' -f 4) -o $HOME/SimpleDeckyTDP.tar.gz

# echo "installing SimpleDeckyTDP plugin for TDP control"
# # download + install simple decky tdp
# curl -L $(curl -s https://api.github.com/repos/aarron-lee/SimpleDeckyTDP/releases/latest | grep "browser_download_url" | cut -d '"' -f 4) -o $HOME/SimpleDeckyTDP.tar.gz

sudo tar -xzf SimpleDeckyTDP.tar.gz -C $HOME/.unofficial_homebrew/plugins

# install complete, remove build dir
rm  $HOME/SimpleDeckyTDP.tar.gz
sudo systemctl restart unofficial_plugin_loader.service

# handle for Appimage UI

echo "Downloading $APP AppImage"

wget \
    $(curl -s $RELEASE_URL | \
    jq -r ".assets[] | select(.name | test(\".*AppImage\")) | .browser_download_url") \
    -O $HOME/Downloads/$APP.AppImage
chmod +x $HOME/Downloads/$APP.AppImage

flatpak run it.mijorus.gearlever $HOME/Downloads/$APP.AppImage

echo "Installation complete"
