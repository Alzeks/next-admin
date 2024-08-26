import mongoose from "mongoose";

const connection = {};

export const connectToDB = async () => {

  const connection = {};

  try {
    if (connection.isConnected) return;
    const db = await mongoose.connect("mongodb+srv://solonick:gotsatsuk@cluster0.xapcbrx.mongodb.net/nextunit?retryWrites=true&w=majority");
    //const db = await mongoose.connect(env.MONGO);
    connection.isConnected = db.connections[0].readyState;
    console.log('mongo ok');
  } catch (error) {
    throw new Error(error);
  }
};