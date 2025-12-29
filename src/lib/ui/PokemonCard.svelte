<script lang="ts">
	const { pokemon } = $props();
	const name = $derived(pokemon.name);
</script>

<article class="card">
	<h3 class="card-title">{name}</h3>
</article>

<style>
	.card {
		display: flex;
		width: 250px;
		min-height: 300px;
		flex-direction: column;
		align-content: start;
		gap: 12px;
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 8px;
		padding: 1rem;
	}

	.card-title {
		margin: 0;
		font-size: 1.25rem;
		text-transform: capitalize;
	}
</style>
