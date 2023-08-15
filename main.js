//Letters
const letters = "abcdefghijklmnopqrstuvwxyz0123456789"
// letters to array
let lettersArr = Array.from(letters)
// select letters to container
let lettersContainer = document.querySelector(".letters")

//Generate letters 

lettersArr.forEach(letter =>{

    //Create Span
    let span = document.createElement("span")
    //Create Letters Text Nod
    let theLetter = document.createTextNode(`${letter}`)
    //Append To Span
    span.appendChild(theLetter)
    //Add class on span
    span.className = "letter-box"
    //Append span to letter container
    lettersContainer.appendChild(span)
})

//Object of Words + category
const words = {
    programming:["PHP","JavaScript","Go","HTML","R","Ruby","Python","Mysql","C","Swift","CSS"],
    movie:["Interstaller","Openhimmer","Saw","Scrame","Whiplash","Coco","Legend"],
    people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
    singers:["Post Malone","Katy Perry" , "Alan Walker" , "Louis Fonsy" , "Tamer Hosni","Amir Eid"],
    music:["Rock Star" , "Roar" , "let me Down" , "Wahshteny","Alone","Mesh Temsal","Despacito","Eyes Do not lie"]
}


//Get Random Property

//Get Number Of Keys from (words) object
let allKeys = Object.keys(words)

console.log(allKeys)
//Random Number Depend On Keys Length
let randomPropNumber = Math.floor(Math.random() * allKeys.length) // => 0 , 1 , 2 , 3

//Category
let randomPropName = allKeys[randomPropNumber] // => programming , movie, people , countries

//Category Words
let randomPropValue = words[randomPropName] //= (words["movie"]) =>ex ["Interstaller","Openhimmer","Saw","Scrame","Whiplash","Coco","legend"]

//Random Number Depend On Words
let randomValueNum = Math.floor(Math.random()*randomPropValue.length) //هتجيب الأرقام الي جوا البروب الواجد بعشوائية

//The Chosen Value
let randomValueValue = randomPropValue[randomValueNum] //ex => Openhimmer

// // console.log(words)

// // let words;

// fetch("words.json").then((result)=>{
//     let myDate = result.json()
//     return myDate;
// }).then((words)=>{

//     console.log(words)
// })





// Set Category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName

// From Me To Practice <3 (hints)
let hint = document.querySelector(".hint p span") 
if(randomValueValue.length === 1 || randomValueValue.length === 2 ){
    hint.innerHTML = "No hint"
}else if(randomValueValue.length === 3|| randomValueValue.length === 4){
    hint.innerHTML = randomValueValue.slice(0,1)
}else if(randomValueValue.length === 5||randomValueValue.length === 6){
    hint.innerHTML = randomValueValue.slice(0,2)
}else{
    hint.innerHTML = randomValueValue.slice(0,3)
}


//Select Letters guess Element
let letterGuessContainer = document.querySelector(".latters-guess")

//Convert Chosen Word to Array
let letterAndSpaces = randomValueValue.split("")

//Create Spans Deppend On Word
letterAndSpaces.forEach(letter =>{
    //Add Span
    let emptySpan = document.createElement("span")

    //If Letter Equal Space
    if(letter == " "){
        //Add  Class To Span
        emptySpan.className = "has-space"

    }
    
    //Append Span To letter Guess Container
    letterGuessContainer.appendChild(emptySpan)
})

//Select Guess Spans

let guessSpans = document.querySelectorAll(".latters-guess span")

//  Set  Wrong Attemptes
let wrongAttempts = 0;

//Select The Draw Element
let theDraw = document.querySelector(".hangman-draw")


