<script setup>
const props = defineProps({
    imitation: {
        type: Object,
        required: true,
    },
    bicinium: {
        type: Object,
        required: true,
    },
});

const data = ref(null);

onMounted(async () => {
    const response = await fetch(`/kern/imitations/${props.imitation.filename}`);
    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
    }
    data.value = await response.text();
});

const location = `♩ ${props.imitation.startBeat}`;
</script>

<template>
    <UCard :title="location">
        <template v-slot:header>
            <div class="text-xl font-medium leading-5 text-gray-800">
                <NuxtLink :href="`/bicinium/${bicinium.id}`">
                    {{ `${bicinium.nr}. ${bicinium.title}, ${location}` }}
                </NuxtLink>
            </div>
        </template>
        <div class="flex flex-col gap-4 mt-4">
            <VerovioCanvas
                v-if="data"
                :data="data"
                view-mode="horizontal"
                :scale="35"
                lazy
                unload
                :lazy-delay="100"
                :options="{mnumInterval: 1}"
            />
            Intervall: {{ imitation.interval }}
        </div>
    </UCard>
</template>
