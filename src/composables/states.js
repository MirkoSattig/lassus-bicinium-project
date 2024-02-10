import { defineStore } from 'pinia';

export const useScoreOptions = defineStore('score_options', {
    state: () => ({
        modernClefs: false,
    }),
});
};
