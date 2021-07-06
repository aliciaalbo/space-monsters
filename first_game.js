    // initialize kaboom context
    const k = kaboom();

    // define a scene
    k.scene("main", () => {
        const player = add([
            sprite('Player'),
            scale(0.5),
            pos(20,20), 
            body()
        ])
        
        const MOVE_SPEED = 200
        
        keyDown('right', () => {
            player.move(MOVE_SPEED, 0)
        })
        
        keyDown('left', () => {
            player.move(-MOVE_SPEED, 0)
        })
        
        addLevel([
            '     ',
            '  @  ',
            '     ',
            'xxxxx',
        ],{
            width: 40,
            height: 40,
            'x' : [sprite('ground'), solid()],
            '@' : [sprite('oog'), scale(0.5), body(), 'dangerous']
            
        })
        
        player.collides('dangerous', () => {
            destroy(player)
        })


    });

    // start the game
    k.start("main");

const player = add([
    sprite('Player'),
    scale(0.5),
    pos(20,20), 
    body()
])

