import fs from "fs"

export default class Producto {
	constructor(rutaArchivo) {
		this.archivo = rutaArchivo
		this.id = 1
	}


	async getAll() {
		try {
			let productos
			if(fs.existsSync(this.archivo)) {
				productos =  JSON.parse(await fs.promises.readFile(this.archivo, "utf-8"))
				if(productos.length){
					return productos
				}else {
					return {error: "El archivo esta vacio"}
				}
			} else {
				return {error: "El archivo no existe"}
			}
		} catch (e) {
			console.log(e)
		}
	}
	async getById(id) {
		try {
			let productos = await this.getAll()
			if (productos.length) {
				let productoBuscado = productos.find((prod) => prod.id == id)
				return JSON.stringify(productoBuscado)
			}else {
				return {error: "No hay producto cargado con ese id"}
			}
		} catch (e) {
			console.log(e)
		}
	}

	async save(prod) {
		try {
			let productos = await this.getAll()
			if (productos.length) {
				prod.id = ++this.id
				prod.timeStamp = Date.now()
				productos.push(prod)
				await fs.promises.writeFile(this.archivo, JSON.stringify(productos, null, 2), "utf-8")
				return prod
			}else {
				productos = []
				prod.id = this.id
				prod.timeStamp = Date.now()
				productos.push(prod)
				await fs.promises.writeFile(this.archivo, JSON.stringify(productos, null, 2), "utf-8")
				return prod
			}
		}catch (e) {
			console.log(e)
		}
	}

	async update(prod, id) {
		try {
			let productos = await this.getAll()
			let productoActualizado
			if (productos.length) {
				prod.id = id
				prod.timeStamp = Date.now()
				let index = productos.findIndex(produ => produ.id == id)
				return index == -1
				? console.log({error: 'El prodcuto con dicho id no existe'})
				: (
					productoActualizado = productos.splice(index, 1, prod),
					await fs.promises.writeFile(this.archivo, JSON.stringify(productos, null, 2), "utf-8"),
					productoActualizado
					)
				}
		} catch (e) {
			console.log(e)
		}
	}

	async delete(id) {
		try{
			const productos = await this.getAll()
			let productoBorrado
			let index = productos.findIndex((prod) => prod.id == id);
			return index == -1
				? console.log({error: 'El prodcuto con dicho id no existe'})
				: (
					productoBorrado = productos.splice(index, 1),
					await fs.promises.writeFile(this.archivo, JSON.stringify(productos, null, 2), "utf-8"),
					productoBorrado
				)
		}catch (e){
			console.log(e)
		}
	}
}
