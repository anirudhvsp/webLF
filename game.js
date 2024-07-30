const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}
const game = new Phaser.Game(config);

function preload() {
    this.load.path = 'assets/sprites/template/';
    this.load.image('idle1', 'P_idle1.png');
    this.load.image('idle2', 'P_idle2.png');
    this.load.image('idle3', 'P_idle3.png');
    this.load.image('idle4', 'P_idle4.png');
    this.load.image('walk1', 'P_walk1.png');
    this.load.image('walk2', 'P_walk2.png');
    this.load.image('walk3', 'P_walk3.png');
    this.load.image('walk4', 'P_walk4.png');
    this.load.image('run1', 'P_run1.png');
    this.load.image('run2', 'P_run2.png');
    this.load.image('run3', 'P_run3.png');
    this.load.image('block1', 'P_block1.png');
    this.load.image('block2', 'P_block2.png');
    this.load.image('duck1', 'P_duck1.png');
    this.load.image('punch1', 'P_punch1.png');
    this.load.image('punch2', 'P_punch2.png');
    this.load.image('punch3', 'P_punch3.png');
    this.load.image('punch4', 'P_punch4.png');
}

function create() {
    this.anims.create({
        key: 'idle',
        frames: [
            { key: 'idle1' },
            { key: 'idle2' },
            { key: 'idle3' },
            { key: 'idle4' },
        ],
        frameRate: 5,
        repeat: -1
    });

    this.anims.create({
        key: 'walk',
        frames: [
            { key: 'walk1' },
            { key: 'walk2' },
            { key: 'walk3' },
            { key: 'walk4' },
            { key: 'walk3' },
        ],
        frameRate: 7,
        repeat: -1
    });

    this.anims.create({
        key: 'run',
        frames: [
            { key: 'run1' },
            { key: 'run2' },
            { key: 'run3' },
            { key: 'run2' },
            { key: 'run1' },
        ],
        frameRate: 7,
        repeat: -1
    });

    this.anims.create({
        key: 'block',
        frames: [
            { key: 'block1' },
        ],
        frameRate: 7,
        repeat: -1
    });

    this.anims.create({
        key: 'blockHit',
        frames: [
            { key: 'block1' },
            { key: 'block2' },
        ],
        frameRate: 7,
        repeat: -1
    });

    this.anims.create({
        key: 'duck',
        frames: [
            { key: 'duck1' },
        ],
        frameRate: 7,
        repeat: -1
    });


    this.anims.create({
        key: 'punch',
        frames: [
            { key: 'punch1' },
            { key: 'punch2' },
            { key: 'punch3' },
        ],
        frameRate: 10,
        repeat: 0
    });


    this.sprite = this.add.sprite(400, 300, 'idle1');
    this.sprite.play('idle');
}

let isPunching = false

  function update() {
      const cursors = this.input.keyboard.createCursorKeys()
      const aKey = this.input.keyboard.addKey('A')
      const dKey = this.input.keyboard.addKey('D')
      const wKey = this.input.keyboard.addKey('W')
      const sKey = this.input.keyboard.addKey('S')
      const shiftKey = this.input.keyboard.addKey('SHIFT')
      const altKey = this.input.keyboard.addKey('L')
      const semicolonKey = this.input.keyboard.addKey('I')
      const jKey = this.input.keyboard.addKey('J')
    
      
      
      var speedX = 1
      var speedY = 0.5
      var runSpeedX = 2
      var runSpeedY = 1
      let isMoving = false
      let isRunning = false
      let isBlocking = false
      let isDucking = false

      if (semicolonKey.isDown) {
          isDucking = true
          if (this.sprite.anims.currentAnim.key !== 'duck') {
              this.sprite.play('duck')
          }
      } else {
          isDucking = false
      }

      if (altKey.isDown) {
          isBlocking = true
          if (this.sprite.anims.currentAnim.key !== 'block') {
              this.sprite.play('block')
          }
      } else {
          isBlocking = false
      }


      
    if (jKey.isDown && !isPunching && !isBlocking && !isDucking) {
        isPunching = true;
        this.sprite.play('punch');
        
    }
    if (isPunching) {
        if (this.sprite.anims.currentAnim && this.sprite.anims.currentAnim.key === 'punch' && !this.sprite.anims.isPlaying) {
            isPunching = false;
        }
    }
    
    console.log()
    
      if (!isBlocking && !isDucking && !isPunching) {
          if (shiftKey.isDown) {
              isRunning = true
              speedX = runSpeedX
              speedY = runSpeedY
          }

          if (aKey.isDown) {
              this.sprite.x -= speedX
              this.sprite.setFlipX(true)
              isMoving = true
          } else if (dKey.isDown) {
              this.sprite.x += speedX
              this.sprite.setFlipX(false)
              isMoving = true
          }
          if (wKey.isDown) {
              this.sprite.y -= speedY
              isMoving = true
          } else if (sKey.isDown) {
              this.sprite.y += speedY
              isMoving = true
          }

          if (isMoving) {
              if (isRunning && (aKey.isDown || dKey.isDown)) {
                  if (this.sprite.anims.currentAnim.key !== 'run') {
                      this.sprite.play('run')
                  }
              } else {
                  if (this.sprite.anims.currentAnim.key !== 'walk') {
                      this.sprite.play('walk')
                  }
              }
          } else {
              if (this.sprite.anims.currentAnim.key !== 'idle') {
                  this.sprite.play('idle')
              }
          }
      }
  }