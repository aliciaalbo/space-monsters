kaboom({
    global: true,
});

const MOVE_SPEED = 200
const INVADER_SPEED = 100
let CURRENT_SPEED = INVADER_SPEED
const LEVEL_DOWN = 100
// const TIME_LEFT = 15
const BULLET_SPEED = 400



layer(['obj', 'ui'], 'obj')

const level = addLevel([
    '!^^^^^^^^^^       &',
    '!^^^^^^^^^^       &',
    '!^^^^^^^^^^       &',
    '!                 &',
    '!                 &',
    '!                 &',
    '!                 &',
    '!                 &',
    '!                 &',
    '!                 &',
    '!                 &',
    '!                 &',
    '!                 &',
    '!                 &',                
],{
    width: 30, 
    height: 22,
    '^': [sprite('invader'), scale(0.7), 'space_invader'],
    '!': [sprite('wall'), 'left-wall'],
    '&': [sprite('wall'), 'right-wall'],
})

const player = add([
    sprite('space_savior'), 
    pos(width()/2, height()/2), 
    origin('center')
])

function spawnBullet(p) {
    add([
        rect(6, 18),
        pos(p),
        origin('center'),
        color(0.5, 0.5, 1), 
        'bullet'
    ])
}

keyPress('space', () => {
    spawnBullet(player.pos.add(0,-25))
})



action('bullet', (b) => {
    b.move(0, -BULLET_SPEED)
    if(b.pos.y <0){
        destroy(b)
    }
})

collides('bullet', 'space_invader', (b,s) => {
    camShake(4)
    destroy(b)
    destroy(s)
    score.value++
    score.text = score.value
    if(score.value === 30){
        go('win', {score: score.value})
    }
})

keyDown('right', () => {
    player.move(MOVE_SPEED, 0)
})

keyDown('left', () => {
    player.move(-MOVE_SPEED, 0)
})

const score = add([
    text('0'),
    pos(50, 50),
    layer('ui'),
    scale(3), 
    {
        value: 0,
    }
])


// const timer = add([
//     text('0'),
//     pos(90, 50),
//     scale(2),
//     layer('ui'),
//     {
//         time: TIME_LEFT,
//     }

// ])

// timer.action(() => {
//     timer.time -= dt()
//     timer.text = timer.time.toFixed(2)
//     if(timer.time <= 0) {
//         go('lose', score.value)
//     }
// })



action('space_invader', (s) => {
    s.move(CURRENT_SPEED, 0)
})

collides('space_invader', 'right-wall', () => {
    CURRENT_SPEED = -INVADER_SPEED
    every('space_invader', (s) => {
        s.move(0, LEVEL_DOWN)
    })
})

collides('space_invader', 'left-wall', () => {
    CURRENT_SPEED = INVADER_SPEED
    every('space_invader', (s) => {
        s.move(0, LEVEL_DOWN)
    })
})

player.overlaps('space_invader', () => {
  go('lose', { score: score.value })
})

action('space_invader', (s) => {
    if(s.pos.y >= height() /2) {
        go('lose', {score: score.value})
    }
})

action('space_invader', (s) => {
    if(s == false){
        go('win', {score: score.value})
    }
})