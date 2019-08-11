import "babel-polyfill";

import { Rhino } from "./Rhino";
import * as Constants from "../Constants";

test('CheckRhinoHuntingDeltas', async () => {
    let rhino = new Rhino(0,0);
    var position;
    console.log(position = rhino.calculateHuntingOffsets({'x':0, 'y':0}, {'x':100, 'y':100}));
    console.log(position = rhino.calculateHuntingOffsets({'x':0, 'y':0}, position));
    console.log(position = rhino.calculateHuntingOffsets({'x':0, 'y':0}, position));
});

