const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://pgcsragul_db_user:Ragul9842@cluster0.avhjnvq.mongodb.net/?appName=Cluster0"
    );

    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;