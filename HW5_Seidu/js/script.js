/* 
File: script.js
GUI Assignment:  Implementing One Line of Scrabble
Dunia Seidu, UMass Lowell Computer Science Student, dunia_seidu@student.uml.edu 
Copyright (c) 2021.  All rights reserved.  May be freely copied or 
excerpted for educational purposes with credit to the author. 
updated on December 18, 2021 
*/



/*
Tiles and ScrabbleTiles array implementation code excerpted from the following links:
https://teaching.cs.uml.edu/~heines/91.461/91.461-2015-16f/461-lecs/lecture26.jsp
https://teaching.cs.uml.edu/~heines/91.461/91.461-2015-16f/461-assn/Scrabble_Tiles.zip
 */

var ScrabbleTiles = [] ;
ScrabbleTiles["A"] = { "value" : 1,  "original" : 9,  "remaining" : 9  } ;
ScrabbleTiles["B"] = { "value" : 3,  "original" : 2,  "remaining" : 2  } ;
ScrabbleTiles["C"] = { "value" : 3,  "original" : 2,  "remaining" : 2  } ;
ScrabbleTiles["D"] = { "value" : 2,  "original" : 4,  "remaining" : 4  } ;
ScrabbleTiles["E"] = { "value" : 1,  "original" : 12, "remaining" : 12 } ;
ScrabbleTiles["F"] = { "value" : 4,  "original" : 2,  "remaining" : 2  } ;
ScrabbleTiles["G"] = { "value" : 2,  "original" : 3,  "remaining" : 3  } ;
ScrabbleTiles["H"] = { "value" : 4,  "original" : 2,  "remaining" : 2  } ;
ScrabbleTiles["I"] = { "value" : 1,  "original" : 9,  "remaining" : 9  } ;
ScrabbleTiles["J"] = { "value" : 8,  "original" : 1,  "remaining" : 1  } ;
ScrabbleTiles["K"] = { "value" : 5,  "original" : 1,  "remaining" : 1  } ;
ScrabbleTiles["L"] = { "value" : 1,  "original" : 4,  "remaining" : 4  } ;
ScrabbleTiles["M"] = { "value" : 3,  "original" : 2,  "remaining" : 2  } ;
ScrabbleTiles["N"] = { "value" : 1,  "original" : 6,  "remaining" : 6  } ;
ScrabbleTiles["O"] = { "value" : 1,  "original" : 8,  "remaining" : 8  } ;
ScrabbleTiles["P"] = { "value" : 3,  "original" : 2,  "remaining" : 2  } ;
ScrabbleTiles["Q"] = { "value" : 10, "original" : 1,  "remaining" : 1  } ;
ScrabbleTiles["R"] = { "value" : 1,  "original" : 6,  "remaining" : 6  } ;
ScrabbleTiles["S"] = { "value" : 1,  "original" : 4,  "remaining" : 4  } ;
ScrabbleTiles["T"] = { "value" : 1,  "original" : 6,  "remaining" : 6  } ;
ScrabbleTiles["U"] = { "value" : 1,  "original" : 4,  "remaining" : 4  } ;
ScrabbleTiles["V"] = { "value" : 4,  "original" : 2,  "remaining" : 2  } ;
ScrabbleTiles["W"] = { "value" : 4,  "original" : 2,  "remaining" : 2  } ;
ScrabbleTiles["X"] = { "value" : 8,  "original" : 1,  "remaining" : 1  } ;
ScrabbleTiles["Y"] = { "value" : 4,  "original" : 2,  "remaining" : 2  } ;
ScrabbleTiles["Z"] = { "value" : 10, "original" : 1,  "remaining" : 1  } ;
ScrabbleTiles["["] = { "value" : 0,  "original" : 2,  "remaining" : 2  } ;


var player_tile_holder = [];
var score = 0;

var table_keys = Object.keys( ScrabbleTiles ).length;
var holder_keys = Object.keys( player_tile_holder ).length;



//implemented this array to hold 7 false values 
//used to check if there are still tiles available of that letter to play
var valid_tiles = [false, false, false, false, false, false, false, false];


//add 7 randomized tiles to the player tile holder, if there are no tiles left then do not permit addition of more tiles
function generateTiles(){
    var holder_counter = 1;
    var src; //for images
    var id;
    var named_tile;
    var css_tile_class = "single_tile";

    valid_tiles = [false, false, false, false, false, false, false, false];

    $('#tile_holder_div div').empty();



    for( var i = 0; holder_counter <= 7; i++){

        var random_tile = Math.floor((Math.random() * 27));

        //if statement below checks if there are tiles left to extract
        if( ScrabbleTiles[ String.fromCharCode(65 + random_tile) ][ "remaining"] !== 0 && remainingTiles()){
            player_tile_holder[holder_counter] = {"letter" : String.fromCharCode(65 + random_tile),"value" : ScrabbleTiles[ String.fromCharCode(65 + random_tile) ][ "value" ]};
            ScrabbleTiles[ String.fromCharCode(65 + random_tile) ][ "remaining"]--;
            holder_keys = Object.keys( player_tile_holder ).length;
            console.log("player_tile_holder: Tile: " + ( holder_counter ) + " Letter: " + player_tile_holder[holder_counter][ "letter" ] + " Value: " + player_tile_holder[holder_counter][ "value" ]);

            id = "tile" + holder_counter;
            named_tile = player_tile_holder[holder_counter][ "letter" ];
            //select tile with random letter and prepend as needed
            src = "img/Scrabble_Tile_" + player_tile_holder[holder_counter][ "letter" ] + ".jpg";
            $('#player_tile_holder').prepend($('<img>',{id:id,src:src,class:css_tile_class,named_tile:named_tile}));
            holder_counter++;
        }
        if(remainingTiles() == false ){
            $('#button_div').append("<p id='no_tiles_remaining'>No Tiles Left</p>");
            $("#new_tile_btn").prop("disabled",true);

            printTiles();

            return;
        }

        $("#" + id).draggable({ snap: ".tile_on_board", snapMode: "inner"});
    }

    updatePlayerScore();
}

