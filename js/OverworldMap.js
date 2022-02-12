// for redirects to Twitter, Instagram, etc
const getRoute = (x,y, name, link) => {
    let route = new Person({
        x: utils.withGrid(x),
        y: utils.withGrid(y),
        src: "./images/blankGuy.png",
        useShadow:false,
        talking: [
            {
                events: [
                    {type: "textMessage", text: `Redirecting to ACMVIT's ${name}!`},
                    {type: "redirectPerson", link: link, newTab: true},
                ]
            },
        ]
    });

    return route;
}

// Treasure box person objects
const getTreasureBox = (x,y,box_id) => {
    let box = new Person({
        x: utils.withGrid(x),
        y: utils.withGrid(y),
        src: "./images/blankGuy.png",
        useShadow:false,
        talking: [
            {
                events: [
                    {type: "textMessage", text: `Secret Treasure Unlocked!`},
                    {type: "unlockTreasure", box_id:box_id},
                ]
            },
        ]
    });
    return box;
}

// Generate the cutscene spaces for one cutscene event
// for example, with one function call, we can get the cutscenes defined for all tiles for one cutscene trigger
const generateCutsceneSpaces = (person_cutscene_set_of_coords_raw, personPath) => {
    let coords = person_cutscene_set_of_coords_raw;
    let dict = {};
    for(let i = 0; i < coords.length; i++) {
        dict[[utils.asGridCoord(coords[i][0],coords[i][1])]] = [{events: personPath}];
    }
    return dict;
}


// contains the footstep triggered cutscenes for all events in the game
let allCutsceneSpaces = {
    ...generateCutsceneSpaces(hemanth_cutscene_set_of_coords_raw, hemanthPath),
    ...generateCutsceneSpaces(dhriti_cutscene_set_of_coords_raw, dhritiPath),
    ...generateCutsceneSpaces(diya_cutscene_set_of_coords_raw, diyaPath),
    ...generateCutsceneSpaces(rehber_cutscene_set_of_coords_raw, rehberPath),
    ...generateCutsceneSpaces(vinamra_cutscene_set_of_coords_raw, vinamraPath),
    ...generateCutsceneSpaces(shreyas_cutscene_set_of_coords_raw, shreyasPath),
    ...generateCutsceneSpaces(sumona_cutscene_set_of_coords_raw, sumonaPath),
    ...generateCutsceneSpaces(yash_cutscene_set_of_coords_raw, yashPath),
};

