import cors from "cors";
import "dotenv/config";
import express from "express";
import { apikey } from "./serverClient";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
    res.json({
        message: "AI writing Assitant server is running",
        apikey: apikey,
    });
});


const port = process.env.PORT || 3000;
app.listen(port,() => {
    console.log(`server is running at http://localhost:${port}`)
})
