import express from "express";
import { UserModel } from "../models/User.js";

const router = express.Router();

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
		user.mediaList.list.push(item);

		if (item.content.mediaType == "tv") {
			user.mediaList.data.series.amount = user.mediaList.data.series.amount + 1;
			user.mediaList.data.series.time =
				user.mediaList.data.series.time + item.timeWatched;
			if (item.rating != undefined) {
				user.mediaList.data.series.rating =
					(user.mediaList.data.series.rating *
						(user.mediaList.data.series.amount - 1) +
						item.rating) /
					user.mediaList.data.series.amount;
			}
		} else {
			user.mediaList.data.movies.amount = user.mediaList.data.movies.amount + 1;
			user.mediaList.data.movies.time =
				user.mediaList.data.movies.time + item.timeWatched;
			if (item.rating != undefined) {
				user.mediaList.data.movies.rating =
					(user.mediaList.data.movies.rating *
						(user.mediaList.data.movies.amount - 1) +
						item.rating) /
					user.mediaList.data.movies.amount;
			}
		}

		let newGenres = [];

		item.content.genres.forEach((genre) => {
			let found = false;
			user.mediaList.data.genres.forEach((genreInList) => {
				if (genre.id === genreInList.genre.id) {
					found = true;
					genreInList.quantity += 1;
				}
			});
			if (!found) {
				newGenres.push({ genre: genre, quantity: 1 });
			}
		});
		user.mediaList.data.genres = user.mediaList.data.genres.concat(newGenres);

		await user.save();

		res
			.status(200)
			.json({ message: "Contenido añadido a la lista multimedia del usuario" });
	} catch (error) {
		res.status(500).json({ error: "SERVER_ERROR", message: error.message });
	}
});

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

		const initialListLength = user.mediaList.list.length;

		user.mediaList.list = user.mediaList.list.filter(
			(item) => item.content.contentId != contentId
		);
		if (initialListLength === user.mediaList.list.length) {
			return res.status(404).json({
				error: "CONTENT_NOT_FOUND",
				message: "Contenido no encontrado en la lista multimedia del usuario",
			});
		}

		await user.save();

		res.status(200).json({
			message: "Contenido eliminado de la lista multimedia del usuario",
		});
	} catch (error) {
		res.status(500).json({ error: "SERVER_ERROR", message: error.message });
	}
});

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

		const contentIndex = user.mediaList.list.findIndex(
			(item) => item.content.contentId == contentId
		);

		if (contentIndex === -1) {
			return res.status(404).json({
				error: "CONTENT_NOT_FOUND",
				message: "Contenido no encontrado en la lista multimedia del usuario",
			});
		}

		user.mediaList.list[contentIndex] = updatedItem;

		await user.save();

		res.status(200).json({
			message: "Contenido editado en la lista multimedia del usuario",
		});
	} catch (error) {
		res.status(500).json({ error: "SERVER_ERROR", message: error.message });
	}
});

router.get("/check/:userId/:contentId", async (req, res) => {
	try {
		const { userId, contentId } = req.params;

		const user = await UserModel.findById(userId);

		if (!user) {
			return res.status(404).json({
				error: "USER_NOT_FOUND",
				message: "Usuario no encontrado",
			});
		}

		const content = user.mediaList.list.find(
			(item) => item.content.contentId == contentId
		);

		if (!content) {
			return res.status(200).json({
				message: "El contenido no está en la lista multimedia del usuario",
				exists: false,
			});
		} else {
			return res.status(200).json({
				message: "El contenido está en la lista multimedia del usuario",
				exists: true,
				content,
			});
		}
	} catch (error) {
		res.status(500).json({ error: "SERVER_ERROR", message: error.message });
	}
});

router.get("/get/:userId", async (req, res) => {
	try {
		const userId = req.params.userId;
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const { name, status, types, rating } = req.query;

		const user = await UserModel.findById(userId);

		if (!user) {
			return res.status(404).json({
				error: "USER_NOT_FOUND",
				message: "Usuario no encontrado",
			});
		}

		let filteredList = user.mediaList.list;

		if (name) {
			filteredList = filteredList.filter((item) =>
				item.content.name.includes(name)
			);
		}

		if (status) {
			filteredList = filteredList.filter((item) =>
				status.includes(item.status.toString())
			);
		}

		if (types) {
			filteredList = filteredList.filter((item) =>
				types.includes(item.content.mediaType)
			);
		}

		if (rating) {
			filteredList = filteredList.filter((item) =>
				item.rating ? item.rating.toString() >= rating : false
			);
		}

		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;

		const paginatedList = filteredList.slice(startIndex, endIndex);

		res.status(200).json({
			message: "Lista multimedia del usuario obtenida correctamente",
			mediaList: {
				data: user.mediaList.data,
				list: paginatedList,
			},
			currentPage: page,
			totalPages: Math.ceil(filteredList.length / limit),
		});
	} catch (error) {
		res.status(500).json({ error: "SERVER_ERROR", message: error.message });
	}
});
export { router as mediaRouter };
