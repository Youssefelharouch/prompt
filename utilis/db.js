import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  if (isConnected) {
    console.log("DB already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI,{
      dbName:"share_inputs",
      useNewUrlParser :true,
      useUnifiedTopology :true
    });
    isConnected = true;
    console.log("MongoDB is Connected")
  } catch (error) {
    console.log(error);
  }
};
