<script setup>
const { params: { id } } = useRoute();
const { data: bicinium } = await useAsyncData(`bicinia/${id}`, () => queryContent(`/bicinia/${id}`).findOne());
</script>

<template>
    <UContainer>
        <Heading>Bicinien</Heading>
        <div class="flex flex-col gap-4">
            <div class="flex gap-2">
                <UButton :to="`https://github.com/MirkoSattig/lassus-bicinia/blob/master/kern/${bicinium.id}.krn`" target="_blank">
                    Auf GitHub öffnen
                </UButton>
                <UButton :to="`https://verovio.humdrum.org/?file=${encodeURIComponent(`verovio.https://github.com/MirkoSattig/lassus-bicinia/blob/master/kern/${bicinium.id}.krn`)}`" target="_blank">
                    Im VHV öffnen
                </UButton>
            </div>
            <VerovioCanvas
                :url="bicinium.localRawFile"
                :scale="35"
                :options="{
                    spacingSystem: 15,
                }"
            />
        </div>
    </UContainer>
</template>
