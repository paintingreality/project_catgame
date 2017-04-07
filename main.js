
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
  var $nextPlayer = $('.next').hide()

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
//_____________________ new shuffle function ______________
      // function swap(arrayCats, firstindex, secondIndex) {
      //   var temp = arrayCats[firstindex]
      //   arrayCats[firstindex] = arrayCats[secondIndex]
      //   arrayCats[secondIndex] = temp
      //   return arrayCats
      // }
      //
      // function shuffle(arrayCats){
      //   var currentIndex = arrayCats.length
      //   var randomIndex
      //   var tempElement
      //
      //   while(currentIndex){
      //     console.log(currentIndex)
      //     randomIndex = (Math.floor(Math.random()*currentIndex))
      //     swap(arrayCats, currentIndex -1, randomIndex)
      //   }
      //   return arrayCats
      // }
      //
      //   result = ''


//_________this will start game and fadeOut instructions _____________________

  $startButton.on('click', function() {
    $instructions.fadeOut(1000)
    startRound()
    console.log(currentPlayer);
  })


//________this is the function for startRound________________________________
  function startRound(){
    shuffle(arrayCats)
    //console.log(arrayCats)

//for loop will generate pictures in examSquares and make them fadeOut after 5 seconds. //

  for (var i = 0; i < arrayCats.length; i++) {
    //result = result + arrayCats[i].id
    arrayCats[i].id = i
    $examSquares[i].innerHTML = arrayCats[i].pic
  }

//this makes sure exampleSquares are shown...on startRound for next player turn.
  $examSquares.show()
  arrayCopy = [].concat(arrayCats)

//this starts the fadeOut of the $examSquares, then once done shuffles and generate the arrayCopy.
  $examSquares.fadeOut(5000).promise().then(function() {

    shuffle(arrayCopy)

//for loop will generate pictures in $playSquares and make them fadeOut after 20 seconds.
    for (var i = 0; i < 4; i++) {
      $playSquares[i].innerHTML = arrayCopy[i].pic
    }
//this makes sure $playSquares are shown...on startRound for next player turn.
//$playSquares will fadeOut after 20 seconds.
    $playSquares.show()
    $playSquares.fadeOut(15000).promise().then(function() {

    })
  })

}

// __________this is the function for clicking submit button.__________________
//this listens for button to be clicked and gets the values for pulldowns.
  $('.submit').click(function(){

//make myGuess be a string of the values of the pulldown menus
    playerGuess = $pullone.val() + $pulltwo.val() + $pullthree.val() + $pullfour.val()
    var numberOfFailures = 0
// goes through each select element (represented by 's')
      $pullDowns.each(function(i, s){
        var pullVal = Number($(s).val())

//this console logs the what player picked and also the pulldown values.
        console.log("You picked", pullVal);
//this console logs the arrayCopy id of pictures.
        console.log("Id of this image is:", arrayCopy[i].id)
//if the id of the arrayCopy index does not match the pullVal of arrayCats id it is a fail.
        if(arrayCopy[i].id != arrayCats[pullVal].id) {
          console.log('FAIL!!!');
          numberOfFailures ++ //this adds to the number of failures
           console.log(currentPlayer.lives)

        }
          console.log(currentPlayer);
        })
        // switch turns || announce winner here
        if (numberOfFailures > 0){
          currentPlayer.lives --
        }
          checkMatch()   //checks match
          switchTurns()  //switches turns
     })
//________________function for switchTurns___________________________
     function switchTurns() {
       console.log('switching turns')
       if (currentPlayer == game.player1){
        currentPlayer = game.player2
        console.log(currentPlayer.lives)
      } else {(currentPlayer == game.player2)
        currentPlayer = game.player1
       }
     }

//________________function checkMatch_____________________________
  function checkMatch() {
    if (currentPlayer.lives == 0) {
      alert(currentPlayer.name + 'loses')
    } else {
      $examSquares.stop()
      $examSquares.fadeOut()

      $playSquares.stop()
      $playSquares.fadeOut()

      // fade popup in...
      $nextPlayer.fadeIn(1000, function() {
        /// wait 2 seconds
        setTimeout(function(){
          // fade out popup
          $nextPlayer.fadeOut(1000, function(){
            //start round
            startRound()
          })
        }, 2000)
      })
    }
  };
//
