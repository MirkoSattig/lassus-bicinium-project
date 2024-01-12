<script setup>
const { data: biciniumData } = await useAsyncData("bicinia", () => queryContent("/bicinia").find())

</script>

<template>
    <Container>
        <Heading>Bicinien</Heading>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div v-for="bicinium in biciniumData" :key="bicinium.id">
                <BiciniumListItem :bicinium="bicinium" />
            </div>
        </div>
    </Container>
</template>
