const utils = require("./utils");

const db = require("./models");

async function ingest_seed(hexseed) {
  // Inserts a single hexseed into the seed_db
  if (!utils.is_valid_full_seed(hexseed)) {
    throw new Error("Invalid full seed. Expected eth address + bytes(12)");
  }
  // split the seed
  var { eth_hex, qql_hex } = utils.split_hexseed(hexseed);
  // check for existing seed
  var s = await db.seed.findOne({
    where: {
      full_hexseed: hexseed
    }
  });
  if (s !== null) {
    console.log('Hexseed already exists: '+hexseed);
    return;
  }

  // Use findOrCreate instead of find then create...
  var [owner_wallet, created] = await db.wallet.findOrCreate({
    where: { address: eth_hex }
  });

  
    // Now insert the seed and traits is a transaction
    //console.log('Inserting algorithm seed: ' + qql_hex);
    var new_seed = await db.seed.create({
      full_hexseed: hexseed,
      algorithm_hexseed: qql_hex,
      wallet_id: owner_wallet.id
    });
    var traits = utils.traits_from_seed(hexseed);
    var new_trait = await db.trait.create({
      seed_id: new_seed.id,
      version: traits["version"],
      flowField: traits["flowField"],
      turbulence: traits["turbulence"],
      margin: traits["margin"],
      colorVariety: traits["colorVariety"],
      colorMode: traits["colorMode"],
      structure: traits["structure"],
      bullseyeRings1: traits["bullseyeRings1"],
      bullseyeRings3: traits["bullseyeRings3"],
      bullseyeRings7: traits["bullseyeRings7"],
      ringThickness: traits["ringThickness"],
      ringSize: traits["ringSize"],
      sizeVariety: traits["sizeVariety"],
      colorPalette: traits["colorPalette"],
      spacing: traits["spacing"]
    });
    // Return the new Seed ID
    return new_seed.id; 
}

function ingest_seed_list(seed_list) {
  for (var i = 0; i < seed_list.length; i++) {
    ingest_seed(seed_list[i]);
  }
}

async function insert_render(host, location, filename, hexseed, width, renderData) {
  // Seed/Traits
  var seed_id = await ingest_seed(hexseed);
  console.log('New Seed: ' + seed_id);
  // Location
  var [location, created] = await db.location.findOrCreate({
    where: {
      host: host,
      folderPath: location
    }
  });
  var loc_id = location.id;

  // Render
  var render = await db.render.create({
    seed_id: seed_id,
    backgroundColor: renderData["backgroundColor"],
    numColors: renderData["numColors"],
    numPoints: renderData["numPoints"],
    colorList: renderData["colorsUsed"].join(",")
  });
  var render_id = render.id;

  // Output
  var new_output = await db.output.create({
    location_id: loc_id,
    render_id: render_id,
    filename: filename,
    pixelWidth: width
  });
}

exports.ingest_seed = ingest_seed;
exports.ingest_seed_list = ingest_seed_list;
exports.insert_render = insert_render;

  