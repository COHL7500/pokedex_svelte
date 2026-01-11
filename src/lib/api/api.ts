import type { PokemonDetailResponse } from '$lib/api/types';
import type { Pokemon } from '$lib/types';

export const fetchPokemonDetail = async (detailUrl: string) => {
	const res = await fetch(detailUrl);

	if (!res.ok) {
		throw new Error('Failed to fetch Pokémon details');
	}

	const json = (await res.json()) as PokemonDetailResponse;

	return json;
};

export const toPokemon = (detail: PokemonDetailResponse): Pokemon => {
	return {
		id: detail.id,
		name: detail.name,
		imageUrl: detail.sprites.other['official-artwork'].front_default,
		types: detail.types
	};
};
