const mongoose = require("mongoose");

const User = new mongoose.Schema({
	entityId: {type: mongoose.Schema.Types.ObjectId},
	id: {type: String, required: true, trim: true},
	password: {type: String, required: true, trim: true},
	name: {type: String}
});

module.exports = mongoose.model("User", User);