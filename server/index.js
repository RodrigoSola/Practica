import express from "express";
import cors from "cors";

import {MercadoPagoConfig, Preference} from 'mercadopago';

const client = new MercadoPagoConfig({accessToker: "TEST-1096435852330285-091521-9d042f6a6465f8a1cb9474df1dbc6eb9-267092823"});


const app = express();
const port = 5500;

app.use(cors());

app.use (express.json());

app.get('/', (req, res) => {
    res.send('Soy el server :)');
});


app.post("/create_preference", async (req, res) => {
    try{
        const body = {
            items: [
               {
                title: req.body.title,
                quantity: Number(req.body.quantity),
                unit_price: Number(req.body.price),
                currency_id: "ARS",
               } ,
            ],
            back_urls:{
                success: "https://www.youtube.com/watch?v=",
                failure: "https://www.youtube.com/watch?v=",
                pending: "https://www.youtube.com/watch?v=",
            },
            auto_return:"approved",
        };

        const preference = new Preference(client);
        const result = await preference.create({body});
        res.json({
            id: result.id,
        });

    }catch(error){
        console.log(error)
        res.status(500).json({
            error: "Hubo un error"
        })
    }
})

app.listen(port, ()=> {
    console.log(`El server está corriendo en el puerto ${port}`);
});