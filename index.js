let STATE = {
  score: 0,
  questionNum: 0,
  questionNumUI : 1,
  currQ:'',
  currA:'',
  numOptions: 4
}

let questions = [
  { question: 'Who is known as \'The King Beyond The Wall\'?',
    options : ['The Night King', 'Stannis Baratheon','Tormund Giantsbane','Mance Rayder'],
    answer: 'Mance Rayder'
  },
  { question: 'In which city does Arya Stark train to become a Faceless Man?',
    options : ['Pentos','Mereen','Astapor','Braavos'],
    answer: 'Braavos'
  },
  { question: 'Thoros of Myr is responsible for reviving which character from the dead?',
    options : ['The Night King','Beric Dondarrion','Stannis Baratheon','Tormund Giantsbane'],
    answer: 'Beric Dondarrion'
  },
  { question: 'What is the surname given to bastards born in Dorne?',
    options : ['Rivers','Snow','Sand','Stone'],
    answer: 'Sand'
  },
  { question: 'Which Character goes by the nickname, \'The Mountain\'?',
    options : ['Sandor Clegane', 'Oberyn Martell','Tyrion Lannister','Gregor Clegane'],
    answer: 'Gregor Clegane'
  },
  { question: 'Who is Lord Commander of the Kingsguard at the beginning of Game of Thrones?',
    options : ['Ser Barristan Selmy','Ser Loras Tyrel', 'Ser Jeor Mormont', 'Ser Jaime Lannister'],
    answer: 'Ser Barristan Selmy'
  },
  { question: 'Who was Margeary Tyrell\'s first husband?',
    options : ['Tommen Baratheon','Renly Baratheon','Stannis Baratheon','Joffrey Baratheon'],
    answer: 'Renly Baratheon'
  },
  { question: 'Which city does Samwell Tarly travel to in order to train as a maester?',
    options : ['Sunspear','Highgarden','Gulltown', 'Oldtown'],
    answer: 'Oldtown'
  },
  { question: 'Who is the ruler of the Iron Islands at the beginning of Game of Thrones?',
    options : ['Theon Greyjoy', 'Balon Greyjoy','Yara Greyjoy','Euron Greyjoy', ],
    answer: 'Balon Greyjoy'
  },
  { question: 'Who was the Mad King\'s firstborn son?',
    options : ['Aemon Targaryen', 'Aegon Targaryen','Rhaegar Targaryen','Viserys Targaryen'],
    answer: 'Rhaegar Targaryen'
  }
];


// implement start page
// 1. Page has a start quiz button, on clicked, reset questionNum variable and score variable
// 2. on clicked hide section js-home-page
// 3. Randomize questions array

// function used to randomize the questions array
function shuffleQs(questions){
  let currentIndex = questions.length, temporaryValue, randomIndex;

  while(0 !== currentIndex){
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -=1;
    temporaryValue = questions[currentIndex];
    questions[currentIndex]= questions[randomIndex];
    questions[randomIndex] = temporaryValue;
  }
  return questions;
}

//this function is a callback whenever a new question has to be rendered
function renderQuestion(){

  $('.js-question').append(`
  <form class="js-quiz" method="POST">
    <fieldset>
    <label class='question'>
    <div class='question'>
    <h2>${questions[STATE.questionNum].question}</h2>
    </div>
    </label>`)
    for(let i=0; i<STATE.numOptions; i++) {
  if(questions[STATE.questionNum].options[i] === questions[STATE.questionNum].answer){
  $('.js-quiz').append(`
    <fieldset>
    <label class='correct-answer'>
      <button class="choice answer" type="button">${questions[STATE.questionNum].options[i]}</button>
    </label>
    </fieldset>`)

  }
  else{
    $('.js-quiz').append(`
      <fieldset>
      <label class='wrong-answer'>
        <button class="choice option" type="button">${questions[STATE.questionNum].options[i]}</button>
      </label>
      </fieldset>`)
  }}

  $('.js-quiz').append(`
    <label class='user-progress'>
      <div class = 'UI'><div class="current-question"> Question ${STATE.questionNumUI}/10</div>
      <div class="correct-questions"> ${STATE.score}/10 Correct </div></div>
    </label>
    </form>`)
  }

function startQuiz(){
  // this function will be responsible for hiding the home page and showing the first question
  $('.start-button').on('click', function(){
    questions = shuffleQs(questions);
    $('.js-home-page').hide();
    renderQuestion();

  console.log('`startQuiz` ran');
})

}

