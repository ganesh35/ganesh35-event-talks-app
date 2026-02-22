const fs = require('fs');
const path = require('path');

const buildDir = 'dist';
const outputFile = path.join(buildDir, 'index.html');
const inputHtml = 'index.html';
const inputCss = 'style.css';
const inputJs = 'script.js';

// Ensure the build directory exists
if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir);
}

try {
    let htmlContent = fs.readFileSync(inputHtml, 'utf8');
    const cssContent = fs.readFileSync(inputCss, 'utf8');
    const jsContent = fs.readFileSync(inputJs, 'utf8');

    // Embed CSS
    htmlContent = htmlContent.replace(
        '<link rel="stylesheet" href="style.css">',
        `<style>
${cssContent}
</style>`
    );

    // Embed JavaScript
    htmlContent = htmlContent.replace(
        '<script src="script.js"></script>',
        `<script>
${jsContent}
</script>`
    );

    fs.writeFileSync(outputFile, htmlContent, 'utf8');
    console.log(`Successfully built single-file website to ${outputFile}`);
} catch (error) {
    console.error('Error during build process:', error);
}
