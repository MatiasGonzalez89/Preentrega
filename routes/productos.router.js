import express from "express"
import Producto from "../clases/Producto.js";


const router = express.Router();

const producto = new Producto("listaProductos.txt");

function validarAdmin(req, res, next) {
	if (req.query.admin) {
		next();
	} else {
		res.send("usted no tiene acceso");
	}
}

router.get("/", async (req, res) => {
	const listaProductos = await producto.getAll();
	res.send(JSON.stringify(listaProductos));
});

router.get("/:id", async (req, res) => {
	const productoBuscadoPorId = await producto.getById(req.params.id);
	res.send(productoBuscadoPorId);
});

router.post("/", async (req, res) => {
	const productoCreado =  await producto.save(req.body);
	res.send(productoCreado);
});

router.put("/:id", async (req, res) => {
	const productoActualizado =  await producto.update(req.body ,req.params.id);
	res.send(productoActualizado);
});

router.delete("/:id", async(req, res) => {
	const productoBorrado = await producto.delete(req.params.id);
	res.send(productoBorrado);
});

export default router

//probarFuncion(producto.getAll())
