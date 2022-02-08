class GameObject {  // all people
    constructor(config) {
        this.id = null;         // name passed in overworld map like 'hero', 'npcA', 'npcB'
        this.isMounted = false; // turns true once the game object gets mounted
        this.x = config.x || 0; // current x and y coordinates of the character
        this.y = config.y || 0;
        this.direction = config.direction || "down"; // current direction of the character
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "./images/hero.png", // link to the character's spritesheet
        });

        this.behaviorLoop = config.behaviorLoop || []; // used for the behavior of npcs. This is a list of objects with the behavior type, which is defined in OverworldMap.js
        this.behaviorLoopIndex = 0; // keeps track of 
        this.talking = config.talking || [];
    }

    mount(map) {
        console.log("Mounting");
        this.isMounted = true;
        map.addWall(this.x, this.y);

        // if we have a behavior, kick it off after a short delay
        // applies to the behavior of npcs
        setTimeout(() => {
            this.doBehaviorEvent(map);
        }, 10);
    }

    update() {
    }

    // mostly for npcs
    async doBehaviorEvent(map) {
        // maybe the game object has no current behaviour or there's a global event (like a cutscene)
        // also return; if the person is currently standing
        if(map.isCutscenePlaying || this.behaviorLoop.length === 0 || this.isStanding) {
            return;
        }

        // setting up the event with the relevant info
        let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
        eventConfig.who = this.id;

        // create an event instance out of our next event config
        const eventHandler = new OverworldEvent({map, event: eventConfig});
        await eventHandler.init(); // wait until the event gets revolved

        // setting the next event to fire
        this.behaviorLoopIndex += 1;
        if(this.behaviorLoopIndex === this.behaviorLoop.length) {
            this.behaviorLoopIndex = 0;
        }
        // fire the next behavior
        this.doBehaviorEvent(map);
    }
}
