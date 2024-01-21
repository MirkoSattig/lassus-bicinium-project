<script setup>
const { params: { id } } = useRoute();
const { data: bicinium } = await useAsyncData(`bicinia/${id}`, () => queryContent(`/bicinia/${id}`).findOne());
</script>

<template>
    <UContainer>
        <Heading>Bicinien</Heading>
        <VerovioCanvas
            :url="bicinium.localRawFile"
            :scale="35"
            :options="{
                spacingSystem: 15,
            }"
        />
    </UContainer>
</template>
