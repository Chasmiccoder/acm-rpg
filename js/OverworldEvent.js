class OverworldEvent {
    constructor({map, event}) {
        this.map = map;
        this.event = event;
    }

    init() {
        return new Promise(resolve => {
            this[this.event.type](resolve)
        })
    }

    stand(resolve) {
        const who = this.map.gameObjects[this.event.who];
        who.startBehavior({
            map: this.map
        }, {
            type: "stand",
            direction: this.event.direction,
            time: this.event.time
        })

        const completeHandler = (e) => {
            if(e.detail.whoId === this.event.who) {
                document.removeEventListener("PersonStandComplete", completeHandler);
                resolve();
            }
        }
        document.addEventListener("PersonStandComplete", completeHandler);




    }

    walk(resolve) {
        const who = this.map.gameObjects[this.event.who];
        who.startBehavior({
            map: this.map
        }, {
            type: "walk",
            direction: this.event.direction,
            retry: true // if true, then the game object retries its movement after an interrupt (get an npc to start walking again after collision with the player)
        })

        // Set up a handler to complete when the correct person is done walking.
        // Then resolve the event
        const completeHandler = (e) => {
            if(e.detail.whoId === this.event.who) {
                document.removeEventListener("PersonWalkingComplete", completeHandler);
                resolve();
            }
        }
        document.addEventListener("PersonWalkingComplete", completeHandler);
    }

    textMessage(resolve) {

        if(this.event.faceHero) { // this.event.faceHero = id of the npc to face that will face the hero
            const obj = this.map.gameObjects[this.event.faceHero];
            obj.direction = utils.oppositeDirection(this.map.gameObjects['hero'].direction);
        }

        const message = new TextMessage({   
            text: this.event.text,
            onComplete: () => resolve()
        });

        message.init(document.querySelector('.game-container'));
    }

    changeMap(resolve) {
        const sceneTransition = new SceneTransition();

        sceneTransition.init(document.querySelector('.game-container'), () => {
            this.map.overworld.startMap(window.OverworldMaps[this.event.map]); // the value this.event.map is referencing {type: "changeMap", map: "Kitchen"}  in OverworldMap
            resolve(); 

            sceneTransition.fadeOut();
        });
    }
}