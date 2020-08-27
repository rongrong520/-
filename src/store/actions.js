import {getMenuList,getRoleList,getUserList} from '../util'
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
    //封装获取角色列表
    getRoleListAction({commit}){
      getRoleList()
        .then((res)=>{
          if(res.code === 200){
            commit('REQ_ROLELIST',res.list)
          }
        })
  },
  //封装获取管理员列表
  getUserListAction({commit},pageInfo){
    getUserList(pageInfo)
      .then((res)=>{
        if(res.code === 200){
          commit('REQ_USERLIST',res.list)
          
        }
      })
}
}