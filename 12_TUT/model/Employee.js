const mongoose = require("mongoose")
const Schema = mongoose.Schema
//Creating schema.  Defining schema:  https://mongoosejs.com/docs/guide.html
const employeeSchema = new Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    }
})
//When you call mongoose.model() on a schema, Mongoose compiles a model for you. Example:
//const schema = new mongoose.Schema({ name: 'string', size: 'string' });

//const Tank = mongoose.model('Tank', schema);
//The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural, lowercased version 
//of your model name. Thus, for the example above, the model Tank is for the tanks collection in the database. https://mongoosejs.com/docs/models.html

//Creating and eporting model associated with out schema
module.exports = mongoose.model("Employee", employeeSchema)