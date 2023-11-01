import { Request, Response } from "npm:express@4.18.2";
import ClienteModel from "../db/cliente.ts";

const getCliente = async (req: Request, res: Response) => {
  try {
    const { cif } = req.params;
    const cliente = await ClienteModel.findOne({ cif }).exec();
    if (!cliente) {
      res.status(404).send("Cliente not found");
      return;
    }
    res.status(200).send({
        name:cliente.name,
        cif:cliente.cif,
        id:cliente._id.toString(),

    });
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getCliente;