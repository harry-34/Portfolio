const API = "https://portfolio-backend-jl4c.onrender.com/chat";

document.body.insertAdjacentHTML("beforeend", `
<div id="ai-chat-btn">🤖</div>

<div id="ai-chat-box">
  <div id="ai-header">
    AI Assistant
    <span id="ai-close">✖</span>
  </div>

  <div id="ai-messages">
    <div class="ai-msg">
      🙏 Namaste! Main Harsh ki AI Assistant hoon.<br>
      Kya main aapka naam jaan sakti hoon?
    </div>
  </div>

  <div id="ai-bottom">
    <input id="ai-input" placeholder="Message..." />
    <button id="micBtn">🎤</button>
    <button id="sendBtn">➤</button>
  </div>
</div>
`);

const btn = document.getElementById("ai-chat-btn");
const box = document.getElementById("ai-chat-box");
const closeBtn = document.getElementById("ai-close");
const input = document.getElementById("ai-input");
const sendBtn = document.getElementById("sendBtn");
const messages = document.getElementById("ai-messages");

btn.onclick = () => {
  box.style.display = "flex";
};

closeBtn.onclick = () => {
  box.style.display = "none";
};

async function sendMessage(){

    const text=input.value.trim();

    if(!text) return;

    messages.innerHTML+=`
<div class="user-msg">${text}</div>
`;

    input.value="";

    messages.scrollTop=messages.scrollHeight;

    try{

        const res=await fetch(API,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                message:text
            })
        });

        const data=await res.json();

        messages.innerHTML+=`
<div class="ai-msg">${data.reply}</div>
`;

        messages.scrollTop=messages.scrollHeight;

        if('speechSynthesis' in window){

            speechSynthesis.cancel();

            const speech=new SpeechSynthesisUtterance(data.reply);

            speech.lang="hi-IN";

            const voices=speechSynthesis.getVoices();

            const female=voices.find(v=>
                v.lang.includes("hi") &&
                v.name.toLowerCase().includes("female")
            );

            if(female) speech.voice=female;

            speech.rate=1;

            speech.pitch=1.1;

            speechSynthesis.speak(speech);

        }

    }catch(e){

        messages.innerHTML+=`
<div class="ai-msg">❌ Server Error</div>
`;

    }

}

sendBtn.onclick=sendMessage;

input.addEventListener("keypress",(e)=>{

if(e.key==="Enter") sendMessage();

});

const SR=window.SpeechRecognition||window.webkitSpeechRecognition;

if(SR){

const recognition=new SR();

recognition.lang="hi-IN";

micBtn.onclick=()=>{

recognition.start();

};

recognition.onresult=(e)=>{

input.value=e.results[0][0].transcript;

};

}
