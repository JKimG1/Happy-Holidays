# Happy-Holidays

![Alt text](/screenshots/01.png?raw=true "First screen")

## Note

To Run:
1. cd into the directory and run ```npm install```

2. run server with ```serve```

3. open and view the web page ```localhost/a5.html``` (or whatever port their server is using)


General Instruction:
1. Click the screen once before you start typing.

2. Once you click screen once, you can start typing up to 14 letters. (Characters except English letter and space will not be entered.)

3. To reset the typed letters, press backspace.


Explanation:
To implement the assignment, I used the Babylon.js library for such as creating scene, lights, particles, background image, sound, letter boxes, lines, and interacting with keys and mouse.

I first created scene, camera, particles, and background to initialize the stage. The background image covered the front, back, left, right, up, down as its own world. Then, I used the Babylon.js event handler to create a cube box that has the corresponding letter image on the front side. Then I adjusted x value of letter boxes to make them centered on screen and a line that goes from the box to the top of screen. Every time user types a letter, it makes a door-bell sound.

I used the Babylon.js event handler to delete the boxes and lines when backspace is pressed. This is done by using dispose() method. The letter count becomes 0 and user can start typing again.

I used javascript event handler to spin the letter boxes when they are clicked. The Babylon scene has a pick() method that can gets the x-y coordinates where the mouse was clicked. Using the value of that, I determined the speed and spinned the letter boxes.

Since I used Babylon.js, I added background for the one bonus option as part of the main assignment.

Lastly, I added snowflakes and the texts will show in two rows. First row will contain up to 13 characters and the second row will contain up to 7 characters.
