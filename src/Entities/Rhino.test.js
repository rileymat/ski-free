import "babel-polyfill";

import { Rhino } from "./Rhino";
import { Skier } from "./Skier";

import * as Constants from "../Constants";

test('Hunt stationary skiier', async () => {
    let rhino = new Rhino(0,0);
    let skier = new Skier(100,100);
    //Should take 3 iterations to move from (0,0) to (100,100) at 50 speed
    rhino.huntSkier(skier);
    rhino.huntSkier(skier);
    rhino.huntSkier(skier);
    expect(rhino.getPosition()).toStrictEqual(skier.getPosition());
});

