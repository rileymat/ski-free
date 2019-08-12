import * as Constants from "../Constants";
import { Entity } from "./Entity";
import { intersectTwoRects, Rect } from "../Core/Utils";

export class Skier extends Entity {

    state = Constants.SKIER_STATE.GROUND;
    direction = Constants.SKIER_DIRECTIONS.DOWN;
    speed = Constants.SKIER_STARTING_SPEED;

    
    constructor(x, y) {
        super(x, y);
        this.updateAsset();
    }

    setDirection(direction) {
        this.direction = direction;
        this.updateAsset();
    }
    
    setState(state) {
        this.state = state;
        this.updateAsset();
    }

    updateAsset() {
        this.assetName = Constants.SKIER_ASSET[this.state][this.direction];
    }

    move() {
        switch(this.direction) {
            case Constants.SKIER_DIRECTIONS.LEFT_DOWN:
                this.moveSkierLeftDown();
                break;
            case Constants.SKIER_DIRECTIONS.DOWN:
                this.moveSkierDown();
                break;
            case Constants.SKIER_DIRECTIONS.RIGHT_DOWN:
                this.moveSkierRightDown();
                break;
        }
    }

    moveSkierLeft() {
        this.x -= Constants.SKIER_STARTING_SPEED;
    }

    moveSkierLeftDown() {
        this.x -= this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveSkierDown() {
        this.y += this.speed;
    }

    moveSkierRightDown() {
        this.x += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveSkierRight() {
        this.x += Constants.SKIER_STARTING_SPEED;
    }

    moveSkierUp() {
        this.y -= Constants.SKIER_STARTING_SPEED;
    }
    
    moveSkierToSaftey(obstacleManager, assetManager) {
        while(this.checkIfSkierHitObstacle(obstacleManager, assetManager)) this.moveSkierUp();
    }

    turnLeft(obstacleManager, assetManager) {
        if(this.state === Constants.SKIER_STATE.GROUND && this.direction === Constants.SKIER_DIRECTIONS.LEFT) {
            this.moveSkierLeft();
        }
        else if(this.state === Constants.SKIER_STATE.AIR){/*place for trick*/}
        else if(this.state === Constants.SKIER_STATE.DEAD) {}
        else if(this.state === Constants.SKIER_STATE.CRASH) {
            this.setDirection(Constants.SKIER_DIRECTIONS.LEFT);
            this.setState(Constants.SKIER_STATE.GROUND);
            this.moveSkierToSaftey(obstacleManager, assetManager);
        }
        else {
            this.setDirection(this.direction - 1);
        }
    }

    turnRight(obstacleManager, assetManager) {
        
        if(this.state === Constants.SKIER_STATE.GROUND && this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            this.moveSkierRight();
        }
        else if(this.state === Constants.SKIER_STATE.AIR){/*place for trick*/}
        else if(this.state === Constants.SKIER_STATE.DEAD) {}
        else if(this.state === Constants.SKIER_STATE.CRASH) {
            this.setDirection(Constants.SKIER_DIRECTIONS.RIGHT);
            this.setState(Constants.SKIER_STATE.GROUND);
            this.moveSkierToSaftey(obstacleManager, assetManager);
        }
        else {
            this.setDirection(this.direction + 1);
        }
    }

    turnUp() {
        if(this.state === Constants.SKIER_STATE.GROUND && (this.direction === Constants.SKIER_DIRECTIONS.LEFT || this.direction === Constants.SKIER_DIRECTIONS.RIGHT)) {
            this.moveSkierUp();
        }
    }

    turnDown() {
        if(!(this.state === Constants.SKIER_STATE.CRASH || this.state == Constants.SKIER_STATE.DEAD))
        {
            this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
            this.speed = Constants.SKIER_STARTING_SPEED;
        }
    }

    crash() {
        this.speed = 0;
        this.setState(Constants.SKIER_STATE.CRASH);
    }
    
    jump() {
        if(this.state !== Constants.SKIER_STATE.CRASH) {
            this.setState(Constants.SKIER_STATE.AIR);
            this.lastJumpLocation = this.getPosition().y;
        }
    }
    
    isInAir() {
        return this.state === Constants.SKIER_STATE.AIR;
    }
    
    checkIfSkierShouldLand() {
        let currentPosition = this.getPosition().y;
        return(currentPosition - this.lastJumpLocation > Constants.SKIER_JUMP_DISTANCE);
    }
    
    land() {
        this.setState(Constants.SKIER_STATE.GROUND);
    }
    
    die()
    {
        this.speed = 0;
        this.setState(Constants.SKIER_STATE.DEAD);
    }
    
    isDead()
    {
        return (this.state === Constants.SKIER_STATE.DEAD);
    }

    checkIfSkierHitObstacle(obstacleManager, assetManager) {
 
        const skierBounds = this.getAssetBounds(assetManager);
           
        const collision = obstacleManager.getObstacles().find((obstacle) =>
        {
            const obstacleAssetName = obstacle.getAssetName();
            
            if(this.isInAir() && Constants.JUMPABLE_ASSETS[obstacleAssetName]){
                return false;
            }
            const obstacleBounds = obstacle.getAssetBounds(assetManager);
            return intersectTwoRects(skierBounds, obstacleBounds);
        });
        
        return collision;
    };
}
