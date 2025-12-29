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
		gap: 24px;
		width: 100%;
		min-height: 300px;
		flex-direction: column;
		align-content: start;
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 8px;
		padding: 1rem;
		box-sizing: border-box;
	}

	.card-title {
		margin: 0;
		font-size: 1.25rem;
		text-transform: capitalize;
	}
</style>
