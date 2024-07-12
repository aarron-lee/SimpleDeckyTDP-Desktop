# SimpleDeckyTDP Desktop

A Desktop port of the SimpleDeckyTDP Decky Plugin, built for AMD APU devices

![app](./img/app1.png)

- [Features](#features)
- [Requirements](#requirements)
- [Limitations](#limitations)
- [Installation](#install)
- [Manual Build](#manual-build)
- [Uninstall Instructions](#uninstall-instructions)
- [Troubleshooting](#troubleshooting)
  - [Ryzenadj Troubleshooting](#ryzenadj-troubleshooting)
- [Attribution](#attribution)

## Features

- TDP controls + custom TDP Limits
- Power Governor and Energy Performance Preference controls
- GPU Controls
- Desktop tray support (AppIndicator)
  - click the tray icon to hide/show the app
- SMT control
- CPU Boost control\*
  - note, requires a newer kernel for CPU boost controls
  - CPU boost controls appear automatically if it's available on your device
- set TDP on AC Power events and suspend-resume events
  - separate AC Power Profiles supported on select devices only, see [limitations](#limitations) for more info
- TDP Polling - useful for devices that change TDP in the background
- Legion Go TDP via WMI calls (allows for TDP control with secure boot, requires acpi_call)
- ROG Ally TDP via WMI calls (allows for TDP control with secure boot)
- etc

# Requirements

- ryzenadj installed
- unofficial decky loader
- SDTDP decky plugin

### WARNING: This app assumes you already have ryzenadj installed and can be located in your PATH

ChimeraOS, Bazzite Deck Edition, and NobaraOS Deck edition, should already have ryzenadj pre-installed.

To check this, you can run `which ryzenadj` in a terminal/console, which should print out a path to a ryzenadj binary.

e.g.

```
$ which ryzenadj
/usr/bin/ryzenadj
```

If you do not have ryzenadj installed, you will need to get a working copy installed onto your machine.

See [here](#ryzenadj-troubleshooting) for more info on ryzenadj

### Other requirements

[Unofficial Decky Loader](https://github.com/aarron-lee/decky-loader) is a fork I made of Decky with the required functionality for the desktop app. Note that this can safely be used alongside regular Decky Loader without issue, they don't interfere with each other.

# Limitations

Note, the Desktop app does not have full feature parity with the Decky Plugin.

**Certain features cannot be implemented**, such as:

- per-game profiles
- universal AC TDP Profiles
  - the Desktop app only supports AC TDP profiles on select devices

# Installation

If not already installed, install unofficial decky to your device

```bash
curl -L https://raw.githubusercontent.com/aarron-lee/decky-loader/main/dist/install_release.sh | sh
```

Then install SimpleDeckyTDP to unofficial Decky

```bash
curl -L https://raw.githubusercontent.com/aarron-lee/SimpleDeckyTDP-Desktop/main/install.sh | sh
```

Finally, download the latest AppImage from [releases](https://github.com/aarron-lee/SimpleDeckyTDP-Desktop/releases) and install it via an AppImage manager like [GearLever](https://flathub.org/apps/it.mijorus.gearlever), AppImageLauncher, etc

# Manual Build

```bash
# download the repo + enter the directory in terminal

cd SimpleDeckyTDP-Desktop

npm install

npm run electron-build

cd electron

npm install

npm run build

# appImage file will be generated in the electron/dist directory
```

# Uninstall Instructions

1. delete the appImage via whatever appImage manager you happen to be using
2. uninstall unofficial decky: `curl -L https://raw.githubusercontent.com/aarron-lee/decky-loader/main/dist/uninstall.sh | sh`
3. Delete any remaining files `sudo rm $HOME/.unofficial_homebrew`

# Troubleshooting

### Ryzenadj troubleshooting

To test your ryzenadj, try the following:

```
$ sudo ryzenadj -a 14000 -b 14000 -c 14000
```

the command above sets 14W TDP. You should see the following if sucessful:

```
Sucessfully set stapm_limit to 14000
Sucessfully set fast_limit to 14000
Sucessfully set slow_limit to 14000
```

If you don't see the success messages, your ryzenadj is most likely not working or configured for your device.

You can also test by running the following:

```
$ sudo ryzenadj -i
```

This should print out a table that looks something like the following:

```
CPU Family: Rembrandt
SMU BIOS Interface Version: 18
Version: v0.13.0
PM Table Version: 450005
|        Name         |   Value   |     Parameter      |
|---------------------|-----------|--------------------|
| STAPM LIMIT         |     8.000 | stapm-limit        |
| STAPM VALUE         |     0.062 |                    |
```

If you see an error, you may need to set `iomem=relaxed` as a boot parameter for your kernel, or disable secure boot.

# Attribution

favicon for icons ([cc-by4.0 license](https://creativecommons.org/licenses/by/4.0/)) - https://favicon.io/emoji-favicons/video-game
