import mongoose, { mongo } from "mongoose";

export interface productDocument extends mongoose.Document {
    name_product:string;
    harga_product: number;
    deskripsi_product:string;
    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new mongoose.Schema(
    {
        name_product: {},
        harga_product:{},
        deskripsi_product:{}
    },
    {
        timestamps:true,
        versionKey:false
    }
)

export default mongoose.model<productDocument>("Product", productSchema)