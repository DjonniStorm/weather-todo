<script lang="ts">
    import { getFullPath } from '../utils/path';
    import { Routes } from '../utils/routes';
</script>

<footer class="flex justify-between">
    <div class="rounded-3xl overflow-hidden border-0">
        <img src={getFullPath('/favicon.svg')} alt="logo" />
    </div>
    <section>
        <span>
            <a href={getFullPath(Routes.routes[0].href)}>Главная</a>
        </span>
        <span>
            <a href={getFullPath(Routes.routes[1].href)}>Ульяновск</a>
        </span>
        <span>
            <a href={getFullPath(Routes.routes[2].href)}>О нас</a>
        </span>
    </section>
</footer>
