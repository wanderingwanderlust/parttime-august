/*
Game Rules:
- 2 players, take rounds into consideration
- each turn, player will roll dice
- total score and a current round score
- if a player rolls 1, current round score = 0 and next player's turn begins
- if a player clicks hold, store current round score in total score and next player
s turn begins
Win: First player to score 100 total points
*/

var scores, roundScore, activePlayer, gamePlaying;
var lastDice;

document.querySelector('.btn-new').addEventListener('click', init)

document.querySelector('.btn-roll').addEventListener('click', function() {
    // check if game is playing
    if(gamePlaying) {
        //roll two random numbers
        var diceOne = Math.floor(Math.random() * 6) + 1; 
        var diceTwo = Math.floor(Math.random() * 6) + 1;

        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = './images/dice-'+diceOne+'.png';
        document.getElementById('dice-2').src = `./images/dice-${diceTwo}.png`;
        
        if(diceOne !== 1 && diceTwo !== 1) {
            //add score
            roundScore += diceOne + diceTwo;
            document.querySelector('#current-'+activePlayer).textContent = roundScore
        } else {
            nextPlayer()
        }
    }
})

document.querySelector('.btn-hold').addEventListener('click', function() {
    // add current round score to the global total
    scores[activePlayer] += roundScore

    //update UI
    document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer]
    var input = document.querySelector('.final-score').value
    var winningScore;

    // allow our user to determine what the final score is
    if(input) {
        winningScore = input
    } else {
        winningScore = 100;
    }

    // check to see if the play won the game
    if(scores[activePlayer] >= winningScore) {
        document.querySelector('#name-'+activePlayer).textContent = 'Congrats on beating your opponent';
        document.getElementById('dice-1').style.display = 'none';
        document.getElementById('dice-2').style.display = 'none';
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner')
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active')
    } else {
        nextPlayer()
    }

})


function init() {
    // default stats for the game
    scores = [0,0]
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    // set the dice to display none
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    // set the score to text to 0
    document.getElementById('dice-1').textContent = '0';
    document.getElementById('dice-2').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    // set out name
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    //start fresh, no winner, no active player
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    //start the same with player 1 active
    document.querySelector('.player-0-panel').classList.add('active');
}


function nextPlayer() {
    //determine when the nextPlayer is active
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; 
    roundScore = 0;

    // set the score in the ui
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    //toggle the user
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    // reset the dice before we move onto the next roll
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    
}
