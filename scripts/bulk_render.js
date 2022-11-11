const utils = require("../app/utils");
const traitsLib = require("./vendor/qql-traits.min.js");

const RENDER_CNT = 2;
const TWO_RING = false;
const RENDER_WIDTH = 1200;
const traitsName = "qql_138";

async function main(args) {
    // Args
    const [host, outdir, target, extraArg] = args;
    if (host == null || outdir == null || target == null || extraArg != null) {
      throw new Error("usage: bulk_render <host> <outdir> { <seed> | <address> }");
    }
    const traits = utils.traitsFromNamed(traitsName);
    let i = 0;
    let seedList = []; 
    var timetaken = "Time taken to generate " + RENDER_CNT + " desired seeds";
    console.time(timetaken);
    while (i < RENDER_CNT) {

        //const seed = generateSeed(target);
        //const seed = utils.calc_seed(target, traits_138); // Custom traits    
        const seed = utils.calc_seed(target, traits_147);   // Custom traits    
        const traits = traitsLib.extractTraits(seed);
    
        // comment these out for totally random
        //if (!checkTraits(traits)) {
        // if (!check_traits_138(traits)) {
        //     continue;
        // }
        if (TWO_RING == true) {
          const s2 = seed.substr(0, seed.length-4) + 'f' + seed.substr(-3);
          seedList.push(s2);
        } else {
          seedList.push(seed);
        }
        i++;
        console.log("Generated seed " + i+"/"+RENDER_CNT);
      }
      console.timeEnd(timetaken);
    //   timetaken = "Time taken to render " + RENDER_CNT + " seeds";
    //   console.time(timetaken); 

}

main(process.argv.slice(2)).catch((e) => {
    process.exitCode = process.exitCode || 1;
    console.error(e);
  });
