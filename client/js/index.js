//tomo el valor del div con su id
const shopContent = document.getElementById("shopContent");
const modoOscuro = document.getElementById("darkMode");

localStorage.setItem('darkMode', 'activo')
const cart = []

//recorro el array del archivo "productos.js"
productos.forEach((product)=>{
    const {quanty:quantyProd,productName:nombreProducto, price:precioProducto, img:imagenProduct, id:idProduct} = product;
    //creo un elemento div en el documento html
    const content = document.createElement("div");
    content.className="card";
    //le asigno la imagen,nombre y precio a cada product
    content.innerHTML= `
    <img src="${imagenProduct}">
    <h3>${nombreProducto}</h3>
    <p class="price">${precioProducto} $</p>
    `;
    //meto todo dento del div
    shopContent.append(content);
    const buyButton = document.createElement("button");
    buyButton.innerText = "Comprar";
    content.append(buyButton);
// 
    

    buyButton.addEventListener("click",()=>{
        const repeted = cart.some((repetedProducts)=>repetedProducts === idProduct);
        if(repeted){
            cart.map((prod)=>{
                if(prod.id === idProduct){
                    quantyProd++;
                }
            })
        }else{
            cart.push({
                id:product.id,
                productName:product.productName,
                price:product.price,
                quanty:product.quanty,
                img:product.img,            
            });
            cart.push({
                id:product.id,
                productName:product.productName,
                price:product.price,
                quanty:product.quanty,
                img:product.img,            
            });
        }
    })
});

if(localStorage.getItem("darkMode") === "activo"){
    document.body.classList.add("dark-Mode")
    modalContainer.style.backgroundColor="white"
    modalContainer.style.color="black"
}

modoOscuro.addEventListener("click", () =>{
    if (document.body.classList.contains("dark-Mode")) {
        document.body.classList.remove("dark-Mode")
        localStorage.setItem("darkMode", "inactivo");
        modalContainer.style.backgroundColor="black"
        modalContainer.style.color="white"
    }else{
        document.body.classList.add("dark-Mode")
        localStorage.setItem("darkMode", "activo")
    }
});

/*function ordenarElementos(cart){
    let ordenados = cart.filter((el)=> precioProducto < filtro)
if (filtro == "" || filtro < 0 || ordenados.length === 0 || isNaN(filtro)) {
        console.log("No existe ningun producto mas barato que tu filtro");
    }else{
        console.log(ordenados);
    }
}*/

