class RevealingText {
    constructor(config) {
        this.element = config.element;
        this.text = config.text;
        this.speed = config.speed || 60; // larger value = slower typing speed
        
        this.timeout = null;
        this.isDone = false;
    }

    // recursively reveal all characters in the list
    revealOneCharacter(list) {
        const next = list.splice(0,1)[0];
        next.span.classList.add("revealed");

        if(list.length > 0) {
            this.timeout = setTimeout(() => {
                this.revealOneCharacter(list);
            }, next.delayAfter);
        } else {
            this.isDone = true;
        }
    }

    // Reveal all the spans if the user hits Enter
    warpToDone() {
        clearTimeout(this.timeout);
        this.isDone = true;
        this.element.querySelectorAll("span").forEach(s => { // NOTE! This might mess with the front end css
            s.classList.add("revealed");
        });
    }

    init() {
        let characters = [];
        // "abc" -> ["a", "b", "c"]
        this.text.split("").forEach(character => {

            // create each span, and add to element in DOM
            let span = document.createElement("span");
            span.textContent = character;
            this.element.appendChild(span);

            // Add span to internal state array
            characters.push({
                span,
                delayAfter: character === " " ? 0 : this.speed // don't add a timeout for spaces (better presentation this way)
            });

        });

        this.revealOneCharacter(characters);
    }
}