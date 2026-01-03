interface PokemonListResult {
	name: string;
	url: string;
}

export interface PaginationMeta {
	page: number;
	totalPages: number;
	nextPage: number | null;
	prevPage: number | null;
	totalCount: number;
}

export interface PaginationMeta {
	page: number;
	totalPages: number;
	nextPage: number | null;
	prevPage: number | null;
	totalCount: number;
}

export type PokeAPIResponse = {
	results: PokemonListResult[];
	count: number;
	next: string | null;
	previous: string | null;
};

export interface PokemonDetailResponse extends PokemonListResult {
	id: number;
	sprites: {
		other: {
			'official-artwork': {
				front_default: string;
			};
		};
	};
}
