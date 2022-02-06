class TextMessage {
    constructor({text, onComplete}) {
        this.text = text;
        this.onComplete = onComplete;
        this.element = null;
    }
    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("TextMessage");

        this.element.innerHTML = (`
            <p class="TextMessage_p">${this.text}</p>
            <button class="TextMessage_button">Next</button>
        `);

        this.element.querySelector("button").addEventListener("click", () => {
            // close the text message
            this.done();
        });

        this.actionListener = new KeyPressListener("Enter", () => {
            this.done();
            this.actionListener.unbind();
        })
    }

    done() {
        this.element.remove();
        this.onComplete();
    }


    init(container) {
        // Add text message to DOM
        this.createElement();
        container.appendChild(this.element);
    }
}