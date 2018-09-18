export default {
    namespaced: true,
    state: {
      rows:[]
    },
    mutations: {
        getGoods(state, payload) {
            state.rows=payload
            // Object.assign(state, payload)
            // console.log(payload)
        }
    },
    actions: {
        async asyncGetStoreGoods(context, data) {
            console.log(context)
            console.log(data)
            const content = await fetch(`/commodity/storeGoods?userName=${data}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                return response.json();
            })
            console.log(content);
            context.commit("getGoods", content);
        }
    }
}