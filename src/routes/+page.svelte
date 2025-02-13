<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	let canvasParent: HTMLDivElement;
	onMount(async () => {
		if (!browser) return;
		const [{ default: p5 }, { default: startSketch }] = await Promise.all([
			import('p5'),
			import('$lib/landing-animation')
		]);
		new p5(startSketch, canvasParent);
	});
</script>

<div class="flex h-full w-full items-center">
	<div class="align-center flex h-full w-1/2 flex-col justify-center p-8">
		<h1 class="borel pink text-8xl">Saint <br /> Valentines</h1>
		<h2 class="dark-pink pl-4 text-3xl">Ilustrating love through Fourier epicycles</h2>
		<div class="zain mt-8 flex w-full justify-end">
			<a href="/epicycles"
				><button
					class="aspect-square w-16 items-center rounded-full bg-white text-center align-middle hover:bg-gray-100"
					>Next</button
				></a
			>
		</div>
	</div>
	<div class="h-full w-1/2" id="canvasParent" bind:this={canvasParent}></div>
</div>
