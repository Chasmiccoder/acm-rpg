class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.context = this.canvas.getContext("2d");
        this.map = null;
    }

    init() {
        this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
        this.map.mountObjects();
        
        this.directionInput = new DirectionInput();
        this.directionInput.init();
        
        this.startGameLoop();
        // game loop fires at 60 fps


        this.map.startCutscene([
            {who: "hero", type: "walk", direction: "down"},
            {who: "hero", type: "walk", direction: "down"},
            {who: "npcA", type: "walk", direction: "left"},
            {who: "npcA", type: "walk", direction: "left"},
            {who: "npcA", type: "stand", direction: "up", time: 800},

        ])
        
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

            this.map.drawUpperImage(this.context, cameraPerson);

            // call step when a new frame starts
            requestAnimationFrame( () => {
                step();
            });
        }
        // console.log(performance.now());
        step();
    }
}
