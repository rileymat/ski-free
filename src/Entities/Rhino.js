import * as Constants from "../Constants";
import { Entity } from "./Entity";
import { intersectTwoRects, Rect } from "../Core/Utils";

export class Rhino extends Entity {
    assetName =  Constants.RHINO_STANDING;
    
    constructor(x, y) {
        super(x, y);
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
            this.y = interceptPosition.y
            return false;
        }
    }
}

