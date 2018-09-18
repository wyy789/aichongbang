export default {
    namespaced: true,
    state: {
        curPage: 1,
        eachPage: 10,
        rows: [],
        maxpage: 0,
        total: 0,
        userName:"",
        data :{
            type:"",
            text:""
        }
    },
    mutations: {
        getUers(state,data){
            state.userName = data
        },
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
            data = data ? data:context.state.data
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
        async asyncSession(context){
            let data = await fetch("/users/yonghu",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
            }).then(response=>{
                return response.json()
            })
            context.commit("getUers",data.userPhone)
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
        //修改
        async asyncPutService(context,data) {
            data.userName = context.state.userName
            await fetch(`/serivce/putSer`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(data)
            }).then(response => {
                return "success"
            })
        },
        async asyncSearchService(context,data, { eachPage } = {}) {
            let curPage;
            if(data.curPage){
                curPage = data.curPage;
                context.state.curPage = data.curPage
            }else{
                curPage = context.state.curPage
            }
            eachPage = eachPage ? eachPage : context.state.eachPage
            let backService = await fetch(`/serivce/service?type=${data.type}&text=${data.text}&userName=${context.state.userName}&page=${curPage}&rows=${eachPage}`, {
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