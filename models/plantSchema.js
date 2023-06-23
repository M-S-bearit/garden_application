const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const plantSchema = new Schema({
    common_name: String,
    cientific_name: String,
    img_url: String,
    hardiness: String,
    lighting: String,
    description: String,
    blooming_period: String,
});

const Plant = mongoose.model('plant', plantSchema);

module.exports= Plant;



