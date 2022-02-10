let hemanthPath = [
    {who: "hemanth", type: "walk", direction: "right"},
    {who: "hemanth", type: "walk", direction: "right"},
    {who: "hemanth", type: "walk", direction: "right"},
    {who: "hemanth", type: "walk", direction: "right"},
    {who: "hemanth", type: "walk", direction: "right"},
    {who: "hemanth", type: "walk", direction: "right"},
    {who: "hemanth", type: "walk", direction: "right"},
    {who: "hemanth", type: "walk", direction: "right"},

    {who: "hemanth", type: "stand", direction: "right", time:500},
    {type: "textMessage", text: "Are you up for applying to the technical department?"},
    {type: "textMessage", text: "If so, enter the portal and hit 'Enter'!"},

    {who: "hemanth", type: "walk", direction: "left"},
    {who: "hemanth", type: "walk", direction: "left"},
    {who: "hemanth", type: "walk", direction: "left"},
    {who: "hemanth", type: "walk", direction: "left"},
    {who: "hemanth", type: "walk", direction: "left"},
    {who: "hemanth", type: "walk", direction: "left"},
    {who: "hemanth", type: "walk", direction: "left"},
    {who: "hemanth", type: "walk", direction: "left"},
]

// hemanth's cutscene's set of coordinates
let hemanth_cutscene_set_of_coords = [`${10*32},${9*32}`,`${11*32},${9*32}`,`${12*32},${9*32}`,`${13*32},${9*32}`,`${14*32},${9*32}`,`${15*32},${9*32}`,`${16*32},${9*32}`,`${17*32},${9*32}`,`${18*32},${9*32}`,`${19*32},${9*32}`,];

let dhritiPath = [
    {who: "dhriti", type: "walk", direction: "down"},
    {who: "dhriti", type: "walk", direction: "right"},
    {who: "dhriti", type: "walk", direction: "down"},
    {who: "dhriti", type: "walk", direction: "right"},

    {who: "dhriti", type: "walk", direction: "right"},
    {who: "dhriti", type: "walk", direction: "right"},
    {who: "dhriti", type: "walk", direction: "right"},

    {who: "dhriti", type: "stand", direction: "right", time:500},
    {type: "textMessage", text: "Are you good looking?"},
    {type: "textMessage", text: "Of course you are!"},
    {type: "textMessage", text: "But we want people that can make things that are good looking..."},
    {type: "textMessage", text: "If you're interested, enter the portal and hit 'Enter'!"},

    {who: "dhriti", type: "walk", direction: "left"},
    {who: "dhriti", type: "walk", direction: "left"},
    {who: "dhriti", type: "walk", direction: "left"},

    {who: "dhriti", type: "walk", direction: "left"},
    {who: "dhriti", type: "walk", direction: "up"},
    {who: "dhriti", type: "walk", direction: "left"},
    {who: "dhriti", type: "walk", direction: "up"},
]

let dhriti_cutscene_set_of_coords = [`${9*32},${31*32}`,`${9*32},${32*32}`,`${9*32},${33*32}`,`${9*32},${34*32}`,`${9*32},${35*32}`,`${9*32},${36*32}`,`${9*32},${37*32}`];

let diyaPath = [
    {who: "diya", type: "walk", direction: "up"},
    {who: "diya", type: "walk", direction: "left"},
    {who: "diya", type: "walk", direction: "up"},
    {who: "diya", type: "walk", direction: "up"},
    {who: "diya", type: "walk", direction: "up"},
    
    {who: "diya", type: "stand", direction: "up", time:500},
    {type: "textMessage", text:"Will you be able to manage management?"},
    {type: "textMessage", text: "If so, enter the portal and hit 'Enter'!"},

    {who: "diya", type: "walk", direction: "right"},
    {who: "diya", type: "walk", direction: "down"},
    {who: "diya", type: "walk", direction: "down"},
    {who: "diya", type: "walk", direction: "down"},
    {who: "diya", type: "walk", direction: "down"},
]

let diya_cutscene_set_of_coords = [`${12*32},${38*32}`,`${13*32},${38*32}`,`${14*32},${38*32}`,`${15*32},${38*32}`,`${16*32},${38*32}`,`${17*32},${38*32}`,`${18*32},${38*32}`];


