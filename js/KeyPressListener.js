// the way the game works is that if you press a button, to do the same thing, you need to 
// lift your finger and press again.
// makes sense in the context of text messages. If you get a text message and press enter, 
// and then release enter, then it will resume the original state.

class KeyPressListener {
    constructor(keyCode, callback) {
        let keySafe = true; // true if a key is not pressed.

        this.keydownFunction = function(event) {
            if(event.code === keyCode) {
                if(keySafe) {
                    keySafe = false;
                    callback();
                }
            }
        };

        this.keyupFunction = function(event) {
            if(event.code === keyCode) {
                keySafe = true;
            }
        };
        
        // binding the event listeners
        document.addEventListener("keydown", this.keydownFunction);
        document.addEventListener("keyup", this.keyupFunction);
    }

    // unbind the event listeners
    unbind() {
        document.removeEventListener("keydown", this.keydownFunction);
        document.removeEventListener("keyup", this.keyupFunction);
    }
}