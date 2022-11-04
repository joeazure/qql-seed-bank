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

exports.combined_traits = combined_traits;