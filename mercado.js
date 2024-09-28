const mp = MercadoPago("TEST-f348c725-1bce-4b7d-a918-4cbe9c929370", {
    locale: "es-AR",
});

document.getElementById("checkout-btn").addEventListener("click",async ()=>{
try{    const orderData = {
    title:document.querySelector('.titulo-item').innerText,
    quantity: querySelector('.carrito-item-cantidad').innerText,
    price: querySelector('.precio-item').innerText,
};

const response = await fetch("https://localhost:5500/create_preference",{
method: "POST",
headers: {
    'Content-Type': 'application/json',
},
body: JSON.stringify(orderData),
});

const preference = await response.json();
console.log("ID de preferencia:", preference.id);

createCheckoutButton(preference.id);
}catch (error){
    alert("error :(");
}
});


const createCheckoutButton = (preferenceId) => {
   
        const bricksBuilder = mp.bricks();

        const renderComponent = async () => {
          
            if (window.checkoutButton) window.checkoutButton.unmount();

            
          await bricksBuilder.create("wallet", "wallet_container", {
                initialization: {
                    preferenceId: preferenceId,
                },
            });
           
        };

        renderComponent();
    
};