type PokemonListResult = {
	name: string;
	url: string;
};

export type PokeAPIResponse = {
	results: PokemonListResult[];
};

export type PokemonDetailResponse = PokemonListResult & {
	id: number;
	sprites: {
		other: {
			'official-artwork': {
				front_default: string;
			};
		};
	};
};

export const fetchPokemonDetail = async (detailUrl: string) => {
	const res = await fetch(detailUrl);

	if (!res.ok) {
		throw new Error('Failed to fetch Pokémon details');
	}

	const json = (await res.json()) as PokemonDetailResponse;

	return json;
};

export const toPokemon = (detail: PokemonDetailResponse) => {
	return {
		id: detail.id,
		name: detail.name,
		imageUrl: detail.sprites.other['official-artwork'].front_default
	};
};
