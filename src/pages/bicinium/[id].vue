<script setup>
const { params: { id } } = useRoute();
const { data: bicinium } = await useAsyncData(`bicinia/${id}`, () => queryContent(`/bicinia/${id}`).findOne());

const { data: surroundData } = await useAsyncData(`bicinia/${id}/surround`, () => queryContent('/bicinia').only(['_path', 'id', 'nr']).findSurround(bicinium.value._path))
const [prevBicinium, nextBicinium] = surroundData.value;

const score = ref();

onMounted(async () => {
    const response = await fetch(bicinium.value.localRawFile);
    const kern = await response.text();
    score.value = kern;
});

const { formattedScore } = useScoreFormatter(score);
</script>

<template>
    <UContainer>
        <div class="flex flex-col gap-8">

            <div>
                <Heading>{{ `${bicinium.nr}. ${bicinium.title}` }}</Heading>
                <div class="flex gap-2 items-center">
                    <div v-if="prevBicinium">
                        <UButton :to="{ name: 'bicinium-id', params: { id: prevBicinium.id }, hash: $route.hash }">
                            <Icon name="heroicons:arrow-left-circle" class="text-xl" />
                            Vorheriges
                        </UButton>
                    </div>
                    <div v-if="nextBicinium">
                        <UButton :to="{ name: 'bicinium-id', params: { id: nextBicinium.id }, hash: $route.hash }">
                            Nächstes
                            <Icon name="heroicons:arrow-right-circle" class="text-xl" />
                        </UButton>
                    </div>
                </div>
            </div>

            <div class="flex items-center gap-4">
                <ScoreOptions />
                <div class="flex gap-2 ml-auto">
                    <UButton :to="`https://github.com/MirkoSattig/lassus-bicinia/blob/master/kern/${bicinium.id}.krn`" target="_blank">
                        Auf GitHub öffnen
                    </UButton>
                    <UButton :to="`https://verovio.humdrum.org/?file=${encodeURIComponent(`https://github.com/MirkoSattig/lassus-bicinia/blob/master/kern/${bicinium.id}.krn`)}`" target="_blank">
                        Im VHV öffnen
                    </UButton>
                </div>
            </div>

            <VerovioCanvas
                v-if="formattedScore"
                :data="formattedScore"
                :options="{
                    spacingSystem: 15,
                }"
            />

            <iframe width="560" height="315" :src="`https://www.youtube.com/embed/${bicinium.youtubeId}`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
    </UContainer>
</template>