// implement user feedback
// 1. display 1/10 for first question
// 2. plus one for every time next q is clicked
// 3. display score/10
function handleCorrect(){
  // this function will be responsible for displaying a correct message when the answer is selected to the user as well as a next question button
  // will add 1 to score and 1 to questionNum when next question is clicked.

  $('.js-question').on('click','.answer', function(){
    // find a better method than append to display message, maybe a popup?
    STATE.score += 1;
    $('.js-question').children("form").remove();
    if (STATE.questionNum < 9){

    $('.js-question').append(`
      <form class="js-quiz" method="POST">
        <fieldset>
        <label class='correct-feedback'>
        <div class = "feedback">
          <h3>That is correct!</h3>
          <img class='gif' src="https://media1.tenor.com/images/46a4614de9b8c2a340bf076e9675b414/tenor.gif?itemid=5405668" width= 360px alt='A gif of Tyrion Lannister'/>
          <button class = 'js-next' type="button"> Next Question</button>
        </div>
        </label>
        <label class='user-progress'>
        <div class="current-question"> Question ${STATE.questionNumUI}/10</div>
        <div class="correct-questions"> ${STATE.score}/10 Correct </div>
        </label>
        </fieldset>
        </form>`
    )}

    else {

    $('.js-question').append(`
    <form class="js-quiz" method="POST">
      <fieldset>
        <label class='correct-feedback'>
        <div class = "feedback">
          <h3>That is correct!</h3>
          <img class='gif' src="https://media1.tenor.com/images/46a4614de9b8c2a340bf076e9675b414/tenor.gif?itemid=5405668" width= 360px alt='A gif of Tyrion Lannister'/>
          <h2>“When you play a game of thrones you win or you die.”</h2>
          <button class = 'js-retry'  type="button">Retry Quiz</button>
        </div>
        </label>
        <label class='user-progress'>
        <div class="current-question"> Question ${STATE.questionNumUI}/10</div>
        <div class="correct-questions"> ${STATE.score}/10 Correct </div>
        </label>
        </fieldset>
        </form>`
    )}
  })

  console.log('`handleCorrect` ran');
}

function handleWrong() {
  // this function will be respnsible for displaying a wrong message when an option is selected to the user and a next question button
  // will add 1 to question num
   $('.js-question').on('click','.option', function(){

    $('.js-question').children("form").remove();

    if(STATE.questionNum <9){

    $('.js-question').append(`
      <form class="js-quiz" method="POST">
        <fieldset>
        <label class='wrong-feedback'>
        <div class = "feedback">
          <h3>Wrong! The answer was ${questions[STATE.questionNum].answer}</h3>
          <img class='gif' src="http://78.media.tumblr.com/adb11b2c4e2e706117f94e4e2195505d/tumblr_mo5sr5rHYR1spiuxqo2_250.gif" width= 360px alt='A Gif of Igrit saying You know nothing Jon Snow' />
          <button class = 'js-next' type="button"> Next Question</button>
        </div>
        </label>
        <label class='user-progress'>
        <div class="current-question"> Question ${STATE.questionNumUI}/10</div>
        <div class="correct-questions"> ${STATE.score}/10 Correct </div>
        </label>
        </fieldset>
        </form>`
      )}

    else {

    $('.js-question').append(`
      <form class="js-quiz" method="POST">
        <fieldset>
        <label class='right-feedback'>
        <div class = "feedback">
          <h3>Wrong! The answer was ${questions[STATE.questionNum].answer}</h3>
          <img class='gif' src="http://78.media.tumblr.com/adb11b2c4e2e706117f94e4e2195505d/tumblr_mo5sr5rHYR1spiuxqo2_250.gif" width= 360px alt='A Gif of Igrit saying You know nothing Jon Snow' />
          <h2>“When you play a game of thrones you win or you die.”</h2>
          <button class = 'js-retry'  type="button">Retry Quiz</button>
        </div>
        </label>
        <label class='user-progress'>
        <div class="current-question"> Question ${STATE.questionNumUI}/10</div>
        <div class="correct-questions"> ${STATE.score}/10 Correct </div>
        </label>
        </fieldset>
        </form>`
      )}
  })
  console.log('`handleWrong` ran');
}
// implement Question page
// 1. inject questions HTML
// 2. display question and 4 answer choices
// 3. onclick of options display incorrect message and a next q option
// 4. onclick of answer display correct message, add 1 to score and a next q option

function NextQuestion(){
  // this function will render the second question untill the quiz is complete
  // It will add 1 to questioNum and display the next question in the array

  $('.js-question').on('click','.js-next', function(){
    STATE.questionNum +=1;
    STATE.questionNumUI +=1;
    $('.js-quiz').remove();
   renderQuestion();
    }
    )}


// implement results page
// 1.display score
// 2.provide option to start over.

function handleRetry() {
  // on click retry button will reset score and question num, reveal homepage
  $('.js-question').on('click','.js-retry', function(){
    $('.js-question').children("form").remove();

    STATE.questionNum = 0;
    STATE.questionNumUI = 1;
    STATE.score =0;

    $('.js-home-page').show()

  console.log('`handleRetry` ran');
}
)}

function handleQuiz() {
  // our callback function for when the page loads
  // responsible for activating our individual functions
  startQuiz();
  handleCorrect();
  handleWrong();
  handleRetry();
  NextQuestion();
}

$(handleQuiz);
