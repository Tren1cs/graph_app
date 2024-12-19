<script lang="ts">
    import LanguageSelection from './LanguageSelection.svelte';

    import { buttonVariants } from "$lib/components/ui/button/index.js";

    import Button from "$lib/components/ui/button/button.svelte";
    import { ArrowUpFromLine } from 'lucide-svelte';
    import * as Dialog from "$lib/components/ui/dialog";
    import * as Tabs from "$lib/components/ui/tabs";
    import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
    import { Separator } from "$lib/components/ui/separator/index.js";
    import { Textarea } from "$lib/components/ui/textarea/index.js";

    import hljs from 'highlight.js';
    let { graphView = $bindable() }= $props();
    let edgematrix = $state("");
    let exportType = "";

    // Сделайте здесь экспорт в код, пожалуйста, в этом компоненте
    function generateCode(language: string ) {
        if(language === "") {
            return "Select language";
        }

        let code = "print('Hello World')";

        console.log(language)

        return hljs.highlight(code, {language: language, ignoreIllegals: true}).value;
    }


    let lang = $state("");

</script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark-reasonable.css">
<Dialog.Root>
    <Dialog.Trigger class={buttonVariants({ variant: "outline" }) + " mr-2"}><ArrowUpFromLine class="mr-2 h-6 w-6"/>Export</Dialog.Trigger>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title class="mb-4">Export Graph</Dialog.Title>

            <Dialog.Description>
                <Tabs.Root value="code" class="w-full min-h-[220px]">
                    <Tabs.List class="w-full">
                        <Tabs.Trigger value="code" class="w-full" onfocus={() => exportType = "code"}>To code</Tabs.Trigger>
                        <Tabs.Trigger value="list" class="w-full" onfocus={() => exportType = "list"}>To edge list</Tabs.Trigger>
                        <Tabs.Trigger value="matrix" class="w-full" onfocus={() => exportType = "matrix"}>To adjacency matrix</Tabs.Trigger>
                    </Tabs.List>

                    <Tabs.Content value="code">
                        <LanguageSelection bind:value={lang}/>
                        <ScrollArea class="w-full h-[164px] border-secondary border rounded-md p-3">
                            {@html generateCode(lang)}
                        </ScrollArea>
                    </Tabs.Content>

                    <Tabs.Content value="list">
                        <ScrollArea class="w-full h-[212px] border-secondary border rounded-md p-3">
                            {#each graphView.exportAdjList() as edge}
                                <div class="text-sm">{edge[0] + " " + edge[1]} </div>
                            {/each}
                        </ScrollArea>
                    </Tabs.Content>

                    <Tabs.Content value="matrix">
                        <ScrollArea class="w-full h-[212px] border-secondary border rounded-md p-3">
                            {edgematrix}
                        </ScrollArea>
                    </Tabs.Content>
                </Tabs.Root>
            </Dialog.Description>
        </Dialog.Header>
    </Dialog.Content>
</Dialog.Root>