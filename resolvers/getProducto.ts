import { Request, Response } from "npm:express@4.18.2";
import ProductoModel from "../db/producto.ts";


const getProducto = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const producto = await ProductoModel.findOne({ name }).exec();
    if (!producto) {
      res.status(404).send("Producto not found");
      return;
    }
    res.status(200).send({
        name:producto.name,
        stock:producto.stock,
        description:producto.description,
        price:producto.price,
        id:producto._id,

    });
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getProducto;