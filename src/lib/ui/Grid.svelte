<script lang="ts">
	const { children } = $props();
</script>

<ul class="grid">
	{@render children()}
</ul>

<style>
	.grid {
		display: grid;
		gap: 16px;
		justify-content: flex-start;
		align-items: center;
		grid-template-columns: repeat(auto-fit, minmax(220px, max-content));

		@media (max-width: 640px) {
			justify-content: center;
		}

		margin: 0;
		padding: 0;
		list-style: none;
	}
</style>
