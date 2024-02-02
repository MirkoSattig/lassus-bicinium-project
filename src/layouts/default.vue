<template>
    <div>
        <NuxtLink to="/">Startseite</NuxtLink>
        <NuxtLink to="/about">Über das Projekt</NuxtLink>
        <NuxtLink to="/bicinium">Bicinien</NuxtLink>
        <NuxtLink to="/cadences">Kadenzen</NuxtLink>
        <NuxtLink to="/imitations">Imitationen</NuxtLink>
    </div>
    <main class="my-8">
        <slot></slot>
    </main>
    <TheFooter />
</template>
