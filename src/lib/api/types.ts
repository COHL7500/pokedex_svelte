import { POKEMON_TYPE_COLORS } from '$lib/api/constants';
import type {PokemonStat, PokemonType} from "$lib/types";

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
	stats: PokemonStat[];
}
