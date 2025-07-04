const {Schema, model} = require('../connection');

const myschema = new Schema({
    name : String,
    email : String,
    password : String,
    mobile_no : String,
    createdAt: Date,
    avatar: String,
    regid: String,
    timesLoggedin: {type : Number, default: 0},
    lastLogin: Date,
    type: {type: String, default: 'normal'},
});

module.exports = model('students', myschema);

