The following project has been created to demonstrate a desirable output of the Creative Programming Code Jam hosted by LUSH Digital.

This small project uses the TweenMax library found [here](https://greensock.com/tweenmax), which enables animation found within the project. 

In order to automate the mouse movement, the Perlin library is used, which can be found [here](https://github.com/josephg/noisejs/blob/master/perlin.js)

To see a demo of the project in action please click [here](http://oliverbcurtis.co.uk/codeJam2019/). 

Things covered by the example:

* Bubble animation
* Automation of bubbles when no touch or cursor movement detected for 500ms
* Background colour change depending on bubble speed movement
* Audio - (The audio is faulty due to not handling an Uncaught (in promise) DOMException. In main.js on line 147, you can see audioplay.play(); is called - however this is an asynchronous method and this issue might be due to the audio not being loaded when the first touch is detected. Therefore the audio would need to be preloaded to avoid the error in the console log. At the moment, you will have to touch the screen a few times before the sound is picked up).


There are other great libraries to consider if you're interested in projects like this, one being [sketch.js](https://github.com/soulwire/sketch.js)

If you want to look at audio files there are many options found at [zapsplat](https://www.zapsplat.com/).
I would recommend testing your audio files in an online player to see how the audio is affected whilst in a loop/ handling increased/slowed down speed before adding them to your code - I found [timestretch](https://29a.ch/timestretch/) very useful!
