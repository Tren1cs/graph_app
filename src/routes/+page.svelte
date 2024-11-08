<script lang="ts">
    import Draggable from "./draggable.svelte";
    import DraggableTxt from "./draggableTxt.svelte";
    enum Direction
    {
        up = 1, down = -1
    }

    
    let name:string = "asd"
    
</script>

<Draggable>
    <DraggableTxt>
    </DraggableTxt>
</Draggable>

<h1>Welcome to {name}, {Direction.up}</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>