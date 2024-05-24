import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

const router = express.Router();

const TMDB_Token = process.env.TMDB_API_TOKEN;
const TMDB_URL = "https://api.themoviedb.org/3";
const options = {
	headers: {
		Accept: "application/json",
		Authorization: "Bearer " + TMDB_Token,
	},
};
router.get("/medialist", async (req, res) => {
	const { type, sorttype } = req.query;
	const url = TMDB_URL + "/" + type + "/" + sorttype + "?language=es-ES";

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
	const movieUrl = TMDB_URL + "/trending/movie/week?language=es-ES";
	const tvUrl = TMDB_URL + "/trending/tv/week?language=es-ES";
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
		TMDB_URL +
		"/" +
		type +
		"/" +
		id +
		"?language=es-ES&append_to_response=videos,credits,recommendations,similar,movie_credits,tv_credits,watch/providers";
	const imagesUrl = TMDB_URL + "/" + type + "/" + id + "/images";
	const videosUrl = TMDB_URL + "/" + type + "/" + id + "/videos";

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

router.get("/search", async (req, res) => {
	const { text, page } = req.query;

	const url =
		TMDB_URL + "/search/multi?query=" + text + "&language=es-Es&page=" + page;

	try {
		const response = await fetch(url, options).then((res) => res.json());
		res.status(200).json(response);
	} catch (error) {
		res.status(500).json({ error: "Error en la busqueda" });
	}
});

router.get("/discover", async (req, res) => {
	const {
		type,
		genre,
		sort_by,
		vote_count,
		page,
		min_rating,
		max_rating,
		year,
	} = req.query;
	const url =
		`${TMDB_URL}/discover/${type}?language=es-ES&include_adult=false&include_null_first_air_dates=false` +
		`&page=${page || 1}` +
		(genre ? `&with_genres=${genre}` : "") +
		(sort_by
			? sort_by != "date.desc" && sort_by != "date.asc"
				? `&sort_by=${sort_by}`
				: `&sort_by=popularity.desc&${
						type == "tv" ? "first_air_date" : "primary_release_date"
				  }.gte=${new Date().getFullYear()}-${
						new Date().getMonth() + 1
				  }-${new Date().getDate()}`
			: "") +
		(vote_count ? `&vote_count.gte=${vote_count}` : "") +
		(min_rating ? `&vote_average.gte=${min_rating}` : "") +
		(max_rating ? `&vote_average.lte=${max_rating}` : "") +
		(year
			? `&${
					type == "tv" ? "first_air_date_year" : "primary_release_year"
			  }=${year}`
			: "");

	try {
		const response = await fetch(url, options).then((res) => res.json());
		res.status(200).json(response);
	} catch (error) {
		res.status(500).json({ error: "Error en la búsqueda" });
	}
});

export { router as tmdbRouter };
