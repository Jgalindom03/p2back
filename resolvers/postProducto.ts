import { Request, Response } from "npm:express@4.18.2";
import ProductoModel from "../db/producto.ts";

const postProducto = async (req: Request, res: Response) => {
  try {
    const { name, stock, description, price } = req.body;
    if (!name || !price ) {
      res.status(400).send("Name, and price are required");
      return;
    }
    const alreadyExist = await ProductoModel.findOne({name}).exec()
    if (alreadyExist) {
      res.status(404).send("Producto already exists");
      return;
    }
    const newProducto = new ProductoModel({ name, stock, description, price });
    await newProducto.save();

    res.status(200).send({
        name:newProducto.name,
        stock:newProducto.stock,
        description:newProducto.description,
        price:newProducto.price,
        id:newProducto.id
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default postProducto;