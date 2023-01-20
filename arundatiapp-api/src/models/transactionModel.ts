import mongoose, { mongo } from "mongoose";

export interface transactionDocument extends mongoose.Document {
    code:string;
    item:any;
    quantity:number;
    transaction_amount: number;
    createdAt: Date;
    updatedAt: Date;
}

const transactionSchema = new mongoose.Schema(
    {
        code: {},
        item: {},
        quantity:{},
        transaction_amount:{},
    },
    {
        timestamps:true,
        versionKey:false
    }
)

export default mongoose.model<transactionDocument>("transaction", transactionSchema)