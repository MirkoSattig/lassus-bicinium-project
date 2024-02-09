<template>
    <UContainer>
        <Heading>Über das Projekt</Heading>
        <Subheading>Features</Subheading>
        <ul>
            <li>alle 12 Bicinien können einzeln aufgerufen werden</li>
            <li>unter “Kadenzen” sind sämtliche Kadenzen aus den Bicinien gefiltert und einzeln einsehbar</li>
            <li>unter “Imitationen” lassen sich die einzelnen Soggetti, sowie deren Imitationsintervall herausfiltern und innerhalb der Partitur wiederfinden</li>
            <li>an der Erweiterung der Funktionen wird gearbeitet, Folgendes ist in nächster Zukunft geplant: Ergänzung der Bicinien um weitere, aus den Messen, Magnificats und Oratorien stammenden; Sortierfunktionen für die Kadenzen und Imitationen; grafisch anhand der Partitur hervorgehobene Analyse</li>
        </ul>
        <Subheading>Humdrum</Subheading>
        <p>Die Notenbeispiele für dieses Projekt wurden mit der Humdrum zugeordneten **kern representation notiert. Der Quellcode der Partituren für die Bicinien von Lassus ist in einem Repository auf GitHub verfügbar: https://github.com/MirkoSattig/lassus-bicinia.</p>
        <Subheading>Verovio</Subheading>
        <p>Die Humdrum-Parituren werden mit dem npm Package von Verovio in lesbare Partituren konvertiert. Um Verovio bequem mit dem JavaScript Framework Vue.js verwenden zu können wird vue-verovio-canvas als Dependency eingebunden.</p>
        <Subheading>Vue.js / Nuxt</Subheading>
        <p>Als technische Basis wird für diese Website das JavaScript Framework Nuxt verwendet das wiederum auf dem Framework Vue.js aufbaut. Der Quellcode dieser Website ist ebenfall auf GitHub verfügbar: https://github.com/MirkoSattig/lassus-bicinium-project.</p>
    </UContainer>
</template>
