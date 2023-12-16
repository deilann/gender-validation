const colorContainer = document.getElementById("color-container");
const copyButton = document.getElementById("copy-button");
const colorText = document.getElementById("color-text");
const button3 = document.getElementById("button3");
const button4 = document.getElementById("button4");
const button6 = document.getElementById("button6");

const colorGroups = {
    3: ["#DEF", "#CAB", "#DAB", "#DED", "#FDA", "#FAD", "#CAF", "#ADE", "#FAB", "#BAE", "#ACE", "#BED", "#BEE", "#DAD", "#DEA", "#EFF", "#FAA", "#BAC", "#BAD", "#FED", "#EBB", "#DEC", "#FEE", "#BEC", "#CAD", "#ADD", "#BAA", "#FAE", "#ABE", "#ADA"],
    4: ["#0FADE0", "#1FADE1", "#2FADE2", "#3FADE3", "#4FADE4", "#5FADE5", "#6FADE6", "#7FADE7", "#8FADE8", "#9FADE9", "#0BEAD0", "#1BEAD1", "#2BEAD2", "#3BEAD3", "#4BEAD4", "#5BEAD5", "#6BEAD6", "#7BEAD7", "#8BEAD8", "#9BEAD9", "#0DADA0", "#1DADA1", "#2DADA2", "#3DADA3", "#4DADA4", "#5DADA5", "#6DADA6", "#7DADA7", "#8DADA8", "#9DADA9", "#0ACED0", "#1ACED1", "#2ACED2", "#3ACED3", "#4ACED4", "#5ACED5", "#6ACED6", "#7ACED7", "#8ACED8", "#9ACED9", "#0DEAF0", "#1DEAF1", "#2DEAF2", "#3DEAF3", "#4DEAF4", "#5DEAF5", "#6DEAF6", "#7DEAF7", "#8DEAF8", "#9DEAF9", "#0BABA0", "#1BABA1", "#2BABA2", "#3BABA3", "#4BABA4", "#5BABA5", "#6BABA6", "#7BABA7", "#8BABA8", "#9BABA9", "#0CEDE0", "#1CEDE1", "#2CEDE2", "#3CEDE3", "#4CEDE4", "#5CEDE5", "#6CEDE6", "#7CEDE7", "#8CEDE8", "#9CEDE9", "#0FACE0", "#1FACE1", "#2FACE2", "#3FACE3", "#4FACE4", "#5FACE5", "#6FACE6", "#7FACE7", "#8FACE8", "#9FACE9", "#0ABED0", "#1ABED1", "#2ABED2", "#3ABED3", "#4ABED4", "#5ABED5", "#6ABED6", "#7ABED7", "#8ABED8", "#9ABED9", "#0CAFE0", "#1CAFE1", "#2CAFE2", "#3CAFE3", "#4CAFE4", "#5CAFE5", "#6CAFE6", "#7CAFE7", "#8CAFE8", "#9CAFE9", "#0BEEF0", "#1BEEF1", "#2BEEF2", "#3BEEF3", "#4BEEF4", "#5BEEF5", "#6BEEF6", "#7BEEF7", "#8BEEF8", "#9BEEF9", "#0DEED0", "#1DEED1", "#2DEED2", "#3DEED3", "#4DEED4", "#5DEED5", "#6DEED6", "#7DEED7", "#8DEED8", "#9DEED9", "#0DEAD0", "#1DEAD1", "#2DEAD2", "#3DEAD3", "#4DEAD4", "#5DEAD5", "#6DEAD6", "#7DEAD7", "#8DEAD8", "#9DEAD9", "#0BADE0", "#1BADE1", "#2BADE2", "#3BADE3", "#4BADE4", "#5BADE5", "#6BADE6", "#7BADE7", "#8BADE8", "#9BADE9", "#0FAFF0", "#1FAFF1", "#2FAFF2", "#3FAFF3", "#4FAFF4", "#5FAFF5", "#6FAFF6", "#7FAFF7", "#8FAFF8", "#9FAFF9", "#0FEED0", "#1FEED1", "#2FEED2", "#3FEED3", "#4FEED4", "#5FEED5", "#6FEED6", "#7FEED7", "#8FEED8", "#9FEED9", "#0BABE0", "#1BABE1", "#2BABE2", "#3BABE3", "#4BABE4", "#5BABE5", "#6BABE6", "#7BABE7", "#8BABE8", "#9BABE9"],
    6: ["#BEDDED", "#ACCEDE", "#BEADED", "#DABBED", "#DECADE", "#FACADE", "#CABBED", "#DEFACE", "#DEEDED", "#EFFACE", "#BEEFED"]
};

let currentColorGroup = 3; // Start with a default color group

const selectRandomColor = () => {
    const colors = colorGroups[currentColorGroup];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    colorText.textContent = randomColor;
    colorContainer.style.backgroundColor = randomColor;
};

selectRandomColor();

const buttonRow = document.querySelector(".button-row");
buttonRow.addEventListener("click", (event) => {
    if (event.target.matches("button")) {
        currentColorGroup = event.target.value;
        button3.disabled = false;
        button4.disabled = false;
        button6.disabled = false;
        event.target.disabled = true;
        selectRandomColor();
    }
});

colorContainer.addEventListener("click", (event) => {
    selectRandomColor();
});

// Copy button functionality
copyButton.addEventListener("click", () => {
    const textToCopy = colorContainer.textContent;
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            alert("Color code copied to clipboard!");
        })
        .catch((error) => {
            alert("Failed to copy: " + error.message);
        });
});
