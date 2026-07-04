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

}
