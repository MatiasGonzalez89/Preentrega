import fs from 'fs'
import Producto from "./Producto.js";
export default class Carrito {
	constructor() {
		this.producto = new Producto('listaProductos.txt');
		this.id = 0;
	}

	async getAll() {
		try {
			let carritos = JSON.parse(await fs.promises.readFile('listaCarritos.txt', "utf-8"))
			return carritos!=undefined
			? carritos
			: { error: "no hay carritos cargados" };
		} catch (e) {
			console.log(e)
		}
	}

	async getById(id) {
		try{
			let carritos = await this.getAll()
			if(carritos.length) {
				let carrito = carritos.find(carr => carr.id == id)
				return carrito || { error: "carrito no encontrado" }
			}
		}catch (e) {
			console.log(e)
		}
	}

	async saveCarrito() {
		try {
			let carritos = await this.getAll()
			if (carritos.length) {
				let carrito = { id: ++this.id, timeStamp: Date.now(), productos: [] };
				carritos.push(carrito)
				await fs.promises.writeFile('listaCarritos.txt', JSON.stringify(carritos, null, 2), "utf-8")
				return carrito.id
			}else {
				carritos = []
				let carrito = { id: this.id, timeStamp: Date.now(), productos: [] };
				carritos.push(carrito)
				await fs.promises.writeFile('listaCarritos.txt', JSON.stringify(carritos, null, 2), "utf-8")
				return carrito.id
			}
		}catch (e) {
			console.log(e)
		}
	}

	async saveProductoEnCarrito( idCarrito, idProd) {
		try {
			let prod = await this.producto.getById(idProd)
			let carritos = await this.getAll()
			if (prod.length) {
				if(carritos != undefined) {
					let index = carritos.findIndex(elem => elem.id == idCarrito)
					carritos[index].productos.push(prod)
					await fs.promises.writeFile('listaCarritos.txt', JSON.stringify(carritos, null, 2), "utf-8")
				}else {
				console.log({error: "No existe carrito con ese id"})
				}
			}else {
				console.log({error: "No hay producto con ese id"})
			}
		}catch (e) {
			console.log(e)
		}
	}

	async deleteProductoEnCarrito(idCarrito, idProd) {
		try {
			let carritos = await this.getAll()
			if(carritos != undefined){
				
				let indexCarr = carritos.findIndex(elem => elem.id == idCarrito)
				let indexProd = carritos[indexCarr].productos.findIndex(elem => elem.id == idProd)
				if(indexProd != -1){
					carritos[indexCarr].productos.splice(indexProd, 1)
					await fs.promises.writeFile('listaCarritos.txt', JSON.stringify(carritos, null, 2), "utf-8")
				}else {
					console.log( {error: "No existe producto con ese id"})
				}
			}else {
				console.log({error: "No existe carrito con ese id"})
			}
		}catch(e) {
			console.log(e)
		}
	}

	async delete(id) {
		try {
			let carritos = await this.getAll()
			let index = carritos.findIndex((carr) => carr.id == id)
			if (index != -1) {
				carritos.splice(index, 1)
				await fs.promises.writeFile('listaCarritos.txt', JSON.stringify(carritos, null, 2), 'utf-8')
			}else {
				console.log({error: "No hay carrito con ese id"})
			}
		}catch (e) {
			console.log(e)
		}
	}
}


