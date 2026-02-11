import {POKEMON_TYPE_NAMES} from '$lib/api/constants';
import type { PokemonStat, PokemonType } from '$lib/types';

interface PokemonListResult {
	name: string;
	url: string;
}

export type FetchLike = (
	input: RequestInfo,
	init?: RequestInit
) => Promise<Response>;

export type SortBy = 'id' | 'name' | 'total_base_stat' | 'type';
export type SortOrder = 'asc' | 'desc';
export type SortMeta = {
	sort: SortBy;
	order: SortOrder;
};

export interface PaginationMeta {
	page: number;
	totalPages: number;
	nextPage: number | null;
	prevPage: number | null;
	totalCount: number;
	sort: SortMeta;
}

export type PokeAPIResponse = {
	results: PokemonListResult[];
	count: number;
	next: string | null;
	previous: string | null;
};

export type PokemonTypeName = (typeof POKEMON_TYPE_NAMES)[number];

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
