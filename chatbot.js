const API = "https://portfolio-backend-jl4c.onrender.com/chat";

document.addEventListener("DOMContentLoaded", () => {

let userName="";

document.body.insertAdjacentHTML("beforeend",`

<div id="ai-chat-btn">

<div class="pulse"></div>

🤖

</div>

<div id="ai-chat-box">

<div id="ai-header">

<div class="ai-profile">

<div class="avatar">

👩🏻

</div>

<div>

<div class="ai-title">

Harsh AI

</div>

<div class="ai-online">

🟢 Online

</div>

</div>

</div>

<div id="ai-close">

✕

</div>

</div>

<div id="ai-messages">

<div class="ai-msg">

<div class="msg">

<h3>

👋 Welcome

</h3>

<p>

I'm <b>Harsh AI</b>.

I'm here to help you connect with

<b>Harsh Panchal</b>.

</p>

<p>

I can help with

</p>

<ul>

<li>💻 Website Development</li>

<li>🤖 AI Chatbots</li>

<li>📱 Portfolio Websites</li>

<li>⚡ Full Stack Projects</li>

<li>📞 Book a Meeting</li>

</ul>

<div class="quick-actions">

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

</div>

<div id="ai-bottom">

<input

id="ai-input"

placeholder="Type your message..."

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
const btn = document.getElementById("ai-chat-btn");
const box = document.getElementById("ai-chat-box");
const closeBtn = document.getElementById("ai-close");
const input = document.getElementById("ai-input");
const sendBtn = document.getElementById("sendBtn");
const messages = document.getElementById("ai-messages");

btn.addEventListener("click", () => {
    box.style.display = "flex";
    input.focus();
});

closeBtn.addEventListener("click", () => {
    box.style.display = "none";
});

document.querySelectorAll(".quick-btn").forEach(btn => {

    btn.onclick = () => {

        input.value = btn.innerText;

        sendMessage();

    };

});

function currentTime(){

return new Date().toLocaleTimeString([],{

hour:"2-digit",

minute:"2-digit"

});

}

function addUserMessage(text){

const div=document.createElement("div");

div.className="user-msg";

div.innerHTML=`

<div class="msg-text">${text}</div>

<div class="msg-time">${currentTime()}</div>

`;

messages.appendChild(div);

messages.scrollTop=messages.scrollHeight;

}

function addAIMessage(text){

const div=document.createElement("div");

div.className="ai-msg";

div.innerHTML=`

<div class="msg-text">${text}</div>

<div class="msg-time">${currentTime()}</div>

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

if(!text) return;

addUserMessage(text);

input.value="";

showTyping();

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

removeTyping();

const reply=

data?.reply ||

data?.output_text ||

data?.response ||

(data?.output?.[0]?.content?.[0]?.text) ||

"Sorry, I couldn't generate a response.";

addAIMessage(reply);
