tilemaps = {
    woodenFloor: {
        walkable: true,
        defaultTexture: new Image(),
        texturesWithNeighbours: {
            'wall': {
                'top': new Image(),
                'right': new Image(),
                'bottom': new Image(),
                'left': new Image(),
                'topRight': new Image(),
                'topLeft': new Image(),
                'bottomRight': new Image(),
                'bottomLeft': new Image()
            }
        }
    },
    yellow_wall: {
        walkable: false,
        defaultTexture: new Image(),
        texturesWithNeighbours: {}
    },
    white_wall: {
        walkable: false,
        defaultTexture: new Image(),
        texturesWithNeighbours: {}
    }
}

objects = {
    door: {
        texture: new Image()
    },
    bett: {
        texture: new Image()
    }
}

let maps = {
    zimmer: {
        tiles: {
            ground: [
                {
                    tile: tilemaps.white_wall,
                    position: { x: 0, y: 0 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 1, y: 0 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 2, y: 0 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 3, y: 0 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 4, y: 0 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 5, y: 0 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 6, y: 0 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 7, y: 0 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 0, y: 1 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 1, y: 1 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 2, y: 1 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 3, y: 1 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 4, y: 1 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 5, y: 1 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 6, y: 1 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 7, y: 1 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 0, y: 2 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 1, y: 2 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 2, y: 2 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 3, y: 2 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 4, y: 2 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 5, y: 2 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 6, y: 2 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 7, y: 2 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 0, y: 3 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 1, y: 3 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 2, y: 3 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 3, y: 3 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 4, y: 3 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 5, y: 3 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 6, y: 3 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 7, y: 3 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 0, y: 4 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 1, y: 4 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 2, y: 4 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 3, y: 4 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 4, y: 4 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 5, y: 4 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 6, y: 4 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 7, y: 4 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 0, y: 5 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 1, y: 5 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 2, y: 5 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 3, y: 5 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 4, y: 5 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 5, y: 5 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 6, y: 5 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 7, y: 5 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 0, y: 6 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 1, y: 6 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 2, y: 6 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 3, y: 6 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 4, y: 6 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 5, y: 6 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 6, y: 6 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 7, y: 6 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 0, y: 7 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 1, y: 7 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 2, y: 7 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 3, y: 7 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 4, y: 7 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 5, y: 7 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 6, y: 7 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 7, y: 7 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 0, y: 8 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 1, y: 8 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 2, y: 8 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 3, y: 8 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 4, y: 8 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 5, y: 8 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 6, y: 8 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 7, y: 8 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 0, y: 9 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 1, y: 9 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 2, y: 9 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 3, y: 9 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 4, y: 9 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 5, y: 9 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 6, y: 9 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 7, y: 9 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 0, y: 10 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 1, y: 10 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 2, y: 10 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 3, y: 10 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 4, y: 10 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 5, y: 10 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 6, y: 10 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 7, y: 10 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 0, y: 11 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 1, y: 11 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 2, y: 11 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 3, y: 11 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 4, y: 11 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 5, y: 11 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 6, y: 11 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 7, y: 11 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 0, y: 12 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 1, y: 12 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 2, y: 12 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 3, y: 12 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 4, y: 12 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 5, y: 12 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 6, y: 12 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 7, y: 12 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 0, y: 13 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 1, y: 13 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 2, y: 13 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 3, y: 13 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 4, y: 13 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 5, y: 13 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 6, y: 13 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 7, y: 13 }
                },
            ],
            objects: [
                {
                    object: objects.door,
                    position: { x: 1, y: 11.5 },
                    width: 1,
                    height: 1.5,
                    rotation: 0,
                    klickRadius: 2,
                    klick: function() {
                        messageBox('Flur wird betreten', null, null, function () {
                            transition(function () {
                                map = maps.flur;
                                player.x = 6 * TILE_SIZE;
                                player.y = 1 * TILE_SIZE;

                            })
                        });
                    }
                },
                {
                    object: objects.bett,
                    position: { x: 5, y: 0.5 },
                    width: 2,
                    height: 4,
                    rotation: 0,
                }
            ]
        },
        width: 8,
        height: 14
    },
    flur: {
        tiles: {
            ground: [
                {
                    tile: tilemaps.white_wall,
                    position: { x: 0, y: 0 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 1, y: 0 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 2, y: 0 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 3, y: 0 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 4, y: 0 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 5, y: 0 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 6, y: 0 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 7, y: 0 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 0, y: 1 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 1, y: 1 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 2, y: 1 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 3, y: 1 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 4, y: 1 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 5, y: 1 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 6, y: 1 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 7, y: 1 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 0, y: 2 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 1, y: 2 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 2, y: 2 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 3, y: 2 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 4, y: 2 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 5, y: 2 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 6, y: 2 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 7, y: 2 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 8, y: 2 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 9, y: 2 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 0, y: 3 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 1, y: 3 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 2, y: 3 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 3, y: 3 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 4, y: 3 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 5, y: 3 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 6, y: 3 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 7, y: 3 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 8, y: 3 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 9, y: 3 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 0, y: 4 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 1, y: 4 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 2, y: 4 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 3, y: 4 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 4, y: 4 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 5, y: 4 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 6, y: 4 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 7, y: 4 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 8, y: 4 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 9, y: 4 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 0, y: 5 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 1, y: 5 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 2, y: 5 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 3, y: 5 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 4, y: 5 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 5, y: 5 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 6, y: 5 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 7, y: 5 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 8, y: 5 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 9, y: 5 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 0, y: 6 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 1, y: 6 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 2, y: 6 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 3, y: 6 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 4, y: 6 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 5, y: 6 }
                },
                {
                    tile: tilemaps.woodenFloor,
                    position: { x: 6, y: 6 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 7, y: 6 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 8, y: 6 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 9, y: 6 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 0, y: 7 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 1, y: 7 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 2, y: 7 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 3, y: 7 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 4, y: 7 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 5, y: 7 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 6, y: 7 }
                },
                {
                    tile: tilemaps.white_wall,
                    position: { x: 7, y: 7 }
                },
            ],
            objects: [
                {
                    object: objects.door,
                    position: { x: 6, y: 0.5 },
                    width: 1,
                    height: 1.5,
                    rotation: 0,
                    klickRadius: 2,
                    klick: function() {
                        messageBox('Lunas Zimmer wird betreten', null, null, function () {
                            transition(function () {
                                map = maps.zimmer;
                                player.x = 2 * TILE_SIZE;
                                player.y = 12 * TILE_SIZE;
                            })
                        });
                    }
                }
            ]
        },
        width: 10,
        height: 8
    }
}