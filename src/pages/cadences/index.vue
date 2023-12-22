<script setup>
const {data} = await useAsyncData("cadences", () => queryContent("/cadences").find())

</script>

<template>
    Kadenzen
    <li v-for="cadence in data">
        {{ cadence.filename }}
    </li>
</template>