export function useBiciniumFilter() {
    const store = useBiciniumFilterOptions();
    const conditions = computed(() => {
        const obj = {};

        if (store.searchText.match(/^\d+$/)) {
            obj.nr = parseInt(store.searchText, 10);
        } else if (store.searchText?.length) {
            obj.title = { $icontains: store.searchText };
        }

        if (store.mode?.length) {
            obj.mode = { $in: store.mode };
        }

        if (store.finalis?.length) {
            obj.finalis = { $in: store.finalis };
        }

        if (store.transposition?.length) {
            obj.transposition = { $icontains: store.transposition };
        }

        return obj;
    });
    return {
        conditions,
    };
};
