export default {
    namespaced: true,
    state: {
        curPage: 1,
        eachPage: 5,
        rows: [],
        maxPage: 0,
        total: 0,
        data:{
            type:"",
            text:"",
        }
    },
    mutations: {
        spoilmanagementByPage(state, payLoad) {
            Object.assign(state, payLoad)
        },
        setEachPage(state, payLoad) {
            state.eachPage = payLoad
        },
        setCurPage(state, payLoad) {
            state.curPage = payLoad
        }
    },
    // 首页
    actions: {
        async asyncSpoilmanagementByPage(context,data ,{ curPage, eachPage } = {}) {
            data=data?data:context.state.data
            curPage = curPage ? curPage : context.state.curPage
            eachPage = eachPage ? eachPage : context.state.eachPage
            const content = await fetch(`/member/member?page= ${curPage}&rows=${eachPage}&type=${data.type}&text=${data.text}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(Response => {
                return Response.json();
            });
            context.commit("spoilmanagementByPage", content)
        },
        // 删除
        async asyncDeleteSpoilmanagement(context, id) {
            await fetch(`/member/deleteber/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(Response => {
                return "success"
            })
        },
        // 搜索
        async asyncSearchSpoilmanagement(context, data, {eachPage} = {}) {
            let curPage;
            if(data.curPage){
                curPage=data.curPage
                context.state.curPage=data.curPage
            }else{
                curPage=context.state.curPage
               
            }
            // curPage = curPage ? curPage : context.state.curPage
            eachPage = eachPage ? eachPage : context.state.eachPage
            let datas = await fetch(`/member/search?type=${data.type}&text=${data.value}&page=${curPage}&rows=${eachPage}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(response => {
                return response.json()
            })
            context.commit("spoilmanagementByPage", datas)
        },
        // 增加
        async asyncAddSpoilmanagement(context, data) {
            await fetch(`/member/add/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(Response => {
                return "success"
            })
        },
        //   修改
        async asyncUpdateSpoilmanagement(context, data) {
            let id = data._id;
            let memberName = data.memberName;
            let memberAcount = data.memberAcount;
            let memberLocation = data.memberLocation;
            let memberPhone = data.memberPhone;
            let memberCard = data.memberCard;
            let memberAdd = data.memberAdd;
            let memberArea = data.memberArea;
            let memberPoint = data.memberPoint;
            let memberImg = data.memberImg;
            let memberPet=data.memberPe
            await fetch(`/member/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    memberName,
                    memberAcount,
                    memberLocation,
                    memberPhone,
                    memberCard,
                    memberAdd,
                    memberArea,
                    memberPoint,
                    memberImg,
                    memberPet
                })
            })
        },

    }
}