// All redirects to other urls (also triggered by footsteps)
let allRedirects = {
    // REFACTOR

    [utils.asGridCoord(14,5)]: [
        {
            events: [
                {type: "textMessage", text: "Redirecting to the General Technical domain's form!"},
                {type: "redirectPerson", link: "./general_technical"}, // TODO
            ]
        }
    ],

    [utils.asGridCoord(25,21)]: [
        {
            events: [
                {type: "textMessage", text: "Redirecting to the Research Domain's form!"},
                {type: "redirectPerson", link: "./attempt/research"},
            ]
        }
    ],

    [utils.asGridCoord(3,21)]: [
        {
            events: [
                {type: "textMessage", text: "Redirecting to the Web Domain's form!"},
                {type: "redirectPerson", link: "./attempt/web"},
            ]
        }
    ],

    [utils.asGridCoord(3,11)]: [
        {
            events: [
                {type: "textMessage", text: "Redirecting to the App Domain's form!"},
                {type: "redirectPerson", link: "./attempt/app"},
            ]
        }
    ],

    [utils.asGridCoord(27,68)]: [
        {
            events: [
                {type: "textMessage", text: "Redirecting to the Competitive Coding Form!"},
                {type: "redirectPerson", link: "./attempt/cc"},
            ]
        }
    ],

    [utils.asGridCoord(-2,31)]: [
        {
            events: [
                {type: "textMessage", text: "Redirecting to the UI/UX Form!"},
                {type: "redirectPerson", link: "./attempt/uix"},
            ]
        }
    ],

    [utils.asGridCoord(-3,37)]: [
        {
            events: [
                {type: "textMessage", text: "Redirecting to the Graphic Design Form!"},
                {type: "redirectPerson", link: "./attempt/gd"},
            ]
        }
    ],

    [utils.asGridCoord(-3,43)]: [
        {
            events: [
                {type: "textMessage", text: "Redirecting to the Motion Design Form!"},
                {type: "redirectPerson", link: "./attempt/mg"},
            ]
        }
    ],

    [utils.asGridCoord(6,44)]: [
        {
            events: [
                {type: "textMessage", text: "Redirecting to the Management Form!"},
                {type: "redirectPerson", link: "./attempt/mgmt"},
            ]
        }
    ],
}

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
        // this.upperImage.src = config.upperSrc; // what is rendered above the floor (above the player) like tree tops
        
        this.isCutscenePlaying = false;
    
    }

    drawLowerImage(context, cameraPerson) {
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

        // using "Enter" to check whether there is anyone to talk to
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

        // REFACTOR

        // if hero steps on a 'set' of tiles that triggers 'one' cutscene
        // then remove that 'set' of tiles for that corresponding cutscene from cutsceneSpaces
        // optimize later, dividing by 32 for now, but use proper utils function later
        const hero_tile = `${hero.x},${hero.y}`;
        
        if(hemanth_cutscene_set_of_coords.includes(hero_tile)) {
            for(let i = 0; i < hemanth_cutscene_set_of_coords.length; i++) {
                delete this.cutsceneSpaces[hemanth_cutscene_set_of_coords[i]];
            }
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

        else if(vinamra_cutscene_set_of_coords.includes(hero_tile)) {
            for(let i = 0; i < vinamra_cutscene_set_of_coords.length; i++) {
                delete this.cutsceneSpaces[vinamra_cutscene_set_of_coords[i]];
            }
        }

        else if(shreyas_cutscene_set_of_coords.includes(hero_tile)) {
            for(let i = 0; i < shreyas_cutscene_set_of_coords.length; i++) {
                delete this.cutsceneSpaces[shreyas_cutscene_set_of_coords[i]];
            }
        }

        else if(sumona_cutscene_set_of_coords.includes(hero_tile)) {
            for(let i = 0; i < sumona_cutscene_set_of_coords.length; i++) {
                delete this.cutsceneSpaces[sumona_cutscene_set_of_coords[i]];
            }
        }

        else if(yash_cutscene_set_of_coords.includes(hero_tile)) {
            for(let i = 0; i < yash_cutscene_set_of_coords.length; i++) {
                delete this.cutsceneSpaces[yash_cutscene_set_of_coords[i]];
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
    ACM_MAP: {
        lowerSrc: "./images/acmrpg.png", // current best map is= ./images/official_assets/ourMap32.png
        // upperSrc: "./images/blank_guy.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                src: "./images/Hero.png",
                useShadow: true,
                x: utils.withGrid(28), // Starting point: 28,31
                y: utils.withGrid(35),
            }),

            yash: new Person({
                x: utils.withGrid(18),
                y: utils.withGrid(8),
                src: "./images/yash.png",
                useShadow: true,
                behaviorLoop: [
                    {type: "stand", direction: "left", time: 900},
                    {type: "stand", direction: "down", time: 800},
                    {type: "stand", direction: "left", time: 1200},
                    {type: "stand", direction: "up", time: 300}
                ],
                talking: [
                    {
                        // defined this way so that people can say different things, at different points in time
                        events: [
                            {type: "textMessage", text: "Yash: Young men, listen to the old man,", faceHero: "yash"},
                            {type: "textMessage", text: "to whom the old man heard, when he was young.", faceHero: "yash"},
                        ]
                    },
                ],
            }),

            hemanth: new Person({
                x: utils.withGrid(2),
                y: utils.withGrid(9),
                src: "./images/hemanth.png",
                useShadow: true,
                behaviorLoop: [
                    standLeft("hemanth",800),
                    standUp("hemanth",900),
                    standRight("hemanth",1200),
                    standUp("hemanth",300),
                ],
                talking: [
                    {
                        // defined this way so that people can say different things, at different points in time
                        events: [
                            // independent event where Hemanth gets to say what he wants
                            {type: "textMessage", text: "Hemanth: Hi", faceHero: "hemanth"},
                            {type: "textMessage", text: "Nothing to stalk here"},
                            {type: "textMessage", text: "xD"},
                        ]
                    },
                ]
            }),

            dhriti: new Person({
                x: utils.withGrid(2),
                y: utils.withGrid(31),
                src: "./images/dhriti.png",
                useShadow: true,
                behaviorLoop: [
                    {type: "stand", direction: "down", time: 800},
                    
                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "Dhriti: Design helps me relax", faceHero: "dhriti"},
                        ]
                    },
                ]
            }),

            diya: new Person({
                x: utils.withGrid(16),
                y: utils.withGrid(44),
                src: "./images/diya.png",
                useShadow: true,
                behaviorLoop: [
                    {type: "stand", direction: "left", time: 800},
                    {type: "stand", direction: "up", time: 800},
                    {type: "stand", direction: "right", time: 1200},
                    {type: "stand", direction: "up", time: 300}
                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "Diya: Don't make a Diya joke around me", faceHero: "diya"},
                        ]
                    },
                ]
            }),

            ishi: new Person({
                x: utils.withGrid(11),
                y: utils.withGrid(46),
                src: "./images/ishi.png",
                useShadow: true,
                behaviorLoop: [
                    {type: "stand", direction: "left", time: 700},
                    {type: "stand", direction: "up", time: 900},
                    {type: "stand", direction: "right", time: 900},
                    {type: "stand", direction: "up", time: 400}
                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "Ishi: Hi I'm Ishi", faceHero: "ishi"},
                            {type: "textMessage", text: "And that's NOT my nickname"},
                        ]
                    },
                ]
            }),

            rehber: new Person({
                x: utils.withGrid(30),
                y: utils.withGrid(66),
                src: "./images/rehber.png",
                useShadow: true,
                behaviorLoop: [
                    {type: "stand", direction: "left", time: 800},
                    {type: "stand", direction: "up", time: 800},
                    {type: "stand", direction: "right", time: 1200},
                    {type: "stand", direction: "up", time: 300}
                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "Rehber: Hey, I'm Rehber!", faceHero: "rehber"},
                            {type: "textMessage", text: "I am here to help and guide you in the world of competitive programming.", faceHero: "rehber"},
                            {type: "textMessage", text: "Walk into this portal to be a part of the legendary ACM competitive team.", faceHero: "rehber"},
                        ]
                    },
                ]
            }),

            rishabh: new Person({
                x: utils.withGrid(32),
                y: utils.withGrid(13),
                src: "./images/rishabh.png",
                useShadow: true,
                behaviorLoop: [
                    {type: "stand", direction: "left", time: 800},
                    {type: "stand", direction: "up", time: 800},
                    {type: "stand", direction: "right", time: 1200},
                    {type: "stand", direction: "up", time: 300}
                ],
                talking: [
                    {
                        events: [  // A tour of ACM's events
                            {type: "textMessage", text: "Rishabh: Let me give you a tour of our events", faceHero: "rishabh"},
                            walkRight("hero"),walkUp("hero"),walkRight("hero"),walkRight("hero"),walkRight("hero"),walkRight("hero"),walkRight("hero"),
                            walkUp("hero"),standLeft("hero",200),

                            walkUp("rishabh"),walkLeft("rishabh"),walkUp("rishabh"),walkUp("rishabh"),walkUp("rishabh"),standRight("rishabh",200),                            
                            {type: "textMessage", text: "This is our app centric hackathon, Apptitude,"},
                            {type: "textMessage", text: "in which we gave away over 50k in cash prizes :D"},
                            
                            walkRight("rishabh"),walkRight("rishabh"),
                            {type: "textMessage", text: "This is Reverse Coding, our competitive coding event with a twist,"},
                            {type: "textMessage", text: "which got over 2800 participants this year!"},

                            walkRight("rishabh"),walkRight("rishabh"),walkUp("rishabh"),walkRight("rishabh"),walkRight("rishabh"),
                            standUp("rishabh",200),standUp("hero",200),
                            {type: "textMessage", text: "This is Code2Create, our flagship event."},
                            {type: "textMessage", text: "It is one of VIT's biggest hackathons, where students all across India compete to win."},
                            
                            walkRight("rishabh"),walkRight("rishabh"),walkDown("rishabh"),walkRight("rishabh"),walkRight("rishabh"),walkRight("rishabh"),
                            standUp("rishabh",200),standRight("hero",200),
                            {type: "textMessage", text: "In ACM Bootcamp,"},
                            {type: "textMessage", text: "we introduced newcomers to our domains through many mini projects!"},

                            walkLeft("rishabh"),walkDown("rishabh"),walkLeft("rishabh"),walkLeft("rishabh"),
                            standLeft("rishabh",200),
                            {type: "textMessage", text: "It's fun being a participant,"},
                            {type: "textMessage", text: "however, it's even better being an organizer."},
                            {type: "textMessage", text: "If you choose to join ACMVIT you'll get to learn and grow as person :)"},

                            walkDown("rishabh"),walkLeft("rishabh"),walkLeft("rishabh"),walkLeft("rishabh"),walkLeft("rishabh"),walkLeft("rishabh"),walkLeft("rishabh"),walkLeft("rishabh"),
                            walkDown("rishabh"),walkDown("rishabh"),standUp("rishabh",200),
                        ]
                    },
                ]
            }),

            vinamra: new Person({
                x: utils.withGrid(23),
                y: utils.withGrid(20),
                src: "./images/vinamra.png",
                useShadow: true,
                behaviorLoop: [
                    {type: "stand", direction: "left", time: 800},
                    {type: "stand", direction: "down", time: 800},
                    {type: "stand", direction: "right", time: 1200},
                    {type: "stand", direction: "down", time: 300}
                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "Vinamra: Howdy", faceHero: "vinamra"},
                            {type: "textMessage", text: "I've always loved being in ACMVIT", faceHero: "vinamra"},
                            {type: "textMessage", text: "I hope you join us too!", faceHero: "vinamra"},
                        ]
                    },
                ]
            }),

            // for the mini drone in R&D room
            drone: new Person({
                x: utils.withGrid(23),
                y: utils.withGrid(22),
                src: "./images/drone.png",
                useShadow: true,
                behaviorLoop: [
                    walkRight("drone"),walkRight("drone"),walkRight("drone"),walkRight("drone"),walkRight("drone"),
                    standRight("drone",1000),
                    walkUp("drone"),walkUp("drone"),standRight("drone",1000),
                    walkDown("drone"),walkDown("drone"),
                    walkLeft("drone"),walkLeft("drone"),walkLeft("drone"),walkLeft("drone"),walkLeft("drone"),standRight("drone",1000),
                ],
            }),

            shreyas: new Person({
                x: utils.withGrid(9),
                y: utils.withGrid(20),
                src: "./images/shreyas.png",
                useShadow: true,
                behaviorLoop: [
                    {type: "stand", direction: "left", time: 800},
                    {type: "stand", direction: "down", time: 800},
                    {type: "stand", direction: "right", time: 1200},
                    {type: "stand", direction: "down", time: 300}
                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "Shreyas: Shh, I got social anxiety...", faceHero: "shreyas"},
                            {type: "textMessage", text: "P.S: Why don't you give the Web Domain a try though?", faceHero: "shreyas"},
                        ]
                    },
                ]
            }),

            likhit: new Person({
                x: utils.withGrid(45),
                y: utils.withGrid(37),
                src: "./images/likhit.png",
                useShadow: true,
                behaviorLoop: [
                    {type: "stand", direction: "left", time: 800},
                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "Likhit: Aao friends, chai peelo", faceHero: "likhit"},
                        ]
                    },
                ]
            }),

            theRock: new Person({
                x: utils.withGrid(39),
                y: utils.withGrid(54),
                src: "./images/blankGuy.png",
                useShadow: true,
                behaviorLoop: [
                    {type: "stand", direction: "down", time: 100}
                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "The Rock: It's about drive, it's about power", faceHero: "theRock"},
                            {type: "textMessage", text: "We stay hungry, we devour!", faceHero: "theRock"},
                            {type: "textMessage", text: "Put in the work, put in the hour", faceHero: "theRock"},
                            {type: "textMessage", text: "To take what's ours!!", faceHero: "theRock"},
                        ]
                    },
                ]
            }),

            sumona: new Person({
                x: utils.withGrid(25),
                y: utils.withGrid(37),
                src: "./images/sumona.png",
                useShadow: true,
                behaviorLoop: [
                    {type: "stand", direction: "up", time: 800},
                    {type: "stand", direction: "right", time: 800},
                    {type: "stand", direction: "down", time: 1200},
                    {type: "stand", direction: "right", time: 300}
                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "Sumona: Your path you must decide, young Padawan", faceHero: "sumona"},
                            {type: "textMessage", text: "That was my only Star Wars quote!", faceHero: "sumona"},

                        ]
                    },
                ]
            }),

            ananya: new Person({
                x: utils.withGrid(0),
                y: utils.withGrid(22),
                src: "./images/ananya.png",
                useShadow: true,
                behaviorLoop: [
                    {type: "stand", direction: "down", time: 800},
                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "Ananya: Hey!", faceHero: "ananya"},
                            {type: "textMessage", text: "Your DOM looks good from <head> to </footer>", faceHero: "ananya"},
                        ]
                    },
                ]
            }),

            khub: new Person({
                x: utils.withGrid(42),
                y: utils.withGrid(25),
                src: "./images/khub.png",
                useShadow: true,
                behaviorLoop: [
                    {type: "stand", direction: "left", time: 800},
                    {type: "stand", direction: "down", time: 800},
                    {type: "stand", direction: "right", time: 1200},
                    {type: "stand", direction: "down", time: 300}
                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "Khub: psst", faceHero: "khub"},
                            {type: "textMessage", text: "Have you heard the legend of the 8 secret treasures?", faceHero: "khub"},
                            {type: "textMessage", text: "Rumour has it that if you collect all 8, then something special happens", faceHero: "khub"},
                        ]
                    },
                ]
            }),

            gagan: new Person({
                x: utils.withGrid(37),
                y: utils.withGrid(44),
                src: "./images/gagan.png",
                useShadow: true,
                behaviorLoop: [
                    {type: "stand", direction: "up", time: 500},
                    {type: "stand", direction: "left", time: 1000},
                    {type: "stand", direction: "down", time: 900},
                    {type: "stand", direction: "right", time: 1200},
                    {type: "stand", direction: "down", time: 300}
                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "Gagan: Have you heard of the Styx Project?", faceHero: "gagan"},
                            {type: "textMessage", text: "I'm the guy who made it.", faceHero: "gagan"},
                            {type: "textMessage", text: "Btw, I use Arch", faceHero: "gagan"},
                        ]
                    },
                ]
            }),

            rohan: new Person({
                x: utils.withGrid(3),
                y: utils.withGrid(35),
                src: "./images/rohan.png",
                useShadow: true,
                behaviorLoop: [
                    {type: "stand", direction: "right", time: 800},
                    {type: "stand", direction: "up", time: 800},
                    {type: "stand", direction: "right", time: 1200},
                    {type: "stand", direction: "down", time: 300}
                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "Rohan: Constant is the only change.", faceHero: "rohan"},
                        ]
                    },
                ]
            }),

            ansh: new Person({
                x: utils.withGrid(30),
                y: utils.withGrid(54),
                src: "./images/ansh.png",
                useShadow: true,
                behaviorLoop: [
                    {type: "stand", direction: "up", time: 800},
                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "Ansh: Dive into CC!", faceHero: "ansh"},
                        ]
                    },
                ]
            }),

            manvi: new Person({
                x: utils.withGrid(6),
                y: utils.withGrid(38),
                src: "./images/manvi.png",
                useShadow: true,
                behaviorLoop: [
                    {type: "stand", direction: "up", time: 800},
                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "Manvi: Somethings always never make sense", faceHero: "manvi"},
                        ]
                    },
                ]
            }),

            anmol: new Person({
                x: utils.withGrid(1),
                y: utils.withGrid(44),
                src: "./images/anmol.png",
                useShadow: true,
                behaviorLoop: [
                    {type: "stand", direction: "left", time: 400},
                    {type: "stand", direction: "down", time: 500},
                    {type: "stand", direction: "right", time: 300},
                    {type: "stand", direction: "down", time: 700}
                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "Anmol: I like to move it, move it!", faceHero: "anmol"},
                        ]
                    },
                ]
            }),

            srinivas: new Person({
                x: utils.withGrid(39),
                y: utils.withGrid(38),
                src: "./images/srinivas.png",
                useShadow: true,
                behaviorLoop: [
                    {type: "stand", direction: "down", time: 800},
                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "Srinivas: The taste of water is underrated.", faceHero: "srinivas"},
                        ]
                    },
                ]
            }),

            aishwariya: new Person({
                x: utils.withGrid(43),
                y: utils.withGrid(28),
                src: "./images/aishwariya.png",
                useShadow: true,
                behaviorLoop: [
                    {type: "stand", direction: "left", time: 1200},
                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "Aishwariya: Jack is a dull boy", faceHero: "aishwariya"},
                        ]
                    },
                ]
            }),

            avinaash: new Person({
                x: utils.withGrid(5),
                y: utils.withGrid(13),
                src: "./images/avinaash.png",
                useShadow: true,
                behaviorLoop: [
                    {type: "stand", direction: "up", time: 800},
                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "Avinaash: Your network is you Net Worth!", faceHero: "avinaash"},
                        ]
                    },
                ]
            }),

            samridh: new Person({
                x: utils.withGrid(32),
                y: utils.withGrid(37),
                src: "./images/samridh.png",
                useShadow: true,
                behaviorLoop: [
                    {type: "stand", direction: "up", time: 800},                    
                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "Samridh: Is sleeping for 15 hours alot or is it normal?", faceHero: "samridh"},
                        ]
                    },
                ]
            }),

            vaishnavi: new Person({
                x: utils.withGrid(23),
                y: utils.withGrid(52),
                src: "./images/vaishnavi.png",
                useShadow: true,
                behaviorLoop: [
                    {type: "stand", direction: "right", time: 900},
                    {type: "stand", direction: "down", time: 1000},
                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "Vaishnavi: Here's a tip for interviews,", faceHero: "vaishnavi"},
                            {type: "textMessage", text: "Think out loud", faceHero: "vaishnavi"},

                        ]
                    },
                ]
            }),

            swarup: new Person({
                x: utils.withGrid(10),
                y: utils.withGrid(26),
                src: "./images/swarup.png",
                useShadow: true,
                behaviorLoop: [
                    {type: "stand", direction: "down", time: 800},
                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "Swarup: I solemnly swear I am up to no good", faceHero: "swarup"},
                        ]
                    },
                ]
            }),

            anish: new Person({
                x: utils.withGrid(17),
                y: utils.withGrid(29),
                src: "./images/anish.png",
                useShadow: true,
                behaviorLoop: [
                    {type: "stand", direction: "left", time: 800},
                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "Anish: ACM <3 React", faceHero: "anish"},
                        ]
                    },
                ]
            }),

            chirayu: new Person({
                x: utils.withGrid(40),
                y: utils.withGrid(21),
                src: "./images/chirayu.png",
                useShadow: true,
                behaviorLoop: [
                    {type: "stand", direction: "left", time: 800},
                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "Chirayu: Here's a tip!", faceHero: "chirayu"},
                            {type: "textMessage", text: "Make your selling points clear.", faceHero: "chirayu"},
                        ]
                    },
                ]
            }), 

            rishu: new Person({
                x: utils.withGrid(19),
                y: utils.withGrid(13),
                src: "./images/rishu.png",
                useShadow: true,
                behaviorLoop: [
                    {type: "stand", direction: "left", time: 1200},
                    
                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "Rishu: If you're prepping for an interview,", faceHero: "rishu"},
                            {type: "textMessage", text: "check out the STAR method", faceHero: "rishu"},                            
                        ]
                    },
                ]
            }),

            tejas: new Person({
                x: utils.withGrid(38),
                y: utils.withGrid(51),
                src: "./images/tejas.png",
                useShadow: true,
                behaviorLoop: [
                    {type: "stand", direction: "left", time: 800},
                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "Tejas: I've heard that some rocks on this beach can talk", faceHero: "tejas"},
                        ]
                    },
                ]
            }),

            harsh: new Person({
                x: utils.withGrid(15),
                y: utils.withGrid(71),
                src: "./images/blankGuy.png",
                useShadow: true,
                behaviorLoop: [
                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "Harsh: Congrats on finding the hidden path!", faceHero: "harsh"},
                            {type: "textMessage", text: "Here's a reward for your achievement", faceHero: "harsh"},
                            {type: "textMessage", text: "https://youtu.be/KBL0UYWujMA", faceHero: "harsh"},
                        ]
                    },
                ]
            }),

            aryaman: new Person({
                x: utils.withGrid(17),
                y: utils.withGrid(70),
                src: "./images/blankGuy.png",
                useShadow: true,
                behaviorLoop: [
                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "Aryaman: Hey there!", faceHero: "aryaman"},
                            {type: "textMessage", text: "I hope you enjoyed playing this game as much as we enjoyed making it :)", faceHero: "aryaman"},                            
                        ]
                    },
                ]
            }),

            twitterPerson1: getRoute(31,40,"Twitter", "https://twitter.com/ACM_VIT"),
            twitterPerson2: getRoute(32,40,"Twitter", "https://twitter.com/ACM_VIT"),
            instagramPerson1: getRoute(33,41,"Instagram","https://www.instagram.com/acmvit/"),
            instagramPerson2: getRoute(34,41,"Instagram","https://www.instagram.com/acmvit/"),
            discordPerson1: getRoute(35,40,"Discord", "https://with.acmvit.in/discord"),
            discordPerson2: getRoute(36,40,"Discord", "https://with.acmvit.in/discord"),
            linkedinPerson1: getRoute(37,39,"LinkedIn", "https://www.linkedin.com/company/acmvit/"),
            linkedinPerson2: getRoute(38,39,"LinkedIn", "https://www.linkedin.com/company/acmvit/"),
            facebookPerson1: getRoute(26,42,"Facebook", "https://www.facebook.com/acmvitchapter/"),
            facebookPerson2: getRoute(25,42,"Facebook", "https://www.facebook.com/acmvitchapter/"),
            whatsappPerson1: getRoute(45,32,"Kick Start Learn Program", "https://with.acmvit.in/ksl"),
            whatsappPerson2: getRoute(46,32,"Kick Start Learn Program", "https://with.acmvit.in/ksl"),
            mailboxPerson1: getRoute(39,27,"Email", "https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&source=mailto&to=outreach.acmvit@gmail.com"),
            mailboxPerson2: getRoute(39,28,"Email", "https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&source=mailto&to=outreach.acmvit@gmail.com"),

            // events -
            apptitudePerson1: getRoute(30,8,"Apptitude", "https://apptitude-pwa.vercel.app/"),
            apptitudePerson2: getRoute(31,8,"Apptitude", "https://apptitude-pwa.vercel.app/"),
            rcPerson1: getRoute(32,8,"Reverse Coding Event", "https://rcpc.acmvit.in/"),
            rcPerson2: getRoute(33,8,"Reverse Coding Event", "https://rcpc.acmvit.in/"),
            rcPerson3: getRoute(34,8,"Reverse Coding Event", "https://rcpc.acmvit.in/"),
            c2cPerson1: getRoute(36,7,"Code2Create", "https://c2c-website-2021-git-master-acm-vit.vercel.app/"),
            c2cPerson2: getRoute(37,7,"Code2Create", "https://c2c-website-2021-git-master-acm-vit.vercel.app/"),
            c2cPerson3: getRoute(38,7,"Code2Create", "https://c2c-website-2021-git-master-acm-vit.vercel.app/"),
            c2cPerson4: getRoute(39,7,"Code2Create", "https://c2c-website-2021-git-master-acm-vit.vercel.app/"),
            bootCampPerson1: getRoute(41,8,"Summer Bootcamp", "https://bootcamp-2021-frontend.vercel.app/"),
            bootCampPerson2: getRoute(42,8,"Summer Bootcamp", "https://bootcamp-2021-frontend.vercel.app/"),
            bootCampPerson3: getRoute(43,8,"Summer Bootcamp", "https://bootcamp-2021-frontend.vercel.app/"),

            acmwPerson1: getRoute(21,9,"ACM-W", "https://www.instagram.com/acmwvit/"),
            acmwPerson2: getRoute(22,9,"ACM-W", "https://www.instagram.com/acmwvit/"),
            acmwPerson3: getRoute(23,9,"ACM-W", "https://www.instagram.com/acmwvit/"),
            acmwPerson4: getRoute(24,9,"ACM-W", "https://www.instagram.com/acmwvit/"),
            acmwPerson5: getRoute(25,9,"ACM-W", "https://www.instagram.com/acmwvit/"),
            acmwPerson6: getRoute(26,9,"ACM-W", "https://www.instagram.com/acmwvit/"),
            acmwPerson7: getRoute(27,9,"ACM-W", "https://www.instagram.com/acmwvit/"),
            acmwPerson8: getRoute(28,9,"ACM-W", "https://www.instagram.com/acmwvit/"),










            treasureBox1: getTreasureBox(21,47,"c2c"),
            treasureBox2: getTreasureBox(44,32,"apptitude"),
            treasureBox3: getTreasureBox(32,19,"l2a"),
            treasureBox4: getTreasureBox(26,19,"l2c"),
            treasureBox5: getTreasureBox(43,18,"BTC"),
            treasureBox6: getTreasureBox(15,68,"Stonk"),
            treasureBox7: getTreasureBox(37,50,"ASYNC"),
            treasureBox8: getTreasureBox(12,2,"Hi_Mom"),

        },
        walls: WALLS,
        cutsceneSpaces: {
            ...allCutsceneSpaces,
            ...allRedirects,
        },
    },
}
