class DirectionInput {
    constructor() {
        this.heldDirections = []; // keeps track of keys held
        this.map = {
            "ArrowUp": "up",
            "ArrowDown": "down",
            "ArrowLeft": "left",
            "ArrowRight": "right",
            "KeyW": "up",
            "KeyS": "down",
            "KeyA": "left",
            "KeyD": "right"
        }
    }


    init() {
        document.addEventListener("keydown", e => {
            const dir = this.map[e.code];
            if(dir && this.heldDirections.indexOf(dir) === -1) {
                this.heldDirections.unshift(dir);
            }
        });

        document.addEventListener("keyup", e => {
            const dir = this.map[e.code];
            const index = this.heldDirections.indexOf(dir);
            if(index > -1) {
                this.heldDirections.splice(index, 1);
            }
        });
    }

    get direction() {
        return this.heldDirections[0];
    }
}