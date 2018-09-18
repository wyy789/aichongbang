export default {
    namespaced: true,
    state: {
        rows: [],
        userName: "",
        allData: []
    },
    mutations: {
        getGoods(state, payload) {
            state.rows = payload
            // Object.assign(state, payload)
            // console.log(payload)
        },
        getUser(state, payload) {
            state.userName = payload
        },
        getAllGoods(state, payload) {
            state.allData = payload
        },
        addUserName(state, payload) {
            console.log(payload)
            for(let i=0;i<payload.length;i++){
                payload[i].userName.push(state.userName)
            }
            Object.assign(state.rows,payload)
            console.log(state.rows)
        }
    },
    actions: {
        async asyncGetStoreGoods(context) {
            // console.log(context)
            const content = await fetch(`/commodity/storeGoods?userName=${context.state.userName}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                return response.json();
            })
            // console.log(content);
            context.commit("getGoods", content);
        },
        async asyncGetStoreAllGoods(context) {
            console.log(context)
            const content = await fetch(`/commodity/storeAllGoods`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                return response.json();
            })
            // console.log(content);
            context.commit("getAllGoods", content);
        },
        async asyncGetUser(context) {
            const user = await fetch(`/users/yonghu`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                return response.json();
            })
            context.commit("getUser", user.userPhone);
        }
    }
}