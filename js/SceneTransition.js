class SceneTransition {
    constructor() {
        this.element = null;

    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("SceneTransition");
    }

    fadeOut() {
        this.element.classList.add("fade-out");
        this.element.addEventListener("animationend", () => {
            this.element.remove();
        }, {once: true});
    }

    init(container, callback) {
        this.createElement();
        container.appendChild(this.element);

        // to know if the animation is done, (so that we can callback)
        this.element.addEventListener("animationend", () => {
            callback();
        }, {once: true}); // shouldn't fire again, when we have the fade out

    }
}