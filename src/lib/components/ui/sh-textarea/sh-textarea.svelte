<script lang="ts">
    import hljs from "highlight.js";
    import Textarea from "../textarea/textarea.svelte";

    let { input = $bindable(""), ...props } = $props();
</script>

<div class="h-fit w-fit">
    <Textarea bind:value={input} {...props} class=" text-transparent " />
    <div class="pointer-events-none h-full w-full relative top-0 left-0"></div>
</div>
