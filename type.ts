
export type Producto={
    name:string,
    stock:number,
    description:string,
    price:number,
};
export type Cliente={
name:string;
cif:string;
};
export type Factura={
    client:string;
    producto:Producto[];
    total: number;
}