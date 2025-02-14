<script lang="ts">
	import { type LayoutProps } from './$types';
	import '../app.css';
	let { data }: LayoutProps = $props();
</script>

{#key data.url}
	<main class="h-screen w-screen overflow-hidden bg-[#fff2ff] p-0">
		<div class="h-full w-full">
			<slot></slot>
		</div>
	</main>
{/key}
