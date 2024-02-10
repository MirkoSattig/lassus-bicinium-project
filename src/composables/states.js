import { defineStore } from 'pinia';

export const useScoreOptions = defineStore('score_options', {
    state: () => ({
        modernClefs: false,
    }),
});

function createDefaultBiciniumFilterOptions() {
    return {
        searchText: '',
        mode: [],
        finalis: [],
        transposition: '',
    };
};

export const useBiciniumFilterOptions = defineStore('bicinium_filter_options', {
    state: () => (createDefaultBiciniumFilterOptions()),
    actions: {
        reset() {
            this.$patch(createDefaultBiciniumFilterOptions());
        },
    },
});
