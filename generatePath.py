# Generate path for npc

def f(_type, direction, time=0):
    if _type == "walk":
        print("{type:\"" + _type + "\",direction:\"" + direction + "\"},")
    else: # "stand"
        print("{type:\"" + _type + "\",direction:\"" + direction + "\",time:" + str(time) + "},")


def p(direction_string):
    i = 0
    while i < len(direction_string):
        dir = direction_string[i]
        if dir == "l":
            f("walk", "left")
        elif dir == "r":
            f("walk", "right")
        elif dir == "u":
            f("walk", "up")
        elif dir == "d":
            f("walk", "down")
        elif dir == "s": # stand
            i += 1
            D = direction_string[i]
            f("stand", D, 500)
        i += 1

p("rurrdrrrrrsrdllllldllsuulu")
