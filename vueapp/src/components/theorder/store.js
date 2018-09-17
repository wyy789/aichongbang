export default {
    namespaced: true,
    state: {
        curpage: 1,
        eachpage: 5,
        rows: [],
        maxpage: 0,
        total: 0,
        data1:{
            type:"",
            value:""
        }
    },
    mutations: {
        getEmpByPage(state, payload) {
            Object.assign(state, payload)
        },
        setEachPage(state, payload){
            state.eachpage=payload
            //  console.log(state, payload)
        },
        setCurPage(state, payload){
            state.curpage=payload
        },
        // getserach(state, payload){
        //     state.rows=payload
        //     // console.log(state.rows)
        // },
    },
    actions: {
        async asyncGetEmpByPage(context,data1,{ curpage, eachpage } = {}) {
            data1=data1?data1:context.state.data1
            curpage=curpage ? curpage : context.state.curpage,
            eachpage=eachpage ? eachpage : context.state.eachpage
            let data = await fetch(`/theorder/order?page=${curpage}&rows=${eachpage}&type=${data1.type}&value=${data1.value}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(response => {
                return response.json();
            });
            context.commit("getEmpByPage", data)
            //   console.log(data,"12") 
        },
        async asyncdelete(context,id) {
            // console.log(id,"123")
            await fetch(`/theorder/deleteorder/${id}`, {
                method: "delete",
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(response => {
                return "success"
            });
            // context.commit("getEmpByPage", data)
            //  console.log(data,"1232") 
        },
        async asyncserach(context,data1,{ curpage, eachpage } = {}) {
            console.log(data1,"11")
            // curpage=curpage ? curpage : context.state.curpage,
             eachpage=eachpage ? eachpage : context.state.eachpage
            let y = await fetch(`/theorder/serach?type=${data1.type}&value=${data1.value}&page=1&rows=${eachpage}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(response => {
                return response.json();
            });
            context.commit("getEmpByPage", y)
            // console.log(y,"123") 
        },
        
    }
}