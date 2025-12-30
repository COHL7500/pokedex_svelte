<script lang="ts">
	import PokemonCard from '$lib/ui/PokemonCard.svelte';
	import Grid from '$lib/ui/Grid.svelte';
	import SearchInput from '$lib/ui/SearchInput.svelte';

	const { data } = $props();
	let query = $state('');

	const pokemons = $derived.by(() => {
		if (!query) return data.pokemons;

		const result = data.pokemons.filter((pokemon) =>
			pokemon.name.toLowerCase().includes(query.toLowerCase())
		);

		return result;
	});
</script>

<main class="container">
	<h1>Pokémons</h1>

	<div class="search-container">
		<SearchInput bind:query></SearchInput>
	</div>

	<Grid>
		{#each pokemons as pokemon (pokemon.name)}
			<li>
				<PokemonCard {pokemon} />
			</li>
		{/each}
	</Grid>
</main>

<style>
	.search-container {
		margin-bottom: 1rem;
		max-width: 300px;
	}

	.container {
		padding: 2rem;
	}
</style>
