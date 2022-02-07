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
            <p class="TextMessage_p"></p>
            <button class="TextMessage_button">Next</button>
        `);

        // init the typewriter effect
        this.revealingText = new RevealingText({
            element: this.element.querySelector(".TextMessage_p"),
            text: this.text,

        })

        this.element.querySelector("button").addEventListener("click", () => {
            // close the text message
            this.done();
        });

        this.actionListener = new KeyPressListener("Enter", () => {
            this.done();
            
        })
    }

    // if the user hits enter
    done() {

        if(this.revealingText.isDone) {
            this.element.remove();
            this.actionListener.unbind(); // NOTE, might have to put this outside the if block
            this.onComplete();
        } else {
            this.revealingText.warpToDone();
        }
        
    }


    init(container) {
        // Add text message to DOM
        this.createElement();
        container.appendChild(this.element);
        this.revealingText.init();
    }
}