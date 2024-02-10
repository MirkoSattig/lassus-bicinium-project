<script setup>
const { conditions } = useBiciniumFilter();
const { data: biciniumData, refresh } = await useAsyncData('bicinia', () => queryContent('/bicinia').where(conditions.value).find())
const { data: totalBicinia  } = await useAsyncData('bicinia/count', () => queryContent('/bicinia').count())
</script>

<template>
    <UContainer>
        <div class="flex flex-col gap-8">
            <Heading>Bicinien</Heading>

            <BiciniumFilter @update-filter="refresh" />

            <ScoreOptions />

            <div>
                {{ biciniumData.length }} von {{ totalBicinia }} Bicinien gefunden
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div v-for="bicinium in biciniumData" :key="bicinium.id">
                    <BiciniumListItem :bicinium="bicinium" />
                </div>
            </div>
        </div>
    </UContainer>
</template>
