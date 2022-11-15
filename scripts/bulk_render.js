const fs = require("fs");
const path = require("path");
const utils = require("../app/utils");
const render = require("../app/render");
const webp = require('webp-converter'); //mkdir node_modules/webp-converter/temp
const seed_db = require('../app/seed_db.js');

const RENDER_CNT = 2000;
const TWO_RING = false;
const RENDER_WIDTH = 800;

async function main(args) {
    // Args
    const [host, outdir, wallet, namedTraits] = args;
    if (host == null || 
        outdir == null || 
        wallet == null) {
      throw new Error("usage: bulk_render <host> <outdir> <wallet> [namedTraits]");
    }
    if (namedTraits == null) {
      console.log(`Generating ${RENDER_CNT} random seeds...`);
    } else {
      console.log(`Generating ${RENDER_CNT} seeds from traits ${namedTraits}...`);  
    }

    let seedList = []; 
    let i = 0;
    
    // calculate all the seeds first
    while (i < RENDER_CNT) {
      var seed;
      if (namedTraits == null) {
        // use a completely random seed
        seed = utils.generateSeed(wallet);
      } else {
        // use traits to make a seed
        const traits = utils.traitsFromNamed(namedTraits);
        seed = utils.calcSeed(wallet, traits);   // Custom traits    
      }
      if (TWO_RING == true) {
        const s2 = seed.substr(0, seed.length-4) + 'f' + seed.substr(-3);
        seedList.push(s2);
      } else {
        seedList.push(seed);
      }
      i++;
      console.log("Generated seed " + i+"/"+RENDER_CNT);       
    }

    console.log("Rendering outputs...");
    //console.log(seedList);

    // render and save the outputs
    const fullOutdir = path.resolve(outdir); // for inserting into DB
    var timetaken = "Time taken to render " + RENDER_CNT + " seeds";
    console.time(timetaken);
    for (let i = 0; i < seedList.length; i++) {
      seed = seedList[i];
      //render to buffer
      const { imageData, renderData } = await render({ seed, width: RENDER_WIDTH });
      // filenames
      const basename = `${new Date().toISOString()}-${seed}.png`;
      const webpName = basename + ".webp";
      // files
      //const outfile = path.join(outdir, basename); // unused unless writing png file as well
      const webpFile = path.join(outdir, webpName);
      const infoFile = path.join(outdir, basename + ".txt");

      // write files
      const result = await webp.buffer2webpbuffer(imageData, "png", "-q 60");
      await fs.promises.writeFile(webpFile, result);

      await fs.promises.writeFile(infoFile, JSON.stringify(renderData, null, 2));
      //await fs.promises.writeFile(outfile, imageData);

      // insert the render into the DB
      await seed_db.insertRender(host, fullOutdir, basename, seed, RENDER_WIDTH, renderData);
    }
    console.timeEnd(timetaken);
}

main(process.argv.slice(2)).catch((e) => {
    process.exitCode = process.exitCode || 1;
    console.error(e);
  });
