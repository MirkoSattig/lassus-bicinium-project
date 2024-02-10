<script setup>
const { data: biciniumData } = await useAsyncData("bicinia", () => queryContent("/bicinia").find())

</script>

<template>
    <UContainer>
        <div class="flex flex-col gap-8">
            <Heading>Bicinien</Heading>
            
            <ScoreOptions />

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div v-for="bicinium in biciniumData" :key="bicinium.id">
                    <BiciniumListItem :bicinium="bicinium" />
                </div>
            </div>
        </div>
    </UContainer>
</template>
