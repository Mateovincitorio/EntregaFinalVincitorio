const carritoIcon = document.getElementById("cart-btn");
const shopContent = document.getElementById("shopContent");
const modoOscuro = document.getElementById("darkMode");
const trash = document.getElementById("trash");

localStorage.setItem('darkMode', 'activo')
const cart = JSON.parse(localStorage.getItem("carrito")) || []

const cargarProductos = async () => {
    try {
        const response = await fetch(`./data/productos.json`);
        const productos = await response.json(); 
        // Recorro el array del archivo "productos.json"
        productos.forEach((product) => {
            const { quanty: quantyProd, productName: nombreProducto, price: precioProducto, img: imagenProduct, id: idProduct } = product;
            
            // Creo un elemento div en el documento HTML
            const content = document.createElement("div");
            content.className = "card";
            
            // Le asigno la imagen, nombre y precio a cada product
            content.innerHTML = `
                <img class="imgProd" src="${imagenProduct}">
                <h3>${nombreProducto}</h3>
                <p class="price">${precioProducto} $</p>
            `;
            
            // Meto todo dentro del div
            shopContent.append(content);
            
            const buyButton = document.createElement("button");
            buyButton.innerText = "Comprar";
            content.append(buyButton);
        
            // Evento click en el botón de comprar


            buyButton.addEventListener("click", () => {
                carritoIcon.classList.remove("cart-btn")
                carritoIcon.classList.add("carritoIcon");

            setTimeout(() => {
                carritoIcon.classList.remove("carritoIcon");
                carritoIcon.classList.add("cart-btn");
            }, 500);

                const repeted = cart.some((repetedProducts) => repetedProducts.id === idProduct);
                
                if (repeted) {
                    cart.map((prod) => {
                        if (prod.id === idProduct) {
                            prod.quanty++;
                        }
                    });
                } else {
                    cart.push({
                        id: product.id,
                        productName: product.productName,
                        price: product.price,
                        quanty: 1,  // Inicializo con 1 si es un producto nuevo
                        img: product.img,       
                    });
                }
                guardarLocal();
                Toastify({
                    text: `Producto agregado al carrito`,
                    duration: 3000,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "left", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                      background: "linear-gradient(to right, #00b09b, #96c93d)",
                      borderRadius: "20px"
                    },
                    onClick: function(){} // Callback after click
                  }).showToast();
            });
        });
    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
};

cargarProductos();

if (localStorage.getItem("darkMode") === "activo") {
    document.body.classList.add("dark-Mode");
    modalContainer.style.backgroundColor = "white";
    modalContainer.style.color = "black";
}

modoOscuro.addEventListener("click", () => {
    if (document.body.classList.contains("dark-Mode")) {
        document.body.classList.remove("dark-Mode");
        localStorage.setItem("darkMode", "inactivo");
        modalContainer.style.backgroundColor = "black";
        modalContainer.style.color = "white";
    } else {
        document.body.classList.add("dark-Mode");
        localStorage.setItem("darkMode", "activo");
        modalContainer.style.backgroundColor = "white";
        modalContainer.style.color = "black";
    }
});

const guardarLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(cart));
}
