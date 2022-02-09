class OverworldMap {
    constructor(config) {
        // adding a back-reference to the overworld
        this.overworld = null;

        this.gameObjects = config.gameObjects;
        this.cutsceneSpaces = config.cutsceneSpaces || {};

        this.walls = config.walls || {};

        this.lowerImage = new Image();
        this.upperImage = new Image();
        
        this.lowerImage.src = config.lowerSrc; // floor
        this.upperImage.src = config.upperSrc; // what is rendered above the floor (above the player) like tree tops
        
        this.isCutscenePlaying = false;
    
    }

    drawLowerImage(context, cameraPerson) {
        // context.drawImage(this.lowerImage, utils.withGrid(10.5) - cameraPerson.x, utils.withGrid(6) - cameraPerson.y);
        context.drawImage(this.lowerImage, utils.withGrid(10.33) - cameraPerson.x, utils.withGrid(6.5) - cameraPerson.y); // fixing offset
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


        // reset npc's to do their normal behaviour
        Object.values(this.gameObjects).forEach(object => object.doBehaviorEvent(this))
    }

    checkForActionCutscene() {
        const hero = this.gameObjects['hero']; // can be any of the player controlled objects

        // using "" to check whether there is anyone to talk to
        const nextCoords = utils.nextPosition(hero.x, hero.y, hero.direction);
        const match = Object.values(this.gameObjects).find(object => {
            return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`
        });

        // if you press Enter, you'll get the match object depending on your position and direction!
        // console.log({match});

        if(!this.isCutscenePlaying && match && match.talking.length) {
            this.startCutscene(match.talking[0].events)
        }
    }

    // footstep triggered cutscene
    checkForFootstepCutscene() {
        const hero = this.gameObjects['hero'];
        const match = this.cutsceneSpaces[`${hero.x},${hero.y}`];
        
        // is undefined for normal tiles, but displays the object if you step on a tile that triggers a cutscene
        // console.log(match);

        if(!this.isCutscenePlaying && match) {
            this.startCutscene(match[0].events); // right now it's pulling the behavior at the 0th index. Can be changed depending on the current story
        }
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
        lowerSrc: "./images/official_assets/ourMap32.png", // current best map is= ./images/official_assets/ourMap32.png
        // lowerSrc: "./images/ourMap16.png",
        // lowerSrc: "./images/DemoLower.png",
        upperSrc: "./images/DemoUpper.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                src: "./images/brownGuy1.png",
                x: utils.withGrid(30),
                y: utils.withGrid(45)
            }),

            // myDrone: new Person({
            //     x: utils.withGrid(8),
            //     y: utils.withGrid(8),
            //     src: "./images/myDrone.png",
            //     animations: { // these values are according to the drone's spritesheet
            //         "spinning": [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7]]
            //     },
            //     currentAnimation: "spinning",
            // }),
            
            npcA: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(9),
                src: "./images/npc1.png",
                behaviorLoop: [
                    {type: "stand", direction: "left", time: 800},
                    {type: "stand", direction: "up", time: 800},
                    {type: "stand", direction: "right", time: 1200},
                    {type: "stand", direction: "up", time: 300}
                ],
                talking: [
                    {
                        // defined this way so that people can say different things, at different points in time
                        events: [
                            {type: "textMessage", text: "I'm busy...", faceHero: "npcA"},
                            {type: "textMessage", text: "Go away!"},
                            {who: "hero", type: "walk", direction: "left"}
                        ]
                    },

                    // saying a different thing later
                    // {
                    //     events: [
                    //         {type: "textMessage", text: "Congrats on beating that boss!"}
                    //     ]
                    // }
                ]
            }),

            npcB: new Person({
                x: utils.withGrid(8),
                y: utils.withGrid(5),
                src: "./images/npc2.png",
                // behaviorLoop: [
                //     {type: "walk", direction: "left"},
                //     {type: "stand", direction: "left", time: 800},
                //     {type: "walk", direction: "up"},
                //     {type: "walk", direction: "right"},
                //     {type: "walk", direction: "down"}
                // ]
            }),
        },
        walls: {
            [utils.asGridCoord(7,6)]: true,
            [utils.asGridCoord(8,6)]: true,
            [utils.asGridCoord(7,7)]: true,
            [utils.asGridCoord(8,7)]: true,   
        },
        cutsceneSpaces: {
            [utils.asGridCoord(7,4)]: [
                // doing it this way so that for example if you step on a cutscene space
                // and if the cutscene gets over, then the same cutscene should not play when you step on the same tile again
                {
                    events: [
                        {who: "npcB", type: "walk", direction: "left"},
                        {who: "npcB", type: "stand", direction: "up", time:500},
                        {type: "textMessage", text: "You can't be in there!"},
                        {who: "npcB", type: "walk", direction: "right"},
                        {who: "hero", type: "walk", direction: "down"},
                        {who: "hero", type: "walk", direction: "left"},
                    ]
                }
            ],
            [utils.asGridCoord(5,10)]: [
                {
                    events: [
                        {type: "changeMap", map: "Kitchen"} // gets referenced in OverworldEvent
                    ]
                }
            ]
            
        }
    },

    Kitchen: {
        lowerSrc: "./images/KitchenLower.png",
        upperSrc: "./images/KitchenUpper.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(5),
                y: utils.withGrid(5),
            }),

            npcB: new Person({
                x: utils.withGrid(10),
                y: utils.withGrid(8),
                src: "./images/npc2.png",
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "You made it!", faceHero: "npcB"}
                        ]
                    }
                ]
            }),


        }
    },
}
