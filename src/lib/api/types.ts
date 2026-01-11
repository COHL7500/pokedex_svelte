import { POKEMON_TYPE_COLORS } from '$lib/api/constants';

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

export type PokeAPIResponse = {
	results: PokemonListResult[];
	count: number;
	next: string | null;
	previous: string | null;
};

export interface PokemonType {
	slot: number;
	type: {
		name: string;
		url: string;
	};
}

export type PokemonTypeName = keyof typeof POKEMON_TYPE_COLORS;

export interface PokemonDetailResponse extends PokemonListResult {
	id: number;
	sprites: {
		other: {
			'official-artwork': {
				front_default: string;
			};
		};
	};
	types: PokemonType[];
}
