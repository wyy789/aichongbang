export default {
    namespaced: true,
    state: {
        username: "",
        puandan: false
    },
    mutations: {
        yonghu(state, data) {
            state.username = data.userPhone
        },
        panduan(state, data) {
            state.puandan = data.use
        },
    },
    actions: {
        async login(context) {
            let data = await fetch(`/users/yonghu`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(response => {
                return response.json()
            })
            context.commit('yonghu', data)
        },
        async yanzheng(context) {
            let data = await fetch(`/users/yanzheng`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(response => {
                return response.json()
            })
            context.commit('panduan', data)
        },
        async tuichu(context) {
            let data = await fetch(`/users/zhuxiao`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
    }
}