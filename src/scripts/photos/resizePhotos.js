const { lowerCase } = require('lodash');
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

async function main() {
    try {
        const outputData = {};
        const params = {
            // Size params
            sizes: {
                xl: { resize: null },
                lg: { resize: 2000 },
                md: { resize: 1500 },
                sm: { resize: 1200 },
                xs: { resize: 1000 },
            },
            // forceResize: false,
        };

        // Reside photos
        for (let page of ['photography', 'photoBooth']) {
            console.log(`Resizing ${lowerCase(page)}...`);
            outputData[page] = fs.readdirSync(`public/photos/${page}/originals`);
            if (outputData[page][0] == '.DS_Store') outputData[page].splice(0, 1); // Remove .DS_Store entry

            for (let fileName of outputData[page]) {
                const [actualName, extension] = fileName?.split(".");
                const originalPath = `public/photos/${page}/originals/${fileName}`;
                console.log(`${fileName}`);

                // Run through sizes
                for (let size of Object.keys(params?.sizes ?? {})) {
                    const newPath = `public/photos/${page}/resized/${actualName}_${size}.${extension}`;
                    // if (!fs.existsSync(newPath) || params?.forceResize) 
                    await sharp(originalPath)?.resize(params?.sizes?.[size]?.resize)?.toFile(newPath);
                }
            }
            console.log(`Done!\n`);
        }

        const outputPath = path.join(__dirname, 'resizePhotosOutput.js');
        fs.writeFileSync(outputPath, `export default ${JSON.stringify(outputData)}`);
        console.log(`All photos resized and ready!`);
    } catch (err) {
        console.log(`ERROR `, err);
    }
};

main();