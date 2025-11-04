const generateBtn = document.getElementById('generate-btn');
const paletteContainer = document.querySelector('.palette-container');

generateBtn.addEventListener('click', generatePalette);
paletteContainer.addEventListener('click', function(event) 
    {
        if(event.target.classList.contains("copy-btn")) {
            const hexValue = event.target.previousElementSibling.textContent;
            navigator.clipboard.writeText(hexValue).then(() => showCopySuccess(event.target)).catch(err => console.error('Failed to copy text: ', err));
        } else if(event.target.classList.contains("color")) {
            const hexValue = event.target.nextElementSibling.querySelector('.hex-value').textContent;
            navigator.clipboard.writeText(hexValue).then(() => showCopySuccess(event.target.nextElementSibling.querySelector('.copy-btn'))).catch(err => console.error('Failed to copy text: ', err));
        }
    }
);

function generatePalette() {
    const colors = [];
    for (let i = 0; i < 5; i++) {
        colors.push(generateRandomColor());
    }
    updatePaletteDisplay(colors);
}

function updatePaletteDisplay(colors) {
    const colorBoxes = document.querySelectorAll('.color-box');
    colorBoxes.forEach((box, index) => {
        const color = colors[index]
        const colorDiv = box.querySelector('.color');
        const colorCode = box.querySelector('.hex-value');
        colorDiv.style.backgroundColor = color;
        colorCode.textContent = color;
    });
}

function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function showCopySuccess(copyBtn) {
    copyBtn.classList.remove("far", "fa-copy");
    copyBtn.classList.add("fas", "fa-check");
    copyBtn.style.color = "#48bb78";

    setTimeout(() => {
        copyBtn.classList.remove("fas", "fa-check");
        copyBtn.classList.add("far", "fa-copy");
        copyBtn.style.color = "#000";
    }, 1500);
}

generatePalette()