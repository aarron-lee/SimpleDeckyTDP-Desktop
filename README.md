# SimpleDeckyTDP Desktop

A Desktop port of the SimpleDeckyTDP Decky Plugin, built for AMD APU devices

![app](./img/app1.png)

- [Features](#features)
- [Requirements](#requirements)
- [Limitations](#limitations)
- [Installation](#install)
- [Manual Build](#manual-build)
- [Uninstall Instructions](#uninstall-instructions)
- [Attribution](#attribution)

## Features

- TDP controls + custom TDP Limits
- Power Governor and Energy Performance Preference controls
- GPU Controls
- SMT control
- CPU Boost control\*
  - note, requires a newer kernel for CPU boost controls
  - CPU boost controls appear automatically if it's available
- set TDP on AC Power events and suspend-resume events
  - separate AC Power Profiles supported on select devices only
- TDP Polling - useful for devices that change TDP in the background
- Legion Go TDP via WMI calls (allows for TDP control with secure boot, requires acpi_call)
- ROG Ally TDP via WMI calls (allows for TDP control with secure boot)
- etc

# Requirements

Unofficial Decky Loader and SimpleDeckyTDP installed

[Unofficial Decky Loader](https://github.com/aarron-lee/decky-loader) is a fork I made of Decky with the required functionality for the desktop app, note that this can safely be used alongside regular Decky Loader without issue. They don't interfere with each other.

# Limitations

Note, the Desktop app does not have full feature parity with the Decky Plugin.

**Certain features cannot be implemented**, such as:

- per-game profiles
- universal AC TDP Profiles
  - the Desktop app only supports AC TDP profiles on select devices

# Installation

If not already installed, install unofficial decky

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

# Attribution

favicon for icons ([cc-by4.0 license](https://creativecommons.org/licenses/by/4.0/)) - https://favicon.io/emoji-favicons/video-game
