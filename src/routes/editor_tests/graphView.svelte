<script lang="ts">
    import Draggable from "./draggable.svelte";
    import DraggableTxt from "./draggableTxt.svelte";
    let vertices:{x:number, y:number, value:number}[];
    let n:number = 3;
    export function generateVertices()
    {
        vertices = [];
        for (let i = 0; i < n; i++)
        {
            vertices.push({x: i * 300, y: i * 300, value:i + 1});
        }
    }
</script>

<div class=" bg-transparent h-full w-full text-white top-0 left-0 text-center content-center z-10 absolute m-0">
    {#each vertices as vertice, i}
        <Draggable {vertice}/>
    {/each}
    <button on:click={generateVertices}>create graph</button>
    *This component is supposed to be graph view*
</div>