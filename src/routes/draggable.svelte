<script lang="ts">
	export let vertice:{x:number, y:number};

	
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
	.draggable {
        
        background-color: rgb(23, 23, 23);
		user-select: none;
		cursor: move;
		border: solid 7px rgb(49, 49, 49);
        border-radius: 50%;
        height:50px;
        width:50px;
        -moz-border-radius:50%;
        -webkit-border-radius:50%;
		position: absolute;
	}

</style>


<div on:mousedown={onMouseDown} style="left: {vertice.x}px; top: {vertice.y}px;" class="draggable" />


<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />