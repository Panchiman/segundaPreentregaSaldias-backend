import { Router } from "express";
import CartManager from "../daos/mongodb/classes/cartManager.class.js";

const router = Router();
const cartManager = new CartManager();

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const cart = await cartManager.getCartById(id);
    res.send(cart);
});

router.get("/", (req, res) => {
    const carts = cartManager.getCarts();
    res.send(carts);
});

router.post("/", (req, res) => {
    cartManager.createCart();
    res.send({ status: "success" });
});

router.post("/:cid/products/:pid", async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    await cartManager.addToCart(cartId, productId);
    res.send({ status: "success" });
});

router.delete("/:cid/products/:pid", async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    await cartManager.deleteFromCart(cartId, productId);
    res.send({ status: "success" });
})
router.delete("/:cid", async (req, res) => {
    const cartId = req.params.cid;

    await cartManager.clearCart(cartId);
    res.send({ status: "success" });
})

router.put("/:cid", async (req, res) => {
    const products = req.body;
    const cartId = req.params.cid;
    await cartManager.updateCart(cartId, products);
    res.send({ status: "success" });
})

export default router;
