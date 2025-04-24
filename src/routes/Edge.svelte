<script lang="ts">
    let {edge = $bindable()} = $props();
    const gap:number = 27;
    let length = $derived(((edge.y2 - edge.y1) ** 2 + (edge.x2 - edge.x1) ** 2) ** 0.5);
    let angle = $derived(Math.atan2(edge.y2 - edge.y1, edge.x2 - edge.x1));

    //
</script>

<style>
    .Edge
    {
        border-radius: 20px;
        background: rgb(49, 49, 49);
        width: 100px;
        height: 6px;
        position: absolute;
        z-index: 1;
    }
</style>

<div style = "left: {edge.x1 + gap}px; top: {edge.y1 + gap}px; transform: rotate({angle}rad); transform-origin: center left; width: {length}px;" class="Edge"></div>