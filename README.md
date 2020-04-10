# Live Convolution

## How to run

This runs on Electron and Node.js, so this will require you to install [Node.js and npm](https://www.npmjs.com/get-npm). Once this is installed (and you have verified that it is installed with `npm -v`, run `npm install` while in this directory and wait for the installation to complete. After that, run `npm start` and wait for a window pop up.


## What does this do?

This program does [kernel processing](https://en.wikipedia.org/wiki/Kernel_(image_processing)) on live input from your camera. Essentially, for each pixel in the image, it uses a weighted average (based on the value in the table) of its neighboring pixel to decide on its output value. The default, for example, is a basic blurring kernel. The program allows you to customize how big the kernel is and the specific weights. It is recommended that the sum of all weights is not much more than 1, otherwise the image gets washed out. If you don't want to worry about this, you can check the box labeled "Use Scale" which will automatically make the kernel sum to 1.