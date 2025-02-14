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

<div class="flex lg:flex-row flex-col h-full lg:h-1/2 lg:h-full w-full lg:items-center">
	<div class="align-center flex h-1/2 lg:h-full lg:w-1/2 flex-col justify-center lg:p-8 px-4">
		<h1 class="borel pink text-6xl lg:text-8xl">Saint <br /> Valentines</h1>
		<h2 class="dark-pink pl-4 text-xl lg:text-3xl">Ilustrating love through Fourier epicycles</h2>
		<div class="zain mt-8 flex w-full justify-end">
			<a href="/epicycles"
				><button
					class="aspect-square w-16 items-center rounded-full bg-white text-center align-middle hover:bg-gray-100"
					>Next</button
				></a
			>
		</div>
	</div>
	<div class="h-1/2 lg:h-full lg:w-1/2 w-full" id="canvasParent" bind:this={canvasParent}></div>
</div>
