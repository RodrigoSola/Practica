
    const mp = new MercadoPago("TEST-f348c725-1bce-4b7d-a918-4cbe9c929370",{
        locale: "es-AR",
    });
    document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("checkout-btn").addEventListener("click", async () => {
        try {
            const orderData = {
                title: "su compra en ecommerce",
                quantity:1,
                price: totalmem,
            };

            const response = await fetch("https://localhost:3000/create_preference",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            });
            const preference = await response.json();
            console.log(preference);
            createCheckoutButton(preference.id);
        }catch (error) {
            alert("error :(");
        }
    });
     });
    const createCheckoutButton = (preferenceId) => {
       const brickBuilder = mp.bricks();
       const renderComponent = async () => {
        if (window.checkoutButton) window.checkoutButton.unmount();
        await brickBuilder.create("wallet", "wallet_container", {
            initialization: {
                preferenceId: preferenceId,
            },
        });
       };
       renderComponent();
    };

