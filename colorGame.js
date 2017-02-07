/* alert("JS is Connected!");   -- comment out the standard alert */


/* *******Establish all of our variables at the top of the JS file **** */

/* establish a var as an array of randomly generated colors that will be used to fill one of each of the available squares based on the variable called
"numSquares" */
var numSquares = 6;

/*note--we need to make sure that there is an empty SPACE after each comma
separating the color values in the rgb codes and after each rgb color code
for formatting purposes */
var colors = generateRandomColors(numSquares);

/* now we need to loop through all of the available HTML square areas 
using the "square" class
and assign one of the color codes to each one's background style property */
/* note-- document.querySelectorAll() will return an ordered NodeList which has a zero-based index, much like an array */
var squares = document.querySelectorAll(".square");

/* establish one of the random colors to be the "target" color
that the player is attempting to match -- this color code is noted at the top of the game board and will trigger the winning of the game */
/* we will use the function called pickColor to establish a random color for
our target color */
var pickedColor = pickColor();

/* establish a var to access the span in our HTML that will allow us to
update and display the color code for the target color */
var colorDisplay = document.getElementById("colorDisplay");

/* this message will display either a "Try Again" or "Correct" message
depending on whether or not the clickedColor === pickedColor */
var messageDisplay = document.querySelector("#message");

/* select the h1 element so that we can style the background to match the
target color when the player wins the game */
var h1 = document.querySelector("h1");

/* select the button with the id of "reset" so that we can add an event listener to reset the array of squares with a new set of colors as needed
whenever this "New Colors" button is clicked */
var resetButton = document.querySelector("#reset");

/* select the "Easy" and "Difficult" buttons to be able to choose a game with
either 3 color options for the "Easy" version
or 6 color options for the "Difficult" version */
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");

/* *********** end list of established variables ************* */






/* ************ This area holds our loops, functions etc. that make use of the variables that we established above **********  */



/* this code will loop through all of our squares when the player has chosen the correct target color and all of the squares, along with the h1 header area, will change to match the target color */
function changeColors(color){
    /* loop through our array of squares starting at index 0 */
    for(var i =0; i < squares.length; i+=1){
    /* change each square's background color to match the target color */
        squares[i].style.background = color;
    }
}


/* we start the loop at zero to match the zero-based indexes of the
ordered nodelist/array that we are referencing for the set of "squares" and "colors" */
/* we are using this single loop to achieve 2 things
 -add initial colors to our squares
 -and add event listeners to our squares for click events  */
for(var i = 0; i < squares.length; i+=1){
    /* add initial colors to our squares */
    squares[i].style.background = colors[i];
    /* we are using the i iterator to pair each of the squares in the
    square class with one of the color codes in the colors array that
    we established */
    /* and */
    /* add click listeners to our squares */
    squares[i].addEventListener("click", function(){
        
        /* grab color of clicked square and save it to a variable */
        /* "this" refers to the item that was clicked on -the "squares[i]" */
        var clickedColor = this.style.background;
        
        /* compare the color of the clicked square to the 
        target "pickedColor" variable */
        /* and return a conditioned result based on whether or not 
        the colors match one another */
        if(clickedColor === pickedColor){
            messageDisplay.textContent = "Correct!";
           /*these styles cause other
            messageDisplay.style.textTransform = "uppercase";
            messageDisplay.style.fontFamily = "Avenir", "Montserrat", sans-serif;
            messageDisplay.style.fontWeight = "bold";
            */
        /* change the text of the "New Colors" button to read "Play Again?" */
            resetButton.textContent = "Play Again?";
        /* call the changeColors function to change all squares and
        the h1 header to match the target color when the player wins */
            changeColors(clickedColor);
            h1.style.background = clickedColor;
        }else{
        /* when the incorrect square is clicked, the background
        color of that square changes to match it's surroundings
        and seems to "disappear" */
            this.style.background = "floralwhite";
            messageDisplay.textContent = "Try Again";
        }
    }); 
} /* end for-loop */


/* assigns the value of the pickedColor to the colorDisplay's textContent
so that the target color's code will be displayed as text within the
designated span of the h1 */
colorDisplay.textContent = pickedColor;

/* ------------------------------------------------ */

/* this function is called to generate a random number between 0-5 to match
to an index in the colors array to establish the target color that matches
to one of the 6 available squares */
function pickColor(){
    /*generate a random number between 0-5 */
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}


/* ------------------------------------------------ */
/* this function will generate the quantity of random colors that we will need to use for our squares -- "Easy" level will use 3 colors and "Difficult" level will use 6 colors */
function generateRandomColors(num){
// establish an empty array to hold our color codes
    var arr = [];
/* add num random colors to the array using push, by looping through this for-loop num number of times */
    for(var i = 0; i < num; i+=1){
        /* push the random colors into the empty array */
        arr.push(randomColor());
    }
    
// return that array
    return arr; 
}

/* this function is different than the one called "generateRandomColors()" with an "s"  and is used to generate a random color */
function randomColor(){
// generate a value for the "red" rgb slot between 0-255
    var r = Math.floor(Math.random() * 256);
// generate a value for the "green" rgb slot between 0-255
    var g = Math.floor(Math.random() * 256);
// generate a value for the "blue" rgb slot between 0-255
    var b = Math.floor(Math.random() * 256);
//return the string containing all of the r, g, b values
/*be sure to include an empty SPACE after each comma for consisistency
in formatting--very important for comparisons between our "clickedColor" and 
our "pickedColor"--  so the outcome is    rgb(value, value, value)  */
    return "rgb(" + r + ", " + g + ", " + b + ")";
}
/*  ------------------------------------------------- */



/*  -------------------------------------------------  */
/*  this event listener will reset the random colors in the squares
and also show a new target color code in the header  */
resetButton.addEventListener("click", function(){
    /* generate all new random colors for the array-- 
    use our existing function */
    colors = generateRandomColors(numSquares);
    // choose a new random color from the array as our target color
    pickedColor = pickColor();
    /* update the target color code in the header so that the
    colorDisplay matches the pickedColor */
    colorDisplay.textContent = pickedColor;
    this.textContent = "Reset Colors"; /* "this" refers to resetButton. */
    // update the colors of the squares
    for(var i = 0; i < squares.length; i+=1){
        squares[i].style.background = colors[i];
    } 
    /* reset the background color on the h1 header to the grey color and clear out the message area */
    h1.style.background = "grey";
    messageDisplay.textContent = "";
})

/*  -------------------------------------------------  */
/* add event listeners to the "Easy" and "Difficult" buttons to toggle
between having a 3-color or 6-color game setup */
easyBtn.addEventListener("click", function(){
    easyBtn.classList.add("selected");
    hardBtn.classList.remove("selected");
    numSquares = 3;
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    h1.style.background = "grey";
    messageDisplay.textContent = "";
    resetButton.textContent = "Reset Colors";
    for(var i = 0; i < squares.length; i+=1){
        if(colors[i]){
            squares[i].style.background = colors[i];
        } else{
            squares[i].style.display = "none";
        }
    }
});

hardBtn.addEventListener("click", function(){
    hardBtn.classList.add("selected");
    easyBtn.classList.remove("selected");
    numSquares = 6;
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    h1.style.background = "grey";
    messageDisplay.textContent = "";
    resetButton.textContent = "Reset Colors";
    for(var i = 0; i < squares.length; i+=1){
        squares[i].style.background = colors[i];
        squares[i].style.display = "block";
        }
});

/*  -------------------------------------------------  */





















