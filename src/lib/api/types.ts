type PokemonListResult = {
	name: string;
	url: string;
};

export type PokeAPIResponse = {
	results: PokemonListResult[];
	count: number;
	next: string | null;
	previous: string | null;
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
