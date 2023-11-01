import { Request, Response } from "npm:express@4.18.2";
import ProductoModel from "../db/producto.ts";


const getProductos = async (req: Request, res: Response) => {
  try {
    const producto = await ProductoModel.findOne().exec();
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

export default getProductos;