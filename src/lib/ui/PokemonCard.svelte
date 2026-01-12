<script lang="ts">
	import type { Pokemon } from '$lib/types';
	import { POKEDEX_DIGITS } from '$lib/api/constants';
	import { getTypeColor } from '$lib/utils';

	interface PokemonCardProps {
		pokemon: Pokemon;
	}

	const { pokemon }: PokemonCardProps = $props();
</script>

<!-- TODO: Look into HTML-only image preloading
<svelte:head>
	<link
		rel="preload"
		as="image"
		href={pokemon.imageUrl}
		media="(min-width: 1024px)"
	/>
</svelte:head>
-->

<article class="card">
	<h3 class="card-title">
		<span class="mono">
			{`#${String(pokemon.id).padStart(POKEDEX_DIGITS, '0')}`}
		</span>
		<span>{pokemon.name}</span>
	</h3>

	<div class="types">
		{#each pokemon.types as type (type)}
			<span
				class="type-badge type-{type}"
				style:order={type.slot}
				style:background-color={getTypeColor(type.type.name)}
			>
				{type.type.name}
			</span>
		{/each}
	</div>

	<img
		style="--img-size: 222px"
		src={pokemon.imageUrl}
		alt={pokemon.name}
		loading="lazy"
		decoding="async"
	/>
</article>

<style>
	.types {
		display: flex;
		gap: 0.35rem;
		flex-wrap: wrap;
	}

	.type-badge {
		padding: 0.35rem 0.75rem;
		border-radius: 8px;
		border: 1px solid rgba(0,0,0,.2);
		text-shadow: 1px 1px 2px rgba(0,0,0,.5);
		font-size: 0.875rem;
		color: white;
		text-transform: capitalize;
		background-color: gray;
	}

	.card {
		display: flex;
		gap: 1rem;
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
