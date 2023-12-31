import { Request, Response } from "npm:express@4.18.2";
import ClienteModel from "../db/cliente.ts";

const postCliente = async (req: Request, res: Response) => {
  try {
    const { name, cif } = req.body;
    if (!name || !cif ) {
      res.status(400).send("Name, and cif are required");
      return;
    }

    const alreadyExists = await ClienteModel.findOne({ name }).exec();
    if (alreadyExists) {
      res.status(400).send("Cliente already exists");
      return;
    }

    const newCliente = new ClienteModel({ name, cif});
    await newCliente.save();

    res.status(200).send({
        name:newCliente.name,
        cif:newCliente.cif,
        id:newCliente._id,
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default postCliente;