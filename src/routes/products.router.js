import {Router} from 'express';
import ProductManager from '../daos/mongodb/classes/productManager.class.js';
import {productsModel} from '../daos/mongodb/models/product.models.js';

const router = Router();


const productManager = new ProductManager();


router.get("/", async (req, res) => {
    let limit = Number(req.query.limit);
    let page = Number(req.query.page);
    let sort = Number(req.query.sort);
    if (isNaN(limit)) {
        limit = 10;
    }
    if (isNaN(page)) {
        page = 1;
    }
    if (isNaN(sort)) {
        sort = 0;
    }
    let filter = req.query.filter;
    let filterVal = req.query.filterVal;
    console.log(limit, page, sort)
    let productos = await productManager.getProducts(limit, page, sort, filter, filterVal);

    productos.prevLink = productos.hasPrevPage?`http://localhost:8080/students?page=${productos.prevPage}`:'';
    productos.nextLink = productos.hasNextPage?`http://localhost:8080/students?page=${productos.nextPage}`:'';
    productos.isValid= !(page<=0||page>productos.totalPages)
    res.render('producto',productos)
    res.send({ productos }); 
});

router.get('/:pid', async (req, res) => {
    const producto = await productManager.getProductById(req.params.pid);
    res.send(producto);
});

router.post("/", async (req, res) => {
    console.log(req.body);
    const product = req.body;
    console.log(product)
    productManager.addProduct(product);
    res.send({ status: "success" });
});

router.put("/:cid",  (req, res) => {
    const productId = req.params.cid;
    const product = req.body;
    productManager.updateProduct(productId, product);
    res.send({ status: "success" });
})

router.delete("/:pid", (req, res) => {
    const productId = req.params.pid;
    productManager.deleteProduct(productId);
    res.send({ status: "success" });
})

export default router;