
//variables for exampleSquares,playerSquares, arrayCats //
  var $startButton = $('.startButton')
  var $instructions = $('.instructions')
  var $examSquares = $('.exampleSquares')
  var $playSquares = $('.playerSquares')
//cats have and id added before they end up in array copy
  var arrayCats = [
    {pic:'<img src="cheesycat.jpg" alt="cheesycat">'},
    {pic:'<img src="cat.jpg" alt="cat">'},
    {pic: '<img src="uglysweatercat.jpg" alt="uglysweatercat">'},
    {pic:'<img src="couplescat.jpg" alt="couplescat">'}
  ]

//var for arrayCopy
  var arrayCopy = null;
//var for pulldowns
  var $pullone = $('.pullone')
  var $pulltwo = $('.pulltwo')
  var $pullthree = $('.pullthree')
  var $pullfour = $('.pullfour')
  var $pullDowns = $('select')

  // .concat(arrayCats)
  var game = {
    player1: {lives: 3, name: 'player1'},
    player2: {lives: 3, name: 'player2'}
  }
  var currentPlayer = game.player1
  //var SwitchTurns = currentPlayer


// var currentFade = $(examSquares).fadeOut()

//_______shuffle function to shuffle at random___________________________
  function shuffle(arrayCats) {
    var currentIndex = arrayCats.length, tempCatsVal, randomCatsIndex;
    while (currentIndex) {

      randomCatsIndex = Math.floor(Math.random() * currentIndex--);


      tempCatsVal = arrayCats[currentIndex];
      arrayCats[currentIndex] = arrayCats[randomCatsIndex];
      arrayCats[randomCatsIndex] = tempCatsVal;
    }
      return arrayCats;

  }

//_____________________________________________________________________________

  $startButton.on('click', function() {
    console.log('clicked');
    $instructions.fadeOut(1000)
    startRound()
    console.log(currentPlayer);
  })


//________________startsRound__________________________________________________
  function startRound(){
    shuffle(arrayCats)
    console.log(arrayCats)

// for loop to generate pictures in examSquares and make them fadeOut after 5 seconds. //

  for (var i = 0; i < arrayCats.length; i++) {
    arrayCats[i].id = i
    $examSquares[i].innerHTML = arrayCats[i].pic
  }

// make sure examples are faded in...on startRound for next player turn
  $examSquares.show()
  arrayCopy = [].concat(arrayCats)

//this starts the fadeOut of the examSquares, then once done shuffles and generate the arrayCopy
  $examSquares.fadeOut(5000).promise().then(function() {
    console.log("fadeOut animation done")

    shuffle(arrayCopy)
    console.log(arrayCopy)
//for loop to generate pictures in $playSquares and make them fadeOut after 20 seconds.
    for (var i = 0; i < 4; i++) {
      $playSquares[i].innerHTML = arrayCopy[i].pic
    }
    console.log("array copy, shuffled:", arrayCopy)
  })

//this starts the fadeOut of 20 seconds for the playerSquares
  $playSquares.show()
  $playSquares.fadeOut(30000).promise().then(function() {
  // $playSquares.promise().then(function() {
    console.log('fadeOut two done')
  })

}

// _________________________________________________________________________//
//this listens for button to be clicked and gets the values for pulldowns.
  $('.submit').click(function(){
    console.log('youclickedthebutton')
//make myGuess be a string of the values of the pulldown menus
    $p1Guess = $pullone.val() + $pulltwo.val() + $pullthree.val() + $pullfour.val()

// go through each select element (represented by 's')
      $pullDowns.each(function(i, s){
        var pullVal = Number($(s).val())

        console.log("You picked", pullVal);
        console.log("Id of this image is:", arrayCopy[i].id)

        if(arrayCopy[i].id != arrayCats[pullVal].id) {
          console.log('FAIL!!!');
           currentPlayer.lives --
           //currentPlayer.lives = currentPlayer.lives - 1;
          //console.log("1 Game Player 2 Lives: " + game.player2.lives);

        } else if(arrayCopy[i].id == arrayCats[pullVal].id) {
          console.log('Pass!!!')
          currentPlayer.lives ++
          console.log("2 Game Player 2 Lives: " + game.player2.lives + game.player1.lives);

          //currentPlayer.lives = currentPlayer.lives - 1;
          // return true
          //console.log(currentPlayer.lives)

        }


          switchTurns()
          console.log(currentPlayer);


          // checkMatch()
        })


        // switch turns || announce winner here
     })
//________________function switchTurns___________________________
     function switchTurns() {
       console.log('switching turns')
       if (currentPlayer == game.player1){
        currentPlayer = game.player2
        startRound()
      } else {(currentPlayer == game.player2)
        currentPlayer = game.player1
        console.log(game.player1.lives)
        console.log(game.player2.lives)
        startRound()

        checkMatch()
       }
     }


//________________function checkMatch_____________________________
    function checkMatch() {
      if (currentPlayer.lives == 0) {
        alert(currentPlayer.name + 'loses')
      }
      // else (currentPlayer.player2.lives == 0)
      //  alert('player2 loses')
    // }
  };

//________________function confirmIt______________________________
    //  function confirmIt() {
    //     confirm("Are you sure?", function(result) {
    //         if (result = true)
    //     {
    //           switchTurns()  // do something
    //     }
    //
    //   });
    // })

// </script>
