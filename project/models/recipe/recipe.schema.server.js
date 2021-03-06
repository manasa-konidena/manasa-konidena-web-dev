





module.exports = function() {
    var mongoose = require("mongoose");

    var RecipeSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.ObjectId, ref: "ProUser"},
        name: String,
        servings: Number,
        rating: {type: String, default: "Unrated"},
        imageurl: String,
        course: String,
        cuisine: String,
        flagged: {type: String, default: "False"},
        flaggedCount: {type: Number, default: 0},
        preptime: Number,
        cooktime: Number,
        preparationsteps: String,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.recipe"});

    return RecipeSchema;
};