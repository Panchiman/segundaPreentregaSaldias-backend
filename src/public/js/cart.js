function addToCartButton (idCart, idProduct){
    console.log("intentamo")
    fetch(`http://localhost:8080/carts/${idCart}/products/${idProduct}`,{
        method:'POST',
    })
};

const botonAtras = document.getElementById('botonAtras');

botonAtras.addEventListener('click', () => {
    window.history.back();
});