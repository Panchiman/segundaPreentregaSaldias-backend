import mongoose from "mongoose";
import { cartModel } from "../models/carts.model.js";
import ProductManager from "./productManager.class.js";


export default class CartManager {
    connection = mongoose.connect(
        "mongodb+srv://Panchiman:Mongo666@backendcoderhouse.7dnc3hj.mongodb.net/"
    );
    productManager = new ProductManager();

    async createCart() {
        try{
        const result = await cartModel.create({ products: [] });
        return result;
        }
        catch (error) {
            console.error(error);
            return error;
        }
    
    }
    async getCarts (){
        try{
            const result = await cartModel.find();
            console.log(result)
            return result;
        }
        catch (error) {
            console.error(error);
            return error;
        }
    }

    async getCartById (idCart) {
        try{
            const result = await cartModel
            .findOne({ _id: idCart })
            .populate("products.product");
            return result;
        }
        catch (error) {
            console.error(error);
            return error;
        }
    }
    
    async addToCart (idCart, idProduct){
        try {
            const cart = await this.getCartById(idCart);
            const product = await this.productManager.getProductById(idProduct);
            cart.products.push({ product: product });
            await cart.save();
            return;
        }
        catch (error) {
            console.error(error);
            return error;
        }
    }
    async deleteFromCart(idCart, idProduct) {
        try {
            const cart = await this.getCartById(idCart);
            cart.products.pull(idProduct);
            await cart.save();
            return;
        }
        catch (error) {
            console.error(error);
            return error;
        }
    }
    async clearCart(idCart) {
        try{
            const cart = await this.getCartById(idCart);
            cart.products = [];
            await cart.save();
            return;
        }
        catch (error) {
            console.error(error);
            return error;
        }
    }
    async updateCart(idCart, products) {
        try {
            const cart = await this.getCartById(idCart);
            cart.products = [];
            await cart.save();
            let productsArray = products.products;
            productsArray.forEach(productId => this.addToCart(idCart, productId)) 
            return;
        }
        catch (error) {
            console.error(error);
            return error;
        }
    }
}