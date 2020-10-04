// importing dependencies
const mongoose = require('mongoose');




// initializing database url

// let dbURL = 'localhost:27017/AnimeShop';
//connect to database

mongoose.connect(process.env.MONGODB_URI || process.env.DATABASE, {
    useNewUrlParser: true,
    // for production level this line requires
    // useMongoClient: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log('Database is connected successfully!!!');
}).catch((e) => {
    console.log('Database fails to connect due to : ');
    console.log(e);
    console.log(e.message);
});

module.exports = { mongoose }