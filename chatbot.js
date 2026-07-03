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
