<script setup>
const options = useScoreOptions();
</script>

<template>
    <div>
        <UCheckbox v-model="options.modernClefs" label="Moderne Schlüssel" /> 
    </div>
</template>
