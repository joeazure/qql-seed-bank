const utils = require("../app/utils");

async function main(args) {
  const [filename] = args;
  if (filename == null ) {
    throw new Error("usage: traits_from_file.js <filename> ");
  }
  
  var seed = utils.seed_from_filename(filename);
  var retVal = {};
  retVal["seed"] = seed;

  //console.log("Seed: " + seed + " ");
  const traits = utils.traitsFromSeed(seed);
  // FOR SOME REASON OK JSON DOES NOT LIKE INTS
  traits["version"] = traits["version"].toString();
  retVal["traits"] = traits;
  //console.log(JSON.stringify(retVal, null, 2));
  console.log(JSON.stringify(retVal));
  //console.log(retVal);
  //return JSON.stringify(traits, null, 2);
}

main(process.argv.slice(2)).catch((e) => {
  process.exitCode = process.exitCode || 1;
  console.error(e);
});