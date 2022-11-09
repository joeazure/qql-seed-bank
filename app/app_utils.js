
const traits = {
    flowField: "Horizontal", // 3 bits					0000 / 0000 / 0000 / 0000 / 0000 / 0000 / 0XXX
    turbulence: "None", // NON-ENCODED 2 bits			0000 / 0000 / 0000 / 0000 / 0000 / 000X / X000
    margin: "None", // NON-ENCODED 2 bits				0000 / 0000 / 0000 / 0000 / 0000 / 0XX0 / 0000
    colorVariety: "Low", // NON-ENCODED 2 bits			0000 / 0000 / 0000 / 0000 / 000X / X000 / 0000
    colorMode: "Simple", // NON-ENCODED 2 bits			0000 / 0000 / 0000 / 0000 / 0XX0 / 0000 / 0000
    structure: "Orbital", // NON-ENCODED 2 bits			0000 / 0000 / 0000 / 000X / X000 / 0000 / 0000
    bullseyeRings1: "On", // NON-ENCODED 1 bit			0000 / 0000 / 0000 / 00X0 / 0000 / 0000 / 0000
    bullseyeRings3: "On", // NON-ENCODED 1 bit			0000 / 0000 / 0000 / 0X00 / 0000 / 0000 / 0000
    bullseyeRings7: "On", // NON-ENCODED 1 bit			0000 / 0000 / 0000 / X000 / 0000 / 0000 / 0000
    ringThickness: "Thin", // NON-ENCODED 2 bits		0000 / 0000 / 00XX / 0000 / 0000 / 0000 / 0000
    ringSize: "Small", // NON-ENCODED 2 bits			0000 / 0000 / XX00 / 0000 / 0000 / 0000 / 0000
    sizeVariety: "Constant", // NON-ENCODED 2 bits		0000 / 00XX / 0000 / 0000 / 0000 / 0000 / 0000
    colorPalette: "Austin", // 3 bits					000X / XX00 / 0000 / 0000 / 0000 / 0000 / 0000
    spacing: "Dense", // NON-ENCODED 2 bits				0XX0 / 0000 / 0000 / 0000 / 0000 / 0000 / 0000
    version: 1
};

function combined_traits(seed_model) {
    // Combines the trait and render data from a seed model into a single map
    // by adding the interesting render data to the trait
    const ret = seed_model.trait.dataValues;
    const render = seed_model.render;
    ret["backgroundColor"] = render.backgroundColor;
    ret["numColors"] = render.numColors;
    ret["numPoint"] = render.numPoints;
    ret["colorList"] = render.colorList;
    return ret;
}

function condense_seed(s_model) {
    // Beginning with a seed model, condense to relevent data map.
    const mini = {};
    
    mini["id"] = s_model.id;
    mini["full_hexseed"] = s_model.full_hexseed;
    mini["algorithm_hexseed"] = s_model.algorithm_hexseed;
    mini["wallet"] = s_model.wallet.address;
    mini["traits"] = combined_traits(s_model);
    mini["location_host"] = {
        host: s_model.render.output.location.host,
        path: s_model.render.output.location.folderPath
    };
    mini["filename"] = s_model.render.output.filename;
    mini["pixel_width"] = s_model.render.output.pixelWidth;
    return mini;
}

exports.combined_traits = combined_traits;
exports.condense_seed = condense_seed;
