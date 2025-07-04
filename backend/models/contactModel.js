const {Schema, model} = require('../connection');

const myschema = new Schema({
    name : String,
    email : String,
    subject : String,
    message : String,
    createdAt: Date,
});

module.exports = model('contacts', myschema);
