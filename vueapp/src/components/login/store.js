export default {
    namespaced: true,
    state: {
        zhuangtai: false,
        panduan: false,
        quanxian: 5,
        shenghe: ''
    },
    mutations: {
        a(state, data) {
            state.zhuangtai = data
        },
        puanduan(state, data) {
            state.panduan = data.isuse
            state.quanxian = data.userType
            state.shenghe = data.shenghe
        }
    },
    actions: {
        async huoqushuju(context, obj) {
            let data = await fetch(`/login/reg`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userAcount: obj.userAcount,
                    userPwd: obj.userPwd,
                    userPhone: obj.userPhone,
                    userMail: obj.userMail,
                    userName: obj.userName,
                    userType: obj.userType,
                    userStatus: obj.userStatus
                }),
            })
        },
        async phone(context, obj) {
            let data = await fetch(`/login/panduan`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userPhone: obj.userPhone,
                })
            }).then(response => {
                return response.json()
            })
            context.commit('a', data)
        },
        async login(context, obj) {
            let data = await fetch(`/login/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userAcount: obj.userAcount,
                    userPwd: obj.userPwd,
                })
            }).then(response => {
                return response.json()
            })
            context.commit('puanduan', data)
        },
    }
}