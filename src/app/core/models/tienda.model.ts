export class Tienda {
    tiendaItems : Array<Object>;

    constructor(){
        this.tiendaItems = [
            {
                texto: "Texto del producto a describir",
                titulo: "Jugo",
                imagen: "jugo", 
                precio: 20
            },
            {
                texto: "Texto del producto a describir",
                titulo: "Cafe",
                imagen: "Cafe", 
                precio: 22.50
            },
            {
                texto: "Texto del producto a describir",
                titulo: "Leche",
                imagen: "Leche", 
                precio: 15.25
            }
        ]
    }
}
