const shopContent = document.getElementById('shopContent');
const cart=[];



productos.forEach((product)=>{
    const content = document.createElement('div');
    content.className = "card";
    content.innerHTML = `
    <img src="${product.img}" class="img-item">
    <span class="titulo-item">"${product.productName}" </span>
    <p class="precio-item">${product.price}</p>
    
    `;

    shopContent.appendChild(content);
    const buyButton = document.createElement('button');
    buyButton.innerText = "Agregar al carrito";

    content.appendChild(buyButton);

    buyButton.addEventListener('click', ()=>{
        const repeat = cart.some((repeatProduct) => repeatProduct.id === product.id);

        if(repeat){
            cart.map((prod)=> {
                if(prod.id === product.id){
                    prod.quanty++;
                }
            });
        }else {

        cart.push({
            id: product.id,
            productName: product.productName,
            price: product.price,
            quantity: product.quanty,
            img: product.img,
        });
    }
    });
 
});