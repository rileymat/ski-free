export function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function intersectTwoRects(rect1, rect2) {
    return !(rect2.left > rect1.right ||
        rect2.right < rect1.left ||
        rect2.top > rect1.bottom ||
        rect2.bottom < rect1.top);
}

export function distanceBetweenPoints(point1, point2)
{
     const xDelta = point1.x - point2.x;
     const yDelta = point1.y - point2.y;
     return Math.sqrt(xDelta*xDelta + yDelta*yDelta);
}

export function pointBetweenTwoPointsAtDistance(startPoint, endPoint, distance)
{
        let deltas = {};
        let currentDistanceBetweenPoints = distanceBetweenPoints(startPoint, endPoint);

        if ( currentDistanceBetweenPoints < distance) return null; //current points are shorter than distance so there is no midpoint.
        
        if (startPoint.y == endPoint.y) deltas={'x': distance, 'y':0};
        else if (startPoint.x == endPoint.x) deltas={'x': 0, 'y': distance};
        else {
             let slope = (startPoint.y - endPoint.y) / (startPoint.x - endPoint.x);
             let xChange = (distance / Math.sqrt(1 + (slope * slope))); 
             let yChange = slope * xChange;
             deltas = {'x':xChange, 'y': yChange};
        }
        
        let candidateMidPoint = {'x':startPoint.x + deltas.x, 'y': startPoint.y + deltas.y};
        if (currentDistanceBetweenPoints < distanceBetweenPoints(endPoint, candidateMidPoint))
        {
            candidateMidPoint = {'x':startPoint.x - deltas.x, 'y': startPoint.y - deltas.y}
        }
        return candidateMidPoint;
}

export class Rect {
    left = 0;
    top = 0;
    right = 0;
    bottom = 0;

    constructor(left, top, right, bottom) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }
}