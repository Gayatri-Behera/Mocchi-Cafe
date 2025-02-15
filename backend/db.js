const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://username:password@projectname.mongodb.net/databasename?retryWrites=true&w=majority&appName=';

const mongoDB = async() => {
    await mongoose.connect(mongoURI).then(async() => {
        console.log("Connected to database succesully!");
        const coffeeItems = await mongoose.connection.db.collection("coffeeitems").find({}).toArray();
        try {
            global.coffeeItems = coffeeItems;
            console.log(global.coffeeItems);
            const coffeeCategory = await mongoose.connection.db.collection("coffeeCategory").find({}).toArray();
            try {
                global.coffeeCategory = coffeeCategory;
                console.log(global.coffeeCategory);
            }
            catch(err) {
                console.log("error", err);
            }
        }
        catch(err) {
            console.log("error", err);
        }
    }).catch(() => {
        console.log("Database cannot be connected.Try again after sometime!");
    })
}


module.exports = mongoDB;
