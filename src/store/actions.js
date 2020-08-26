import {getMenuList,getRoleList} from '../util'
export default{
    //封装获取菜单列表
    getMenuListAction({commit}){
        getMenuList({
            istree:1
          })
          .then((res)=>{
            if(res.code === 200){
              commit('REQ_MENULIST',res.list)
            }
          })
    },
    //封装获取菜单列表
    getRoleListAction({commit}){
      getRoleList()
        .then((res)=>{
          if(res.code === 200){
            commit('REQ_ROLELIST',res.list)
          }
        })
  }
}