#!/usr/bin/bash

if [[ ! -d $HOME/.unofficial_homebrew/plugins ]]; then
  echo "Unofficial decky required. Exiting..."
  exit
fi

# does the following:
# - SimpleDeckyTDP Decky Plugin
if [ "$EUID" -eq 0 ]
  then echo "Please do not run as root"
  exit
fi

echo "removing previous install if it exists"

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

echo "Installation complete"
