import express from "express";
import { UserModel } from "../models/User.js";

const router = express.Router();

// Añadir
router.post("/add", async (req, res) => {
	try {
		const { userId, item } = req.body;

		const user = await UserModel.findById(userId);

		if (!user) {
			return res.status(404).json({
				error: "USER_NOT_FOUND",
				message: "Usuario no encontrado",
			});
		}

		user.mediaList.push(item);
		await user.save();

		res
			.status(200)
			.json({ message: "Contenido añadido a la lista multimedia del usuario" });
	} catch (error) {
		res.status(500).json({ error: "SERVER_ERROR", message: error.message });
	}
});

// Elimina
router.delete("/remove/:userId/:contentId", async (req, res) => {
	try {
		const { userId, contentId } = req.params;

		const user = await UserModel.findById(userId);

		if (!user) {
			return res.status(404).json({
				error: "USER_NOT_FOUND",
				message: "Usuario no encontrado",
			});
		}

		user.mediaList = user.mediaList.filter(
			(item) => item.content.contentId !== contentId
		);
		await user.save();

		res.status(200).json({
			message: "Contenido eliminado de la lista multimedia del usuario",
		});
	} catch (error) {
		res.status(500).json({ error: "SERVER_ERROR", message: error.message });
	}
});

// Editar
router.put("/edit/:userId/:contentId", async (req, res) => {
	try {
		const { userId, contentId } = req.params;
		const updatedItem = req.body;

		const user = await UserModel.findById(userId);

		if (!user) {
			return res.status(404).json({
				error: "USER_NOT_FOUND",
				message: "Usuario no encontrado",
			});
		}

		const contentIndex = user.mediaList.findIndex(
			(item) => item.content.contentId === contentId
		);

		if (contentIndex === -1) {
			return res.status(404).json({
				error: "CONTENT_NOT_FOUND",
				message: "Contenido no encontrado en la lista multimedia del usuario",
			});
		}

		user.mediaList[contentIndex] = updatedItem;
		await user.save();

		res.status(200).json({
			message: "Contenido editado en la lista multimedia del usuario",
		});
	} catch (error) {
		res.status(500).json({ error: "SERVER_ERROR", message: error.message });
	}
});

export { router as mediaRouter };
