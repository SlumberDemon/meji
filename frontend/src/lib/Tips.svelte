<script>
  import { onMount } from "svelte";
  let tip = "";

  //  $: displayClass = tip ? "" : "visibility: hidden;"; style={displayClass}

  onMount(async () => {
    tip = await fetch(`/board/tip`).then((res) => res.json());
  });
</script>

<div class="text-quaternary mx-2 text-center lg:text-xl text-xs md:text-lg">
  {tip.tip || "..."}
</div>
