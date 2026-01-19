import type { Pokemon } from '$lib/types';
import { fetchPokemonDetail, toPokemon } from '$lib/api/api';
import type { PaginationMeta, PokeAPIResponse } from '$lib/api/types';
import {
	API_BASE_URL,
	DEFAULT_LIMIT,
	DEFAULT_PAGE_NUMBER
} from '$lib/api/constants';
import { stringToInt } from '$lib/utils';

interface LoadResponse {
	pokemons: Pokemon[];
	meta: PaginationMeta;
}

export const load = async ({ fetch, url }): Promise<LoadResponse> => {
	const sp = url.searchParams;

	const page = Math.max(
		1,
		stringToInt({ value: sp.get('p'), fallback: DEFAULT_PAGE_NUMBER })
	);

	const limit = DEFAULT_LIMIT;

	const offset = (page - 1) * limit;

	const query = url.searchParams.get('q')?.trim().toLowerCase() ?? '';

	if (query) {
		const res = await fetch(
			`${API_BASE_URL}/pokemon/${encodeURIComponent(query)}`
		);

		if (!res.ok) {
			return {
				pokemons: [] as Pokemon[],
				meta: {
					page: 1,
					totalPages: 1,
					nextPage: null,
					prevPage: null,
					totalCount: 0
				}
			};
		}

		const json = await res.json();

		const pokemons = [toPokemon(json)];

		return {
			pokemons: pokemons,
			meta: {
				page: 1,
				totalPages: 1,
				nextPage: null,
				prevPage: null,
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
			toPokemon(await fetchPokemonDetail({ detailUrl: pokemon.url, fetchFn: fetch }))
		)
	);

	const totalPages = Math.max(1, Math.ceil(json.count / limit));

	return {
		pokemons,
		meta: {
			page,
			totalPages,
			nextPage: page < totalPages ? page + 1 : null,
			prevPage: page > 1 ? page - 1 : null,
			totalCount: json.count
		}
	};
};
