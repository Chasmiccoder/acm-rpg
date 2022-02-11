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
};

// All redirects to other urls (also triggered by footsteps)
let allRedirects = {
    // REFACTOR

    [utils.asGridCoord(14,5)]: [
        {
            events: [
                {type: "textMessage", text: "Redirecting to the General Technical domain's form!"},
                {type: "redirectPerson", link: "./general_technical"},
            ]
        }
    ],

    [utils.asGridCoord(27,68)]: [
        {
            events: [
                {type: "textMessage", text: "Redirecting to the Competitive Coding Form!"},
                {type: "redirectPerson", link: "./competitive"},
            ]
        }
    ],

    [utils.asGridCoord(-2,31)]: [
        {
            events: [
                {type: "textMessage", text: "Redirecting to the UI/UX Form!"},
                {type: "redirectPerson", link: "./design"},
            ]
        }
    ],

    // [utils.asGridCoord(-2,31)]: [
    //     {
    //         events: [
    //             {type: "textMessage", text: "Redirecting to the UI/UX Form!"},
    //             {type: "redirectPerson", link: "./design"},
    //         ]
    //     }
    // ],



    [utils.asGridCoord(6,44)]: [
        {
            events: [
                {type: "textMessage", text: "Redirecting to the Management Form!"},
                {type: "redirectPerson", link: "./management"},
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
        lowerSrc: "./images/acmrpg.png", // current best map is= ./images/official_assets/ourMap32.png
        // upperSrc: "./images/blank_guy.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                src: "./images/Hero.png",
                useShadow: true,
                x: utils.withGrid(28), // Starting point: 28,31
                y: utils.withGrid(31),// -3,37
            }),

            npcA: new Person({
                x: utils.withGrid(19),
                y: utils.withGrid(9),
                src: "./images/brownGuy1.png",
                useShadow: true,
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

            hemanth: new Person({
                x: utils.withGrid(2),
                y: utils.withGrid(10),
                src: "./images/brownGuy1.png",
                useShadow: true,
                behaviorLoop: [
                    standLeft("hemanth",800),
                    standUp("hemanth",800),
                    standRight("hemanth",1200),
                    standUp("hemanth",300),
                ],
                talking: [
                    {
                        // defined this way so that people can say different things, at different points in time
                        events: [
                            // independent event where Hemanth gets to say what he wants
                            {type: "textMessage", text: "what xD", faceHero: "hemanth"},
                            {type: "textMessage", text: "sup, nothing to stalk here"},
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
                            {type: "textMessage", text: "Don't make a Diya joke around me", faceHero: "diya"},
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
                            {type: "textMessage", text: "Hey, I'm Rehber!", faceHero: "rehber"},
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
                            {type: "textMessage", text: "Let me give you a tour of our events", faceHero: "rishabh"},
                            walkRight("hero"),walkUp("hero"),walkRight("hero"),walkRight("hero"),walkRight("hero"),walkRight("hero"),walkRight("hero"),
                            walkUp("hero"),standLeft("hero",200),

                            walkUp("rishabh"),walkLeft("rishabh"),walkUp("rishabh"),walkUp("rishabh"),walkUp("rishabh"),standRight("rishabh",200),                            
                            {type: "textMessage", text: "This is our app centric hackathon, Apptitude,"},
                            {type: "textMessage", text: "Where we gave away over 50k in cash prizes :D"},
                            
                            walkRight("rishabh"),walkRight("rishabh"),
                            {type: "textMessage", text: "This is Reverse Coding, our competitive coding event with a twist"},
                            {type: "textMessage", text: "which got over 2800 participants this year!"},

                            walkRight("rishabh"),walkRight("rishabh"),walkUp("rishabh"),walkRight("rishabh"),walkRight("rishabh"),
                            standUp("rishabh",200),standUp("hero",200),
                            {type: "textMessage", text: "This is Code2Create, our flagship hackathon,"},
                            {type: "textMessage", text: "Where participants from all over the world compete to win."},
                            
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
                            {type: "textMessage", text: "It's about drive, it's about power", faceHero: "vinamra"},
                        ]
                    },
                ]
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
                            {type: "textMessage", text: "Shh, I got social anxiety...", faceHero: "shreyas"},
                            {type: "textMessage", text: "P.S: Why don't you give the web domain a try though?", faceHero: "shreyas"},
                        ]
                    },
                ]
            }),

            theRock: new Person({
                x: utils.withGrid(38),
                y: utils.withGrid(54),
                src: "./images/theRock.png",
                useShadow: true,
                behaviorLoop: [
                    {type: "stand", direction: "down", time: 100}
                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "Dwayne: It's about drive, it's about power", faceHero: "theRock"},
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
                    {type: "stand", direction: "left", time: 800},
                    {type: "stand", direction: "down", time: 800},
                    {type: "stand", direction: "right", time: 1200},
                    {type: "stand", direction: "down", time: 300}
                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "It's about drive, it's about power", faceHero: "sumona"},
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
            linkedinPerson1: getRoute(37,39,"LinkedIn", "https://www.linkedin.com/company/acm-vit/"),
            linkedinPerson2: getRoute(38,39,"LinkedIn", "https://www.linkedin.com/company/acm-vit/"),
            facebookPerson1: getRoute(26,42,"Facebook", "https://www.facebook.com/acmvitchapter/"),
            facebookPerson2: getRoute(25,42,"Facebook", "https://www.facebook.com/acmvitchapter/"),
            whatsappPerson1: getRoute(45,32,"Kick Start Learn Program", "https://with.acmvit.in/ksl"),
            whatsappPerson2: getRoute(46,32,"Kick Start Learn Program", "https://with.acmvit.in/ksl"),

            treasureBox1: getTreasureBox(21,47,1),
            treasureBox2: getTreasureBox(44,32,2),
            treasureBox3: getTreasureBox(32,19,3),
            treasureBox4: getTreasureBox(26,19,4),
            treasureBox5: getTreasureBox(43,18,5),
            treasureBox6: getTreasureBox(15,68,6),
            treasureBox7: getTreasureBox(37,50,7),
            treasureBox8: getTreasureBox(12,2,8),

        },
        walls: WALLS,
        cutsceneSpaces: {
            ...allCutsceneSpaces,
            ...allRedirects,
        },
    },
}
