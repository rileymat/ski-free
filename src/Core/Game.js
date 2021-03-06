import * as Constants from "../Constants";
import { AssetManager } from "./AssetManager";
import { Canvas } from './Canvas';
import { Skier } from "../Entities/Skier";
import { Rhino } from "../Entities/Rhino";
import { ObstacleManager } from "../Entities/Obstacles/ObstacleManager";
import { Rect } from './Utils';

export class Game {
    gameWindow = null;

    constructor() {
        this.assetManager = new AssetManager();
        this.canvas = new Canvas(Constants.GAME_WIDTH, Constants.GAME_HEIGHT);
        this.skier = new Skier(0, 0);

        this.obstacleManager = new ObstacleManager();

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    init() {
        this.obstacleManager.placeInitialObstacles();
        let game = this;
        setTimeout( function () {
            game.rhino = new Rhino(game.gameWindow.right, game.gameWindow.bottom);
        }, Constants.SECONDS_UNTIL_RHINO * 1000);
    }

    async load() {
        await this.assetManager.loadAssets(Constants.ASSETS);
    }

    run() {
        this.canvas.clearCanvas();

        this.updateGameWindow();
        this.drawGameWindow();

        requestAnimationFrame(this.run.bind(this));
    }

    updateGameWindow() {
        this.skier.move();
        if(this.rhino && !this.skier.isDead())
        {
            if(this.rhino.huntSkier(this.skier))
            {
                this.rhino.eatSkier(this.skier);
            }
        }

        const previousGameWindow = this.gameWindow;
        this.calculateGameWindow();

        this.obstacleManager.placeNewObstacle(this.gameWindow, previousGameWindow);

        if(this.skier.isInAir())
        {
            if(this.skier.checkIfSkierShouldLand()) this.skier.land();
        }
        
        if(this.skier.checkIfSkierHitObstacle(this.obstacleManager, this.assetManager))
        {
            this.skier.crash();
        }
    }

    drawGameWindow() {
        this.canvas.setDrawOffset(this.gameWindow.left, this.gameWindow.top);
        this.skier.draw(this.canvas, this.assetManager);
        if(this.rhino) this.rhino.draw(this.canvas, this.assetManager);
        this.obstacleManager.drawObstacles(this.canvas, this.assetManager);
        if(this.skier.isDead()) this.drawGameOver();
    }

    drawGameOver()
    {
       this.canvas.writeText("GAME OVER (To restart, press the esc key)", this.gameWindow.left + 20, this.gameWindow.top + 50, Constants.GAME_FONT);
    }

    calculateGameWindow() {
        const skierPosition = this.skier.getPosition();
        const left = skierPosition.x - (Constants.GAME_WIDTH / 2);
        const top = skierPosition.y - (Constants.GAME_HEIGHT / 2);

        this.gameWindow = new Rect(left, top, left + Constants.GAME_WIDTH, top + Constants.GAME_HEIGHT);
    }

    restartGame() {
        location.reload();
    }

    handleKeyDown(event) {
        switch(event.which) {
            case Constants.KEYS.LEFT:
                this.skier.turnLeft(this.obstacleManager, this.assetManager);
                break;
            case Constants.KEYS.RIGHT:
                this.skier.turnRight(this.obstacleManager, this.assetManager);
                break;
            case Constants.KEYS.UP:
                this.skier.turnUp();
                break;
            case Constants.KEYS.DOWN:
                this.skier.turnDown();
                break;
            case Constants.KEYS.JUMP:
                this.skier.jump();
                break;
            case Constants.KEYS.RESTART:
                this.restartGame();
                break;
            default:
                return;
        }
        event.preventDefault();    
    }
}