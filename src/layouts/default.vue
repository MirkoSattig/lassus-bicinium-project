<template>
    <div class="flex flex-col min-h-screen">
        <header class="border-b border-gray-200 dark:border-gray-800 px-4 flex items-center gap-4">
            <div class="whitespace-nowrap text-lg">
                <NuxtLink to="/">
                    Lassus Bicinium Project
                </NuxtLink>
            </div>
            <TheNavigation />
        </header>
        <main class="my-8">
            <slot></slot>
        </main>
        <TheFooter class="mt-auto" />
    </div>
</template>
