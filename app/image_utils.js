const { over } = require('lodash');
const sharp = require('sharp');

async function overlayImage(backgroundImage, foregroundImagePath, outputImagePath) {
    const metadata = await backgroundImage.metadata();
    //const foregroundResized = foregroundImage.resize(metadata.width, metadata.height);
  
    const imageOverlayed = await backgroundImage.composite([
      {
        input: foregroundImagePath,
        blend: 'over',
        gravity: sharp.gravity.center
      }
    ]);
  
    await imageOverlayed.toFile(outputImagePath);
}

async function overlayImageFile(backgroundImagePath, foregroundImagePath, outputImagePath) {
    const backgroundImage = sharp(backgroundImagePath);
    await overlayImage(backgroundImage, foregroundImagePath, outputImagePath)
}

exports.overlayImage = overlayImage;
exports.overlayImageFile = overlayImageFile;