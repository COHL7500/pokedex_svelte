import type { Pokemon } from '$lib/types';
import { fetchPokemonDetail, toPokemon } from '$lib/api/api';
import type { PokeAPIResponse } from '$lib/api/types';
import {
	API_BASE_URL,
	DEFAULT_LIMIT,
	DEFAULT_OFFSET
} from '$lib/api/constants';
import { stringToInt } from '$lib/utils';

export const load = async ({ fetch, url }) => {
	const sp = url.searchParams;

	const limit = Math.max(
		1,
		stringToInt({ value: sp.get('limit'), fallback: DEFAULT_LIMIT })
	);

	const offset = Math.max(
		0,
		stringToInt({ value: sp.get('offset'), fallback: DEFAULT_OFFSET })
	);

	const query = url.searchParams.get('q')?.trim().toLowerCase() ?? '';

	if (query) {
		const res = await fetch(`${API_BASE_URL}/pokemon/${query}`);
		const json = await res.json();

		if (!res.ok) {
			return {
				pokemons: [],
				meta: {
					limit: 1,
					offset: 0,
					currPage: 1,
					totalPages: 1,
					nextOffset: null,
					prevOffset: null,
					totalCount: json.count
				}
			};
		}

		const pokemon = toPokemon(json);

		return {
			pokemons: [pokemon],
			meta: {
				limit: 1,
				offset: 0,
				currPage: 1,
				totalPages: 1,
				nextOffset: null,
				prevOffset: null,
				totalCount: json.count
			}
		};
	}

	const apiParams = new URLSearchParams({
		limit: limit.toString(),
		offset: offset.toString()
	});

	const res = await fetch(`${API_BASE_URL}/pokemon?${apiParams}`);

	if (!res.ok) {
		throw new Error('Failed to fetch Pokémon list');
	}

	const json = (await res.json()) as PokeAPIResponse;

	const pokemons: Pokemon[] = await Promise.all(
		json.results.map(async (pokemon) =>
			toPokemon(await fetchPokemonDetail(pokemon.url))
		)
	);

	const totalPages = Math.ceil(json.count / limit);
	const currPage = Math.floor(offset / limit) + 1;

	return {
		pokemons,
		meta: {
			limit,
			offset,
			currPage,
			totalPages,
			nextOffset: json.next ? offset + limit : null,
			prevOffset: json.previous ? Math.max(0, offset - limit) : null,
			totalCount: json.count
		}
	};
};
