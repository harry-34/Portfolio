const API = "https://portfolio-backend-jl4c.onrender.com/chat";

document.addEventListener("DOMContentLoaded", () => {

let conversation = [];
let userName = "";

document.body.insertAdjacentHTML("beforeend",`

<div id="ai-chat-btn">

<div class="pulse"></div>

🤖

</div>

<div id="ai-chat-box">

<div id="ai-header">

<div class="ai-profile">

<div class="ai-avatar">
👩🏻
</div>

<div>

<div class="ai-title">
Harsh AI
</div>

<div class="ai-status">
🟢 Online • Usually replies instantly
</div>

</div>

</div>

<div id="ai-close">
✕
</div>

</div>

<div id="ai-messages">

<div class="ai-msg welcome">

<h3>👋 Welcome</h3>

<p>

I'm <b>Harsh AI</b>, the official virtual assistant of
<b>Harsh Panchal</b>.

</p>

<p>I can help you with:</p>

<ul>

<li>💻 Website Development</li>

<li>🤖 AI Chatbots</li>

<li>📱 Portfolio Websites</li>

<li>⚡ Full Stack Projects</li>

<li>📞 Book a Meeting</li>

</ul>

<div id="quick-actions">

<button class="quick-btn">
💼 Hire Harsh
</button>

<button class="quick-btn">
💰 Pricing
</button>

<button class="quick-btn">
🚀 Services
</button>

<button class="quick-btn">
📅 Book Call
</button>

</div>

</div>

</div>

<div id="ai-bottom">

<input
id="ai-input"
placeholder="Ask me anything..."
autocomplete="off"
/>

<button id="micBtn">
🎤
</button>

<button id="sendBtn">
➤
</button>

</div>

</div>

`);

const btn=document.getElementById("ai-chat-btn");
const box=document.getElementById("ai-chat-box");
const closeBtn=document.getElementById("ai-close");
const input=document.getElementById("ai-input");
const sendBtn=document.getElementById("sendBtn");
const messages=document.getElementById("ai-messages");

btn.onclick=()=>{

box.style.display="flex";

input.focus();

};

closeBtn.onclick=()=>{

box.style.display="none";

};

document.querySelectorAll(".quick-btn").forEach(button=>{

button.onclick=()=>{

input.value=button.innerText;

sendMessage();

};

});

function getTime(){

return new Date().toLocaleTimeString([],{

hour:"2-digit",

minute:"2-digit"

});
function addUserMessage(text){

const div=document.createElement("div");

div.className="user-msg";

div.innerHTML=`

<div class="msg-text">${text}</div>

<div class="msg-time">${getTime()}</div>

`;

messages.appendChild(div);

messages.scrollTop=messages.scrollHeight;

}

function addAIMessage(text){

const div=document.createElement("div");

div.className="ai-msg";

div.innerHTML=`

<div class="msg-text">${text}</div>

<div class="msg-time">${getTime()}</div>

`;

messages.appendChild(div);

messages.scrollTop=messages.scrollHeight;

}

function showTyping(){

const typing=document.createElement("div");

typing.className="ai-msg";

typing.id="typing";

typing.innerHTML=`

<div class="typing">

<span></span>

<span></span>

<span></span>

</div>

`;

messages.appendChild(typing);

messages.scrollTop=messages.scrollHeight;

}

function removeTyping(){

document.getElementById("typing")?.remove();

}

async function sendMessage(){

const text=input.value.trim();

if(!text)return;

addUserMessage(text);

conversation.push({

role:"user",

content:text

});

input.value="";

showTyping();

try{

const res=await fetch(API,{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

message:text,

history:conversation

})

});

const data=await res.json();

removeTyping();

const reply=

data?.reply ||

data?.output_text ||

data?.response ||

data?.message ||

(data?.output?.[0]?.content?.[0]?.text) ||

"Sorry, I couldn't generate a response.";

conversation.push({

role:"assistant",

content:reply

});

addAIMessage(reply);
}
// ===== Voice Reply =====

if ("speechSynthesis" in window) {

speechSynthesis.cancel();

const speech = new SpeechSynthesisUtterance(reply);

const voices = speechSynthesis.getVoices();

const preferred =
voices.find(v => v.name.includes("Microsoft Heera")) ||
voices.find(v => v.name.includes("Google हिन्दी")) ||
voices.find(v => v.name.includes("Google Hindi")) ||
voices.find(v => v.lang === "hi-IN") ||
voices.find(v => v.lang.startsWith("hi")) ||
voices.find(v => v.lang.startsWith("en"));

if (preferred) speech.voice = preferred;

speech.lang = preferred?.lang || "hi-IN";

speech.rate = 0.95;
speech.pitch = 1.05;
speech.volume = 1;

speechSynthesis.speak(speech);

}

}catch(error){

removeTyping();

console.error(error);

addAIMessage(
"⚠️ Sorry, I'm unable to connect right now. Please try again in a few seconds."
);

}

}

// ===== Send Button =====

sendBtn.addEventListener("click",sendMessage);

// ===== Enter Key =====

input.addEventListener("keydown",(e)=>{

if(e.key==="Enter"){

e.preventDefault();

sendMessage();

}

});

// ===== Voice Input =====

const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

if(SpeechRecognition){

const recognition = new SpeechRecognition();

recognition.lang="hi-IN";

recognition.interimResults=false;

recognition.maxAlternatives=1;

document.getElementById("micBtn").onclick=()=>{

recognition.start();

};

recognition.onresult=(event)=>{

input.value=event.results[0][0].transcript;

sendMessage();

};

recognition.onerror=()=>{

addAIMessage("🎤 Voice recognition isn't available on this device.");

};

}

// ===== Auto Scroll =====

const observer=new MutationObserver(()=>{

messages.scrollTop=messages.scrollHeight;

});

observer.observe(messages,{

childList:true,

subtree:true

});
