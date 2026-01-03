<script lang="ts">
	import type { Pokemon } from '$lib/types';
	import { POKEDEX_DIGITS } from '$lib/api/constants';

	interface PokemonCardProps {
		pokemon: Pokemon;
	}

	const { pokemon }: PokemonCardProps = $props();
</script>

<article class="card">
	<h3 class="card-title">
		<span class="mono"
			>{`#${String(pokemon.id).padStart(POKEDEX_DIGITS, '0')}`}</span
		>
		<span>{pokemon.name}</span>
	</h3>
	<img
		style="--img-size: 222px"
		src={pokemon.imageUrl}
		alt={pokemon.name}
		loading="lazy"
		decoding="async"
	/>
</article>

<style>
	.card {
		display: flex;
		gap: 24px;
		width: 100%;
		max-width: 256px;
		min-height: 300px;
		flex-direction: column;
		align-content: start;
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 8px;
		padding: 1.5rem;
		box-sizing: border-box;
		overflow: hidden;

		transition: 0.3s;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);

		&:hover {
			box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
		}
	}

	img {
		width: 100%;
		height: 100%;
		max-width: var(--img-size);
		max-height: var(--img-size);
		aspect-ratio: 1 / 1;
		object-fit: contain;
		align-self: center;
		display: block;
	}

	.card-title {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		.mono {
			font-size: 1rem;
			color: gray;
			font-family:
				'ui-monospace', SFMono-Regular, Menlo, Monaco, Consolas,
				'Liberation Mono', 'Courier New', monospace;
			font-variant-numeric: tabular-nums;
		}

		margin: 0;
		font-size: 1.25rem;
		text-transform: capitalize;
	}
</style>
