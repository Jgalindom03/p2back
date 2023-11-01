import { Request, Response } from "npm:express@4.18.2";
import ProductoModel from "../db/producto.ts";

const deleteProducto = async (req: Request, res: Response) => {
  try {
    const  id  = req.params.id;
    const producto = await ProductoModel.findByIdAndDelete(id)
    if (!producto) {
      res.status(404).send("Producto not found");
      return;
    }
    res.status(200).send("Product deleted");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default deleteProducto;