import { defineStore } from 'pinia';

export const useScoreOptions = defineStore('scoreOptions', {
    state: () => ({
        modernClefs: false,
    }),
});
};
