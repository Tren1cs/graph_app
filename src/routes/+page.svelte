<script lang="ts">
    import Draggable from "./draggable.svelte";
    import DraggableTxt from "./draggableTxt.svelte";

    let vertices:{x:number, y:number}[];
    let name:string = "asd";
    let n:number = 3;
    function generateVertices()
    {
        vertices = [];
        for (let i = 0; i < n; i++)
        {
            vertices.push({x: i * 300, y: i * 300});
        }
    }
    
</script>

<div>
    {#each vertices as vertice, i}
        <Draggable {vertice}/>
    {/each}
    <button on:click={generateVertices}>create graph</button>
</div>