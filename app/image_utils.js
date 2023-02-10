const { over } = require('lodash');
const sharp = require('sharp');

function randomDegrees() {
  return Math.floor(Math.random() * (360-1) + 1)
}

async function overlayImage(backgroundImage, foregroundImagePath, outputImagePath) {
    const metadata = await backgroundImage.metadata();

    const foregroundImage = await sharp(foregroundImagePath);

    // Now add 1..3 cows
    const numCows = Math.floor(Math.random() * 5) + 1;
    const sizes = [ 200, 275, 300, 250, 400];
    const gravities = [sharp.gravity.center,
      sharp.gravity.east,
      sharp.gravity.south,
      sharp.gravity.west,
      sharp.gravity.north,
      sharp.gravity.northwest,
      sharp.gravity.northeast,
      sharp.gravity.southwest,
      sharp.gravity.southeast
    ];

    console.log(`Overlaying ${numCows} cows...`);
    const overlayImages = [];
    for (let i = 0; i < numCows; i++) {
      const sz = sizes[Math.floor(Math.random() * sizes.length)];
      const overlay = await foregroundImage
        .rotate(randomDegrees(), {background: { r: 0, g: 0, b: 0, alpha: 0 }})
        .resize(sz)
        .toBuffer();
      console.log('Overlay created');
      overlayImages.push({
        input: overlay,
        blend: "over",
        gravity: gravities[Math.floor(Math.random() * gravities.length)]
      });
    }
    const newImage = await backgroundImage.composite(overlayImages);
    await newImage.toFile(outputImagePath);
}

async function overlayImageFile(backgroundImagePath, foregroundImagePath, outputImagePath) {
    const backgroundImage = sharp(backgroundImagePath);
    await overlayImage(backgroundImage, foregroundImagePath, outputImagePath)
}

exports.overlayImage = overlayImage;
exports.overlayImageFile = overlayImageFile;