#TODO LIST

##User Feed
    Remove dummy buttons
    Cleanup the Image insert button and text field
    Ensure everything is visible regardless of screen size

##User List

    Idea to make the user list clickable - add to it's code:
    - In the <text> function create a unique ID like userName + i
    - Create a onclick Listener, listening to a click on that ID
    - Create the code to show that user's pictures (most should already be done)


code Cleanup
initial was using document.write to add images. This was reseting the webpage
with just the images.
Changed to
document.getElementById('images').innerHTML =text;
which worked but had to create a loop to cycle through all images
Idea - replace this with:
//   document.body.appendChild(img);
Did not work... When loading other user page keeps adding more pictures...
Needs reset when changing user...
