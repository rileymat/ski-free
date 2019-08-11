import * as Constants from "../Constants";
import { Entity } from "./Entity";
import { intersectTwoRects, Rect } from "../Core/Utils";

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

    updateAsset()
    {
        this.assetName = Constants.RHINO_ASSET[this.state][this.animationState];
    }


    calculateDistanceBetweenPoints(point1, point2)
    {
        const xDelta = point1.x - point2.x;
        const yDelta = point1.y - point2.y;
        return Math.sqrt( xDelta*xDelta + yDelta*yDelta);
    }

    calculateInterceptPosition(skierPosition, rhinoPosition)
    {
        let deltas = {};
        if (rhinoPosition.y == skierPosition.y) deltas={'x': Constants.RHINO_SPEED, 'y':0};
        else if (rhinoPosition.x == skierPosition.x) deltas={'x': 0, 'y': Constants.RHINO_SPEED};
        else {
             let slope = (rhinoPosition.y - skierPosition.y) / (rhinoPosition.x - skierPosition.x);
             let xChange = (Constants.RHINO_SPEED / Math.sqrt(1 + (slope * slope))); 
             let yChange = slope * xChange;
             deltas = {'x':xChange, 'y': yChange};
        }
        let potentialRhinoPosition =  {'x':rhinoPosition.x + deltas.x, 'y': rhinoPosition.y + deltas.y};
        if (this.calculateDistanceBetweenPoints(skierPosition, rhinoPosition) > this.calculateDistanceBetweenPoints(skierPosition,potentialRhinoPosition))
        {
            return potentialRhinoPosition; 
        }
        return {'x':rhinoPosition.x-deltas.x, 'y':rhinoPosition.y - deltas.y};
    }
    
    animateRunning()
    {
        let rhinoSprite = this;
        this.runningAnimationTimeout = setTimeout( function() {
            rhinoSprite.animationState = rhinoSprite.animationState ? 0 : 1;  //Toggle animation to simulate running
            rhinoSprite.updateAsset();
            rhinoSprite.animateRunning();
            console.log("Setting Timeout");
        }, 250)
    }
    
    huntSkier(skier)
    {
        let skierPosition = skier.getPosition();
        let rhinoPosition = this.getPosition();
        if(this.calculateDistanceBetweenPoints(skierPosition, rhinoPosition) <= Constants.RHINO_SPEED)
        {
            this.x = skierPosition.x;
            this.y = skierPosition.y;
            return true;
        }
        else
        {
            let interceptPosition = this.calculateInterceptPosition(skierPosition, rhinoPosition);
            this.x = interceptPosition.x;
            this.y = interceptPosition.y;
            if(!this.runningAnimationTimeout) this.animateRunning();
            return false;
        }
    }
}

