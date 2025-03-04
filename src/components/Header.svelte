<script lang="ts">
    import { Routes } from '../utils/routes';
    import NavLink from './NavLink.svelte';
    import { onMount } from 'svelte';
    import { getFullPath, getRelativePath } from '../utils/path';

    let currentPath = $state('');
    let routes: Array<Omit<Route, 'name'>> = $state([]);

    const updateRoutes = () => {
        const path = getRelativePath(currentPath);
        routes = Routes.routes
            .filter((route) => {
                if (path === route.href) {
                    return false;
                }
                return true;
            })
            .map((elem) => ({
        text: elem.text,
                href: getFullPath(elem.href),
        blank: elem.target ?? undefined,
    }));
    };

    onMount(() => {
        currentPath = window.location.pathname;
        updateRoutes();
    });

    $effect(() => {
        currentPath = window.location.pathname;
        updateRoutes();
    });
</script>

<header
    class="sticky top-0 w-full flex flex-wrap justify-between gap-10 md:gap-52 p-5 bg-fuchsia-300 shadow-2xl"
>
    <div class="overflow-hidden w-10 h-10 aspect-square select-none">
        <a href={getFullPath(Routes.routes[0].href)}>
            <img
                class="hover:animate-ping active:animate-ping"
                src={getFullPath('/favicon.svg')}
                alt="logo"
            />
        </a>
    </div>
    <nav class="flex flex-1/2 justify-end gap-3 md:gap-5 items-center">
        {#each routes as route}
            <NavLink {...route} />
        {/each}
    </nav>
</header>
