<script lang="ts">
    import ImportMenu from './ImportMenu.svelte';
    import ExportMenu from './ExportMenu.svelte';
    import GraphView from "./graphView.svelte";
    import Guide from './Guide.svelte';
    import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import { ArrowUpFromLine } from "lucide-svelte";
    import * as Resizable from "$lib/components/ui/resizable";
    import { toast } from 'svelte-sonner';
    import { Toaster } from '$lib/components/ui/sonner';
    import { Description } from '$lib/components/ui/alert-dialog';
    import { List } from '$lib/components/ui/command';
    import GraphEventTree from './graphView.svelte';

    let { algo } = $props();

    
</script>

<h2 class=" text-xl">Algorythms</h2>
                    <div class=" p-4 mt-5 relative h-32 w-full rounded-sm bg-background border border-border">

                    </div>

