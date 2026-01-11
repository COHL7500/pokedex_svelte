import { resolve } from '$app/paths';
import type { PokemonTypeName } from '$lib/api/types';
import { POKEMON_TYPE_COLORS } from '$lib/api/constants';

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

export const getTypeColor = (typeName: string): string => {
	const key = typeName.toLowerCase() as PokemonTypeName;

	const result = key in POKEMON_TYPE_COLORS ? POKEMON_TYPE_COLORS[key] : '#777';

	return result;
};
