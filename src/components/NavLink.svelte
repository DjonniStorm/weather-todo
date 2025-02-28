<script lang="ts">
    type Props = {
        href: string;
        target?: '_blank';
        text: string;
    };

    const { href, target, text }: Props = $props();

    console.log(href, text);
</script>

<a {href} {target} class="block hover:border-b-2 border-amber-200 transition">
    <span class="text-center text-xl md:text-2xl font-mono">
        {text}
    </span>
</a>
