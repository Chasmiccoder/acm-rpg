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
}