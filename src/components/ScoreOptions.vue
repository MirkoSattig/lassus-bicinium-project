<script setup>
const { modernClefs } = storeToRefs(useScoreOptions());
</script>

<template>
    <div>
        <UCheckbox v-model="modernClefs" label="Moderne Schlüssel" /> 
    </div>
</template>
