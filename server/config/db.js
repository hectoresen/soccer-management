const mongoose = require("mongoose");

const DB_URL = process.env.DB_URL;
const CONFIG_DB = {useNewUrlParser: true, useUnifiedTopology: true};

const dbConnect = async () =>{
    try{
        const res = await mongoose.connect(DB_URL, CONFIG_DB);
        const {host, port, name} = res.connection;
        console.log(`Connected to ${name} in ${host}:${port}`);
    }catch(err){
        console.error(err);
    }
};

module.exports = {
    DB_URL,
    CONFIG_DB,
    dbConnect
}