let rehberPath = [
    {who: "rehber", type: "walk", direction: "right"},
    {who: "rehber", type: "walk", direction: "right"},
    {who: "rehber", type: "walk", direction: "right"},
    {who: "rehber", type: "walk", direction: "right"},
    {who: "rehber", type: "walk", direction: "up"},
    {who: "rehber", type: "walk", direction: "up"},

    {who: "diya", type: "stand", direction: "up", time:500},
    {type: "textMessage", text:"Wanna join our cool competitive team?"},
    {type: "textMessage", text: "If so, enter the portal and hit 'Enter'!"},

    {who: "rehber", type: "walk", direction: "left"},
    {who: "rehber", type: "walk", direction: "down"},
    {who: "rehber", type: "walk", direction: "down"},
    {who: "rehber", type: "walk", direction: "left"},
    {who: "rehber", type: "walk", direction: "left"},
    {who: "rehber", type: "walk", direction: "left"},
]

let rehber_cutscene_set_of_coords = [`${33*32},${63*32}`, `${34*32},${63*32}`, `${35*32},${63*32}`];


class OverworldMap {
    constructor(config) {
        // adding a back-reference to the overworld
        this.overworld = null;

        this.gameObjects = config.gameObjects;
        this.cutsceneSpaces = config.cutsceneSpaces || {};

        this.walls = config.walls || {};

        this.lowerImage = new Image();
        // this.upperImage = new Image();
        
        this.lowerImage.src = config.lowerSrc; // floor
        // this.upperImage.src = config.upperSrc; // what is rendered above the floor (above the player) like tree tops
        
        this.isCutscenePlaying = false;
    
    }

    drawLowerImage(context, cameraPerson) {
        // context.drawImage(this.lowerImage, utils.withGrid(10.5) - cameraPerson.x, utils.withGrid(6) - cameraPerson.y);
        // context.drawImage(this.lowerImage, utils.withGrid(10.33) - cameraPerson.x, utils.withGrid(6.5) - cameraPerson.y); // fixing offset
        context.drawImage(this.lowerImage, utils.withGrid(10.40) - cameraPerson.x, utils.withGrid(6.7) - cameraPerson.y);
    }

