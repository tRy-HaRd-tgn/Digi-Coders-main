const {Schema, model} = require('../connection');

const myschema = new Schema({
    name : String,
    skills : String,
    certifications : String,
    email: String,
    mobile_no : String,
    password : String,
    avatar: String,
    createdAt : Date,
});

module.exports = model('trainer', myschema);

