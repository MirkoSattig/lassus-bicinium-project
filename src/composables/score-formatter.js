export function useScoreFormatter(kern) {
    const options = useScoreOptions();
    const score = ref(kern);

    const formattedScore = computed(() => {
        let str = score.value?.trim();
        if (options.modernClefs) {
            str += `\n!!!filter: modori -m`;
        }
        return str ?? null;
    });

    return {
        formattedScore,
    };
};
