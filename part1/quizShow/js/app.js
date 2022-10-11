// Have a series of questions
// Have a correct answer
// store these in a way for us to check these answers
// select one random question
// provide user with a response if correct or incorrect
// keep score
/* Extra Credit: Add the ability to create new questions, does not need to persist (persits: localStorage) */

(function() {

    function Question(question, answers, correct) {
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    }

    //display these questions to the console.
    Question.prototype.displayQuestion = function() {
        console.log(this.question);
        for(let i = 0; i < this.answers.length; i++) {
            console.log(`${i}: ${this.answers[i]}`)
        }
    }

    //display if the answer was correct
    Question.prototype.checkAnswer = function(ans, callback) {
        let scr;
        debugger;
        if(ans === this.correct) {
            console.log('Correct Answer');
            debugger;
            scr = callback(true)
        } else {
            console.log('Wrong Answer, try again!');
            scr = callback(false)
        }
        this.displayScore(scr)
    }

    Question.prototype.displayScore = function(score) {
        console.log(`Your current score is: ${score}`)
        console.log('--------------------------------')
    }

    let q1 = new Question(
        'What is the name of the host of this OH',
        ['Anthony', 'Greg'],
        1
    )

    let q2 = new Question(
        'What state does Greg Live in',
        ['Texas', 'California', 'Washington', 'Ohio'],
        3
    )
    let q3 = new Question(
        'Are the Cleveland Browns a terrible football',
        ['Yes', 'No'],
        0
    )
    let q4 = new Question(
        'Will the Cleveland Cavaliers win the NBA championship',
        ['Yes', 'No'],
        0
    )

    const questions = [q1, q2, q3,q4];

    function score() {
        let scr = 0;
        return function(correct) {
            if(correct) {
                scr++
            }
            return scr
        }
    }

    let keepScore = score();

    function nextQuestion() {
        let n = Math.floor(Math.random() * questions.length);
        questions[n].displayQuestion();
        let answer = prompt('Please select the correct answer');
        if(answer !== 'exit') {
            questions[n].checkAnswer(parseInt(answer), score);
            nextQuestion()
        }
    }

    nextQuestion();
})();