<script lang="ts">
    export let edge:{x1:number, y1:number, x2:number, y2:number};
    let gap:number = 27;
    let length:number = ((edge.y2 - edge.y1) ** 2 + (edge.x2 - edge.x1) ** 2) ** 0.5;
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
    }

</style>

<div style = "left: {edge.x1 + gap}px; top: {edge.y1 + gap}px;
 transform: rotate(atan2({edge.y2 - edge.y1}, {edge.x2 - edge.x1}));
  transform-origin: center left; width: {length}px;" class="Edge"></div>