<script lang="ts">
	import PokemonCard from '$lib/ui/PokemonCard.svelte';
	import Grid from '$lib/ui/Grid.svelte';
	import SearchInput from '$lib/ui/SearchInput.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { SvelteURLSearchParams } from 'svelte/reactivity';

	const { data } = $props();
	let query = $state('');

	const pokemons = $derived.by(() => {
		if (!query) return data.pokemons;

		const result = data.pokemons.filter((pokemon) =>
			pokemon.name.toLowerCase().includes(query.toLowerCase())
		);

		return result;
	});

	const meta = $derived(data.meta);

	const navigate = async (offset: number | null) => {
		if (offset == null) return;

		const sp = new SvelteURLSearchParams(page.url.searchParams);
		sp.set('limit', String(meta.limit));
		sp.set('offset', String(offset));

		// eslint-disable-next-line svelte/no-navigation-without-resolve
		await goto(`?${sp.toString()}`);
	};
</script>

<main class="container">
	<h1>Pokémons</h1>

	<nav class="pagination">
		<button
			disabled={meta.prevOffset == null}
			onclick={() => navigate(meta.prevOffset)}
		>
			Previous
		</button>
		<button
			onclick={() => navigate(meta.nextOffset)}
			disabled={meta.nextOffset == null}
		>
			Next
		</button>
		<span>Page {meta.currPage} of {meta.totalPages}</span>
	</nav>

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
