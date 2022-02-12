// Initializes the treasure statistics AND the "press 'Enter' to interact" feature

const renderStats = () => {
    let div = document.querySelector(".game-statistics");
    let name = document.createElement("p");
    name.setAttribute("id", "player_stats_p")
    name.innerHTML = `Collected ${applicantData.treasuresObtained.size || 0}/8 treasures`;
    div.appendChild(name);

    div = document.querySelector(".game-interact");
    let interact = document.createElement("p");
    interact.setAttribute("id", "game_interact_p");
    interact.innerHTML = `Press 'Enter' to interact!`;
    div.appendChild(interact);
}

// update when the player unlocks a chest
const updateStats = () => {
    let name = document.getElementById("player_stats_p");
    name.innerHTML = `Collected ${applicantData.treasuresObtained.size}/8 treasures`;
}
