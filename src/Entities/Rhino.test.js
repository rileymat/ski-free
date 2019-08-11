import "babel-polyfill";

import { Rhino } from "./Rhino";
import { Skier } from "./Skier";

import * as Constants from "../Constants";

test('Hunt stationary skiier', async () => {
    let rhino = new Rhino(0,0);
    let skier = new Skier(100,100);

    while(true) {
        if(rhino.huntSkier(skier)) break;
    }
    expect(rhino.getPosition()).toStrictEqual(skier.getPosition());
});

