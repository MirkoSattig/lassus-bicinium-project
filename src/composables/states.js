export function useScoreOptions() {
    return useState('scoreOptions', () => ({
        modernClefs: false,
    }));
};
