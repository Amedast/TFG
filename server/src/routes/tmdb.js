import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

const router = express.Router();

const tmbdToken = process.env.TMDB_API_TOKEN;

router.get("/medialist", async (req, res) => {
	const { type, sorttype } = req.query;
	const url =
		"https://api.themoviedb.org/3/" + type + "/" + sorttype + "?language=es-ES";
	const options = {
		headers: {
			Accept: "application/json",
			Authorization: "Bearer " + tmbdToken,
		},
	};

	try {
		const response = await fetch(url, options).then((res) => res.json());
		res.status(200).json(response);
	} catch (error) {
		res
			.status(500)
			.json({ error: "Error al obtener la lista de contenido multimedia" });
	}
});

router.get("/trendinglist", async (req, res) => {
	const movieUrl =
		"https://api.themoviedb.org/3/trending/movie/week?language=es-ES";
	const tvUrl = "https://api.themoviedb.org/3/trending/tv/week?language=es-ES";
	const options = {
		headers: {
			Accept: "application/json",
			Authorization: "Bearer " + tmbdToken,
		},
	};

	try {
		const [movieResponse, tvResponse] = await Promise.all([
			fetch(movieUrl, options).then((res) => res.json()),
			fetch(tvUrl, options).then((res) => res.json()),
		]);

		const combinedResponse = {
			movies: movieResponse,
			tvShows: tvResponse,
		};

		res.status(200).json(combinedResponse);
	} catch (error) {
		res
			.status(500)
			.json({ error: "Error al obtener la lista de contenido multimedia" });
	}
});

router.get("/mediadetails", async (req, res) => {
	const { type, id } = req.query;
	const url =
		"https://api.themoviedb.org/3/" +
		type +
		"/" +
		id +
		"?language=es-ES&append_to_response=videos,credits,recommendations,similar,movie_credits,tv_credits";
	const imagesUrl =
		"https://api.themoviedb.org/3/" + type + "/" + id + "/images";
	const videosUrl =
		"https://api.themoviedb.org/3/" + type + "/" + id + "/videos";
	const options = {
		headers: {
			Accept: "application/json",
			Authorization: "Bearer " + tmbdToken,
		},
	};

	try {
		const response = await fetch(url, options).then((res) => res.json());
		response.images = await fetch(imagesUrl, options).then((res) => res.json());
		response.videos = await fetch(videosUrl, options).then((res) => res.json());
		res.status(200).json(response);
	} catch (error) {
		res
			.status(500)
			.json({ error: "Error al obtener los detalles del contenido" });
	}
});

export { router as tmdbRouter };
