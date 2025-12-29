<script lang="ts">
	import type { Pokemon } from '$lib/types';

	interface PokemonCardProps {
		pokemon: Pokemon;
	}

	const { pokemon }: PokemonCardProps = $props();
	const name = $derived(pokemon.name);

	const imgSize = '222px';
</script>

<article class="card">
	<h3 class="card-title">{name}</h3>
	<img
		style="--img-size: {imgSize}"
		src={pokemon.imageUrl}
		alt={name}
		loading="lazy"
		decoding="async"
	/>
</article>

<style>
	.card {
		display: flex;
		gap: 24px;
		width: 100%;
		min-height: 300px;
		flex-direction: column;
		align-content: start;
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 8px;
		padding: 1.5rem;
		box-sizing: border-box;
		overflow: hidden;
	}

	img {
		width: var(--img-size);
		height: var(--img-size);
		aspect-ratio: 1 / 1;
		object-fit: contain;
		align-self: center;
		display: block;
	}

	.card-title {
		margin: 0;
		font-size: 1.25rem;
		text-transform: capitalize;
	}
</style>
