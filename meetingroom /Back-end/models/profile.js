
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/meetingroom", { useMongoClient : true });

const Schema = mongoose.Schema;

const profileSchema = new Schema({
    name : String,
    address : String,
    phoneNumber : String,
    image : String,

});

const Profile = mongoose.model("profile", profileSchema);

module.exports = Profile;
