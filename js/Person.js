class Person extends GameObject {
    constructor(config) {
        super(config);
        this.movingProgressRemaining = 0;

        this.isPlayerControlled = config.isPlayerControlled || false;

        this.directionUpdate = { // to alter speed, changed 1 to 2 here and (*)
            "up": ["y", -2],
            "down": ["y", 2],
            "left": ["x", -2],
            "right": ["x", 2]
        }
    }

    update(state) {
        this.updatePosition();
        this.updateSprite(state);

        // don't move the person until he's done moving to a square
        if(this.isPlayerControlled && this.movingProgressRemaining === 0 && state.arrow) {
            this.direction = state.arrow;
            this.movingProgressRemaining = 8; // (*) Was 16 before, changed to 8 for speed
        }
    }

    updatePosition() {
        if(this.movingProgressRemaining > 0) {
            const [property, change] = this.directionUpdate[this.direction];
            this[property] += change;
            this.movingProgressRemaining -= 1;
        }
    }

    updateSprite(state) {

        if(this.isPlayerControlled && this.movingProgressRemaining === 0 && !state.arrow) {
            this.sprite.setAnimation("idle-"+this.direction);
            return;
        }

        
        if(this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walk-"+this.direction);
        }
    }

}