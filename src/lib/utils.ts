import { resolve } from '$app/paths';

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
