import type { Pokemon } from '$lib/types';

type PokemonAPIResponse = {
	results: { name: string; url: string }[];
};

export const load = async ({ fetch, url }) => {
	const limitparam = url.searchParams.get('limit');
	const limit = limitparam ? Math.max(1, Number(limitparam ?? '10')) : 10;

	const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
	const json = (await res.json()) as PokemonAPIResponse;

	const pokemons: Pokemon[] = json.results.map((pokemon) => ({
		name: pokemon.name
	}));

	return { pokemons };
};
