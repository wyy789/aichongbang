export default {
    namespaced: true,
    state: {
        userName: ""
    },
    mutations: {
        getUser(state, payload) {
            state.userName = payload
        }
    },
    actions: {
        async asyncAddStores(context, data) {
            console.log(data)
            console.log(context)
            data.userName=context.state.userName
            const content = await fetch(`/storeapplication/addStore`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(response => {
                return "success"
            })
            console.log(content)
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
            // console.log(user.userPhone)
            context.commit("getUser", user.userPhone);
        }
    }
}