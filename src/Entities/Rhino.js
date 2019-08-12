import * as Constants from "../Constants";
import { Entity } from "./Entity";
import { intersectTwoRects, Rect, distanceBetweenPoints, pointBetweenTwoPointsAtDistance } from "../Core/Utils";


export class Rhino extends Entity {
    assetName = Constants.RHINO_RUN1;
    state = Constants.RHINO_STATE.RUNNING;
    animationState = Constants.RHINO_RUNNING_ANIMATE_STATE.RUN_LEFT1;
    
    constructor(x, y) {
        super(x, y);
    }

    setState(state){
        this.state = state;
        this.updateAsset();
    }
    setAnimationState(animationState)
    {
        this.animationState = animationState;
        this.updateAsset();
    }

    updateAsset()
    {
        this.assetName = Constants.RHINO_ASSET[this.state][this.animationState];
    }

    calculateDistanceBetweenPoints(point1, point2)
    {
        return distanceBetweenPoints(point1, point2);
    }

    calculateInterceptPosition(skierPosition, rhinoPosition)
    {
        let nextInterceptPoint = pointBetweenTwoPointsAtDistance(rhinoPosition, skierPosition, Constants.RHINO_SPEED);
        if (nextInterceptPoint == null)
        {
            nextInterceptPoint = skierPosition;
        }
        return nextInterceptPoint;
    }
    
    animateRunning()
    {
        let rhinoSprite = this;
        this.runningAnimationTimeout = setTimeout( function() {
            rhinoSprite.animationState = rhinoSprite.animationState ? 0 : 1;  //Toggle animation to simulate running
            rhinoSprite.updateAsset();
            rhinoSprite.animateRunning();
        }, 250)
    }
    
    stopAnimateRunning()
    {
        if(this.runningAnimationTimeout){
            clearTimeout(this.runningAnimationTimeout);
            this.runningAnimationTimeout = null;
         }
    }
    
    huntSkier(skier)
    {
        let skierPosition = skier.getPosition();
        let rhinoPosition = this.getPosition();
        let interceptPosition = this.calculateInterceptPosition(skierPosition, rhinoPosition);
        this.x = interceptPosition.x;
        this.y = interceptPosition.y;
        if(!this.runningAnimationTimeout) this.animateRunning();
        return (this.x == skier.x && this.y == skier.y);
    }

    eatSkierAnimation(rhino)
    {
       if(!rhino.eatingAnimationTimeout) rhino.setAnimationState(Constants.RHINO_EATING_ANIMATE_STATE.RHINO_LIFT);
       rhino.eatingAnimationTimeout = setTimeout( function()
       {
             if(rhino.animationState < Constants.RHINO_EATING_ANIMATE_STATE.RHINO_LIFT_EAT4)
             {
                rhino.setAnimationState(rhino.animationState + 1);
             }
             else
             {
                rhino.setAnimationState(rhino.animationState -1);
             }
             rhino.eatSkierAnimation(rhino);
       }, 1000);
    }

    eatSkier(skier)
    {
        this.setState(Constants.RHINO_STATE.EATING);
        skier.die();

        if(!this.eatingAnimationTimeout) {
            this.stopAnimateRunning();
            this.eatSkierAnimation(this);
        }
    }
}

