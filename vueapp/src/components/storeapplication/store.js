export default {
    namespaced: true,
    actions: {
        async asyncAddStores(context, data) {
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
        }
    }
}