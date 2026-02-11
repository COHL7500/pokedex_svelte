import { resolve } from '$app/paths';
import type { PokemonTypeName, SortBy, SortOrder } from '$lib/api/types';
import { POKEMON_TYPE_COLORS, POKEMON_TYPE_NAMES } from '$lib/api/constants';
import type { Pokemon } from '$lib/types';

interface ToIntProps {
	value: string | null;
	fallback: number;
}

export const stringToInt = ({ value, fallback }: ToIntProps): number => {
	if (value === null) return fallback;
	const parsed = parseInt(value, 10);
	const result = isNaN(parsed) ? fallback : parsed;
	return result;
};

export const buildUrl = (sp: URLSearchParams) => {
	const qs = sp.toString();
	return `${resolve('/')}${qs ? `?${qs}` : ''}`;
};

export const isPokemonTypeName = (value: string): value is PokemonTypeName =>
	value in POKEMON_TYPE_NAMES;

export const getTypeColor = (typeName: string): string => {
	const key = typeName.toLowerCase();

	const result = isPokemonTypeName(key) ? POKEMON_TYPE_COLORS[key] : '#777';

	return result;
};
export const getPrimaryTypeName = (
	pokemon: Pokemon
): PokemonTypeName | null => {
	const result = pokemon.types.find((t) => t.slot === 1)?.type.name ?? '';
	return isPokemonTypeName(result) ? result : null;
};

export const isSortBy = (value: string | null): value is SortBy =>
	value === 'id' ||
	value === 'name' ||
	value === 'total_base_stat' ||
	value === 'type';

export const isSortOrder = (value: string | null): value is SortOrder =>
	value === 'asc' || value === 'desc';
