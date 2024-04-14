import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routes/user.js";
import { mediaRouter } from "./routes/mediaList.js";

dotenv.config();
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/", mediaRouter);

// Rutas de ejemplo
app.get("/", (req, res) => {
	res.send("¡Hola, mundo!");
});

mongoose.connect(process.env.MONGOOSE);

// Iniciar el servidor
app.listen(port, () => {
	console.log(`Servidor iniciado en http://localhost:${port}`);
});
