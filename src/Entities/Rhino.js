import * as Constants from "../Constants";
import { Entity } from "./Entity";
import { intersectTwoRects, Rect } from "../Core/Utils";

export class Rhino extends Entity {
    assetName =  Constants.ASSETS.RHINO_STANDING;
    
    constructor(x, y) {
        super(x, y);
    }


    calculateDistanceBetweenPoints(point1, point2)
    {
        const xDelta = point1.x - point2.x;
        const yDelta = point1.y - point2.y;
        return Math.sqrt( xDelta*xDelta + yDelta*yDelta);
    }

    calculateHuntingOffsets(skiierPosition, rhinoPosition)
    {
        let deltas = {};
        if (rhinoPosition.y == skiierPosition.y) deltas={'x': Constants.RHINO_SPEED, 'y':0};
        else if (rhinoPosition.x == skiierPosition.x) deltas={'x': 0, 'y': Constants.RHINO_SPEED};
        else {
             let slope = (rhinoPosition.y - skiierPosition.y) / (rhinoPosition.x - skiierPosition.x);
             let xChange = (Constants.RHINO_SPEED / Math.sqrt(1 + (slope * slope))); 
             let yChange = slope * xChange;
             deltas = {'x':xChange, 'y': yChange};
        }
        let potentialRhinoPosition =  {'x':rhinoPosition.x + deltas.x, 'y': rhinoPosition.y + deltas.y};
        if (this.calculateDistanceBetweenPoints(skiierPosition, rhinoPosition) > this.calculateDistanceBetweenPoints(skiierPosition,potentialRhinoPosition))
        {
            return potentialRhinoPosition; 
        }
        return {'x':rhinoPosition.x-deltas.x, 'y':rhinoPosition.y - deltas.y};
    }
    

    huntSkier(skiier)
    {
    
        let skiierPosition = skier.getPosition();
        let rhinoPosition = this.getPosition();
        if(this.calculateDistanceBetweenPoints(skiierPostion, rhinoPosition) < Constants.RHINO_SPEED)
        {
            this.x = skiierPosition.x;
            this.y = skiierPosition.y;
        }
        else
        {
            
        }
    }
}

