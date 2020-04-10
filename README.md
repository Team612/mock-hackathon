# Live Convolution

## Note!

The style used in my code is, admittedly, out of date. For example, all of the `var`s should be `let`s in modern javascript; this is partially out of habit, and partially because I started this project when I was younger and finished it just now. The point is, *this is badly written code*.

## How to run

This runs on Electron and Node.js, so this will require you to install [Node.js and npm](https://www.npmjs.com/get-npm). Once this is installed (and you have verified that it is installed with `npm -v`), run `npm install` while in this directory and wait for the installation to complete. After that, run `npm start` and wait for a window pop up.


## What does this do?

This program does [kernel processing](https://en.wikipedia.org/wiki/Kernel_(image_processing)) (also known as convolution) on live input from your camera. Essentially, for each pixel in the image, it uses a weighted average (based on the value in the table) of its neighboring pixel to decide on its output value. The default, for example, is a basic blurring kernel. The program allows you to customize how big the kernel is and the specific weights. It is recommended that the sum of all weights is not much more than 1, otherwise the image gets washed out. If you don't want to worry about this, you can check the box labeled "Use Scale" which will automatically make the kernel sum to 1.

All of the other controls should be fairly self-explanitory. You can increase or decrease the size of the kernel used (the bigger it is, the slower it runs, but it should have a negligible effect until you get *REALLY* big), and can also randomize the inputs to see.

## Why does this matter?

As you may have considered, the *convolution* name is indeed related to convolutional neural networks. So while this is really just a toy to visualize what is going on, it has real-world applications. This simple process, applying a kernel matrix to each pixel in an image, is the 'basic' part of feature extraction in a neural network. It is capable of recognizing simple blobs and edges, which is then used in later layers of the network to recognize more high-level features like faces, cats, and dogs.

In particular, this is used because often times, having a connection between *every pixel* in every layer would make the number of parameters required to train be far too large to be practical. Instead, applying a set of kernels transforms the image into something that's dimensionally smaller and more feasible to work with. As an added bonus, kernels can recognize small-scale patterns more efficiently than pixel-to-pixel connections in a network.

This means that when a neural network is being trained, a large part of what is being adjusted are these numbers in the matrix. In practicality, there are dozens of kernels of all different sizes each trying to recognize a different useful feature.
