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

/*
For cutscenes:
*/

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
    walkRight(X),walkRight(X),walkDown(X),walkRight(X),walkRight(X),walkRight(X),walkRight(X),walkRight(X),standRight(X,200),
    {type: "textMessage", text: "Are you up for applying to the App Domain?"},
    {type: "textMessage", text: "If so, enter the portal!"},
    walkLeft(X),walkLeft(X),walkLeft(X),walkLeft(X),walkLeft(X),walkUp(X),walkLeft(X),walkLeft(X),standRight(X,200),    
]

// hemanth's cutscene's set of coordinates
// raw == tile format and not in pixel format
let hemanth_cutscene_set_of_coords_raw = [[11,11],[11,10],[11,9],[11,8],[10,8],[11,12],[11,13],[11,14],[10,14]]
let hemanth_cutscene_set_of_coords = getCutsceneSetOfCoords(hemanth_cutscene_set_of_coords_raw); // pixel format

X = "yash";
let yashPath = [
    walkLeft(X),walkUp(X),walkLeft(X),walkLeft(X),walkLeft(X),standDown(X,200),
    {type: "textMessage", text: "Are you up for applying to the General Technical Domain?"},
    {type: "textMessage", text: "If so, enter the portal!"},
    walkRight(X),walkRight(X),walkRight(X),walkDown(X),walkRight(X),standLeft(X,200),
]

let yash_cutscene_set_of_coords_raw = [[10,9],[11,9],[12,9],[13,9],[14,9],[15,9],[16,9],[17,9],[18,9],[19,9]] 
let yash_cutscene_set_of_coords = getCutsceneSetOfCoords(yash_cutscene_set_of_coords_raw);




X = "dhriti";
let dhritiPath = [
    walkDown(X),walkRight(X),walkDown(X),walkRight(X),walkRight(X),walkRight(X),walkRight(X),
    standRight(X,500),
    {type: "textMessage", text: "Are you good looking?"},
    {type: "textMessage", text: "Of course you are!"},
    {type: "textMessage", text: "But we want people that can make things look good..."},
    {type: "textMessage", text: "If you're interested, enter the portal!"},
    walkLeft(X), walkLeft(X), walkLeft(X),
    walkLeft(X),walkUp(X),walkLeft(X),walkUp(X),
]

let dhriti_cutscene_set_of_coords_raw = [[9,31],[9,32],[9,33],[9,34],[9,35],[9,36],[9,37]];
let dhriti_cutscene_set_of_coords = getCutsceneSetOfCoords(dhriti_cutscene_set_of_coords_raw);

X = "diya";
let diyaPath = [
    walkUp(X),walkLeft(X),walkUp(X),walkUp(X),walkUp(X),
    standUp(X,500),
    {type: "textMessage", text:"Will you be able to manage management, while having a great social life?"},
    {type: "textMessage", text: "If so, enter the portal!"},
    walkRight(X),walkDown(X),walkDown(X),walkDown(X),walkDown(X),
]

let diya_cutscene_set_of_coords_raw = [[12,38],[13,38],[14,38],[15,38],[16,38],[17,38],[18,38]];
let diya_cutscene_set_of_coords = getCutsceneSetOfCoords(diya_cutscene_set_of_coords_raw);

X = "rehber";
let rehberPath = [
    walkRight(X),walkRight(X),walkRight(X),walkRight(X),walkUp(X),walkUp(X),
    standUp(X,500),
    {type: "textMessage", text:"Wanna join our cool competitive team?"},
    {type: "textMessage", text: "If so, enter the portal!"},
    walkLeft(X),walkDown(X),walkDown(X),walkLeft(X),walkLeft(X),walkLeft(X),
]

let rehber_cutscene_set_of_coords_raw = [[33,63],[34,63],[35,63]];
let rehber_cutscene_set_of_coords = getCutsceneSetOfCoords(rehber_cutscene_set_of_coords_raw);


// Research cutscene
X = "vinamra";
let vinamraPath = [
    walkDown(X),walkLeft(X),walkLeft(X),walkLeft(X),standLeft(X,200),
    {type: "textMessage", text:"In the Research Domain we work on cool, novel technologies..."},
    {type: "textMessage", text:"If you have a curious mindset, fill the Research form!"},
    walkRight(X),walkRight(X),walkRight(X),walkUp(X),standDown(X,200),
]

// if you have a curious mindset, fill research form!
let vinamra_cutscene_set_of_coords_raw = [[18,20],[18,21],[18,22],[18,23]]
let vinamra_cutscene_set_of_coords = getCutsceneSetOfCoords(vinamra_cutscene_set_of_coords_raw);

 
X = "shreyas"
let shreyasPath = [
    walkDown(X),standRight(X,200),
    {type: "textMessage", text:"To join our awesome Web Domain, hop onto the portal ahead!"},
    walkUp(X),standRight(X,200),
]

let shreyas_cutscene_set_of_coords_raw = [[10,17],[11,17],[11,18],[11,19],[11,20],[11,21],[11,22],[11,23],[11,24],[10,24]]
let shreyas_cutscene_set_of_coords = getCutsceneSetOfCoords(shreyas_cutscene_set_of_coords_raw);


X = "sumona"
let sumonaPath = [
    walkUp(X),walkRight(X),walkRight(X),walkRight(X),walkUp(X),standUp(X,200),
    {type: "textMessage", text:"Welcome to ACM-RPG!"},
    {type: "textMessage", text:"Thank you for hopping in."},
    {type: "textMessage", text:"Make sure you check out all the domains we have to offer."},
    {type: "textMessage", text:"We hope you have fun while applying to ACMVIT"},
    {type: "textMessage", text:"Best of luck!"},
    walkDown(X),walkLeft(X),walkLeft(X),walkLeft(X),walkDown(X),standUp(X,200),
];

let sumona_cutscene_set_of_coords_raw = [[27,33],[28,33],[29,33]]
let sumona_cutscene_set_of_coords = getCutsceneSetOfCoords(sumona_cutscene_set_of_coords_raw);



