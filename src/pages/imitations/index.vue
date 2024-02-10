<script setup>
const { data: imitationData } = await useAsyncData("imitations", () => queryContent("/imitations").find())
const { data: biciniumData } = await useAsyncData("bicinia", () => queryContent("/bicinia").find())

function getBicinium(id) {
    return biciniumData.value.find(b => b.id === id);
}
</script>

<template>
    <UContainer>
        <div class="flex flex-col gap-8">
            <Heading>Imitationen</Heading>
        
            <ScoreOptions />
        
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div v-for="imitation in imitationData" :key="imitation.id">
                    <ImitationListItem :imitation="imitation" :bicinium="getBicinium(imitation.biciniumId)"/>
                </div>
            </div>
        </div>
    </UContainer>
</template>
