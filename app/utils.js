// Utility functions for qql-headless
const fs = require("fs");
const traitsLib = require("qql-headless/src/vendor/qql-traits.min.js");
const rng = require("seedrandom")();
const _ = require("lodash");

function is_qql_output_filename(fname) {
  // Look for .png extension and existence og '-0x'
  const f = fname.toLowerCase();
  return (f.includes("-0x")) && (f.toLowerCase().endsWith(".png"));
}

function is_qql_render_filename(fname) {
  const f = fname.toLowerCase();
  return (f.includes("-0x")) && (f.toLowerCase().endsWith(".png.txt")); 
}

function seedlist_from_dir(dir_name) {
  const ret = []; 
  var files = fs.readdirSync(dir_name);
  files.forEach(function (file) {
    if (is_qql_output_filename(file) == true) {
      ret.push(seed_from_filename(file));
    } 
  });
  return ret;
}

function seeds_and_traits_from_dir(dir_name) {
  const ret = []; 
  var files = fs.readdirSync(dir_name);
  files.forEach(function (file) {
    if (is_qql_output_filename(file) == true) {
      
      ret.push(seed_from_filename(file));
    } 
  });
  return ret;  
}

function seed_from_filename(filename) {
  if (!is_qql_output_filename(filename)) {
    throw new Error("expected valid QQL output filename. got: " + filename);
  }
  var seed = filename.substr(filename.lastIndexOf('-')+1) || filename;
  seed = seed.substr(0, seed.lastIndexOf('.')) || seed;
  return seed;
}

function is_valid_full_seed(seed) {
  if (!seed.match(/^0x[0-9a-f]*$/)) {
    return false;
  }
  if (seed.length != 66) {
    return false;
  }
  return true;
}

function split_hexseed(seed) {
  // Assumes hexstring is like: 0x + 32 byte hex (64 chrs)
  // 0x37b15e06ad0f4520ccdd8c2557d2a28da0354f7d06e4b13c1f35ffff10a99eb7
  if (!seed.match(/^0x[0-9a-f]*$/)) {
    throw new Error("expected hex string; got: " + seed);
  }
  var nibbles = seed.slice(2);
  if (nibbles.length != 64) {
    throw new Error("expected eth address + bytes(12)")
  }
  var eth_hex = seed.substr(0, 41);
  var qql_hex = seed.substr(42);
  return { eth_hex, qql_hex };
}

function traits_from_seed(hexseed) {
  var traits = traitsLib.extractTraits(hexseed);
  return traits;
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
function randomSeed() {
  const buf = Buffer.from(
      Array(32)
          .fill()
          .map(() => Math.random() * 256)
  );
  // Set "version 1" to get proper spirals.
  const version = 1;
  buf[26] = buf[27] = 0xff; // version sentinel
  buf[28] = (buf[28] & 0x0f) | (version << 4);
  return "0x" + buf.toString("hex");
}

function calcSeed(address, traits) {
  // Calculates a version 1 seed from an address and Traits
  address = address.toLowerCase();
  const salt = [...Array(24)].map(() => Math.floor(rng() * 16).toString(16)).join("");
  let seed = traitsLib.encodeTraits(`${address}${salt}`, traits);
  seed = `${seed.substring(0, 54)}${[...Array(4)].map(() => "f").join("")}${'1'}${seed.substring(59)}`;

  return seed;
}

function traitsFromNamed(srcName) {
  // assumes trait json iles in ../traits dir
  const traits = require(`../traits/${srcName}.json`);
  return _.cloneDeep(traits);
}

function randomPalette() {
  return _.sample(["Austin", "Berlin", "Edinburgh", "Fidenza", "Miami", "Seattle", "Seoul"]);
}

exports.seed_from_filename = seed_from_filename;
exports.split_hexseed = split_hexseed;
exports.is_qql_output_filename = is_qql_output_filename;
exports.is_qql_render_filename = is_qql_render_filename;
exports.seedlist_from_dir = seedlist_from_dir;
exports.is_valid_full_seed = is_valid_full_seed;
exports.traits_from_seed = traits_from_seed;
exports.generateSeed = generateSeed;

exports.calcSeed = calcSeed;
exports.traitsFromNamed = traitsFromNamed;
exports.randomPalette = randomPalette;