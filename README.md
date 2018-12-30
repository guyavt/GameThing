# Game Thing

Here is a game made out of tick-tacky.


# Documentation
Bounding Box -> (
    x position,         # no default
    y position,         # no default
    width,              # no default
    height,             # no default
    left can collide,   # true by default
    right can collide,  # true by default
    top can collide,    # true by default
    bottom can collide  # true by default
)

Block -> (
    x position,          # 0  by default
    y position,          # 0  by default
    width,               # 30 by default
    height,              # 30 by default
    x movement,          # static by default
    y movement,          # static by default
    affected by gravity  # true by default
)

Lift -> (
    x position,                        # no default
    y position,                        # no default
    width,                             # no default
    height,                            # no default
    x velocity,                        # no default
    y velocity,                        # no default
    x min max points (integer array),  # no default
    y min max points (integer array),  # no default
    x movement,                        # no default
    y movement                         # no default
)
