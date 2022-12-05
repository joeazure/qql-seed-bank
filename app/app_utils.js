const config = require(__dirname + '/config/apiConfig.json');

const hostUrlPrefixes = config["hostUrlMappings"];

function urlForLocation(location) {
    // Creates a url prefix for a given location model
    return `${hostUrlPrefixes[location.host]}${location.folderPath}`;
}

function galleryImageData(seed_model) {
    /* Returns basi c map of fields required by the UI gallery
    {
        src:
        width:
        height:  
    } */
    var url = urlForLocation(seed_model.render.output.location);
    url = url + '/' + seed_model.render.output.filename;

    const ret = {};
    ret["src"] = url;
    ret["width"] = seed_model.render.output.pixelWidth;
    //console.log(ret);
    return ret;
}

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
    mini["display_info"] = galleryImageData(s_model);
    return mini;
}

function seedDisplayInfo(s_model) {
    const ret = {};
    ret["id"] = s_model.id;
    ret["full_hexseed"] = s_model.full_hexseed;
    ret["display_info"] = galleryImageData(s_model);
    return ret;
}

exports.combined_traits = combined_traits;
exports.condense_seed = condense_seed;
exports.seedDisplayInfo = seedDisplayInfo;
