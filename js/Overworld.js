class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.context = this.canvas.getContext("2d");
        this.map = null;
    }

    init() {
        this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
        this.directionInput = new DirectionInput();
        this.directionInput.init();

        this.startGameLoop();
        // game loop fires at 60 fps
        
    }

    startGameLoop() {
        const step = () => {

            this.context.clearRect(0,0, this.canvas.width, this.canvas.height);

            // around which character to place the camera
            const cameraPerson = this.map.gameObjects.hero;

            // update all objects
            Object.values( this.map.gameObjects ).forEach( object => {
                object.update({
                    arrow: this.directionInput.direction
                })
            })
            

            // step(); infinite loop that will crash the system
            
            this.map.drawLowerImage(this.context, cameraPerson);

            Object.values( this.map.gameObjects ).forEach( object => {
                object.sprite.draw(this.context, cameraPerson);
            })

            this.map.drawUpperImage(this.context, cameraPerson);

            // call step when a new frame starts
            requestAnimationFrame( () => {
                step();
            });
        }
        console.log(performance.now());
        step();
    }
}
