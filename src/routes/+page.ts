import type { Pokemon } from '$lib/types';
import { fetchPokemonDetail, type PokeAPIResponse, toPokemon } from '$lib/api';

export const load = async ({ fetch, url }) => {
	const limitparam = url.searchParams.get('limit');
	const limit = limitparam ? Math.max(1, Number(limitparam ?? '10')) : 10;

	const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);

	if (!res.ok) {
		throw new Error('Failed to fetch Pokémon list');
	}

	const json = (await res.json()) as PokeAPIResponse;

	const pokemons: Pokemon[] = await Promise.all(
		json.results.map(async (pokemon) => toPokemon(await fetchPokemonDetail(pokemon.url)))
	);

	return { pokemons };
};
