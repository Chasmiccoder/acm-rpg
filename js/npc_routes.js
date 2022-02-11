const walkLeft = (who) => {
    return {who: who, type: "walk", direction: "left"}
}

const walkRight = (who) => {
    return {who: who, type: "walk", direction: "right"}
}

const walkUp = (who) => {
    return {who: who, type: "walk", direction: "up"}
}

const walkDown = (who) => {
    return {who: who, type: "walk", direction: "down"}
}

const standLeft = (who, duration = 500) => {
    return {who: who, type: "stand", direction: "left", time:duration};
}

const standRight = (who, duration = 500) => {
    return {who: who, type: "stand", direction: "right", time:duration};
}

const standUp = (who, duration = 500) => {
    return {who: who, type: "stand", direction: "up", time:duration};
}

const standDown = (who, duration = 500) => {
    return {who: who, type: "stand", direction: "down", time:duration};
}

const getCutsceneSetOfCoords = (coordinateList) => {
    let arr = [];
    for(let i = 0; i < coordinateList.length; i++) {
        let x = coordinateList[i][0];
        let y = coordinateList[i][1];
        let coords = `${x * 32},${y * 32}`  // tilesize = 32 pixels
        arr.push(coords);
    }
    return arr;
}



// current person
let X = "hemanth";
let hemanthPath = [
    walkRight(X),walkRight(X),walkRight(X),walkRight(X),walkRight(X),walkRight(X),walkRight(X),walkRight(X),
    standRight(X,500),
    {type: "textMessage", text: "Are you up for applying to the technical department?"},
    {type: "textMessage", text: "If so, enter the portal's center!"},
    walkLeft(X),walkLeft(X),walkLeft(X),walkLeft(X),walkLeft(X),walkLeft(X),walkLeft(X),walkLeft(X),
]

// hemanth's cutscene's set of coordinates
let hemanth_cutscene_set_of_coords = [[10,9],[11,9],[12,9],[13,9],[14,9],[15,9],[16,9],[17,9],[18,9],[19,9]]
hemanth_cutscene_set_of_coords = getCutsceneSetOfCoords(hemanth_cutscene_set_of_coords);

X = "dhriti";
let dhritiPath = [
    walkDown(X),walkRight(X),walkDown(X),walkRight(X),walkRight(X),walkRight(X),walkRight(X),
    standRight(X,500),
    {type: "textMessage", text: "Are you good looking?"},
    {type: "textMessage", text: "Of course you are!"},
    {type: "textMessage", text: "But we want people that can make things that are good looking..."},
    {type: "textMessage", text: "If you're interested, enter the portal's center!"},
    walkLeft(X), walkLeft(X), walkLeft(X),
    walkLeft(X),walkUp(X),walkLeft(X),walkUp(X),
]

let dhriti_cutscene_set_of_coords = [[9,31],[9,32],[9,33],[9,34],[9,35],[9,36],[9,37]];
dhriti_cutscene_set_of_coords = getCutsceneSetOfCoords(dhriti_cutscene_set_of_coords);

X = "diya";
let diyaPath = [
    walkUp(X),walkLeft(X),walkUp(X),walkUp(X),walkUp(X),
    standUp(X,500),
    {type: "textMessage", text:"Will you be able to manage management?"},
    {type: "textMessage", text: "If so, enter the portal center to apply!"},
    walkRight(X),walkDown(X),walkDown(X),walkDown(X),walkDown(X),
]

let diya_cutscene_set_of_coords = [[12,38],[13,38],[14,38],[15,38],[16,38],[17,38],[18,38]];
diya_cutscene_set_of_coords = getCutsceneSetOfCoords(diya_cutscene_set_of_coords);

X = "rehber";
let rehberPath = [
    walkRight(X),walkRight(X),walkRight(X),walkRight(X),walkUp(X),walkUp(X),
    standUp(X,500),
    {type: "textMessage", text:"Wanna join our cool competitive team?"},
    {type: "textMessage", text: "If so, enter the portal's center!"},
    walkLeft(X),walkDown(X),walkDown(X),walkLeft(X),walkLeft(X),walkLeft(X),
]

let rehber_cutscene_set_of_coords = [[33,63],[34,63],[35,63]];
rehber_cutscene_set_of_coords = getCutsceneSetOfCoords(rehber_cutscene_set_of_coords);
