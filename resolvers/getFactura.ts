import { Request, Response } from "npm:express@4.18.2";
import  FacturaModel  from "../db/factura.ts";
import ProductoModel from "../db/producto.ts";
import ClienteModel from "../db/cliente.ts";


const getFactura = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const factura = await FacturaModel.findById(id).populate('client').populate('producto');
    if (!factura) {
      res.status(404).send("Factura not found");
      return;
    }
    res.status(200).send({
        client: factura.client,
        producto:factura.producto,
        total: factura.total,
        id:factura._id,
    });
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getFactura;