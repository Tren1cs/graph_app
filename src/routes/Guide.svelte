<script lang="ts">
  import LanguageSelection from "./LanguageSelection.svelte";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Carousel from "$lib/components/ui/carousel/index.js";

  import { buttonVariants } from "$lib/components/ui/button/index.js";

  import Button from "$lib/components/ui/button/button.svelte";
  import { ArrowDownToLine, InfoIcon } from "lucide-svelte";
  import * as Dialog from "$lib/components/ui/dialog";
  import * as Tabs from "$lib/components/ui/tabs";

  import { Textarea } from "$lib/components/ui/textarea/index.js";

//ТЕБЕ ЗДЕСЬ ЧЁРНЫМ ПО-БЕЛОМУ НАПИСАНО: ГАААААААААААААААЙДАААААААААА!
</script>

<Dialog.Root>
  <Dialog.Trigger class={buttonVariants({ variant: "outline" }) + " mr-2"}>
    <InfoIcon class="mr-2 h-6 w-6" />Гайд
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title class="mb-4 text-xl">Гайд</Dialog.Title>
      <Carousel.Root class="w-[452px] self-center mx-2">
        <Carousel.Content>
          <Carousel.Item>
            <div class=" p-1">
              <Card.Root>
                <Card.Content
                  class=" bg-background border-border rounded-md aspect-[4/3] p-6"
                >
                  <h1 class="text-xl mb-4">
                    ✏ Как пользоваться редактором ✏
                  </h1>
                  <div class="mb-2">На данный момент на сайте вы можете:</div>
                  <ul>
                    <li class="mb-1">- Создавать графы</li>
                    <li class="mb-1">- Экспортировать графы в список рёбер</li>
                    <li class="mb-1">- Импортировать из списка рёбер</li>
                    <li class="mb-1">- Импортировать из матрицы смежности</li>
                  </ul>
                  <div class="mt-3">
                    Далее в инструкции описаны горячие клавиши и форматы импорта
                    / экспорта
                  </div>
                </Card.Content>
              </Card.Root>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div class="p-1">
              <Card.Root>
                <Card.Content
                  class=" bg-background border-border rounded-md aspect-[4/3] p-6"
                >
                  <h1 class="text-xl mb-4">🔥 Управление 🔥</h1>
                  <div>
                    <ul>
                      <li class="mb-2">Создать вершину - двойной щелчок ЛКМ</li>
                      <li class="mb-2">Выделить вершину - ЛКМ</li>
                      <li class="mb-2">
                        Создать ребро - выделить 1 вершину + SHIFT + ЛКМ по
                        другой
                      </li>
                      <li class="mb-2">Удалить вершину - ПКМ</li>
                      <li class="mb-2">
                        Можно двигать всё рабочее пространство, зажав ЛКМ
                      </li>
                    </ul>
                  </div>
                </Card.Content>
              </Card.Root>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div class="p-1">
              <Card.Root>
                <Card.Content
                  class=" bg-background border-border rounded-md aspect-[4/3] p-6"
                >
                  <h1 class="text-xl mb-4">📦 Форматы данных 1/2 📦</h1>
                  <h2 class="text-lg mb-3">Список рёбер:</h2>

                  <p>*Вершина А* *Вершина B*</p>
                  <p>*Вершина B* *Вершина C*</p>
                  <p>...</p>
                  <p>*Вершина X* *Вершина Y*</p>
                </Card.Content>
              </Card.Root>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div class="p-1">
              <Card.Root>
                <Card.Content
                  class=" bg-background border-border rounded-md aspect-[4/3] p-6"
                >
                  <h1 class="text-xl mb-4">📦 Форматы данных 2/2 📦</h1>
                  <h2 class="text-lg mb-3 mt-4">Матрица смежности:</h2>

                  <pre class=" whitespace-pre">    *А* *B* *C*</pre>
                  <pre class=" whitespace-pre">*A*  0   1   0</pre>
                  <pre class=" whitespace-pre">*B*  1   0   1</pre>
                  <pre class=" whitespace-pre">*C*  0   1   0</pre>
                </Card.Content>
              </Card.Root>
            </div>
          </Carousel.Item>
        </Carousel.Content>
        <Carousel.Previous class="-left-[4.5rem]" />
        <Carousel.Next class="-right-[4.5rem]" />
      </Carousel.Root>
    </Dialog.Header>
  </Dialog.Content>
</Dialog.Root>
