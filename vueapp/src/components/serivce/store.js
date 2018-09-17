export default {
    namespaced: true,
    state: {
        curPage: 1,
        eachPage: 10,
        rows: [],
        maxpage: 0,
        total: 0
    },
    mutations: {
        getServiceByPage(state, payload) {
            Object.assign(state, payload)
        },
        setCurPage(state, payload) {
            state.curPage = payload
        },
        setEachPage(state, payload) {
            state.eachPage = payload
        },
    },
    actions: {
        async asyncGetServiceByPage(context, { curPage, eachPage } = {}) {
            curPage = curPage ? curPage : context.state.curPage
            eachPage = eachPage ? eachPage : context.state.eachPage
            const data = await fetch(`/service?page=${curPage}&rows=${eachPage}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                // data: JSON.stringify({
                //     page: curPage || context.state.curPage,
                //     rows: eachPage || context.state.eachPage
                // })
            }).then(response => {
                return response.json()
            })
            console.log(data,12312123)
            context.commit("getServiceByPage", data)
        }
    }
}