//validate tiles being generated and checks if there are enough of each letter left
function remainingTiles(){

    var valid_tiles = false;
    var tiles_left_counter = 0;

    while( tiles_left_counter < 27 ){
        //if there is at least one tile of the letter, the tile exists
        if(ScrabbleTiles[ String.fromCharCode(65 + tiles_left_counter) ][ "remaining" ] !== 0){
            valid_tiles = true;
        }
        tiles_left_counter++;
    }

    return valid_tiles;

}

//when the tile is dropped onto the scrabble board the function goes through the following cases:
/*
case 1: if the tile is dropped on a blank tile, add tile value to total score
case 2: if the tile is dropped on a double tile, add tile * 2 to total score
case 3: if the tile is dropped on a triple tile, add tile * 3 to total score
*/
function checkDroppedValue(event, ui){

    if(valid_tiles[$(this).attr("id") -1] == false && $(this).attr("named_tile") === 'doubleLetter'){
        score += (ScrabbleTiles[ String.fromCharCode(ui.draggable.attr("named_tile").charCodeAt(0)) ][ "value" ] * 2 );
    }
    else if(valid_tiles[$(this).attr("id") -1] == false && $(this).attr("named_tile") === 'tripleLetter'){
        score += (ScrabbleTiles[ String.fromCharCode(ui.draggable.attr("named_tile").charCodeAt(0)) ][ "value" ] * 3 );
    }
    else if(valid_tiles[$(this).attr("id") -1] == false && $(this).attr("named_tile") === 'blank'){
        score += (ScrabbleTiles[ String.fromCharCode(ui.draggable.attr("named_tile").charCodeAt(0)) ][ "value" ] );
    }

    valid_tiles[$(this).attr("id") -1 ] = true;

    updatePlayerScore();

}


//when the tile is removed the function goes through the following cases:
/*
case 1: if the tile is removed from a blank tile, subtract tile from total score
case 2: if the tile is removed from a double tile, subtract tile * 2 from total score
case 3: if the tile is removed from a triple tile, subtract tile * 3 from total score
*/
function checkRemovedValue(event, ui){

    if(valid_tiles[$(this).attr("id") -1] == true && $(this).attr("named_tile") === 'doubleLetter'){
        score -= (ScrabbleTiles[ String.fromCharCode(ui.draggable.attr("named_tile").charCodeAt(0)) ][ "value" ] * 2 );
    }
    else if(valid_tiles[$(this).attr("id") -1] == true && $(this).attr("named_tile") === 'tripleLetter'){
        score -= (ScrabbleTiles[ String.fromCharCode(ui.draggable.attr("named_tile").charCodeAt(0)) ][ "value" ] * 3 );
    }
    else if(valid_tiles[$(this).attr("id") -1] == true && $(this).attr("named_tile") === 'blank'){
        score -= (ScrabbleTiles[ String.fromCharCode(ui.draggable.attr("named_tile").charCodeAt(0)) ][ "value" ] );
    }

    valid_tiles[$(this).attr("id") -1 ] = false;

    updatePlayerScore();

 

}

function updateRemainingTiles(){

    var tile_current;
    for ( k = 0 ; k < table_keys ; k++ ) {

        tile_current = String.fromCharCode(65 + k);
        if( tile_current == "["){
            tile_current = "ZZ";
        }

        $("#" + tile_current).text(ScrabbleTiles[ String.fromCharCode(65 + k)]["remaining"]);

    }

}
//reset game
function reset(){

    $("#new_tile_btn").prop("disabled",false);
    $('#no_tiles_remaining').remove();

    for ( k = 0 ; k < table_keys ; k++ ) {
        ScrabbleTiles[ String.fromCharCode(65 + k) ][ "remaining"] = ScrabbleTiles[ String.fromCharCode(65 + k) ][ "original" ];
    }

    score = 0;

    updatePlayerScore();

    printTiles();

    generateTiles();
}

//update score based on played game
function updatePlayerScore(){

    $('#score_id').text(score);
    updateRemainingTiles();

}


//when document is ready, generate tiles for player and make the scrabble board active
$(document).ready(function(){

    //build player_tile_holder
    generateTiles();
    $(".tile_on_board").droppable({ drop: checkDroppedValue, out: checkRemovedValue });


});
