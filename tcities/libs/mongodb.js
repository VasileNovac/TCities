import mongoose from 'mongoose' ;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Connected to Cities DB");
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;
