const utils = require("../app/utils");

async function main(args) {
  const [seed] = args;
  if (seed == null ) {
    throw new Error("usage: traits_from_seed.js <seed> ");
  }
  
  console.log("Seed: " + seed + " ");
  const traits = utils.traitsFromSeed(seed);
  console.log("Traits:\n", JSON.stringify(traits, null, 2));
  return JSON.stringify(traits, null, 2);
}

main(process.argv.slice(2)).catch((e) => {
  process.exitCode = process.exitCode || 1;
  console.error(e);
});