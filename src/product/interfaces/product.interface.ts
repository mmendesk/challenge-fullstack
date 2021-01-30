import { Document } from "mongoose";

export interface Product extends Document {
    readonly amount: Number;
    readonly name: string;
    readonly description: string;
    readonly imageURL: string;
    readonly price: number;
    readonly createdAt: Date;
}