import Vue from 'vue'
import Vuex from 'vuex'

import commodity from "./components/commodity/store"
import login from "./components/login/store"
import serivce from "./components/serivce/store"
import spoilmanagement from "./components/spoilmanagement/store"
import storeapplication from "./components/storeapplication/store"
import storemanagement from "./components/storemanagement/store"
import theorder from "./components/theorder/store"
import usercontrol from "./components/usercontrol/store"
import storelist from "./components/storelist/store"
Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
      commodity,login,serivce,spoilmanagement,storeapplication,storemanagement,theorder,usercontrol,storelist
    }
})
