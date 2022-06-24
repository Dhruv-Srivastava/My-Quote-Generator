// Global Variables
let apiQuotes=[]

// Selectors

const quoteContainer=document.querySelector(".quote-container");
const quoteText=document.querySelector("#quote");
const authorText=document.querySelector("#author");
const twitterBtn=document.querySelector("#twitter-button");
const newQuoteBtn=document.querySelector("#new-quote");
const loader=document.querySelector(".loader");
const voice=document.querySelector(".voice");
const footer=document.querySelector("footer");

// Events

newQuoteBtn.addEventListener("click",getRandomQuote);
twitterBtn.addEventListener("click",tweetQuote);
voice.addEventListener("click",textToSpeech);

// Functions

function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
    footer.hidden=true;
}

function complete(){
    loader.hidden=true;
    quoteContainer.hidden=false;
    footer.hidden=false;
}
function getRandomQuote(){
    loading();
    const quote=apiQuotes.data[Math.floor(Math.random()*apiQuotes.data.length)];
    if(quote.author)
        authorText.textContent=quote.author;
    else
        authorText.textContent="Anonymous";

    // Check quote length
    if(quote.text.length>90){
        quoteText.classList.add("long-quote"); // for smaller font-size
    }
    else{
        quoteText.classList.remove("long-quote"); // for larger font-size
    }
    //Set Quote and hide load
    quoteText.textContent=quote.text;
    complete();
}

async function getQuotes(){
    loading();
    const URL="https://type.fit/api/quotes";
    try{
        apiQuotes= await axios.get(URL); // Fetch quotes from the API
        getRandomQuote();
    }
    catch(err){
        alert(err);
    }
   
}

// Text to Speech

function textToSpeech(){
    let quoteSpeech=new SpeechSynthesisUtterance(quoteText.textContent);
    speechSynthesis.speak(quoteSpeech);
    speechSynthesis.pause();
    let authorSpeech=new SpeechSynthesisUtterance(authorText.textContent);
    speechSynthesis.speak(authorSpeech);
}

// To Tweet

function tweetQuote(){
    const twitterURL=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterURL,'_blank'); // inorder to open the twitter.com and in a new tab
}

//On page load;
getQuotes();
