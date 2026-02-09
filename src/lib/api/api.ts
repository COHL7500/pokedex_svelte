import type {
	FetchLike,
	PokemonDetailResponse,
	SortMeta
} from '$lib/api/types';
import type { Pokemon } from '$lib/types';

interface fetchPokemonDetailParams {
	detailUrl: string;
	fetchFn: FetchLike;
}

export const fetchPokemonDetail = async ({
	detailUrl,
	fetchFn
}: fetchPokemonDetailParams) => {
	const res = await fetchFn(detailUrl);

	if (!res.ok) {
		throw new Error('Failed to fetch Pokémon details');
	}

	const json = (await res.json()) as PokemonDetailResponse;

	return json;
};

export const toPokemon = (detail: PokemonDetailResponse): Pokemon => {
	const result: Pokemon = {
		id: detail.id,
		name: detail.name,
		imageUrl: detail.sprites.other['official-artwork'].front_default,
		types: detail.types,
		total_base_stat: detail.stats.reduce(
			(sum, stat) => sum + stat.base_stat,
			0
		),
		stats: detail.stats
	};

	return result;
};

interface SortPokemonProps {
	pokemons: Pokemon[];
	sortMeta: SortMeta;
}

export const sortPokemons = ({ pokemons, sortMeta }: SortPokemonProps) => {
	const { sort, order } = sortMeta;

	const compare = (a: Pokemon, b: Pokemon): number => {
		switch (sort) {
			case 'id':
				return a.id - b.id;
			case 'name':
				return a.name.localeCompare(b.name);
			case 'total_base_stat':
				return a.total_base_stat - b.total_base_stat;
			default:
				return 0;
		}
	};

	const sorted = pokemons.toSorted(compare);
	return order === 'asc' ? sorted : sorted.reverse();
};
