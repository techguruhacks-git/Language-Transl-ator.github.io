const selectTag = document.querySelectorAll("select");
const fromText = document.querySelector(".from-text"),
 toText = document.querySelector(".to-text"),
 icons = document.querySelectorAll(".row i"),
 exchange = document.querySelector(".exchange");


translatebtn = document.querySelector("button");

selectTag.forEach((tag , id) => {
    for(const country_code in countries){
        let selceted;
        if(id == 0 && country_code =="en-GB"){
            selceted = `selected`;
        }
        else if(id == 1 && country_code == "hi-IN"){
            selceted = "selected";
        }
        let option = `<option value="${country_code}" ${selceted}>${countries[country_code]}</option>`;

        tag.insertAdjacentHTML("beforeend", option);
        
    }
});


exchange.addEventListener("click" , () =>{
    let temptext = fromText.value;
    templang =selectTag[0].value;
    fromText.value= toText.value;
    selectTag[0].value = selectTag[1].value;
    toText.value = temptext;
    selectTag[1].value = templang;
});

translatebtn.addEventListener("click", () =>{
    let text = fromText.value,
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;

    let apiURl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiURl).then(res => res.json()).then(data =>{
        toText.value = data.responseData.translatedText;
    })
});

icons.forEach(icon =>{
    icon.addEventListener("click", ({target}) =>{
        if(target.classList.contains("fa-copy")){
            if(target.id == "from"){
                navigator.clipboard.writeText(fromText.value);
            }
            else{
                navigator.clipboard.writeText(toText.value);
            }
        }
        else{
            let utterance;
            if(target.id == "from"){
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value
            }
            else{
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterance);
        }
    })
});