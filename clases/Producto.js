import fs from "fs"

export default class Producto {
	constructor(rutaArchivo) {
		this.archivo = rutaArchivo
		this.id = 0
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
				prod.id = ++this.id
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


// const probarFuncion = async (unaFuncion) => { 
// 	console.log( await (unaFuncion))
// }

// const prod = new Producto("listaProductos.txt")

//  const producto = {
//      "title": 'mayonesa',
//      "price": 540,
//      "thumbnail": 'https://www.hellmanns.com/content/dam/unilever/hellmann_s_world/spain/pack_shot/8410127050819.01-41673974-png.png'
// }


// probarFuncion(prod.save(producto))
// //probarFuncion(prod.getAll())
// //probarFuncion(prod.getById(1))
// probarFuncion(prod.update(producto, 2))



