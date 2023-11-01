import mongoose from "npm:mongoose@7.6.3";
import { Producto } from "../type.ts";

const Schema = mongoose.Schema;

const ProductoSchema = new Schema(
  {
    name:{type:String, required:true},
    stock:{type:Number, required:false,default:0},
    description:{type:String, required:false},
    price:{type:Number, required:true},
  },
  { timestamps: false }
);

export type ProductoModelType = mongoose.Document & Omit<Producto, "id">;

export default mongoose.model<ProductoModelType>("Producto", ProductoSchema);

