import mongoose from "mongoose";

export const mongoDbConnection = () => {
  try {
    mongoose.connect(process.env.MONGO_URL).then(() => {
      console.log("connected");
    });
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
