<script setup>
const { params: { id } } = useRoute();
const { data: cadence } = await useAsyncData(`cadences/${id}`, () => queryContent(`/cadences/${id}`).findOne());
const { data: bicinium } = await useAsyncData(`bicinia/${cadence.value.biciniumId}`, () => queryContent(`/bicinia/${cadence.value.biciniumId}`).findOne());

const location = `T. ${Math.ceil(cadence.value.endBeat / 8)} ♩ ${(cadence.value.endBeat % 8) + 1}`;
</script>

<template>
    <UContainer>
        <Heading>
            <NuxtLink :href="`/bicinium/${bicinium.id}`">
                {{ `${bicinium.nr}. ${bicinium.title}, ${location}` }}
            </NuxtLink>
        </Heading>
        <VerovioCanvas :url="`/kern/cadences/${cadence.filename}`" :scale="35" />
    </UContainer>
</template>
