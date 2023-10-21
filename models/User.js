const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const UserChema = new Schema(
    {
        username:
        {
            type: String, require:true
        },
        password:{
            type: String,require:true
        }
    }, {
    timestamps: true
})
module.exports= mongoose.model("User",UserChema);