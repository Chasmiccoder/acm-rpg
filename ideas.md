To Do:
        * Collision detection
        * change map depending on which gate the player walks through



Ideas for - ACM-RPG
ACM Logo is the platform!
Secret room by walking through one wall, plays rick roll on opening a chest
Computers that give information on pressing spacebar

First make the game in vanilla js
then put it in react with react stuff


Secret room will have character skin customization thing. Upgrade your look!

To Download aseprite pixel art editor -
https://www.youtube.com/watch?v=s3hhkcDOASc 

To run aseprite -

cmake \
        -DCMAKE_BUILD_TYPE=RelWithDebInfo \
        -DLAF_BACKEND=skia \
        -DSKIA_DIR=$HOME/deps/skia \
        -DSKIA_LIBRARY_DIR=$HOME/deps/skia/out/Release-x64 \
        -DSKIA_LIBRARY=$HOME/deps/skia/out/Release-x64/libskia.a \
        -G Ninja \
        ..




ninja aseprite


