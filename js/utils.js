const utils = {
    withGrid(n) {
        return n * 16;
    },

    asGridCoord(x, y) {
        return `${x*16},${y*16}`;
    }
}


