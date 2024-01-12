<script setup>
const props = defineProps({
    bicinium: {
        type: Object,
        required: true,
    },
});

const data = ref(null);

onMounted(async () => {
    const response = await fetch(props.bicinium.localRawFile);
    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
    }
    data.value = await response.text();
});
</script>

<template>
    <Card :title="location">
        <template v-slot:title v-if="!shortTitle">
            <div class="text-xl font-medium leading-5 text-gray-800">
                <NuxtLink :to="{ name: 'bicinium-id', params: { id: bicinium.id } }">
                    {{ `${bicinium.nr}. ${bicinium.title}` }}
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
        </div>
    </Card>
</template>
