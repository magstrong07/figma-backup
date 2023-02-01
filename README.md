<div align="center">
  <h1>Figma Backup Bot</h1>
  <p>A Node.js CLI to backup Figma files and store them as local <code>.fig</code> files.</p>
  <img src="https://img.shields.io/npm/dt/figma-backup?color=d900ff&labelColor=000000&style=for-the-badge" />
  <img src="https://img.shields.io/github/license/mimshins/figma-backup?color=d900ff&labelColor=000000&style=for-the-badge" />
  <img src="https://img.shields.io/npm/v/figma-backup?color=d900ff&labelColor=000000&style=for-the-badge" />
  <a title="twitter" href="https://twitter.com/mimshins" target="_blank"><img src="https://img.shields.io/twitter/follow/mimshins?color=d900ff&labelColor=000000&logo=twitter&style=for-the-badge" /></a>
</div>

<hr />

## Installation

1- Make sure you have [Node.js](https://nodejs.org) installed on your machine.\
(We follow the latest [maintenance LTS](https://github.com/nodejs/Release#release-schedule) version of Node.)

2- Run the following command on your terminal:
```bash
npm install -g figma-backup
```

or install it via [Yarn](https://yarnpkg.com/):

```bash
yarn global add figma-backup
```

It is going to download and install the node package and a recent compatible version of Chromium in your global `node_modules` directory (You can find it via `npm list -g | head -1`).

**Note:** If the installation stopped with the 403 Error (Forbidden), you'll have to use a VPN or Proxy to another region/country in order to access the Chromium source.

---

**Note (Linux Machines):** Make sure all the necessary dependencies are installed. You can go to the `<path_to_node_modules>/node_modules/puppeteer/.local-chromium/linux-******/chrome-linux` and run `ldd chrome | grep not` on a Linux machine to check which dependencies are missing. The common ones are provided below.

<details>
<summary>Debian (e.g. Ubuntu) Dependencies</summary>

```
ca-certificates
fonts-liberation
libappindicator3-1
libasound2
libatk-bridge2.0-0
libatk1.0-0
libc6
libcairo2
libcups2
libdbus-1-3
libexpat1
libfontconfig1
libgbm1
libgcc1
libglib2.0-0
libgtk-3-0
libnspr4
libnss3
libpango-1.0-0
libpangocairo-1.0-0
libstdc++6
libx11-6
libx11-xcb1
libxcb1
libxcomposite1
libxcursor1
libxdamage1
libxext6
libxfixes3
libxi6
libxrandr2
libxrender1
libxss1
libxtst6
lsb-release
wget
xdg-utils
```
</details>

<details>
<summary>CentOS Dependencies</summary>

```
alsa-lib.x86_64
atk.x86_64
cups-libs.x86_64
gtk3.x86_64
ipa-gothic-fonts
libXcomposite.x86_64
libXcursor.x86_64
libXdamage.x86_64
libXext.x86_64
libXi.x86_64
libXrandr.x86_64
libXScrnSaver.x86_64
libXtst.x86_64
pango.x86_64
xorg-x11-fonts-100dpi
xorg-x11-fonts-75dpi
xorg-x11-fonts-cyrillic
xorg-x11-fonts-misc
xorg-x11-fonts-Type1
xorg-x11-utils
```

After installing dependencies you need to update nss library using this command

```bash
yum update nss -y
```
</details>

### Docker Container
You can also use docker container and run the `figma-backup` command in it. 
<details>
<summary>Usage
</summary>
Building image:

```bash
docker build -t <image_name> -f Dockerfile .
```
Running the container:
```bash
docker run --name <container_name> -it <image_name> bash
```
**Note:**

If you face the following error:
```bash
Error: Failed to launch the browser process!
[19:19:0914/132053.471715:ERROR:browser_main_loop.cc(1409)] Unable to open X display.


TROUBLESHOOTING: https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md

    at onClose (/usr/local/lib/node_modules/figma-backup/node_modules/puppeteer/lib/cjs/puppeteer/node/BrowserRunner.js:203:20)
    at ChildProcess.<anonymous> (/usr/local/lib/node_modules/figma-backup/node_modules/puppeteer/lib/cjs/puppeteer/node/BrowserRunner.js:194:79)
    at ChildProcess.emit (node:events:525:35)
    at ChildProcess._handle.onexit (node:internal/child_process:291:12)
```
You can follow [this](https://stackoverflow.com/questions/60304251/unable-to-open-x-display-when-trying-to-run-google-chrome-on-centos-rhel-7-5/61043049#61043049) and set the screen to something like:
```bash
Xvfb -ac :99 -screen 0 1280x1024x16 &
export DISPLAY=:99
```
</details>

---

## Usage

To use the interactive command-line interface, run:

```bash
figma-backup-interactive
```

To use the noninteractive version, run:

```bash
figma-backup -e "<YOUR_EMAIL>" -p "<YOUR_PASSWORD>" -t "<YOUR_ACCESS_TOKEN>" --projects-ids "ID1" "ID2" ... "IDx"
```

For more information about the noninteractive cli options run:

```bash
figma-backup --help
```
---

> **To get `project_id` from project page's URL:**\
`https://www.figma.com/files/project/{project_id}/{project_name}`

> **To get `access_token`:**
> 1. Login to your Figma account.
> 2. Head to the account settings from the top-left menu inside Figma.
> 3. Find the personal access tokens section.
> 4. Click Create new token.
> 5. A token will be generated. This will be your only chance to copy the token, so make sure you keep a copy of this in a secure place.

---

## Output

The backup files will be found in `figma-backup-root` directory relative to the working directory which you ran the `figma-backup` command.

### Structure of `figma-backup-root`:
```
figma-backup-root/
├── cookies.json
└── backups/
    └── [ISOStringifiedDate]/
        //i.e "2022-09-16T18:14:10.708Z"
        ├── Project1/
        │   ├── File1.fig
        │   └── File2.fig
        └── Project2/
            ├── File1.fig
            └── File2.fig    
```
