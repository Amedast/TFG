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

const getContentDetails = async (id, type) => {
	const url =
		TMDB_URL +
		"/" +
		type +
		"/" +
		id +
		"?language=es-ES&append_to_response=credits,keywords";
	const response = await fetch(url, options).then((res) => res.json());
	return response;
};

const discoverContent = async (type, params) => {
	const queryParams = new URLSearchParams({
		api_key: TMDB_Token,
		sort_by: "popularity.desc",
		language: "es-ES",
		...params,
	}).toString();

	const url = `${TMDB_URL}/discover/${type}?${queryParams}`;
	const response = await fetch(url, options).then((res) => res.json());
	return response.results;
};

const getSimilarContent = async (contentDetails, type) => {
	const genres = contentDetails.genres.map((genre) => genre.id);
	let keywords;
	if (contentDetails.keywords.keywords) {
		keywords = contentDetails.keywords.keywords.map((keyword) => keyword.id);
	} else {
		keywords = contentDetails.keywords.results.map((keyword) => keyword.id);
	}

	const director = contentDetails.credits.crew.find(
		(person) => person.job === "Director"
	);

	let recommendations = new Map();

	for (const genre of genres) {
		const movieResults = await discoverContent("movie", { with_genres: genre });
		const tvResults = await discoverContent("tv", { with_genres: genre });

		[...movieResults, ...tvResults].forEach((item) => {
			if (!recommendations.has(item.id)) {
				recommendations.set(item.id, { item, score: 1 });
			} else {
				recommendations.get(item.id).score += 1;
			}
		});
	}

	for (const keyword of keywords) {
		const movieResults = await discoverContent("movie", {
			with_keywords: keyword,
		});
		const tvResults = await discoverContent("tv", { with_keywords: keyword });

		[...movieResults, ...tvResults].forEach((item) => {
			if (!recommendations.has(item.id)) {
				recommendations.set(item.id, { item, score: 1 });
			} else {
				recommendations.get(item.id).score += 1;
			}
		});
	}

	if (director && type === "movie") {
		const movieResults = await discoverContent("movie", {
			with_crew: director.id,
		});
		movieResults.forEach((item) => {
			if (!recommendations.has(item.id)) {
				recommendations.set(item.id, { item, score: 1 });
			} else {
				recommendations.get(item.id).score += 1;
			}
		});
	}

	let sortedRecommendations = Array.from(recommendations.values())
		.filter((rec) => rec.item.id !== contentDetails.id)
		.sort((a, b) => b.score - a.score)
		.map((rec) => rec.item);

	return sortedRecommendations.slice(0, 15);
};

router.get("/similar/:type/:id", async (req, res) => {
	const { id, type } = req.params;
	try {
		const movieDetails = await getContentDetails(id, type);
		const similarContent = await getSimilarContent(movieDetails);

		res.json(similarContent);
	} catch (error) {
		console.error(error);
		res.status(500).send("Error al obtener contenidos similares.");
	}
});

export { router as recommendationRouter };
