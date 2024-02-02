<script setup>
const { data: bicinia } = await useAsyncData(`bicinia/count`, () => queryContent(`/bicinia`).count());
const { data: cadences } = await useAsyncData(`cadences/count`, () => queryContent(`/cadences`).count());
const { data: imitations } = await useAsyncData(`imitations/count`, () => queryContent(`/imitations`).count());

const links = [
    {
        label: 'Startseite',
        to: '/',
    },
    {
        label: 'Über das Projekt',
        to: '/about',
    },
    {
        label: 'Bicinien',
        to: `/bicinium`,
        badge: bicinia.value,
    },
    {
        label: 'Kadenzen',
        to: '/cadences',
        badge: cadences.value,
    },
    {
        label: 'Imitationen',
        to: '/imitations',
        badge: imitations.value,
    },
];
</script>

<template>
    <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
</template>

