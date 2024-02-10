<script setup>
const { params: { id } } = useRoute();
const { data: bicinium } = await useAsyncData(`bicinia/${id}`, () => queryContent(`/bicinia/${id}`).findOne());
</script>

<template>
    <UContainer>
        <Heading>Bicinien</Heading>
        <div class="flex flex-col gap-4">

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
                :url="bicinium.localRawFile"
                :scale="35"
                :options="{
                    spacingSystem: 15,
                }"
            />
            <iframe width="560" height="315" :src="`https://www.youtube.com/embed/${bicinium.youtubeId}`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
    </UContainer>
</template>
