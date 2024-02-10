<script setup>
const { data: cadenceData } = await useAsyncData("cadences", () => queryContent("/cadences").find())
const { data: biciniumData } = await useAsyncData("bicinia", () => queryContent("/bicinia").find())

function getBicinium(id) {
    return biciniumData.value.find(b => b.id === id);
}
</script>

<template>
    <UContainer>
        <div class="flex flex-col gap-8">
            <Heading>Kadenzen</Heading>

            <ScoreOptions />

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div v-for="cadence in cadenceData" :key="cadence.id">
                    <CadenceListItem :cadence="cadence" :bicinium="getBicinium(cadence.biciniumId)"/>
                </div>
            </div>
        </div>
    </UContainer>
</template>