    drawUpperImage(context, cameraPerson) {
        context.drawImage(this.upperImage, utils.withGrid(10.40) - cameraPerson.x, utils.withGrid(6.7) - cameraPerson.y);
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
        Object.values(this.gameObjects).forEach(object => object.doBehaviorEvent(this));
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

        // if hero steps on a 'set' of tiles that triggers 'one' cutscene
        // then remove that 'set' of tiles for that corresponding cutscene from cutsceneSpaces
        // optimize later, dividing by 32 for now, but use proper utils function later
        const hero_tile = `${hero.x},${hero.y}`;
        
        if(hemanth_cutscene_set_of_coords.includes(hero_tile)) {
            // console.log("before:", this.cutsceneSpaces);
            // let tmp = {...this.cutsceneSpa
            for(let i = 0; i < hemanth_cutscene_set_of_coords.length; i++) {
                delete this.cutsceneSpaces[hemanth_cutscene_set_of_coords[i]];
            }
            // this.cutsceneSpaces = [...tmp];
            // console.log("after:", this.cutsceneSpaces);
        }

        else if(dhriti_cutscene_set_of_coords.includes(hero_tile)) {
            for(let i = 0; i < dhriti_cutscene_set_of_coords.length; i++) {
                delete this.cutsceneSpaces[dhriti_cutscene_set_of_coords[i]];
            }
        }

        else if(diya_cutscene_set_of_coords.includes(hero_tile)) {
            for(let i = 0; i < diya_cutscene_set_of_coords.length; i++) {
                delete this.cutsceneSpaces[diya_cutscene_set_of_coords[i]];
            }
        }

        else if(rehber_cutscene_set_of_coords.includes(hero_tile)) {
            for(let i = 0; i < rehber_cutscene_set_of_coords.length; i++) {
                delete this.cutsceneSpaces[rehber_cutscene_set_of_coords[i]];
            }
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
        lowerSrc: "./images/FINAL_FOR_REALZ_.png", // current best map is= ./images/official_assets/ourMap32.png
        // lowerSrc: "./images/ourMap16.png",
        // lowerSrc: "./images/DemoLower.png",
        // upperSrc: "./images/DemoUpper.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                src: "./images/Hero.png",
                x: utils.withGrid(32), // 32 44
                y: utils.withGrid(44),
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
                x: utils.withGrid(19),
                y: utils.withGrid(9),
                src: "./images/brownGuy1.png",
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
                            // {who: "hero", type: "walk", direction: "left"}
                        ]
                    },
                ],
            }),
            //         // saying a different thing later
            //         // {
            //         //     events: [
            //         //         {type: "textMessage", text: "Congrats on beating that boss!"}
            //         //     ]
            //         // }
            //     ]
            // }),

            // npcB: new Person({
            //     x: utils.withGrid(8),
            //     y: utils.withGrid(5),
            //     src: "./images/brownGuy1.png",
            //     behaviorLoop: [
            //         {type: "walk", direction: "left"},
            //         // {type: "stand", direction: "left", time: 800},
            //         {type: "walk", direction: "up"},
            //         {type: "walk", direction: "right"},
            //         {type: "walk", direction: "down"},
            //     ],
            //     talking: [
            //         {
            //             // defined this way so that people can say different things, at different points in time
            //             events: [
            //                 {type: "textMessage", text: "It's about drive, it's about power", faceHero: "hemanth"},
            //                 {type: "textMessage", text: "We stay hungry, we devour!"},
            //                 // {who: "hero", type: "walk", direction: "left"}
            //             ]
            //         },
            //     ]
            // }),


            hemanth: new Person({
                x: utils.withGrid(2),
                y: utils.withGrid(10),
                src: "./images/brownGuy1.png",
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
                            // independent event where Hemanth gets to say what he wants
                            {type: "textMessage", text: "It's about drive, it's about power", faceHero: "hemanth"},
                            {type: "textMessage", text: "We stay hungry, we devour!"},
                        ]
                    },
                ]
            }),

            dhriti: new Person({
                x: utils.withGrid(2),
                y: utils.withGrid(31),
                src: "./images/dhriti.png",
                behaviorLoop: [
                    {type: "stand", direction: "left", time: 800},
                    {type: "stand", direction: "up", time: 800},
                    {type: "stand", direction: "right", time: 1200},
                    {type: "stand", direction: "up", time: 300}
                ],
                talking: [
                    {
                        events: [
                            // independent event where Dhriti gets to say what he wants
                            {type: "textMessage", text: "It's about drive, it's about power", faceHero: "dhriti"},
                            {type: "textMessage", text: "We stay hungry, we devour!"},
                        ]
                    },
                ]
            }),


            diya: new Person({
                x: utils.withGrid(16),
                y: utils.withGrid(44),
                src: "./images/diya.png",
                behaviorLoop: [
                    {type: "stand", direction: "left", time: 800},
                    {type: "stand", direction: "up", time: 800},
                    {type: "stand", direction: "right", time: 1200},
                    {type: "stand", direction: "up", time: 300}
                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "It's about drive, it's about power", faceHero: "dhriti"},
                            {type: "textMessage", text: "We stay hungry, we devour!"},
                        ]
                    },
                ]
            }),

            ishi: new Person({
                x: utils.withGrid(11),
                y: utils.withGrid(46),
                src: "./images/ishi.png",
                behaviorLoop: [
                    {type: "stand", direction: "left", time: 800},
                    {type: "stand", direction: "up", time: 800},
                    {type: "stand", direction: "right", time: 1200},
                    {type: "stand", direction: "up", time: 300}
                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "Am I Ishi?", faceHero: "ishi"},
                            {type: "textMessage", text: "Or any boring person?"},
                        ]
                    },
                ]
            }),

            rehber: new Person({
                x: utils.withGrid(30),
                y: utils.withGrid(66),
                src: "./images/brownGuy1.png",
                behaviorLoop: [
                    {type: "stand", direction: "left", time: 800},
                    {type: "stand", direction: "up", time: 800},
                    {type: "stand", direction: "right", time: 1200},
                    {type: "stand", direction: "up", time: 300}
                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "It's about drive, it's about power", faceHero: "rehber"},
                            {type: "textMessage", text: "We stay hungry, we devour!"},
                        ]
                    },
                ]
            }),

            twitterRoute1: new Person({
                x: utils.withGrid(31),
                y: utils.withGrid(40),
                src: "./images/blankGuy.png",
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "Redirecting to ACMVIT's Twitter!"},
                            {type: "redirectPerson", link: "https://twitter.com/ACM_VIT", newTab: true},
                        ]
                    },
                ]
            }),
        },

        walls: {
            // [utils.asGridCoord(7,6)]: true,
            // [utils.asGridCoord(8,6)]: true,
            // [utils.asGridCoord(7,7)]: true,
            // [utils.asGridCoord(8,7)]: true,
        },
        cutsceneSpaces: {
            [utils.asGridCoord(10,9)]: [{events: hemanthPath}],
            [utils.asGridCoord(11,9)]: [{events: hemanthPath}],
            [utils.asGridCoord(12,9)]: [{events: hemanthPath}],
            [utils.asGridCoord(13,9)]: [{events: hemanthPath}],
            [utils.asGridCoord(14,9)]: [{events: hemanthPath}],
            [utils.asGridCoord(15,9)]: [{events: hemanthPath}],
            [utils.asGridCoord(16,9)]: [{events: hemanthPath}],
            [utils.asGridCoord(17,9)]: [{events: hemanthPath}],
            [utils.asGridCoord(18,9)]: [{events: hemanthPath}],
            [utils.asGridCoord(19,9)]: [{events: hemanthPath}],

            [utils.asGridCoord(9,31)]: [{events: dhritiPath}],
            [utils.asGridCoord(9,32)]: [{events: dhritiPath}],
            [utils.asGridCoord(9,33)]: [{events: dhritiPath}],
            [utils.asGridCoord(9,34)]: [{events: dhritiPath}],
            [utils.asGridCoord(9,35)]: [{events: dhritiPath}],
            [utils.asGridCoord(9,36)]: [{events: dhritiPath}],
            [utils.asGridCoord(9,37)]: [{events: dhritiPath}],

            [utils.asGridCoord(12,38)]: [{events: diyaPath}],
            [utils.asGridCoord(13,38)]: [{events: diyaPath}],
            [utils.asGridCoord(14,38)]: [{events: diyaPath}],
            [utils.asGridCoord(15,38)]: [{events: diyaPath}],
            [utils.asGridCoord(16,38)]: [{events: diyaPath}],
            [utils.asGridCoord(17,38)]: [{events: diyaPath}],
            [utils.asGridCoord(18,38)]: [{events: diyaPath}],

            [utils.asGridCoord(33,63)]: [{events: rehberPath}],
            [utils.asGridCoord(34,63)]: [{events: rehberPath}],
            [utils.asGridCoord(35,38)]: [{events: rehberPath}],

            // [utils.asGridCoord(31,41)]: [{events: [{type: "redirectPerson", link:'https://twitter.com/ACM_VIT', newTab:true}] }],
            // [utils.asGridCoord(32,41)]: [{events: [{type: "redirectPerson", link:'https://twitter.com/ACM_VIT', newTab:true}] }],











            // [utils.asGridCoord(5,10)]: [
            //     {
            //         events: [
            //             {type: "changeMap", map: "Kitchen"} // gets referenced in OverworldEvent
            //         ]
            //     }
            // ]
            // [utils.asGridCoord(7,4)]: [
            //     // doing it this way so that for example if you step on a cutscene space
            //     // and if the cutscene gets over, then the same cutscene should not play when you step on the same tile again
            //     {
            //         events: [
            //             {who: "npcB", type: "walk", direction: "left"},
            //             {who: "npcB", type: "stand", direction: "up", time:500},
            //             {type: "textMessage", text: "You can't be in there!"},
            //             {who: "npcB", type: "walk", direction: "right"},
            //             {who: "hero", type: "walk", direction: "down"},
            //             {who: "hero", type: "walk", direction: "left"},
            //         ]
            //     }
            // ],
            // [utils.asGridCoord(5,10)]: [
            //     {
            //         events: [
            //             {type: "changeMap", map: "Kitchen"} // gets referenced in OverworldEvent
            //         ]
            //     }
            // ]
            
        }
    },

    Kitchen: {
        lowerSrc: "./images/KitchenLower.png",
        // upperSrc: "./images/KitchenUpper.png",
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
