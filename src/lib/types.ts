import type { PokemonType } from '$lib/api/types';

export type Pokemon = {
	id: number;
	name: string;
	imageUrl: string;
	types: PokemonType[];
};
