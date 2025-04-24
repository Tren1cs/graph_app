<script lang="ts">
    import LanguageSelection from './LanguageSelection.svelte';

    import { buttonVariants } from "$lib/components/ui/button/index.js";

    import Button from "$lib/components/ui/button/button.svelte";
    import { ArrowDownToLine } from 'lucide-svelte';
    import * as Dialog from "$lib/components/ui/dialog";
    import * as Tabs from "$lib/components/ui/tabs";

    import { Textarea } from "$lib/components/ui/textarea/index.js";

    let { input = $bindable(""), input_type = $bindable("code"), lang = $bindable(""), ...props } = $props();
</script>

<Dialog.Root>
    <Dialog.Trigger class={buttonVariants({ variant: "outline" }) + " mr-2"}><ArrowDownToLine class="mr-2 h-6 w-6"/>Импорт</Dialog.Trigger>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title class="mb-4">Импортировать граф</Dialog.Title>

            <Dialog.Description>
                <Tabs.Root value="code" class="w-full min-h-[220px]">
                    <Tabs.List class="w-full">
                        <Tabs.Trigger value="code" class="w-full" onfocus={() => input_type = "code"}>Из  кода</Tabs.Trigger>
                        <Tabs.Trigger value="list" class="w-full" onfocus={() => input_type = "list"}>Из списка рёбер</Tabs.Trigger>
                        <Tabs.Trigger value="matrix" class="w-full" onfocus={() => input_type = "matrix"}>Из матрицы смежности</Tabs.Trigger>
                    </Tabs.List>

                    <Tabs.Content value="code">
                        <LanguageSelection bind:value={lang}/>
                        <Textarea placeholder="🚧 В разработке! 🚧" class="mb-2"/>

                        <Dialog.Close class="w-full ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center
                            whitespace-nowrap rounded-md text-sm font-medium transition-colors
                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none
                            disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90
                            h-10 px-4 py-2">
                            <ArrowDownToLine class="mr-2 h-6 w-6"/>Импортировать граф
                        </Dialog.Close>
                    </Tabs.Content>
                        
                    <Tabs.Content value="list">
                        <script>input_type = "list"</script>
                        <Textarea placeholder="Вставьте список рёбер" class="mb-2 min-h-[128px]" bind:value={input}/>
                        <Dialog.Close on:click class="w-full ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center
                            whitespace-nowrap rounded-md text-sm font-medium transition-colors
                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none
                            disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90
                            h-10 px-4 py-2">
                            <ArrowDownToLine class="mr-2 h-6 w-6"/>Импортировать граф
                        </Dialog.Close>
                    </Tabs.Content>

                    <Tabs.Content value="matrix">
                        <script>input_type = "list"</script>
                        <Textarea placeholder="Вставьте матрицу смежности" class="mb-2 min-h-[128px]" bind:value={input}/>
                        <Dialog.Close on:click class="w-full ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center
                            whitespace-nowrap rounded-md text-sm font-medium transition-colors
                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none
                            disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90
                            h-10 px-4 py-2">
                            <ArrowDownToLine class="mr-2 h-6 w-6"/>Импортировать граф
                        </Dialog.Close>
                    </Tabs.Content>
                </Tabs.Root>
            </Dialog.Description>
        </Dialog.Header>
    </Dialog.Content>
</Dialog.Root>

