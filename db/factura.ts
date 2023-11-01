import mongoose from "npm:mongoose@7.6.3";
import {Factura} from "../type.ts";
//import { ProductoModelType } from "./producto.ts";

const Schema = mongoose.Schema;
export const FacturaSchema = new Schema(
  {
    client: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente", required: true },
    producto: { type:[mongoose.Schema.Types.ObjectId], ref:"Producto", required: true },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

export type FacturaModelType = mongoose.Document & Omit<Factura, "id">;

export default mongoose.model<FacturaModelType>("Factura", FacturaSchema);