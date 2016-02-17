window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        // Load all images and sprites.
        game.load.image('background', 'assets/underwater-bubbles-4055.jpg');
        game.load.tilemap('tileset', 'assets/underwater-tiles.json',null,Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles','assets/tiles_underwater.png');
        game.load.spritesheet('shark', 'assets/shark-sprite.png',120,99);
        game.load.spritesheet('blue', 'assets/BlueFish4.png',1435, 1080);
        
    }
    
    var map;
    var layer;
    var shark;
    var cursors;
    var bluefishies;
    var purplefishies;
    var bluefish;
    var purplefish;
    
    function create() {
        // Start physics.
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Create large static background and set its bounds.
        game.add.tileSprite(0,0,1920,1080,'background');
        game.world.setBounds(0,0,1920,1080);
        
        // Add underwater tilemap and layer.
        map = game.add.tilemap('tileset');
        map.addTilesetImage('Underwater','tiles');
        layer = map.createLayer('Tile Layer 1');
        layer.resizeWorld();
        map.setCollision(27, true, layer);
        
        // Add the shark/player.
        shark = game.add.sprite(64,64,'shark');
        shark.scale.setTo(0.5,0.5);
        shark.anchor.set(0.5);
        shark.animations.add('right', [0,4], 10, true);

        //  Shark physics.
        game.physics.arcade.enable(shark);
        shark.body.collideWorldBounds = true;
        
        // Arrow key inputs.
        cursors = game.input.keyboard.createCursorKeys();
        
        // The camera should follow the shark.
        game.camera.follow(shark);
        
    }
    
    function update() {
        game.physics.arcade.collide(shark, layer);
        
        shark.body.velocity.x = 0;
        shark.body.velocity.y = 0;
        
        if (cursors.down.isDown) {
            shark.body.velocity.y = 120;
        }
        else if (cursors.up.isDown) {
            shark.body.velocity.y = -120;
        }
        else if (cursors.right.isDown) {
            shark.body.velocity.x = 120;
        }
        else if (cursors.left.isDown) {
            shark.body.velocity.x = -120;
        }
    }
};
