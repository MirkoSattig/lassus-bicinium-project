<template>
    <div class="flex flex-col min-h-screen">
        <header>
            <TheNavigation />
        </header>
        <main class="my-8">
            <slot></slot>
        </main>
        <TheFooter class="mt-auto" />
    </div>
</template>
