const API = "https://portfolio-backend-jl4c.onrender.com/chat";

document.addEventListener("DOMContentLoaded", () => {

document.body.insertAdjacentHTML("beforeend", `

<div id="ai-chat-btn">🤖</div>

<div id="ai-chat-box">

<div id="ai-header">

<div class="ai-header-left">
<div class="ai-avatar">👩‍💻</div>

<div>
<div class="ai-title">Harsh AI</div>
<div class="ai-status">🟢 Online • Usually replies instantly</div>
</div>

</div>

<span id="ai-close">✖</span>

</div>

<div id="ai-messages">

<div class="ai-msg">

👋 <b>Welcome!</b><br><br>

I'm <b>Harsh AI</b>, the virtual assistant of <b>Harsh Panchal</b>.

I can help you with:<br><br>

💻 Website Development<br>
🤖 AI Chatbots<br>
🌐 Portfolio Websites<br>
📱 Business Websites<br>
⚙️ Custom Software<br>
📅 Book a Meeting<br><br>

<div id="quick-actions">

<button class="quick-btn">💼 Hire Harsh</button>

<button class="quick-btn">💰 Pricing</button>

<button class="quick-btn">🚀 Services</button>

<button class="quick-btn">📞 Book Call</button>

</div>

</div>

</div>

<div id="ai-bottom">

<input
id="ai-input"
placeholder="Ask me anything about your project..."
autocomplete="off"
/>

<button id="micBtn">🎤</button>

<button id="sendBtn">➤</button>

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

};

closeBtn.onclick=()=>{

box.style.display="none";

};

document.querySelectorAll(".quick-btn").forEach(btn=>{

btn.onclick=()=>{

input.value=btn.innerText;

sendMessage();

};

});

async function sendMessage(){

const text=input.value.trim();

if(!text) return;

messages.innerHTML+=`
<div class="user-msg">${text}</div>
`;

input.value="";

messages.scrollTop=messages.scrollHeight;

const typing=document.createElement("div");

typing.className="ai-msg";

typing.id="typing";

typing.innerHTML="💬 Harsh AI is typing...";

messages.appendChild(typing);

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
messages.innerHTML += `
<div class="ai-msg">${data.reply}</div>
`;

messages.scrollTop = messages.scrollHeight;

// Voice
if ("speechSynthesis" in window) {

speechSynthesis.cancel();

const speech = new SpeechSynthesisUtterance(data.reply);

const voices = speechSynthesis.getVoices();

const preferred =
voices.find(v => v.name.includes("Microsoft Heera")) ||
voices.find(v => v.name.includes("Google हिन्दी")) ||
voices.find(v => v.name.includes("Google Hindi")) ||
voices.find(v => v.lang === "hi-IN") ||
voices.find(v => v.lang.startsWith("hi"));

if (preferred) speech.voice = preferred;

speech.lang = "hi-IN";
speech.rate = 0.95;
speech.pitch = 1.05;

speechSynthesis.speak(speech);

}

}catch(err){

document.getElementById("typing")?.remove();

messages.innerHTML += `
<div class="ai-msg">
⚠️ Sorry, I'm unable to connect right now.<br>
Please try again in a few seconds.
</div>
`;

messages.scrollTop = messages.scrollHeight;

}

}

sendBtn.onclick = sendMessage;

input.addEventListener("keypress",(e)=>{

if(e.key==="Enter"){

sendMessage();

}

});

// Voice Input

const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

if(SR){

const recognition = new SR();

recognition.lang = "hi-IN";

const micBtn = document.getElementById("micBtn");

micBtn.onclick = ()=>{

recognition.start();

};

recognition.onresult = (e)=>{

input.value = e.results[0][0].transcript;

};

recognition.onerror = ()=>{

messages.innerHTML += `
<div class="ai-msg">
🎤 Voice recognition is unavailable.
</div>
`;

};

}

// Auto scroll

const observer = new MutationObserver(()=>{

messages.scrollTop = messages.scrollHeight;

});

observer.observe(messages,{
childList:true
});

});
document.getElementById("typing")?.remove();
