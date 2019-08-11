import "babel-polyfill";

import { Skier } from "./Skier";
import * as Constants from "../Constants";

import { ObstacleManager } from "./Obstacles/ObstacleManager.js";
import { AssetManager } from "../Core/AssetManager.js";


let obstacleManager = new ObstacleManager();
let assetManager = new AssetManager();
assetManager.getAsset = ()=> ({'height': 10, 'width':10});

test('Turn Left Turn When Crashed', async () => {
    let skier = new Skier(0,0);
    skier.crash();
    skier.turnLeft(obstacleManager, assetManager);
    expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT);
});

test('Turn Right Turn When Crashed', async () => {
    let skier = new Skier(0,0);
    skier.crash();
    skier.turnRight(obstacleManager, assetManager);
    expect(skier.direction).toBe(Constants.SKIER_DIRECTIONS.RIGHT);
});
