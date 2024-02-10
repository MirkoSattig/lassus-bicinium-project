<script setup>
const emit = defineEmits(['updateFilter']);

const biciniumFilter = useBiciniumFilterOptions();

watch(biciniumFilter, () => {
    emit('updateFilter');
});

function resetFilter() {
    biciniumFilter.reset();
}

const { searchText, mode, finalis, transposition } = storeToRefs(biciniumFilter);
</script>

<template>
    <UCard>
        <template #header>
            <div class="font-medium leading-5">
                Filter
            </div>
        </template>
        <div class="flex gap-2 mb-3">
            <UFormGroup label="Suchtext" class="lg:w-48">
                <UInput v-model="searchText" />
            </UFormGroup>
            <UFormGroup label="Modus" class="lg:w-48">
                <USelectMenu
                    v-model="mode"
                    multiple
                    class="w-full"
                    :options="[
                        'dorian',
                        'phrygian',
                        'lydian',
                        'mixolydian',
                        'aeolian',
                        'ionian',
                        'locrian',
                    ]"
                />
            </UFormGroup>
            <UFormGroup label="Finalis" class="lg:w-48">
                <USelectMenu
                    v-model="finalis"
                    multiple
                    class="w-full"
                    :options="[
                        'c',
                        'd',
                        'e',
                        'f',
                        'g',
                        'a',
                        'b',
                    ]"
                />
            </UFormGroup>
            <UFormGroup label="Transposition" class="lg:w-48">
                <USelectMenu
                    v-model="transposition"
                    class="w-full"
                    :options="[
                        '',
                        'cantus_durus',
                        'cantus_mollis',
                    ]"
                />
            </UFormGroup>
        </div>
        <UButton color="red" variant="outline" @click="resetFilter">Zurücksetzen</UButton>
    </UCard>
</template>
