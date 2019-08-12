import "babel-polyfill";

import { distanceBetweenPoints, pointBetweenTwoPointsAtDistance } from "./Utils";

test('Whole number distance between points', () => {
    let point1 = {
        'x': 4,
        'y': 0
    };
    let point2 = {
        'x': 0,
        'y': 3
    };
    expect(distanceBetweenPoints(point1, point2)).toBe(5);
});

test('Test floating point distance between points', () => {
    let point1 = {
        'x': 4.5,
        'y': 0
    };
    let point2 = {
        'x': 0,
        'y': 3.2
    };
    expect(distanceBetweenPoints(point1, point2)).toBeCloseTo(5.52);
});

test('Test 0 distance between points', () => {
    let point1 = {
        'x': 4.5,
        'y': 0
    };
    expect(distanceBetweenPoints(point1, point1)).toBe(0);
});

test('Test midpoint when points are closer than distance', () => {
    let point1 = {
        'x': 4,
        'y': 0
    };
    let point2 = {
        'x': 0,
        'y': 3
    };
    expect(pointBetweenTwoPointsAtDistance(point1, point2, 5.2)).toBe(null);
});


test('Test point at exact distance', () => {
    let point1 = {
        'x': 4,
        'y': 0
    };
    let point2 = {
        'x': 0,
        'y': 3
    };
    let pointBetweenPoints = pointBetweenTwoPointsAtDistance(point1, point2, 5)
    expect(pointBetweenPoints.x).toBe(0);
    expect(pointBetweenPoints.y).toBe(3);
});

test('Test midpoint between two points', () => {
    let point1 = {
        'x': 0,
        'y': 0
    };
    let point2 = {
        'x': 8,
        'y': 6
    };
    let pointBetweenPoints = pointBetweenTwoPointsAtDistance(point1, point2, 5)
    expect(pointBetweenPoints.x).toBe(4);
    expect(pointBetweenPoints.y).toBe(3);
});

test('Test midpoints on y-axis', () => {
    let point1 = {
        'x': 0,
        'y': 0
    };
    let point2 = {
        'x': 0,
        'y': 6
    };
    let pointBetweenPoints = pointBetweenTwoPointsAtDistance(point1, point2, 5)
    expect(pointBetweenPoints.x).toBe(0);
    expect(pointBetweenPoints.y).toBe(5);
});

test('Test midpoints on x-axis', () => {
    let point1 = {
        'x': 0,
        'y': 0
    };
    let point2 = {
        'x': 6,
        'y': 0
    };
    let pointBetweenPoints = pointBetweenTwoPointsAtDistance(point1, point2, 5)
    expect(pointBetweenPoints.x).toBe(5);
    expect(pointBetweenPoints.y).toBe(0);
});
