
export default {
    namespaced: true,
    state: {
        rows: [],
    },
    mutations: {
        huoqu(state, data) {
            state.rows.length = 0;
            state.rows = state.rows.concat(data);
        },
        tongguo(state, data) {
            state.rows.length = 0;
            state.rows = state.rows.concat(data);
        },
        xiugai(state, data) {
            for (let i = 0; i < state.rows.length; i++) {
                if (state.rows[i]._id == data._id) {
                    state.rows[i].userStatus = data.userStatus
                }
            }
        },
        shan(state, data) {
            for (let i = 0; i < state.rows.length; i++) {
                if (state.rows[i]._id == data._id) {
                    state.rows.splice(i, 1)
                }
            }
        }
    },
    actions: {
        async phone(context) {
            let data = await fetch(`/users/huoqu`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(response => {
                return response.json()
            })
            context.commit('huoqu', data)
        },
        async shenghe(context, obj) {
            let data = await fetch(`/users/shenghe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            }).then(response => {
                return response.json()
            })
            context.commit('xiugai', data)
        },
        async shanchu(context, obj) {
            let data = await fetch(`/users/shanchu`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            }).then(response => {
                return response.json()
            })
            context.commit('shan', data)
        },
        async chaxun(context, obj) {
            let data = await fetch(`/users/chaxun`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            }).then(response => {
                return response.json()
            })
            context.commit('tongguo', data)
        },
    }
}