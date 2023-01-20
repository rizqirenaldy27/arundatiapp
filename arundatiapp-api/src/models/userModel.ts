import mongoose, { mongo } from "mongoose";

export interface userDocument extends mongoose.Document {
    name:string;
    password:string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema(
    {
        name: {},
        password:{}
    },
    {
        timestamps:true,
        versionKey:false
    }
)

export default mongoose.model<userDocument>("User", userSchema)