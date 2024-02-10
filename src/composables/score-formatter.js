export function useScoreFormatter(kern) {
    const options = useScoreOptions();
    const score = ref(kern);

    const filterString = computed(() => {
        const filters = [];
        if (options.modernClefs) {
            filters.push('!!!filter: modori -m');
        }
        return filters.join('\n');
    });

    const formattedScore = computed(() => {
        if (!score.value) return null;
        return `${score.value.trim()}\n${filterString.value}`;
    });

    return {
        formattedScore,
        filterString,
    };
};
