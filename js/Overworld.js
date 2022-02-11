class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.canvas.height = window.innerHeight;        
        this.canvas.width = window.innerWidth;

        // this.gameContainer = this.element.querySelector(".game-container");
        // this.gameContainer.style.width = window.innerWidth;
        // this.gameContainer.style.height = window.innerHeight;

        console.log(this.canvas.width, this.canvas.height);

        this.context = this.canvas.getContext("2d");
        this.map = null;
    }

    init() {
        this.startMap(window.OverworldMaps.DemoRoom);
        this.bindActionInput();
        this.bindHeroPositionCheck();
        
        this.directionInput = new DirectionInput();
        this.directionInput.init();
        
        this.startGameLoop();
        // game loop fires at 60 fps

    
        // this.map.startCutscene([
        //     {type: "changeMap", map: "DemoRoom"},
        //     {type: "textMessage", text: "Why hello there! Welcome to ACM-RPG..."},
        // ]);
        
    }

    bindActionInput() {
        new KeyPressListener("Enter", () => {
            // is there a person to talk to?
            this.map.checkForActionCutscene() // check for a cutscene at a specific position
        })
    }

    bindHeroPositionCheck() {
        document.addEventListener("PersonWalkingComplete", e => {
            if(e.detail.whoId == "hero") {
                // hero's position has changed
                this.map.checkForFootstepCutscene();
            }
        });
    }

    startMap(mapConfig) {
        this.map = new OverworldMap(mapConfig);
        this.map.overworld = this;
        this.map.mountObjects();
    }

    // function that checks whether the space around an object can be interacted with
    // renders "Press Enter to interact" message if so
    checkInteraction() {
        let hero = this.map.gameObjects.hero;
        const nextCoords = utils.nextPosition(hero.x, hero.y, hero.direction);
        const match = Object.values(this.map.gameObjects).find(object => {
            return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`
        });
        console.log({match});

        let interact_p = document.querySelector(".game-interact");
        
        if(match) {
            // console.log("MATCHED");
            interact_p.style.visibility = "visible"
        } else {
            // make it hidden again
            // console.log("NOT");
            interact_p.style.visibility = "hidden"
        }
    }

    startGameLoop() {
        const step = () => {

            this.context.clearRect(0,0, this.canvas.width, this.canvas.height);

            // around which character to place the camera
            const cameraPerson = this.map.gameObjects.hero;

            // update all objects
            Object.values( this.map.gameObjects ).forEach( object => {
                object.update({
                    arrow: this.directionInput.direction,
                    map: this.map,

                })
            })
            

            // step(); infinite loop that will crash the system
            
            this.map.drawLowerImage(this.context, cameraPerson);

            // that sorting is done to render objects that are lower later, so that when someone walks under another person then they first person gets rendered on top
            Object.values( this.map.gameObjects ).sort((a,b) => {
                return a.y - b.y;
            }).forEach( object => {
                object.sprite.draw(this.context, cameraPerson);
            })

            this.checkInteraction();

            

            // this.map.drawUpperImage(this.context, cameraPerson);

            // call step when a new frame starts
            requestAnimationFrame( () => {
                step();
            });
        }
        // console.log(performance.now());
        step();
    }
}
