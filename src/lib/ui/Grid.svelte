<script lang="ts">
	const { children } = $props();
</script>

<div class="grid">
	{@render children()}
</div>

<style>
	.grid {
		display: grid;
		gap: 16px;
		justify-content: center;
		align-items: center;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
	}
</style>
