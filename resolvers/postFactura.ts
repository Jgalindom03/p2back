import { Request, Response } from "npm:express@4.18.2";
import FacturaModel, {FacturaModelType} from "../db/factura.ts";
import ProductoModel from "../db/producto.ts";
import ClienteModel from "../db/cliente.ts";
import producto ,{ ProductoModelType } from "../db/producto.ts";
import { ClienteModelType } from "../db/cliente.ts";
import mongoose from "npm:mongoose@7.6.3";

const postFactura = async (req: Request, res: Response) => {
  try {
    const { client, producto, total } = req.body;
    if (!client || !producto || !total) {
      res.status(400).send("Client, producto, and total are required");
      return;
    }
    const clientExists = await ClienteModel.findById(client).exec();
    if (!clientExists) {
      res.status(404).send("Client not found");
      return;
    }

   /* const alreadyExists = await FacturaModel.findOne({ client}).exec();
    if (alreadyExists) {
      res.status(400).send("Factura already exists");
      return;
    }*/

    const productosModel = producto.map((product:any) => product.id);
    const dbProducts = await ProductoModel.find({ _id: { $in: productosModel } }).exec();

    const newFactura = new FacturaModel({client, producto, total });
    await newFactura.save();


    const populatedInvoice: FacturaModelType | null = await FacturaModel.findById(newFactura._id)
      .populate({ path: "producto", model: ProductoModel })
      .populate({ path: "cliente", model: ClienteModel })
      .exec();

      if (!populatedInvoice) {
        res.status(500).send("Failed to populate invoice");
        return;
      }
      
    res.status(200).send({
      client: populatedInvoice.client.id,
        producto:populatedInvoice.producto.map((product:any)=>({
          name:product.name,
          stock:product.stock,
          description:product.description,
          price:product.price,
          id: product.id,
        })),
        total: populatedInvoice.total,
        id:populatedInvoice._id,
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default postFactura;