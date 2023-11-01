import { Request, Response } from "npm:express@4.18.2";
import ClienteModel from "../db/cliente.ts";

const deleteCliente = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const cliente = await ClienteModel.findByIdAndDelete(id)
    if (!cliente) {
        res.status(404).send("Cliente not found");
        return;
        }
    res.status(200).send("Cliente deleted");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default deleteCliente;

