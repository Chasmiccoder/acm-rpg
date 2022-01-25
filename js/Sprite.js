class Sprite {
    constructor(config) {
        // set up the image
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            this.isLoaded = true;
        }

        this.shadow = new Image();
        this.useShadow = true; // later,  config.useShadow || false;

        if(this.useShadow) {
            this.shadow.src = "./images/shadow.png";
        }
        
        this.shadow.onload = () => {
            this.isShadowLoaded = true;
        }
        
        // configure animations and initial state
        this.animations = config.animations || {
            "idle-down":  [[0,0]],
            "idle-right": [[0,1]],
            "idle-up":    [[0,2]],
            "idle-left":  [[0,3]],
        
            "walk-down":  [[1,0], [0,0], [3,0], [0,0]],
            "walk-right": [[1,1], [0,1], [3,1], [0,1]],
            "walk-up":    [[1,2], [0,2], [3,2], [0,2]],
            "walk-left":  [[1,3], [0,3], [3,3], [0,3]],
        }

        this.currentAnimation = "idle-right"//config.currentAnimation || "idle-down";
        this.currentAnimationFrame = 0;

        // how many game loop frames to show one cut from the sprite sheet
        this.animationFrameLimit = config.animationFrameLimit || 8; // change this to 4, 8 or 16 depending on how slow you want the animation to be
        this.animationFrameProgress = this.animationFrameLimit;

        // reference the game object
        this.gameObject = config.gameObject;
        
    }

    get frame() {
        return this.animations[this.currentAnimation][this.currentAnimationFrame];
    }

    setAnimation(key) {
        if(this.currentAnimation !== key) {
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationFrameLimit;
        }
    }


    updateAnimationProgress() {
        // downtick current frame's progress
        if(this.animationFrameProgress > 0) {
            this.animationFrameProgress -= 1;
            return;
        }

        // reset the counter
        this.animationFrameProgress = this.animationFrameLimit;
        this.currentAnimationFrame += 1;
        
        if(this.frame === undefined) {
            this.currentAnimationFrame = 0;
        }
    }

    draw(context, cameraPerson) {
        const x = this.gameObject.x - 8 + utils.withGrid(10.5) - cameraPerson.x;
        const y = this.gameObject.y - 18 + utils.withGrid(6) - cameraPerson.y;

        this.isShadowLoaded && context.drawImage(this.shadow, x, y);

        const [frameX, frameY] = this.frame;

        this.isLoaded && context.drawImage(this.image,
            frameX * 32, frameY * 32, // *32 because the spritesheet cut is 32 by 32
            32,32,
            x,y, // to make it look like the hero is levitating: y-16
            32,32
        );

        this.updateAnimationProgress();
    }
}