<script>
  import { onMount } from "svelte";
  let tip = "";

  //  $: displayClass = tip ? "" : "visibility: hidden;"; style={displayClass}

  onMount(async () => {
    tip = await fetch(`/board/tip`).then((res) => res.json());
  });
</script>

<div class="text-quaternary mx-2 text-center lg:text-1xl text-xs">
  {tip.tip || "..."}
</div>
