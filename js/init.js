// contains the applicant's data (used to keep track of the treasure unlocked)
var applicantData = {
    treasuresObtained: []
};

(function() {
    // console.log("Working");
    const overworld = new Overworld({
        element: document.querySelector(".game-container")
    });

    overworld.init();

}) ();