//Handle Clickin On Letters
document.addEventListener("click",(e)=>{
    
    //Set The Chose Status
    let theStatus = false;

    if(e.target.className ==='letter-box'){

        e.target.classList.add("clicked");

        //Get clicked Letter
        let theClickedLetter = e.target.innerHTML.toLowerCase()
        
        // The Chosen Word
        let theChosenWord = Array.from(randomValueValue.toLowerCase())
        //console.log(letterAndSpaces) // The Chosen Word

        theChosenWord.forEach((wordLetter,wordindex) => { 

            //If The Clicked Letter === One Of The Chosen Word Letter
            if(theClickedLetter == wordLetter){
                
                //Set Status To Correct
                theStatus = true;
                //Loop On All Guess Spans
               guessSpans.forEach((span,spanIndex) => {
                if(wordindex === spanIndex){
                    span.innerHTML = theClickedLetter;
                    
                }
               })
            }
        })
    
     // OutSide Loop

     //If Letter Is Wrong
     if (theStatus !== true){
        //Increase The Wrong Attempts 
        wrongAttempts++;

        //Add Class Wrong On The Draw Element
        theDraw.classList.add(`wrong-${wrongAttempts}`)

        //Play Fail Sound
        document.getElementById("fail").play();
        

            

         if(wrongAttempts === 8){

            endGame();

            lettersContainer.classList.add("finished")
            console.log(wrongAttempts)
         }
     }else{
        let allSpansFilled = true; 

        // فحص حالة ملئ الحروف
            guessSpans.forEach(span => {
            if (span.innerHTML === "" && span.className !== "has-space" ) {
                allSpansFilled = false; 
            return; 
            }
            
            });
        if(allSpansFilled === true){
            wingame()
            lettersContainer.classList.add("finished")
            
        }
        document.getElementById("success").play();
     }
    }

})  

//End Game fucntion
function endGame(){
    let winDiv = document.createElement("div");
    let p = document.createElement("p")
    let pTxt =document.createTextNode(`Game Over, The Word is ${randomValueValue}`)

    p.appendChild(pTxt)
    
    let newGame = document.createElement("button")
    let newGameTxt = document.createTextNode("Play Again")
    newGame.appendChild(newGameTxt)

    winDiv.appendChild(p)
    winDiv.appendChild(newGame);

    newGame.className = "New-but"
    winDiv.className = "winPopup";
    document.body.appendChild(winDiv);

    newGame.addEventListener('click', function() {
        window.location.reload(false);
    });

    document.getElementById("lose").play();
}

let CapilizeOfPropName = `${randomPropName.split("")[0].toUpperCase()}${randomPropName.slice(1)}`


function wingame() {
    let winDiv = document.createElement("div");
    let p = document.createElement("p")

    let average;

    if(wrongAttempts < 2){
        average = ` an Expert in ${CapilizeOfPropName} This Time `
    }else if(wrongAttempts <= 4) {
        average = `a middle in ${CapilizeOfPropName} This Time`
    }else{
        average = `a Normal in ${CapilizeOfPropName} This Time`
    }
    
    let pTxt =document.createTextNode(`Congratulations, Your attempts is ${wrongAttempts}`)
    let pAvrage = document.createElement("p")
    let pAvreageTxt = document.createTextNode(`You Are ${average}`)
    pAvrage.appendChild(pAvreageTxt)
    p.appendChild(pTxt)
    let newGame = document.createElement("button")
    let newGameTxt = document.createTextNode("Play Again")

    newGame.appendChild(newGameTxt)

    winDiv.appendChild(p)
    winDiv.appendChild(pAvrage)
    winDiv.appendChild(newGame);

    newGame.className = "New-but"
    winDiv.className = "winPopup";
    document.body.appendChild(winDiv);

    newGame.addEventListener('click', function() {
        window.location.reload(false);
    });

    document.getElementById("win").play();
    
    
  }

  
  
  //Dark Mode

  // احتفظ بالزر والعناصر الأخرى التي تحتاج إلى تغيير الأنماط الخاصة بها في متغيرات
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  const isDarkMode = localStorage.getItem('darkMode');

  if (isDarkMode === 'true') {
  body.classList.add('dark-mode');
  themeToggle.textContent = ' 🌙 ';
  }
// إضافة حدث النقر لزر التبديل
themeToggle.addEventListener('click', function() {
  // تبديل الفئة 'dark-mode' على العنصر body
  body.classList.toggle('dark-mode');


  if (body.classList.contains('dark-mode')) {
    themeToggle.textContent = ' 🌙 ';
    localStorage.setItem('darkMode', 'true');

  } else {
    themeToggle.textContent = ' ☀️ ';
    localStorage.setItem('darkMode', 'false');

  }

});
