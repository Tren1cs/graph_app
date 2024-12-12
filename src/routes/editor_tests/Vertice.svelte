<script lang="ts">
	let {vertice = $bindable(), movingVertice = $bindable(), selectedObjects = $bindable(),
		deletionQuery = $bindable(), isShiftDown = $bindable(),  scale = 1} = $props();
	let moving = false;
	let inputId = $state(vertice.id);
	let borderColor = $state("rgb(49, 49, 49)")
	function onmousedown(e: {which:number}) {
        if(e.which == 1) {
			moving = true;
			movingVertice = true;
			if (isShiftDown)
			{
				selectedObjects.push(vertice.id);
			}
			else
			{
				selectedObjects = [vertice.id];
			}
		}
		if (e.which == 3)
		{
			deletionQuery.push(vertice.id);
		}
	}

	$effect(() => 
	{
		inputId = vertice.id;
	})

	$effect(() => 
	{
		
		let Selected = selectedObjects.find(v => v === vertice.id)
		if (Selected !== undefined)
		{
            borderColor = "rgb(100, 100, 100)";
        } 
		else {
            borderColor = "rgb(49, 49, 49)";
        }
	})
	
	
	/**
     * @param {{ movementX: number; movementY: number; }} e
     */
	function onMouseMove(e:{ movementX: number; movementY: number; }) {
		if (moving) {
			vertice.x += e.movementX * (1/scale);
			vertice.y += e.movementY * (1/scale);
		}
	}
	
	function onMouseUp() {
		moving = false;
		setTimeout(() => {
			movingVertice = false;
		}, 20)	
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
	input{
		color: rgb(222, 222, 222);
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        text-align: center;
        position: absolute;
        top: 9px;
        left: -476px;
		font-size: 20px;
		width: 1000px;
		background: rgba(0, 151, 19, 0);
		outline: none;
	}

</style>


<!-- svelte-ignore a11y_no_static_element_interactions -->
<div id={vertice.id} {onmousedown} style="border: solid 6px {borderColor}; left: {vertice.x}px; top: {vertice.y}px;" class="Vertice">
	<input bind:value={inputId} onchange = {() => vertice.id = inputId}/>
</div>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />
