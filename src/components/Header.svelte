<script lang="ts">
    import { Routes } from "../utils/routes";
    import NavLink from "./NavLink.svelte";

    const routes: Array<Omit<Route, 'name'>> = Routes.routes.map(elem => ({
        text: elem.text,
        href: elem.href,
        blank: elem.target ?? undefined
    }))
</script>

<header class="sticky top-0 w-full flex flex-wrap justify-between gap-10 md:gap-52 p-5 bg-fuchsia-300 shadow-2xl">
    <div class="overflow-hidden w-10 h-10 aspect-square select-none">
        <a href={Routes.routes[0].href}>
            <img class="hover:animate-ping active:animate-ping" src="/favicon.svg" alt="logo"/>
        </a>
    </div>
    <nav class="flex flex-1/2 justify-end gap-3 md:gap-5 items-center">
        {#each routes.slice(1).reverse() as route}
            <NavLink {...route} />
        {/each}
    </nav>
</header>