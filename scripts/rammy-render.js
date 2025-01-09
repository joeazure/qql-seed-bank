const fs = require("fs");
const path = require("path");

const render = require("./render");
const traitsLib = require("./vendor/qql-traits.min.js");

async function main(args) {
  const [quantity, extraArg] = args;
  const outdir = "output2";
  if (outdir == null || quantity == null || extraArg != null) {
    throw new Error(`usage: render <outdir> { <seed> | <address> }, ${outdir}, ${quantity}, ${extraArg}`);
  }

  var wallet = "0x4DC6750A016DB9A96FEf40D852E1faEE11733DB6";
  for (var i = 1; i <= quantity; i++) {
    const seed = generateSeed(wallet);
    const traits = traitsLib.extractTraits(seed);
    if ( !checkTraits( traits ) ) {
      i--;
      continue;
    } else {
      _ = await GENERATE(i, quantity, traits, outdir, seed);
    }
  }
}

async function GENERATE( i, quantity, traits, outdir, seed ) {
  console.log(`\n\n----GENERATING ${i} of ${quantity}-----\n\n`);
 // console.log("Traits:", JSON.stringify(traits, null, 2));
 const { imageData, renderData } = await render({ seed, width: 500 });
 if (!checkRenderData( renderData )) return;
 // console.log("Seed:", seed);
 // console.log("RENDERED");
  const basename = `${seed}.png`;
  const outfile = path.join(outdir, basename);
  _ = await fs.promises.writeFile(outfile, imageData);
  console.log("Render data:", JSON.stringify(renderData, null, 2));
  console.log("Image:", outfile);
}

  
function checkRenderData( renderData ) {
  // Let's check some shit
  if (renderData["numPoints"] >= "1000000") return false;
  
  // etc
  return true;
}

// Check traits for desired ones.
function checkTraits( traits ) {
  if (traits["flowField"] != "Horizontal"&&traits["flowField"] != "Circular"&&traits["flowField"] != "Diagonal"&&traits["flowField"] != "Random Radial"&&traits["flowField"] != "Random Linear"&&traits["flowField"] != "Spiral") return false;
//    if (traits["turbulence"] != "Low"&&traits["turbulence"] != "High") return false;
  if (traits["structure"] != "Formation") return false;
//    if (traits["ringThickness"] != "Thick"&&traits["ringThickness" != "Mixed"]) return false;
  if (traits["ringSize"] != "Small") return false;
  if (traits["spacing"] != "Dense") return false;
  if (traits["sizeVariety"] != "Constant"&&traits["sizeVariety"] != "Wild") return false;
  if (traits["colorMode"] != "Zebra"&&traits["colorMode"] != "Stacked") return false;
//  if (traits["colorVariety"] != "Low") return false;
  if (traits["margin"] != "None"&&traits["margin"] != "Crisp") return false;
  if (traits["colorPalette"] != "Austin"&&traits["colorPalette"] != "Fidenza"&&traits["colorPalette"] != "Miami") return false;
//  if (traits["bullseyeRings1"] != "Off") return false;
//  if (traits["bullseyeRings3"] != "Off") return false;
//  if (traits["bullseyeRings7"] != "Off") return false;
  return true;
}

function generateSeed(target) {
  target = target.toLowerCase();
  if (!target.match(/^0x[0-9a-f]*$/)) {
    throw new Error("expected hex string; got: " + target);
  }
  const nibbles = target.slice(2);
  if (nibbles.length === 40) return randomSeed(Buffer.from(nibbles, "hex"));
  if (nibbles.length === 64) return target;
  throw new Error(
    "expected address (bytes20) or seed (bytes32); got: " + target
  );
}

function randomSeed(address) {
  if (!Buffer.isBuffer(address) || address.length !== 20)
    throw new Error("expected address, got: " + address);
  const buf = Buffer.from(
    Array(32)
      .fill()
      .map(() => Math.random() * 256)
  );
  address.copy(buf);
  // Set "version 1" to get proper spirals.
  const version = 1;
  buf[26] = buf[27] = 0xff; // version sentinel
  buf[28] = (buf[28] & 0x0f) | (version << 4);
  return "0x" + buf.toString("hex");
}

main(process.argv.slice(2)).catch((e) => {
  process.exitCode = process.exitCode || 1;
  console.error(e);
});