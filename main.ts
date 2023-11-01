import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import getProducto from "./resolvers/getProducto.ts";
import postProducto from "./resolvers/postProducto.ts";
import deleteProducto from "./resolvers/deleteProducto.ts";
import postCliente from "./resolvers/postCliente.ts";
import getCliente from "./resolvers/getCliente.ts";
import deleteCliente from "./resolvers/deleteCliente.ts";
import postFactura from "./resolvers/postFactura.ts";
import getFactura from "./resolvers/getFactura.ts";
import getClientes from "./resolvers/getClientes.ts";
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";

const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.error("No mongo URL found");
  Deno.exit(1);
}
try{
await mongoose.connect(MONGO_URL);
}
catch(e){
  console.log("error");
}
const app = express();
app.use(express.json());
app
 .get("/getProducto/:name", getProducto,)
 .post("/api/postProducto", postProducto,)
 .delete("/deleteProducto/:id", deleteProducto)
 .post("/postCliente", postCliente)
 .get("/getCliente/:name",getCliente )
 .get("/getCliente",getClientes)
 .delete("/deleteCliente/:id", deleteCliente)
 .post("/postFactura",postFactura)
 .get("/getFactura/:id",getFactura)
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});