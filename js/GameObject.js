class GameObject {
    constructor(config) {
        this.id = null;
        this.isMounted = false;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "down";
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "./images/hero.png",
        });

        this.behaviorLoop = config.behaviorLoop || [];
        this.behaviorLoopIndex = 0;
    }

    mount(map) {
        console.log("Mounting");
        this.isMounted = true;
        map.addWall(this.x, this.y);

        // if we have a behavior, kick it off after a short delay
        setTimeout(() => {
            this.doBehaviorEvent(map);
        }, 10);
    }

    update() {
    }

    async doBehaviorEvent(map) {

        // maybe the game object has no current behaviour or there's a global event (like a cutscene)
        if(map.isCutscenePlaying || this.behaviorLoop.length === 0) {
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