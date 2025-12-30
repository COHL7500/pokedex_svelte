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
