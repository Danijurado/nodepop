const mongoose = require('mongoose');

//definir esquema advertisements
const advertisementsSchema = mongoose.Schema({
    name: String,
    type: String,
    price: Number,
    image: String,
    tags: String
});

//crear modelo advertisements
const Advertisements = mongoose.model('Advertisements', advertisementsSchema);

//exportar el modulo advertisements
module.exports = Advertisements;