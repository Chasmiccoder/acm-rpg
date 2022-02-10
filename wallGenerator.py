from PIL import Image
from numpy import asarray
import numpy as np
import cv2

def removeFlagged(coordinate_list):

    # For insta, twitter blocks
    flagged = [[31,40],[32,40],[33,41],[34,41],[35,40],[36,40],[37,39],[38,39],[26,42],[25,42],[45,32],[46,32]]
    newList = []

    for point in coordinate_list:
        if point not in flagged:
            newList.append(point)

    return newList


image = cv2.imread('./images/map_outline.png') 
image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB) 
image = np.array(image)

coordinate_list = []

x_offset = 9
y_offset = 2

y = 0
i = 0
while i < len(image):
    j = 0
    x = 0
    while j < len(image[i]):
        pixel = image[i][j]

        if list(pixel) == [196, 196, 196]:
            coordinate_list.append([x-x_offset,y-y_offset])

        j += 32
        x += 1

    i += 32
    y += 1

coordinate_list = removeFlagged(coordinate_list)

print(coordinate_list[0])

file_list = []

for i in coordinate_list:
    s = "[utils.asGridCoord({x},{y})]: true,\n".format(x=i[0], y=i[1])
    file_list.append(s)

with open("wall_coordinates.txt", "w") as file:
    file.writelines(file_list)


