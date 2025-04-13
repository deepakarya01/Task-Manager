const mongoose = require('mongoose');

const connectDb = async () => {
   try {
      await mongoose.connect(process.env.MONGO_url);
      console.log('MongoDb connected!');
   } catch (error) {
      console.error('Error in MongoDb!', error);
   }
}

module.exports = connectDb;