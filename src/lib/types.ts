export interface PokemonType {
	slot: number;
	type: {
		name: string;
		url: string;
	};
}

export interface PokemonStat {
	base_stat: number;
	effort: number;
	stat: {
		name: string;
		url: string;
	};
}

export type Pokemon = {
	id: number;
	name: string;
	imageUrl: string;
	types: PokemonType[];
	total_base_stat: number;
	stats: PokemonStat[];

};
