export default {
    namespaced: true,
    state: {
        curPage: 1,
        eachPage: 5,
        rows: [],
        maxPage: 0,
        total: 0
    },
    mutations: {
        getEmpByPage(state, payLoad) {
            Object.assign(state, payLoad)
        },
        setEachPage(state,payLoad){
            state.eachPage=payLoad
        },
        setCurPage(state,payLoad){
            state.curPage=payLoad
        }
    },
    actions: {
        async asyncGetEmpByPage(context, { curPage, eachPage}={ }) {
            curPage=curPage?curPage:context.state.curPage
            eachPage=eachPage?eachPage:context.state.eachPage
            // console.log(eachPage)
            const data=await fetch(`/text?page= ${curPage}&rows=${eachPage}`,{
                method:"get",
                headers:{
                    "Content-Type":"application/json"
                },
            }).then(Response=>{
                return Response.json();
            });
            
            // console.log(data)
            context.commit("getEmpByPage",data)
}
    }
}