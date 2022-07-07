const fs = require("fs")



class Contenedor {
    constructor(fileName) {
        this.baseId = 1;
        this.fileName = fileName;
        this.products = [];

    }
    async getAll() {
        let allFiles
        try {
            allFiles = JSON.parse(await fs.promises.readFile(this.fileName, 'utf-8'))
            return allFiles;
        } catch (err) {
            throw new Error('error read file')
        }
    }

    async deleteAll() {
        let empty = [];
        try {
            await fs.promises.writeFile(this.fileName, JSON.stringify(empty))
        } catch (err) {
            throw new error('error writing file')
        }
    }

    async save(object) {
        let newObject = { ...object, id: this.baseId }
        this.products.push(newObject)
        async function write(file, arr) {
            try {
                await fs.promises.writeFile(file, JSON.stringify(arr, null, 2))
            } catch (err) {
                throw new Error('error writing file')
            }
        }
        await write(this.fileName, this.products);
        this.baseId++;
        return newObject.id
    }
    async deleteById(id) {
        let newProdFile = []
        try {
            let prodFile = JSON.parse(await fs.promises.readFile(this.fileName, 'utf-8'))
            prodFile.forEach((prod) => {
                if (prod.id != id) {
                    newProdFile.push(prod)
                }
            })
            await fs.promises.writeFile(this.fileName, JSON.stringify(newProdFile))
        } catch (err) {
            throw new Error('error delete product')
        }
    }

    async getById(id) {
        let e
        try {
            let prodFile = JSON.parse(await fs.promises.readFile(this.fileName, 'utf-8'))
            prodFile.forEach((prod) => {
                if (prod.id == id) {
                    e = prod;
                }
            })
            if (e) {
                return e;
            } else {
                return null
            }
        } catch (err) {
            throw new Error('error read file')
        }
    }


}



const PRODUCTO1 = {
    title: 'Escuadra',                                                                                                                                 
    price: 123.45,                                                                                                                                     
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
};
const PRODUCTO2 = {
    title: 'Globo Terráqueo',                                                                                                                          
    price: 345.67,                                                                                                                                     
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'
};
const PRODUCTO3 = {
    title: 'Globo Terráqueo',                                                                                                                          
    price: 3451.67,                                                                                                                                     
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'
};
let productos = new Contenedor('products.txt');

(async function () {
    console.log(await productos.save(PRODUCTO1));
    console.log(await productos.save(PRODUCTO2));
    console.log(await productos.save(PRODUCTO3));
    console.log(await productos.getById(2));
    console.log(await productos.getAll());
    

})();