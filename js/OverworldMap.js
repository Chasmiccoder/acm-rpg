class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {};

        this.lowerImage = new Image();
        this.upperImage = new Image();
        
        this.lowerImage.src = config.lowerSrc; // floor
        this.upperImage.src = config.upperSrc; // what is rendered above the floor (above the player) like tree tops
        
        this.isCutscenePlaying = true;
    
    }

    drawLowerImage(context, cameraPerson) {
        context.drawImage(this.lowerImage, utils.withGrid(10.5) - cameraPerson.x, utils.withGrid(6) - cameraPerson.y);
    }

    drawUpperImage(context, cameraPerson) {
        context.drawImage(this.upperImage, utils.withGrid(10.5) - cameraPerson.x, utils.withGrid(6) - cameraPerson.y);
    }

    isSpaceTaken(currentX, currentY, direction) {
        const {x,y} = utils.nextPosition(currentX, currentY, direction);
        return this.walls[`${x},${y}`] || false;
    }

    mountObjects() {
        Object.keys(this.gameObjects).forEach( key => {
            let object = this.gameObjects[key];
            object.id = key;

            // TODO: determine if this object should be mounted or not
            object.mount(this);
        })
    }

    async startCutscene(events) {
        this.isCutscenePlaying = true;

        // start a loop of async events
        // await each event
        for(let i = 0; i < events.length; i++) {
            const eventHandler = new OverworldEvent({
                event: events[i],
                map: this,
            })
            await eventHandler.init();
        }

        this.isCutscenePlaying = false;
    }

    addWall(x,y) {
        this.walls[`${x},${y}`] = true;
    }

    removeWall(x,y) {
        delete this.walls[`${x},${y}`];
    }

    moveWall(wasX, wasY, direction) {
        this.removeWall(wasX, wasY);
        const {x,y} = utils.nextPosition(wasX,wasY,direction);
        this.addWall(x,y);
    }


}

window.OverworldMaps = {
    DemoRoom: {
        lowerSrc: "./images/DemoLower.png",
        upperSrc: "./images/DemoUpper.png",
        gameObjects: {

            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(5),
                y: utils.withGrid(6)
            }),
            
            npcA: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(9),
                src: "./images/npc1.png",
                behaviorLoop: [
                    {type: "stand", direction: "left", time: 800},
                    {type: "stand", direction: "up", time: 800},
                    {type: "stand", direction: "right", time: 1200},
                    {type: "stand", direction: "up", time: 300}

                ]
            }),

            npcB: new Person({
                x: utils.withGrid(3),
                y: utils.withGrid(7),
                src: "./images/npc2.png",
                behaviorLoop: [
                    {type: "walk", direction: "left"},
                    {type: "stand", direction: "left", time: 800},
                    {type: "walk", direction: "up"},
                    {type: "walk", direction: "right"},
                    {type: "walk", direction: "down"}
                ]
            }),
        },
        walls: {
            [utils.asGridCoord(7,6)]: true,
            [utils.asGridCoord(8,6)]: true,
            [utils.asGridCoord(7,7)]: true,
            [utils.asGridCoord(8,7)]: true,   
        }
    },

    Kitchen: {
        lowerSrc: "./images/KitchenLower.png",
        upperSrc: "./images/KitchenUpper.png",
        gameObjects: {
            hero: new GameObject({
                x: 3,
                y: 5,
            }),

            npcA: new GameObject({
                x: 9,
                y: 6,
                src: "./images/npc1.png"
            }),

            npcB: new GameObject({
                x: 10,
                y: 8,
                src: "./images/npc2.png"
            })
        }
    },
}
