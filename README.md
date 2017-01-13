# Neighborhood Map

## Usage

The app shows nearby restaurants and bars, including their address, phone number and website.

It also allows you to further filter the nearby locations by entering a search text.

The list of locations is sourced from [Google Maps](https://maps.google.com) data and information on the locations is provide by [Foursquare](http://www.foursquare.com).

## Install

- To install the app download the zip file [here](https://github.com/bhaskardua/FSWD-Project-7-Neighborhood-Map/archive/master.zip)
- Unzip the file to a desired location on your computer
- Navigate to the `dist` folder in the dowload and open the `index.html` in the browser

## Build

To make changes to the app and build it again follow these steps:

- Download the project zip file form [here](https://github.com/bhaskardua/FSWD-Project-7-Neighborhood-Map/archive/master.zip)
- Unzip the file to a desired location on your computer
- Make sure you have Node.js, npm, gulp and bower installed. If you don't have these tools you can get them like so:
    + [Node.js](https://nodejs.org) Download and install `node` installer using the instructions on the website. It will also install `npm` for you
    + [Gulp](http://gulpjs.com) Once you have node, install Gulp globally on your computer by typing the following command in your terminal `npm install -g gulp`
    + [Bower](https://bower.io) Also install bower globally on your computer by typing the following in your computer `npm install -g bower`
- Navigate to the unzipped folder and issue the following terminal commands to install the relevant gulp plugins and bower components. The package.json and bower.json files already contain the information for the components to be installed (various gulp plugins, jQuery and Knockout.js)
    + `npm install`
    + `bower install`
- Start gulp from the terminal by just typing `gulp`
- This would open the app in your default browser. You can also open it manually in any other browser at http://localhost:3000
- You can also open in the app in a mobile browser by using the external ip address of your computer (i.e. the ip address on the local network and not the public ip) and port 3000
- You can live edit the source files in folder `src`. The `dist` files are generated and results automatically updated in the browser via the gulp workflow
