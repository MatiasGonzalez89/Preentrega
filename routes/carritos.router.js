import express from "express"
import Carrito from "../clases/Carrito.js";

const router = express.Router();

const carrito = new Carrito();

router.get("/", async (req, res) => {
	const listaCarritos = await carrito.getAll();
	res.send(JSON.stringify(listaCarritos));
});

router.get("/:id", async (req, res) => {
	const carritoBuscadoPorId = await carrito.getById(req.params.id);
	res.send(carritoBuscadoPorId);
});

router.post("/", async (req, res) => {
	const carritoCreado = await carrito.saveCarrito();
	res.sendStatus(200)
	
});

router.post("/:id/productos/:idProd", async (req, res) => {
	const prodEnCarrito = await carrito.saveProductoEnCarrito(req.params.id, req.params.idProd);
	res.send(prodEnCarrito);
});

router.delete("/:id", (req, res) => {
	const carritoBorrado = carrito.delete(req.params.id);
	res.send(carritoBorrado);
});

router.delete("/:id/productos/:idProd", (req, res) => {
	const prodBorradoEnCarrito = carrito.deleteProductoEnCarrito(req.params.id, req.params.idProd);
	res.send(prodBorradoEnCarrito);
});


export default router
