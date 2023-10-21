const mongoose = require('mongoose');
async function connect (){
    const url = "mongodb+srv://admin:Vantam28@cluster0.f9glacn.mongodb.net/webshop?retryWrites=true&w=majority&appName=AtlasApp";
try {
    await mongoose.connect(url)
    console.log('connect succ');
}
catch(error){
    console.log({error})
}
}
module.exports = {connect};
