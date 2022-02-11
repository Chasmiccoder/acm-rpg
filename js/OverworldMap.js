// for redirects to Twitter, Instagram, etc
const getRoute = (x,y, name, link) =>{
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
        console.log({match});

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
        lowerSrc: "./images/acmrpg.png", // current best map is= ./images/official_assets/ourMap32.png
        // upperSrc: "./images/blank_guy.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                src: "./images/Hero.png",
                useShadow: true,
                x: utils.withGrid(28), // Starting point: 28,32
                y: utils.withGrid(32),
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
            treasureBox2: getTreasureBox(-2,37,2),
            treasureBox3: getTreasureBox(44,32,3),
            treasureBox4: getTreasureBox(32,19,4),
            treasureBox5: getTreasureBox(26,19,5),
            treasureBox6: getTreasureBox(43,18,6),
            treasureBox7: getTreasureBox(15,68,7),
            treasureBox8: getTreasureBox(37,50,8),
            treasureBox9: getTreasureBox(12,2,9),

        },
        walls: WALLS,
        cutsceneSpaces: {
            // scope for refactoring
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

            [utils.asGridCoord(14,5)]: [
                {
                    events: [
                        {type: "textMessage", text: "Redirecting to the Technical Form!"},
                        {type: "redirectPerson", link: "./technical"},
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
                        {type: "textMessage", text: "Redirecting to the Design Form!"},
                        {type: "redirectPerson", link: "./design"},
                    ]
                }
            ],

            [utils.asGridCoord(6,44)]: [
                {
                    events: [
                        {type: "textMessage", text: "Redirecting to the Management Form!"},
                        {type: "redirectPerson", link: "./management"},
                    ]
                }
            ],
        }
    },
}
