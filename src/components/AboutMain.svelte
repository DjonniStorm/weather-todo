<script>
    import { onMount } from 'svelte';

    let show = $state(false);

    function typewriter(node, { speed = 1 }) {
        const valid =
            node.childNodes.length === 1 &&
            node.childNodes[0].nodeType === Node.TEXT_NODE;

        if (!valid) {
            throw new Error(
                `This transition only works on elements with a single text node child`,
            );
        }

        const text = node.textContent;
        const duration = text.length / (speed * 0.01);

        return {
            duration,
            tick: (t) => {
                const i = Math.trunc(text.length * t);
                node.textContent = text.slice(0, i);
            },
        };
    }

    onMount(() => (show = true));
</script>

<main class="flex-1 flex flex-col items-center justify-center">
    <div>
        <h1 class="text-5xl text-center">Учебный проект</h1>
        <a href="/">
            <div class="p-5 hover:border-b-2 border-amber-300 border-dashed">
                {#if show}
                    <p transition:typewriter={{ speed: 1 }}>
                        Посмотреть погоду (необходима геолокация)
                    </p>
                {/if}
            </div>
        </a>
    </div>
</main>
