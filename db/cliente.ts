import mongoose from "npm:mongoose@7.6.3";
import { Cliente } from "../type.ts";


const Schema = mongoose.Schema;

const ClienteSchema = new Schema(
  {
    name:{type:String, required:true},
    cif:{type:String, required:true},
  },
  { timestamps: false }
);

export type ClienteModelType = mongoose.Document & Omit<Cliente, "id">;

export default mongoose.model<ClienteModelType>("Cliente", ClienteSchema);