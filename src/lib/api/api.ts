import type {
	FetchLike,
	PokemonDetailResponse,
	SortMeta
} from '$lib/api/types';
import type { Pokemon } from '$lib/types';
import { getPrimaryTypeName } from '$lib/utils';

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
	const direction = sortMeta.order === 'asc' ? 1 : -1;

	const result = [...pokemons].sort((a, b) => {
		switch (sortMeta.sort) {
			case 'id':
				return direction * (a.id - b.id);

			case 'name': {
				const cmp = a.name.localeCompare(b.name);
				const result = cmp !== 0 ? direction * cmp : a.id - b.id;

				return result;
			}

			case 'total_base_stat': {
				const cmp = a.total_base_stat - b.total_base_stat;
				const result = cmp !== 0 ? direction * cmp : a.id - b.id;

				return result;
			}

			case 'type': {
				const aType = getPrimaryTypeName(a);
				const bType = getPrimaryTypeName(b);

				if (aType === null || bType === null) return 0;

				const cmp = aType.localeCompare(bType);
				if (cmp !== 0) return direction * cmp;
				return 0;
			}

			default:
				return 0;
		}
	});

	return result;
};
