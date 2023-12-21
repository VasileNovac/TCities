import mongoose, { Schema } from 'mongoose' ;

const citySchema = new Schema(
    {
        idx: String,
        nume: String,
        lat: String,
        long: String,
        foto: String,
        nota: String,
        comm: String,
    },
    {
        timestamps: true,
    }
);
const City = mongoose.models.City || mongoose.model("City", citySchema) ;

export default City;
