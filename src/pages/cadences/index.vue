<script setup>
const { data: cadenceData } = await useAsyncData("cadences", () => queryContent("/cadences").find())
const { data: biciniumData } = await useAsyncData("bicinia", () => queryContent("/bicinia").find())

function getBicinium(id) {
    return biciniumData.value.find(b => b.id === id);
}
</script>

<template>
    <Container>
        <Heading>Kadenzen</Heading>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div v-for="cadence in cadenceData" :key="cadence.id">
                <CadenceListItem :cadence="cadence" :bicinium="getBicinium(cadence.biciniumId)"/>
            </div>
        </div>
    </Container>
</template>
