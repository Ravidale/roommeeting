const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/meetingroom", { useMongoClient : true });

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name : String,
    location : String,
    price : String,
    description : String,
    status : String,
    picture : String,
    telephone : String,
    email : String

});

const Employee = mongoose.model("employee", employeeSchema);

module.exports = Employee;