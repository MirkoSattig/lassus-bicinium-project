<script setup>
const { data: imitationData } = await useAsyncData("imitations", () => queryContent("/imitations").find())
const { data: biciniumData } = await useAsyncData("bicinia", () => queryContent("/bicinia").find())

function getBicinium(id) {
    return biciniumData.value.find(b => b.id === id);
}
</script>

<template>
    <UContainer>
        <Heading>Imitationen</Heading>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div v-for="imitation in imitationData" :key="imitation.id">
                <ImitationListItem :imitation="imitation" :bicinium="getBicinium(imitation.biciniumId)"/>
            </div>
        </div>
    </UContainer>
</template>
