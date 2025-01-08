// JavaScript to handle dynamic font loading

document.addEventListener('DOMContentLoaded', function () {
    const fontForm = document.getElementById('fontForm');
    const sampleParagraph = document.getElementById('sampleParagraph');
    
    fontForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const selectedFont = document.getElementById('fontFamily').value;
        
        if (selectedFont === 'MyCustomFont') {
            const customFontURL = prompt("Enter the custom font CSS URL:");
            WebFont.load({
                custom: {
                    families: ['MyCustomFont'],
                    urls: [customFontURL]
                }
            });
            sampleParagraph.style.fontFamily = 'MyCustomFont, sans-serif';
        } else {
            WebFont.load({
                google: {
                    families: [selectedFont]
                }
            });
            sampleParagraph.style.fontFamily = selectedFont;
        }
    });
});
