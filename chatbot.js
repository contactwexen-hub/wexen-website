
document.addEventListener("DOMContentLoaded", () => {

    // WEXEN CHATBOT - PREDEFINED QUESTIONS & ANSWERS

    const faqs = [
        {
            question: "What services do you offer?",
            answer: "WEXEN offers Website Development, App Development, UI/UX Design, Branding, Digital Marketing, AI Chatbots and Business Automation."
        },
        {
            question: "How much does a website cost?",
            answer: "Website pricing depends on your requirements, features and design. Contact our team for a customized quotation."
        },
        {
            question: "Do you develop mobile apps?",
            answer: "Yes! WEXEN provides mobile app development solutions designed around your business needs."
        },
        {
            question: "Do you provide digital marketing?",
            answer: "Yes! We offer SEO, Google Ads, Meta Ads, social media marketing and lead generation services."
        },
        {
            question: "What is your project process?",
            answer: "Our process includes Understanding Requirements, Planning, Design, Development, Testing and Final Delivery."
        },
        {
            question: "How can I contact WEXEN?",
            answer: "You can contact our team through WhatsApp or email at contact.wexen@gmail.com."
        }
    ];

    // CREATE CHATBOT INTERFACE

    const chatbot = document.createElement("div");
    chatbot.id = "wexen-chatbot";

    chatbot.innerHTML = `
        <button class="wex-chat-launcher" aria-label="Open WEXEN Assistant">
            <span class="wex-bot-symbol">✦</span>
        </button>

        <div class="wex-chat-window">
            <div class="wex-chat-header">
                <div class="wex-chat-avatar">✦</div>
                <div class="wex-chat-heading">
                    <strong>WEXEN Assistant</strong>
                    <small><span></span> Online | Ready to help</small>
                </div>
                <button class="wex-chat-close" aria-label="Close chatbot">×</button>
            </div>

            <div class="wex-chat-messages">
                <div class="wex-bot-message">
                    Hi! Welcome to WEXEN. 👋<br>
                    I'm your virtual assistant. How can I help you today?
                </div>
            </div>

            <div class="wex-chat-questions">
                ${faqs.map((faq, index) => `
                    <button class="wex-question" data-index="${index}">
                        ${faq.question}
                    </button>
                `).join("")}
            </div>

            <div class="wex-chat-footer">
                <span>Powered by WEXEN</span>
                <a href="https://wa.me/917207893116" target="_blank" rel="noopener">
                    WhatsApp Us ↗
                </a>
            </div>
        </div>
    `;

    document.body.appendChild(chatbot);

    // ELEMENTS

    const launcher = chatbot.querySelector(".wex-chat-launcher");
    const chatWindow = chatbot.querySelector(".wex-chat-window");
    const closeButton = chatbot.querySelector(".wex-chat-close");
    const messages = chatbot.querySelector(".wex-chat-messages");
    const questionButtons = chatbot.querySelectorAll(".wex-question");

    // OPEN AND CLOSE CHAT

    launcher.addEventListener("click", () => {
        chatWindow.classList.add("active");
        launcher.classList.add("hidden");
    });

    closeButton.addEventListener("click", () => {
        chatWindow.classList.remove("active");
        launcher.classList.remove("hidden");
    });

    // SHOW ANSWERS

    questionButtons.forEach(button => {
        button.addEventListener("click", () => {

            const index = Number(button.dataset.index);
            const selectedFaq = faqs[index];

            const userMessage = document.createElement("div");
            userMessage.className = "wex-user-message";
            userMessage.textContent = selectedFaq.question;

            messages.appendChild(userMessage);

            const botMessage = document.createElement("div");
            botMessage.className = "wex-bot-message";
            botMessage.textContent = selectedFaq.answer;

            messages.appendChild(botMessage);

            messages.scrollTop = messages.scrollHeight;
        });
    });

});
