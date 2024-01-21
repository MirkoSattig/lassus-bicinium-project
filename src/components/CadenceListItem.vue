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

const location = `T. ${Math.ceil(props.cadence.endBeat / 8)} ♩ ${(props.cadence.endBeat % 8) + 1}`;
</script>

<template>
    <UCard :title="location">
        <template v-slot:header>
            <div class="flex items-center">
                <div class="flex items-start justify-between w-full">
                    <div class="pl-3 w-full">
                        <div class="text-xl font-medium leading-5 text-gray-800">
                            <NuxtLink :href="`/bicinium/${bicinium.id}`">
                                {{ `${bicinium.nr}. ${bicinium.title}, ${location}` }}
                            </NuxtLink>
                        </div>
                        <div class="text-sm leading-normal pt-1 text-gray-500">
                            {{ bicinium.composer }}
                        </div>
                    </div>
                </div>
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
        </div>
    </UCard>
</template>
