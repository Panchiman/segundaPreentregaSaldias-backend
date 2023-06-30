import express from 'express';
import routerProducts from './routes/products.router.js';
import routerCart from './routes/carts.router.js';
import routerRealTimeProducts from './routes/realTimeProducts.router.js';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import ProductManager from './daos/mongodb/classes/productManager.class.js';
import { Server } from "socket.io";
import mongoose from 'mongoose';
import { productsModel } from './daos/mongodb/models/product.models.js';

const app = express();
const productManager = new ProductManager();

app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/products', routerProducts)
app.use('/carts/', routerCart)



const expressServer = app.listen(8080, () => console.log("Listening"));
const socketServer = new Server(expressServer);



app.use(function (req, res, next) {
    req.socketServer = socketServer;
    next();
})


app.use('/realtimeproducts/', routerRealTimeProducts)
