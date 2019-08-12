import "babel-polyfill";

import { Rhino } from "./Rhino";
import { Skier } from "./Skier";

import * as Constants from "../Constants";

jest.useFakeTimers();


test('Hunt stationary skier', async () => {
    let rhino = new Rhino(0,0);
    let skier = new Skier(100,100);

    while(true) {
        if(rhino.huntSkier(skier)) break;
    }
    expect(rhino.getPosition()).toStrictEqual(skier.getPosition());
});

test('Hunt slow skier', async () => {
    let rhino = new Rhino(0,0);
    let skier = null;
    //Start slow moving skier out at (100,100)
    for(let i = 100; ;i++) {
        skier = new Skier(i,i);
        if(rhino.huntSkier(skier)) break;
    }
    expect(rhino.getPosition()).toStrictEqual(skier.getPosition());
});

test('Eat Skier', async () => {
    let rhino = new Rhino(0, 0);
    let skier = new Skier(0, 0);
    rhino.eatSkier(skier);
    expect(rhino.isEating()).toBe(true);
    expect(skier.isDead()).toBe(true);    
});


test('Test running animation', async () =>
{
    let rhino = new Rhino(0,0);
    rhino.animateRunning();
    jest.runOnlyPendingTimers();
    expect(rhino.animationState).toBe(Constants.RHINO_RUNNING_ANIMATE_STATE.RUN_LEFT2);
    jest.runOnlyPendingTimers();
    expect(rhino.animationState).toBe(Constants.RHINO_RUNNING_ANIMATE_STATE.RUN_LEFT1);
});

test('Test eating animation', async () =>
{
    let rhino = new Rhino(0,0);
    jest.runOnlyPendingTimers();


    rhino.animateEatSkier();
    expect(rhino.animationState).toBe(Constants.RHINO_EATING_ANIMATE_STATE.RHINO_LIFT);
    
    jest.runOnlyPendingTimers();
    expect(rhino.animationState).toBe(Constants.RHINO_EATING_ANIMATE_STATE.RHINO_LIFT_OPEN_MOUTH);
    

    jest.runOnlyPendingTimers();
    expect(rhino.animationState).toBe(Constants.RHINO_EATING_ANIMATE_STATE.RHINO_LIFT_EAT1);
    

    jest.runOnlyPendingTimers();
    expect(rhino.animationState).toBe(Constants.RHINO_EATING_ANIMATE_STATE.RHINO_LIFT_EAT2);
    

    jest.runOnlyPendingTimers();
    expect(rhino.animationState).toBe(Constants.RHINO_EATING_ANIMATE_STATE.RHINO_LIFT_EAT3);
    

    jest.runOnlyPendingTimers();
    expect(rhino.animationState).toBe(Constants.RHINO_EATING_ANIMATE_STATE.RHINO_LIFT_EAT4);


    jest.runOnlyPendingTimers();
    expect(rhino.animationState).toBe(Constants.RHINO_EATING_ANIMATE_STATE.RHINO_LIFT_EAT3);  //Back to last state for rhino dance.
});