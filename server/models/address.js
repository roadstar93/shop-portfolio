const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    country: String,
    city: String,
    streetAdress: String,
    zip: Number,
})

module.exports = mongoose.model("Address", addressSchema);