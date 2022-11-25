export default {
    namespaced: true,

    state: () => ({
        exploreSwap: null,
    }),

    mutations: {
        setExploreSwap(state, exploreSwap) {
            state.exploreSwap = exploreSwap;
        },
    },

    getters: {
    },
}