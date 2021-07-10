const wordEl= document.getElementById('word');
const wordLettersEl=document.getElementById('wrong-letters');
const playAgainBtn=document.getElementById("play-again");
const popup=document.getElementById('popup-container')
const notification=document.getElementById('notification-container')
const finalMessage= document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words=['muggles','wand','alohomora','wizard','witch','lumos','nox','butterbeer','gryffindor', 'ravenclaw', 'hufflepuff','slytherin','mudblood','gillyweeds','hogwarts'];

//to give a random word to check write 'console.log(selectedWord) abd random words
//will show on the console in INSPECT.
let selectedWord= words[Math.floor(Math.random()*words.length)];

const correctLetters=[];
const wrongLetters=[];

//Show hidden words
function displayWord() {
    wordEl.innerHTML = `
      ${selectedWord
        .split('')
        .map(
          letter => `
            <span class="letter">
              ${correctLetters.includes(letter) ? letter : ''}
            </span>
          `
        )
        .join('')}
     `;

      const innerWord= wordEl.innerText.replace(/\n/g,'');
      //if the words matches 
      if(innerWord=== selectedWord)
      {
        finalMessage.innerText="Merlin's Beard! You did it";
        popup.style.display='flex';
      }
  }

  //Update wrong letters
  function updateWrongLetterEl(){
    //Display Wrong Letters
      wordLettersEl.innerHTML= 
      `${wrongLetters.length >0 ? "<p><b>Wrong</b></p>":''}
      ${wrongLetters.map(letter => `<span>${letter}</span>`)}
      `;

      //Display parts of figure
      figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;
    
        if (index < errors) {
          part.style.display = 'block';
        } else {
          part.style.display = 'none';
        }
      });
    
      //Check if lost
      if(wrongLetters.length===figureParts.length){
        finalMessage.innerText="You Lost! Time to go Azkaban!!!"
          popup.style.display='flex';
      }
  }

  function showNotification(){
    notification.classList.add('show');

    setTimeout(()=>{ notification.classList.remove('show');}
                    ,2000);
  }
  //keydown
  window.addEventListener('keydown',e =>
  {
    //console.log(e.keyCode);
    if(e.keyCode>=65 && e.keyCode<=90){
    const letter=e.key;

    if(selectedWord.includes(letter))
    {   //if the letter is correct and not present in the correctLetters array
      if(!correctLetters.includes(letter)){
        correctLetters.push(letter);

        displayWord();
      }else{//if the letter is correct but already present a pop up notificatio comes
        showNotification();
      }
    }
    else{
        if(!wrongLetters.includes(letter)){
          wrongLetters.push(letter);

          updateWrongLetterEl();
        }else{
          showNotification();
        }
      }
    }
  });

  // Restart game and play again
  playAgainBtn.addEventListener('click', () => {
  //  Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLetterEl();

  popup.style.display = 'none';
});



displayWord();