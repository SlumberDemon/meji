<script>
  export let tip;

  //  $: displayClass = tip ? "" : "visibility: hidden;"; style={displayClass}
</script>

<div class="text-quaternary mx-2 text-center lg:text-xl text-xs md:text-lg">
  {tip || "..."}
</div>
