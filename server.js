import express from "express";
import cors from "cors";

import { MercadoPagoConfig, Preference} from "mercadopago";

const client = new MercadoPagoConfig({
    accessToken: "TEST-1096435852330285-091521-9d042f6a6465f8a1cb9474df1dbc6eb9-267092823",
});
const express = require('express');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req,res)=> {
    res.send("Soy el server :)");

});

app.post("/create_preference", async (req, res)=> {
    try {
        const body = {
            items: [
                {
                title: req.body.title,
                quantity: Number(req.body.quantity),
                unit_price: Number(req.body.price),
                currency_id : "ARS",
                },
            ],
        
        back_urls:{
            success: "http://localhost:3000/success",
            failure: "http://localhost:3000/failure",
            pending: "http://localhost:3000/pending",
        },
        auto_return: "aproved",
        };

        const preference = new Preference(client);
        const result = await preference.create({body });
            res.json({
                id:result.id,
        });
    } catch (error){
        console.log(error);
        res.status(500).json({
            error: "Error al crear la preferencia :(",
        });
    }
});

app.listen(port, () => {
    console.log(`Server corriendo en http://localhost:${port}`);
});

