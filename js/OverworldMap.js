class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {};

        this.lowerImage = new Image();
        this.upperImage = new Image();
        
        this.lowerImage.src = config.lowerSrc; // floor
        this.upperImage.src = config.upperSrc; // what is rendered above the floor (above the player) like tree tops
    }

    drawLowerImage(context, cameraPerson) {
        context.drawImage(this.lowerImage, utils.withGrid(10.5) - cameraPerson.x, utils.withGrid(6) - cameraPerson.y);
    }

    drawUpperImage(context, cameraPerson) {
        context.drawImage(this.upperImage, utils.withGrid(10.5) - cameraPerson.x, utils.withGrid(6) - cameraPerson.y);
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
            
            npc1: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(9),
                src: "./images/npc1.png"
            }),

            // walls: {
            //     [utils.asGridCoord(7,6)]: true,
            //     [utils.asGridCoord(8,6)]: true,
            //     [utils.asGridCoord(7,7)]: true,
            //     [utils.asGridCoord(8,7)]: true,
                
            // }
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

            npc1: new GameObject({
                x: 9,
                y: 6,
                src: "./images/npc1.png"
            }),

            npc2: new GameObject({
                x: 10,
                y: 8,
                src: "./images/npc2.png"
            })
        }
    },

}


