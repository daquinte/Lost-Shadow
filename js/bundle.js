(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var EndScene = {
    fondoEnd: {}, //Fondo de la escena final

	create: function () {
        
        this.style = {font: "24px Arial", fill: "#ffffff"}; //Estilo del texto

        fondoEnd = this.game.add.sprite (0,0,'endShadow');  //fondo

        //Texto de la escena final del juego
        var goText = this.game.add.text(400, 100, "Dislumbré un destello y creí que eras tú.\n Pronto lograré alcanzarte...", this.style);
        goText.anchor.set(0.5);
        
        //Botón que lleva al menú cuando es presionado.
        var buttonMenu = this.game.add.button(400, 300, 
                                          'button', 
                                          this.actionOnClick, 
                                          this, 2, 1, 0);
        buttonMenu.anchor.set(0.5);
        
        var textoReturn = this.game.add.text(0, 0, "Menu");
        textoReturn.anchor.set(0.5);
        buttonMenu.addChild(textoReturn); //
    },

    actionOnClick: function(){
        this.game.state.start('menu');
        this.game.world.setBounds(0,0,800,600);
    } 
};

module.exports = EndScene;
},{}],2:[function(require,module,exports){
var GameOver = {
  fondoGO: {}, //Fondo de la pantalla de game over

    create: function () {

        fondoGO = this.game.add.sprite (0,0,'GameOverBackG'); //fondo

           //Texto de game Over
        var goText = this.game.add.text(400, 100, "GameOver");

        //Creamos el botón de reset del juego, que envia al jugador de nuevo al nivel
        var button = this.game.add.button(400, 300, 
                                          'button', 
                                          this.actionOnClick1, 
                                          this, 2, 1, 0);
        button.anchor.set(0.5);
        //Texto del botón
        var text = this.game.add.text(0, 0, "Reset Game");
        text.anchor.set(0.5);
        goText.anchor.set(0.5);
        button.addChild(text);
        
        //Creamos el botón que, de ser pulsado, lleva al jugador al menú
        var buttonMenu = this.game.add.button(400, 450, 
                                          'button', 
                                          this.actionOnClick2, 
                                          this, 2, 1, 0);
        buttonMenu.anchor.set(0.5);
        //Texto del botón
        var textoReturn = this.game.add.text(0, 0, "Menu");
        textoReturn.anchor.set(0.5);
        buttonMenu.addChild(textoReturn);
    },

    actionOnClick1: function(){
      var sound = this.game.add.audio('click');
        sound.play();

        this.game.state.start('preloader');

    }, 

    actionOnClick2: function(){
      var sound = this.game.add.audio('click');
        sound.play();

        this.game.state.start('menu');
        this.game.world.setBounds(0,0,800,600);
    } 
};

module.exports = GameOver;
},{}],3:[function(require,module,exports){
'use strict';

var PlayScene = require('./play_scene.js');
var GameOver = require('./gameover_scene.js');
var MenuScene = require('./menu_scene.js');
var EndScene = require('./end_scene.js');

//  The Google WebFont Loader will look for this object, so create it before loading the script.

var BootScene = {
  preload: function () {
    // load here assets required for the loading screen
    var style = { font: "65px Arial", fill: "#ffffff", align: "center" }
   
    this.game.load.image('fondoMenu', 'images/ShadowCave.png');
    this.game.load.image('preloader_bar', 'images/preloader_bar.png');
    this.game.load.spritesheet('button', 'images/buttons.png', 168, 70);
    this.game.load.image('logo', 'images/LostShadow.png');
    this.game.load.audio('start', ['sounds/MuseGloriousMp3.mp3', 'MuseGloriousOgg.ogg']);

  },

  create: function () {
      this.game.state.start('menu');
      
  }
};

//Se carga todo lo referente a la escena 'Play_scene', 'gameover_scene', 'end_scene'
var PreloaderScene = {
  preload: function () {
    this.loadingBar = this.game.add.sprite(100,300, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 0.5); 
    this.game.load.setPreloadSprite(this.loadingBar);
    this.game.stage.backgroundColor = "#000000";
    
    
    this.load.onLoadStart.add(this.loadStart, this);
  
      this.game.load.tilemap('tilemap', 'images/map.json', null, Phaser.Tilemap.TILED_JSON);
      this.game.load.image('tiles', 'images/mylevel1_tiles.png');
      this.game.load.spritesheet('shadow','images/Shadow.png', 48, 50);
      this.game.load.spritesheet('glow', 'images/glow.png', 32, 32);
      this.game.load.image('sombras', 'images/sombras.png');
      this.game.load.image('light', 'images/light.png');
      this.game.load.image('shadowHid', 'images/ShadowHidden.png');

      //End Scene
      this.game.load.image('endShadow', 'images/ShadowSilhouette.jpg');
      //GameOver Scene
      this.game.load.image('GameOverBackG', 'images/FondoGameOver.jpg');
      //Audio
      this.game.load.audio('cave', ['sounds/Muse - Cave (8-bit).mp3', 'Muse_-_Cave_8-bit_.ogg']);
      this.game.load.audio('click', ['Click.mp3', 'Click.ogg']);

      this.game.load.onLoadComplete.add(this.loadComplete, this);
  },

  loadStart: function () {
    console.log("Game Assets Loading ...");
  },
    
    
     loadComplete: function(){
      this.game.state.start('play');
        console.log ("Load completed");
     },
    
    update: function(){
        this._loadingBar
    }
};


var wfconfig = {
 
    active: function() { 
        console.log("font loaded");
        init();
    },
 
    google: {
        families: ['Sniglet', '24px Arial']
    }
 
};
 
window.onload = function () {

  WebFont.load(wfconfig); //carga la fuente definida en el objeto anterior.
  
};

window.init = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

  game.state.add('boot', BootScene);
  game.state.add('menu', MenuScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('play', PlayScene);
  game.state.add('gameOver', GameOver);
  game.state.add('endScene', EndScene);
  game.state.start('boot');
    
};

},{"./end_scene.js":1,"./gameover_scene.js":2,"./menu_scene.js":4,"./play_scene.js":5}],4:[function(require,module,exports){
var MenuScene = {


    logo: {}, //Logo del juego
    buttonStart: {}, //Botón de inicio del juego

    menuMusic: {}, //Música del menú
    fondoMenu: {}, //fondo del menú
    click: {}, //Sonido del botón

    create: function () {

          //Creamos los sonidos y la música.
           click = this.game.add.audio('click');
           menuMusic = this.game.add.audio('start');
           menuMusic.play();
           menuMusic.loop= true; 

           //Creamos el fondo del juego
        fondoMenu = this.game.add.sprite (0,0,'fondoMenu');
        
        //Logo del juego
        logo = this.game.add.sprite(this.game.world.centerX, 
                                        this.game.world.centerY, 
                                        'logo');
        logo.anchor.setTo(0.5, 0.5);
        
        //Creamos el botón de start
        buttonStart = this.game.add.button(this.game.world.centerX, 
                                               500, 
                                               'button', 
                                               this.actionOnClick, 
                                               this, 2, 1, 0);
        buttonStart.anchor.set(0.5);
        textStart = this.game.add.text(0, 0, "Start");
        textStart.font = 'Sniglet';
        textStart.anchor.set(0.5);
        buttonStart.addChild(textStart);

      
    },
    
    actionOnClick: function(){
        
        menuMusic.destroy(); //paramos la música
       
        click.volume = 1.5;
        click.play();
         
         logo.destroy();
         textStart.destroy();
         buttonStart.destroy();
        this.game.state.start('preloader');
    } 
};

module.exports = MenuScene;
},{}],5:[function(require,module,exports){

'use strict';

//Enumerados: PlayerState son los estado por los que pasa el player. Directions son las direcciones a las que se puede
//mover el player.
var PlayerState = {'JUMP':0, 'RUN':1, 'FALLING':2, 'STOP':3}
var Direction = {'LEFT':0, 'RIGHT':1, 'NONE':3}

//Scena de juego.
var PlayScene = {
 
    glows: {}, //grupo de glows
    darks: {}, //Grupo de darks
    _shadow: {}, //player


    _light: {},

    _speed: 300, //velocidad del player
    _jumpSpeed: 600, //velocidad de salto
    _jumpHight: 100, //altura máxima del salto.
    _playerState: PlayerState.STOP, //estado del player
    _direction: Direction.NONE,  //dirección inicial del player. NONE es ninguna dirección.
    _avance: -1,// _avance2: -1, _avance3: -1, _avance4: -1,

    aux: 0, // Variable auxiliar para el salto

    paused: false,  //Variable que determina si el juego está en estado de pausa o no. 
                    //Pero no usa la pausa de Phaser sino que es un estado propio, meramente indicativo

    style : {}, //Estilo de las letras

    // --TEXTOS --
    ///Textos que aparecen a lo largo del juego
    textoSombra: {},
    textoGuiaSombra: {},
    textContinue: {},
    pauseText: {},
    textoReturn: {},
    //-----------------

    //-- BOTONES --
    button: {},
    buttonMenu: {},
    //------------

    //--TECLAS --
    keyP: {},
    keyE: {},
    //----------

    //--MÚSICA-- 
    music: {},
    //----------

    //Método constructor...
  create: function () {

      this.game.world.setBounds(0, 0, 800, 900); //Escala del mundo

      //Música del nivel
        this.music = this.game.add.audio('cave'); 

       this.music.play();
       this.music.loop = true;
       //-----------

       //Asignamos la tecla E a "Esconderse"
       this.keyE = this.game.input.keyboard.addKey(Phaser.Keyboard.E);

       //Evita que las teclas se propagen al navegador (Se mueva la página)
       this.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR ]);

       //Mapa
      this.map = this.game.add.tilemap('tilemap');
      this.map.addTilesetImage('mylevel1_tiles','tiles');  

      //Creacion de las layers
      this.backgroundLayer = this.map.createLayer('Fondo');//capa de fondo

      //Estilo del texto
      this.style = {font: "24px Arial", fill: "#ffffff"}; 
      //Texto inicial
      this.textoSombra = this.game.add.text(250, 700, "¡Esto está plagado de glows!\n No puedo permitir que me toquen o seré destruido.\n Y no podré salvarte.  ", this.style);
      this.textoSombra.anchor.set(0.6);
      this.textoSombra.scale.setTo(0.6, 0.6);
      //Texto tutorial
      this.textoGuiaSombra = this.game.add.text(230, 750, "Pulsa E en las sombras para ocultarte.", this.style);
      this.textoGuiaSombra.anchor.set(0.6);
      this.textoGuiaSombra.scale.setTo(0.7, 0.7);
      

    
      //----SOMBRAS EN LAS QUE OCULTARTE----
      //Inicializacion de darks como grupo.
      this.darks = this.game.add.group();
      this.darks.enableBody = true;

      this.CreaDarks(435, 770, this.game);
      this.CreaDarks(90, 450, this.game);
      this.CreaDarks(380, 290, this.game);
      this.CreaDarks(320, 25, this.game);
      //-----------------------------------

      //Capas del mapa
      this.groundLayer = this.map.createLayer('Plataformas'); //capa de groundlayer
      this.limites = this.map.createLayer('Limites'); //capa de los límites para los glows
      this.limitesJugador = this.map.createLayer('LimitePersonaje'); //capa de los límites para los glows
      this.death = this.map.createLayer('Muerte');//capa de muerte

      //Colisiones con el plano de muerte y con el plano de muerte y con suelo.
      this.map.setCollisionBetween(1, 5000, true, 'Limites');
      this.map.setCollisionBetween(1, 5000, true, 'Muerte');
      this.map.setCollisionBetween(1, 5000, true, 'Plataformas');
      this.map.setCollisionBetween(1, 5000, true, 'LimitePersonaje');

      //Capas invisibles
      this.death.visible = false;
      this.limites.visible = false;
      this.limitesJugador.visible = false;

      //----PERSONAJE----
      this._shadow = new Phaser.Sprite(this.game, 50, 800, 'shadow');
      this.game.world.addChild(this._shadow);

      this.game.camera.follow(this._shadow);

      // ---- SOMBRA PERSONAJE ----
      this._shadowHid = new Phaser.Sprite(this.game, 50, 800, 'shadowHid');
      this.game.world.addChild (this._shadowHid);
      this._shadowHid.visible = false;
      

      //----ENEMIGOS----
      //inicialización de glows como grupo y habilitado de estos
      this.glows = this.game.add.group();
      this.glows.enableBody = true;

      this.CreaGlows(500, 780, this.game);
      this.CreaGlows(200, 470, this.game);
      this.CreaGlows(500, 310, this.game);
      this.CreaGlows(150, 45, this.game);


      //----LIGHT----
      this._light = new Phaser.Sprite(this.game, 5, 0, 'light');
      this.game.world.addChild(this._light);
      this._light.scale.setTo(0.7,0.7);


      //Los detalles se general al final para que los monolitos que dan sombra 
      //se vean delante del jugador y creen un falso 3D
      this.detalles = this.map.createLayer('Detalles');
      
      //Cambia la escala a x2
      this.groundLayer.setScale(2,2);
      this.backgroundLayer.setScale(2,2);
      this.death.setScale(2.,2);
      this.limites.setScale(2,2);
      this.limitesJugador.setScale(2,2);
      this.detalles.setScale(2,2);

      //-- Animaciones --

      //nombre de la animación, frames, framerate, isloop 
      this._shadow.animations.add('run',[0,1,2,3], 10,true);
      
      //Mejor lo de debajo
      this._shadow.frame = 4;
      this._shadow.animations.add('jump',[4,5], 10, false);
      //-----------------
 
      //Llamamos a configure para que cree las escenas,.
      this.configure();
  },
    
    //IS called one per frame.
    update: function () {

        this.keyP = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
        
        if (!this.paused){

          if (this.keyP.isDown){
            this.paused = true;
            this.onPause();
            
          }
        }

        var moveDirection = new Phaser.Point(0, 0);

        var collisionWithTilemap = this.game.physics.arcade.collide(this._shadow, this.groundLayer);
        var playerLimits = this.game.physics.arcade.collide(this._shadow, this.limitesJugador);
        //Overlap entre el jugador y los darks
        var overShadow = this.game.physics.arcade.overlap(this._shadow, this.darks);


        
        var movement = this.GetMovement();

        //transitions 
        switch(this._playerState)
        {
            case PlayerState.STOP:
            case PlayerState.RUN:
                if(this.isJumping(collisionWithTilemap)){
                    this._playerState = PlayerState.JUMP;
                    this._initialJumpHeight = this._shadow.y;
                    this._shadow.animations.play('jump');
                }
                else{
                    if(movement !== Direction.NONE){
                        this._playerState = PlayerState.RUN;
                        this._shadow.animations.play('run');
                    }
                    else{
                        this._playerState = PlayerState.STOP;
                        this._shadow.frame = 4;
                    }
                }    
                break;
                
            case PlayerState.JUMP:
                
                var currentJumpHeight = this._shadow.y - this._initialJumpHeight;
                this.aux = currentJumpHeight;
                this._playerState = (currentJumpHeight*currentJumpHeight < this._jumpHight*this._jumpHight)
                    ? PlayerState.JUMP : PlayerState.FALLING;
                break;
                
            case PlayerState.FALLING:
                if(this.isStanding()){
                    if(movement !== Direction.NONE){
                        this._playerState = PlayerState.RUN;
                        this._shadow.animations.play('run');
                    }
                    else{
                        this._playerState = PlayerState.STOP;
                        this._shadow.frame = 4;
                    }
                }
                break;     
        }
        //States
        switch(this._playerState){
                
            case PlayerState.STOP:
                moveDirection.x = 0;
                break;
            case PlayerState.JUMP:
            case PlayerState.RUN:
            case PlayerState.FALLING:
                if(movement === Direction.RIGHT){
                    moveDirection.x = this._speed;
                    if(this._shadow.scale.x < 0)
                        this._shadow.scale.x *= -1;
                }
                else if(movement === Direction.LEFT){
                    moveDirection.x = -this._speed;
                    if(this._shadow.scale.x > 0)
                        this._shadow.scale.x *= -1;
                }
                else moveDirection.x = 0;
      
                if(this._playerState === PlayerState.JUMP)
                    moveDirection.y = -this._jumpSpeed;
            
                if(this._playerState === PlayerState.FALLING)
                    moveDirection.y = 0;
                break;    
        }
        //movement
        this.movement(moveDirection,5,
                      this.backgroundLayer.layer.widthInPixels*this.backgroundLayer.scale.x - 10);
        this.checkPlayerFell();
        this.checkPlayerWin();
        
        //--COLISION CON EL ENEMIGO--
        //Solo si el personaje es visible, revisa si colisiona con el enemigo
        if (this._shadow.alpha === 1) { 
          
          this.game.physics.arcade.collide(this._shadow, this.glows, this.onPlayerFell, null, this);

          
        }

        //--COLISION DE LOS ENEMIGOS CON LOS LIMITES--
        //glow
        //Recorre el grupo this.glows
        this.glows.forEach(function (glow){
          //Guarda la velocidad de cada uno antes de la colisión
            var vel = glow.body.velocity.x;

            //colisión entyre el glow que estás pasando y el límite con su respectiva función
            this.game.physics.arcade.collide(glow, this.limites, function (glowy){
              //Al colisionar con el límite invierte la velocidad que has guardado antes de la colisión
              glowy.body.velocity.x = -vel;
            });

        }, this);
        

        //--COLISION CON LA SOMBRA--
        //overshadow es el overlaping entre el jugador y un dark. Declarado al princicpio del update
        if (overShadow){

          if (this.keyE.isDown){

            this._shadow.alpha = 0;
            this._shadow.body.velocity.x = this._shadow.body.velocity.y = 0;
            this._shadowHid.x = this._shadow.x;
            this._shadowHid.y = this._shadow.y;

            this._shadowHid.visible = true; 
    
          }

          else if (this._shadow.alpha === 0){
            this._shadowHid.visible = false;
          this._shadow.alpha = 1; 
          }
        }
    },

    //Método plantilla para crear darks
    CreaDarks: function(x, y, game){
      var dark = new Phaser.Sprite(this.game, x, y, 'sombras');
      this.game.physics.arcade.enable(dark);
      dark.scale.setTo(0.1,0.2);
      this.darks.add(dark);
    },

    //Método plantilla para crear glows
    CreaGlows: function(x, y, game){
      var glow = this.game.add.sprite(x, y, 'glow');
      this.game.physics.arcade.enable(glow);
      glow.scale.setTo(1.75, 1.75);
      glow.body.velocity.x = -80;
      //Animación
      glow.animations.add('glow',[0,1,2,3,4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], 11,true);
      glow.animations.play('glow');
      //Añade este nuevo glow al grupo
      this.glows.add(glow);

    },

    checkOverlap: function (spriteA, spriteB){
      var boundsA = spriteA.getBounds();
      var boundsB = spriteB.getBounds();

      return Phaser.Rectangle.intersects(boundsA, boundsB); 
    },

    //Método que gestiona la pausa en el juego.
    //Creamos dos botones, uno de menu y otro de continuar.
    onPause: function(event){
        
        if (this.paused){
          this.music.stop();
            
            //Boton de continuar. Cuando es pulsado, reanuda el juego en el mismo estado en el que estaba, así como la música
            this.button = this.game.add.button(400, 300, 
                                          'button', 
                                          this.actionOnClickContinue, 
                                          this, 2, 1, 0);
            this.button.fixedToCamera = true;
            this.pauseText = this.game.add.text(400, 200, "Pause", this.style);
            this.pauseText.anchor.set(0.5);
            this.pauseText.scale.setTo(1.5, 1.5);
            this.textContinue = this.game.add.text(0, 0, "Continue");
            this.button.anchor.set (0.5);
            this.textContinue.anchor.set(0.5);
            this.pauseText.fixedToCamera = true;
            this.button.addChild(this.textContinue);

            //Botón de Menú. Cuando es pulsado, envía al jugador a la pantalla inicial del juego.
            this.buttonMenu = this.game.add.button(400, 450, 
                                          'button', 
                                          this.actionOnClickMenu, 
                                          this, 2, 1, 0);
            this.buttonMenu.fixedToCamera = true;
            this.textoReturn = this.game.add.text(0, 0, "Menu");
            this.buttonMenu.anchor.set (0.5);
            this.textoReturn.anchor.set(0.5);
            this.buttonMenu.addChild(this.textoReturn);

            this.game.physics.arcade.isPaused = true;

        }
    },

    actionOnClickContinue: function(){
        var sound = this.game.add.audio('click');
        sound.play();
        this.music.restart();
        this.button.destroy();
        this.buttonMenu.destroy();
        this.pauseText.destroy();
        this.game.physics.arcade.isPaused = false;
        this.paused = false;
    }, 

    actionOnClickMenu: function(){
      var sound = this.game.add.audio('click');
        sound.play();
        this.music.destroy();
        this.paused = false;
        this.game.state.start('menu');
        this.game.world.setBounds(0,0,800,600);

    }, 
    

    canJump: function(collisionWithTilemap){
        return this.isStanding() && collisionWithTilemap || this._jamping;
    },
    
    //Si el jugador muere, este método le enviará a la pantalla de GameOver y apaga la música
    onPlayerFell: function(){

        this.music.destroy();

        this.game.state.start('gameOver');
    },

    checkPlayerFell: function(){
        if(this.game.physics.arcade.collide(this._shadow, this.death))
            this.onPlayerFell();
        
    },

    //Si el jugador llega al final del nivel, éste será enviado a la pantalla del final del juego.
    onPlayerWin: function(){
        this.game.state.start('endScene');
    },

    checkPlayerWin: function(){
        if(this.game.physics.arcade.collide(this._shadow, this._light))
            this.onPlayerWin();
        
    },
        
    isStanding: function(){
        return this._shadow.body.blocked.down || this._shadow.body.touching.down
    },
        
    isJumping: function(collisionWithTilemap){
        return this.canJump(collisionWithTilemap) && 
            this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR);
    },
        //Método que determina la dirección del jugador.
    GetMovement: function(){
        var movement = Direction.NONE
        
        //Move Right
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            movement = Direction.RIGHT;
        }

        //Move Left
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            movement = Direction.LEFT;
        }
        return movement;
    },

    //configure the scene
    configure: function(){
        //Start the Arcade Physics systems
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = '#a9f0ff';
        this.game.physics.arcade.enable(this._shadow);


        //Físicas de light
        this.game.physics.arcade.enable(this._light);

        this._shadow.body.bounce.y = 0.2;
        this._shadow.body.gravity.y = 20000;
        this._shadow.body.gravity.x = 0;
        this._shadow.body.velocity.x = 0;
    },

    //move the player
    movement: function(point, xMin, xMax){
        this._shadow.body.velocity = point;
        
        if((this._shadow.x < xMin && point.x < 0)|| (this._shadow.x > xMax && point.x > 0))
            this._shadow.body.velocity.x = 0;

    }
    
};

module.exports = PlayScene;
},{}]},{},[3,5,4,1,2]);
