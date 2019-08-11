export const GAME_WIDTH = window.innerWidth;
export const GAME_HEIGHT = window.innerHeight;

export const SKIER_JUMP = 'skierJump';
export const SKIER_CRASH = 'skierCrash';
export const SKIER_LEFT = 'skierLeft';
export const SKIER_LEFTDOWN = 'skierLeftDown';
export const SKIER_DOWN = 'skierDown';
export const SKIER_RIGHTDOWN = 'skierRightDown';
export const SKIER_RIGHT = 'skierRight';
export const TREE = 'tree';
export const TREE_CLUSTER = 'treeCluster';
export const ROCK1 = 'rock1';
export const ROCK2 = 'rock2';
export const RHINO_STANDING = 'rhino';
export const RHINO_RUN1 = 'rhinoRun1';
export const RHINO_RUN2 = 'rhinoRun2';

export const SKIER_STARTING_SPEED = 10;
export const SKIER_DIAGONAL_SPEED_REDUCER = 1.4142;
export const SKIER_JUMP_DISTANCE = 300;

export const RHINO_SPEED = 50;

export const ASSETS = {
    [SKIER_CRASH]: 'img/skier_crash.png',
    [SKIER_JUMP]: 'img/skier_jump_1.png',
    [SKIER_LEFT]: 'img/skier_left.png',
    [SKIER_LEFTDOWN]: 'img/skier_left_down.png',
    [SKIER_DOWN]: 'img/skier_down.png',
    [SKIER_RIGHTDOWN]: 'img/skier_right_down.png',
    [SKIER_RIGHT]: 'img/skier_right.png',
    [TREE] : 'img/tree_1.png',
    [TREE_CLUSTER] : 'img/tree_cluster.png',
    [ROCK1] : 'img/rock_1.png',
    [ROCK2] : 'img/rock_2.png',
    [RHINO_STANDING] : 'img/rhino_default.png',
    [RHINO_RUN1]: 'img/rhino_run_left.png',
    [RHINO_RUN2]: 'img/rhino_run_left_2.png',
    
};

export const JUMPABLE_ASSETS = {
    [ROCK1] : true,
    [ROCK2] : true
};

export const SKIER_STATE = {
    CRASH: 0,
    AIR: 1,
    GROUND: 2
};

export const SKIER_DIRECTIONS = {
    LEFT : 1,
    LEFT_DOWN : 2,
    DOWN : 3,
    RIGHT_DOWN : 4,
    RIGHT : 5
};

export const SKIER_ASSET = {
    [SKIER_STATE.CRASH] : {
        [SKIER_DIRECTIONS.LEFT] : SKIER_CRASH,
        [SKIER_DIRECTIONS.LEFT_DOWN] : SKIER_CRASH,
        [SKIER_DIRECTIONS.DOWN] : SKIER_CRASH,
        [SKIER_DIRECTIONS.RIGHT_DOWN] : SKIER_CRASH,
        [SKIER_DIRECTIONS.RIGHT] : SKIER_CRASH
    },
    [SKIER_STATE.GROUND] : {
        [SKIER_DIRECTIONS.LEFT] : SKIER_LEFT,
        [SKIER_DIRECTIONS.LEFT_DOWN] : SKIER_LEFTDOWN,
        [SKIER_DIRECTIONS.DOWN] : SKIER_DOWN,
        [SKIER_DIRECTIONS.RIGHT_DOWN] : SKIER_RIGHTDOWN,
        [SKIER_DIRECTIONS.RIGHT] : SKIER_RIGHT
    },
    [SKIER_STATE.AIR] : {
        [SKIER_DIRECTIONS.LEFT] : SKIER_JUMP,
        [SKIER_DIRECTIONS.LEFT_DOWN] : SKIER_JUMP, 
        [SKIER_DIRECTIONS.DOWN] : SKIER_JUMP,
        [SKIER_DIRECTIONS.RIGHT_DOWN] : SKIER_JUMP,
        [SKIER_DIRECTIONS.RIGHT] : SKIER_JUMP
    }
};

export const KEYS = {
    LEFT : 37,
    RIGHT : 39,
    UP : 38,
    DOWN : 40,
    JUMP: 32
};