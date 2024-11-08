<script>
	export let left = 100;
	export let top = 100;
	
	let moving = false;
	
	function onMouseDown() {
		moving = true;
	}
	
	/**
     * @param {{ movementX: number; movementY: number; }} e
     */
	function onMouseMove(e) {
		if (moving) {
			left += e.movementX;
			top += e.movementY;
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

<section on:mousedown={onMouseDown} style="left: {left}px; top: {top}px;" class="draggable">
	<slot></slot>
</section>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />