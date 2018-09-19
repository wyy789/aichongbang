export default {
    namespaced: true,
    state: {
        curpage: 0,
        eachpage: 5,
        rows: [],
        total: 0,
        maxpage: 0,
        data: {
            type: "",
            text: ""
        }
    },
    mutations: {
        getEmpByPage(state, payload) {
            Object.assign(state, payload)
        },
        setCurPage(state, payload) {
            state.curpage = payload;
        },
        setEachPage(state, payload) {
            state.eachpage = payload;
        },
        prePage(state) {
            state.curpage -= 1
        },
        nextPage(state) {
            state.curpage += 1
        },
        addGoods(state, payload) {
            object.assign(state, payload)
        }
    },
    actions: {
        async asyncGetGoodsByPage(context, data, {
            curPage,
            eachPage
        } = {}) {
            data = data ? data : context.state.data
            data = data ? data : context.state.data
            curPage = curPage ? curPage : context.state.curPage
            eachPage = eachPage ? eachPage : context.state.eachPage
            const content = await fetch(`/commodity/goods?page=${context.state.curpage}&rows=${context.state.eachpage}&type=${data.type}&text=${data.text}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                return response.json();
            })
            // console.log(content)
            context.commit("getEmpByPage", content)
        },
        async asyncDleteData(context, id) {
            // console.log(id)
           await fetch(`/commodity/deleteGoods/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                return "success"
            })
        },
        async asyncAddGoods(context,data){
            const content = await fetch(`/commodity/addGoods`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(data)
            }).then(response => {
                return "success"
            })
            console.log(content)
        },
        async asyncChange(context,data){
            data.userName = context.state.userName
            const content=await fetch(`/commodity/change`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(data)
            }).then(response => {
                return "success"
            })
            // console.log(content)
        }
    }
}