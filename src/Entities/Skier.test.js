import "babel-polyfill";

import { Skier } from "./Skier";
import * as Constants from "../Constants";

import { ObstacleManager } from "./Obstacles/ObstacleManager.js";
import { AssetManager } from "../Core/AssetManager.js";


let obstacleManager = new ObstacleManager();
let assetManager = new AssetManager();
assetManager.getAsset = ()=> ({'height': 10, 'width':10});

test('Turn left  when crashed', async () => {
    let skier = new Skier(0,0);
    skier.crash();
    skier.turnLeft(obstacleManager, assetManager);
    expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT);
});

test('Turn right when crashed', async () => {
    let skier = new Skier(0,0);
    skier.crash();
    skier.turnRight(obstacleManager, assetManager);
    expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.RIGHT);
});

test('Turn right when going down (default)', async () => {
    let skier = new Skier(0,0);
    skier.turnRight(obstacleManager, assetManager);
    expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.RIGHT_DOWN);
});

test('Turn left when going down (default)', async () => {
    let skier = new Skier(0,0);
    skier.turnLeft(obstacleManager, assetManager);
    expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT_DOWN);
});

test('Turn right when going down right', async () => {
    let skier = new Skier(0,0);
    skier.direction = Constants.SKIER_DIRECTIONS.RIGHT;
    skier.turnRight(obstacleManager, assetManager);
    expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.RIGHT);
    let skierPosition = skier.getPosition();
    expect(skierPosition.y).toBe(0);
    expect(skierPosition.x).toBeGreaterThan(0);
});

test('Turn left when going left', async () => {
    let skier = new Skier(0,0);
    skier.direction = Constants.SKIER_DIRECTIONS.LEFT;
    skier.turnLeft(obstacleManager, assetManager);
    expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT);
    let skierPosition = skier.getPosition();
    expect(skierPosition.y).toBe(0);
    expect(skierPosition.x).toBeLessThan(0);
});
