export default {
    namespaced: true,
    state: {
        curPage: 1,
        eachPage: 10,
        rows: [],
        maxpage: 0,
        total: 0,
        userName:"10010001100",
        data :{
            type:"",
            text:""
        }
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
        async asyncGetServiceByPage(context, data,{ curPage, eachPage } = {}) {
            data =data?data:context.state.data
            // console.log(data,"123123")
            curPage = curPage ? curPage : context.state.curPage
            eachPage = eachPage ? eachPage : context.state.eachPage
            const content = await fetch(`/serivce/service?page=${curPage}&rows=${eachPage}&type=${data.type}&text=${data.text}&userName=${context.state.userName}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(response => {
                return response.json()
            })
            context.commit("getServiceByPage", content)
        },

        async asyncDeleteService(context,id) {
            await fetch(`/serivce/deleteSer/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(response => {
                return "success"
            })
        },
        async asyncAddService(context,data) {
            data.userName = context.state.userName
            await fetch(`/serivce/addSer`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(data)
            }).then(response => {
                return "success"
            })
        },
        async asyncSearchService(context,data, { curPage, eachPage } = {}) {
            curPage = curPage ? curPage : context.state.curPage
            eachPage = eachPage ? eachPage : context.state.eachPage
            let backService = await fetch(`/serivce/searchSer?type=${data.type}&text=${data.text}&userName=${context.state.userName}&page=${curPage}&rows=${eachPage}`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(response => {
                return response.json()
            })
            console.log(backService,"backService")
            context.commit("getServiceByPage", backService)
        }
    }
}