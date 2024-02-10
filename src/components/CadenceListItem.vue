<script setup>
const props = defineProps({
    cadence: {
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
    const response = await fetch(`/kern/cadences/${props.cadence.filename}`);
    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
    }
    data.value = await response.text();
});

const { formattedScore } = useScoreFormatter(data);

const location = `T. ${Math.ceil(props.cadence.endBeat / 8)} ♩ ${(props.cadence.endBeat % 8) + 1}`;
</script>

<template>
    <UCard :title="location">
        <template v-slot:header>
            <div class="text-xl font-medium leading-5 text-gray-800">
                <NuxtLink :href="`/cadences/${cadence.id}`">
                    {{ `${bicinium.nr}. ${bicinium.title}, ${location}` }}
                </NuxtLink>
            </div>
        </template>
        <div class="flex flex-col gap-4 mt-4">
            <VerovioCanvas
                v-if="formattedScore"
                :data="formattedScore"
                view-mode="horizontal"
                lazy
                unload
                :lazy-delay="100"
                :options="{mnumInterval: 1}"
            />
        </div>
    </UCard>
</template>
