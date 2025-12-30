<script lang="ts">
	let { query = $bindable() } = $props();
</script>

<input
	type="text"
	placeholder="Search for Pokémon..."
	bind:value={query}
	aria-label="Search Pokémon"
	autocomplete="off"
/>

<style>
	input {
		width: 100%;
		padding: 0.75rem 1rem;
		font-size: 1rem;
		border: 1px solid lightgray;
		border-radius: 8px;
		box-sizing: border-box;
	}
</style>
