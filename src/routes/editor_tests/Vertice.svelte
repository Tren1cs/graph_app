<script lang="ts">
	let {vertice = $bindable()} = $props();
	let moving = false;
	
	function onMouseDown() {
		moving = true;
	}
	
	/**
     * @param {{ movementX: number; movementY: number; }} e
     */
	function onMouseMove(e:{ movementX: number; movementY: number; }) {
		if (moving) {
			vertice.x += e.movementX;
			vertice.y += e.movementY;
		}
	}
	
	function onMouseUp() {
		moving = false;
	}
	
// 	$: console.log(moving);
</script>

<style>
	.Vertice {
        background-color: rgb(23, 23, 23);
		user-select: none;
		cursor: move;
		border: solid 6px rgb(49, 49, 49);
        border-radius: 50%;
        height:60px;
        width:60px;
        -moz-border-radius:50%;
        -webkit-border-radius:50%;
		position: absolute;
		z-index: 2;
	}
	h1{
		color: rgb(222, 222, 222);
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        text-align: center;
        position: relative;
        top: 10px;
        left: 0px;
		font-size: 20px;
	}

</style>


<div onmousedown={onMouseDown} style="left: {vertice.x}px; top: {vertice.y}px;" class="Vertice">
	<h1>
		{vertice.id}
	</h1>
</div>
<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />