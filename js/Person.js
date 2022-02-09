class Person extends GameObject {
    constructor(config) {
        super(config);
        this.movingProgressRemaining = 0;
        this.isStanding = false;

        this.isPlayerControlled = config.isPlayerControlled || false;

        this.directionUpdate = { // to alter speed, changed 1 to 2 here and (*)
            "up": ["y", -2],
            "down": ["y", 2],
            "left": ["x", -2],
            "right": ["x", 2]
        }
    }

    update(state) {
        if(this.movingProgressRemaining > 0) {
            this.updatePosition();
        } else {

            // more cases for starting to walk will come here

            // Case: We're keyboard ready and have an arrow pressed
            // don't move the person until he's done moving to a square
            // also, allow the player to move the hero only if there is no cutscene playing
            if(!state.map.isCutscenePlaying && this.isPlayerControlled && state.arrow) {
                this.startBehavior(state, {
                    type: "walk",
                    direction: state.arrow
                })
            }

            this.updateSprite(state);
        }        
    }

    startBehavior(state, behavior) {
        // set character direction to whatever behavior has
        this.direction = behavior.direction;
        if(behavior.type === "walk") {

            // stop if space is not free (wall collision)
            if(state.map.isSpaceTaken(this.x, this.y, this.direction)) {

                // if the player bumps into an npc, then once the npc can move, he should start moving
                behavior.retry && setTimeout(() => {
                    this.startBehavior(state, behavior);
                }, 10);


                return; // stop the function
            }

            // ready to walk
            state.map.moveWall(this.x, this.y, this.direction);
            this.movingProgressRemaining = 16; // (*) Was 16 before, changed to 8 for speed
            this.updateSprite(state);
        }

        if(behavior.type === "stand") {
            this.isStanding = true;

            setTimeout(() => {
                utils.emitEvent("PersonStandComplete", {
                    whoId: this.id
                })
                this.isStanding = false;
            }, behavior.time);
        }
    }

    updatePosition() {        
        const [property, change] = this.directionUpdate[this.direction];
        this[property] += change;
        this.movingProgressRemaining -= 1;

        if(this.movingProgressRemaining === 0) {
            // walking is finished

            utils.emitEvent("PersonWalkingComplete", {
                whoId: this.id
            });
        }
    }

    updateSprite() {
        if(this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walk-"+this.direction);
            return;
        }
        this.sprite.setAnimation("idle-"+this.direction); 
    }
}
