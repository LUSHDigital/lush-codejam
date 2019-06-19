# LushCodeJam2019

## Background

The idea of this project is to evoke emotion in the user by using sound and visuals. A JSON array of data is queried to get product information, we then pull the images of each bath bomb and present it to the user. When the user clicks, we query the colour pallet which is used in the rain like effect. Each shade is tagged with a different note in a certain key which uses AI to randomise the notes used to play a little tune. 

## Build Instructions

The following instructions assume that the user has `pip` installed and has `python` setup in the environment path.

Open up the `cmd` and navigate to the root directory of the project and create a virtual environment:

`virtualenv venv`

Then activate the virtual environment:

`venv\Scripts\activate`

You should then see the name of the virtual environment in brackets on the left-hand side of the command prompt.

Next, we will need to install flask, requests and colourgram, do this as follows:

`pip install Flask`

`pip install requests`

`pip install colorgram.py`

You should then be to run the program by typing `python main.py`

The server will start and you should the application running on http://127.0.0.1:5000/

Paste this URL into your browser and you're done!


