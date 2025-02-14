<script lang="ts">
	import { type LayoutProps } from './$types';
	import '../app.css';
	let { data }: LayoutProps = $props();
</script>

{#key data.url}
	<main class="h-dvh w-screen overflow-hidden bg-[#ffefff] p-0 grid grid-rows-[90%_10%] lg:grid-rows-[90%_10%]">
		<div class="h-full w-full">
			<slot></slot>
		</div>
		<footer class="flex justify-center items-center w-full pb-6">
		  <div class="logo boolean h-full bg-[#ffb1d4]">
			  <img src="https://storage.ucarolina.edu.mx/cdn/Boolean-Logo.svg" class="h-full opacity-0" />
      </div>
      <div class="logo uca h-[80%] bg-[#ffb1d4]">
        <img src="https://storage.ucarolina.edu.mx/cdn/LogoSmColor.svg" class="h-full opacity-0" />
      </div>	
		</footer>
	</main>
{/key}
