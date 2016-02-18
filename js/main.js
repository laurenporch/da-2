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
        game.load.image('tiles','assets/tiles_underwater.PNG');
        game.load.spritesheet('shark', 'assets/shark-sprite-full.png',120,99,8);
        game.load.spritesheet('blue', 'assets/BlueFish4.png',1435, 1080);
        game.load.spritesheet('purple', 'assets/RedFish2.png', 1296, 1080);
        game.load.audio('background_music', 'assets/263945__audiolarx__water-bubbles-03.wav');
        
    }
    
    var map;
    var layer;
    var shark;
    var cursors;
    var bluefishies;
    var purplefishies;
    var bluefish;
    var purplefish;
    var background_music;
    
    function create() {
        // Start physics.
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Add audio.
        background_music = game.add.audio('background_music');
        background_music.loop = true;
        background_music.play();
        
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
        shark.animations.add('right', [4,7], 5, true);
        shark.animations.add('left', [3,0], 5, true);
        shark.animations.add('eatLeft', [2,3], 5, true);
        shark.animations.add('eatRight', [5,4], 5, true);

        //  Shark physics.
        game.physics.arcade.enable(shark);
        shark.body.collideWorldBounds = true;
        
        // Arrow key inputs.
        cursors = game.input.keyboard.createCursorKeys();
        
        // The camera should follow the shark.
        game.camera.follow(shark);
        
        // Add some fishies.
        bluefishies = game.add.group();
        purplefishies = game.add.group();

        //  Enable physics for the fishies.
        bluefishies.enableBody = true;
        purplefishies.enableBody = true;

        // Make a blue fish! And make it move.
        var bluefish = bluefishies.create(165,150, 'blue');
        bluefish.scale.setTo(.025,.025);
        // This is a workaround to random movement.
        bluefish.body.gravity.y = 200 * Math.random();
        bluefish.body.bounce.y = 1;
        bluefish.body.gravity.x = 200 * Math.random();
        bluefish.body.bounce.y = 1;
        
        // Make a purple fish! And make it move.
        var purplefish = purplefishies.create(280,290, 'purple');
        purplefish.scale.setTo(.025,.025);
        // This is a workaround to random movement.
        purplefish.body.gravity.y = 200 * Math.random();
        purplefish.body.bounce.y = 1;
        purplefish.body.gravity.x = 200 * Math.random();
        purplefish.body.bounce.y = 1;
        
        // Blue fish 2.
        var bluefish2 = bluefishies.create(1700,800, 'blue');
        bluefish2.scale.setTo(.025,.025);
        // This is a workaround to random movement.
        bluefish2.body.gravity.y = -200 * Math.random();
        bluefish2.body.bounce.y = 1;
        bluefish2.body.gravity.x = 200 * Math.random();
        bluefish2.body.bounce.y = 1;
        
        // Purple fish 2.
        var purplefish2 = purplefishies.create(1000,500, 'purple');
        purplefish2.scale.setTo(.025,.025);
        // This is a workaround to random movement.
        purplefish2.body.gravity.y = 200 * Math.random();
        purplefish2.body.bounce.y = 1;
        purplefish2.body.gravity.x = -200 * Math.random();
        purplefish2.body.bounce.y = 1;
        
        // Blue fish 3.
        var bluefish3 = bluefishies.create(300,1000, 'blue');
        bluefish3.scale.setTo(.025,.025);
        // This is a workaround to random movement.
        bluefish3.body.gravity.y = -200 * Math.random();
        bluefish3.body.bounce.y = 1;
        bluefish3.body.gravity.x = -200 * Math.random();
        bluefish3.body.bounce.y = 1;
                
        // Purple fish 3.
        var purplefish3 = purplefishies.create(1300,400, 'purple');
        purplefish3.scale.setTo(.025,.025);
        // This is a workaround to random movement.
        purplefish3.body.gravity.y = -200 * Math.random();
        purplefish3.body.bounce.y = 1;
        purplefish3.body.gravity.x = -200 * Math.random();
        purplefish3.body.bounce.y = 1;
        
    }
    
    function update() {       
        game.physics.arcade.collide(shark, layer);
        game.physics.arcade.collide(bluefishies, layer);
        game.physics.arcade.collide(purplefishies, layer);
        game.physics.arcade.collide(shark, bluefishies, killBlue, null, this);
        game.physics.arcade.collide(shark, purplefishies, killPurple, null, this);
        
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
            shark.animations.play('right');
        }
        else if (cursors.left.isDown) {
            shark.body.velocity.x = -120;
            shark.animations.play('left');
        }    
        
    }
    
    function killBlue(shark, bluefish) {
        bluefish.kill();
        if (shark.animations.play('left')) {
            shark.animations.play('eatLeft');
        }
        else if (shark.animations.play('right')) {
            shark.animations.play('eatRight');
        }
    }
    
    function killPurple(shark, purplefish) {
        purplefish.kill();
        if (shark.animations.play('left')) {
            shark.animations.play('eatLeft');
        }
        else if (shark.animations.play('right')) {
            shark.animations.play('eatRight');
        }
    }
    
    // To use for improving fish motion at a later date.
    /*
    function moveBlue(bluefish, layer) {  
       
        if (bluefish.body.touching.left) {
            bluefish.body.velocity.x *= -1;  
        }
        if (bluefish.body.touching.right) {
            bluefish.body.velocity.x *= -1;  
        }
        if (bluefish.body.touching.up) {
            bluefish.body.velocity.y *= -1;  
        }
        if (bluefish.body.touching.down) {
            bluefish.body.velocity.y *= -1;  
        }
        
    }
    */
};
