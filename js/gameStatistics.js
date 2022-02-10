const renderStats = () => {
    let div = document.querySelector(".game-statistics");

    let name = document.createElement("p");
    name.setAttribute("id", "player_stats_p")
    name.innerHTML = `Collected ${applicantData.treasuresObtained.size || 0}/9 treasures`;

    div.appendChild(name);
}

// update when the player unlocks a chest
const updateStats = () => {
    let name = document.getElementById("player_stats_p");
    name.innerHTML = `Collected ${applicantData.treasuresObtained.size}/9 treasures`;
}