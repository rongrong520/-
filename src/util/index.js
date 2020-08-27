
import http from './axios'
/* ----菜单接口----- */
//添加菜单
export function getMenuAdd(data){
    return http.post('/menuadd',data) 
}
//菜单列表接口
export function getMenuList(params){
    return http.get('/menulist',{
        params
    })   
}
//菜单获取
export function getMenuInfo(params){
    return http.get('/menuinfo',{
        params
    })   
}
//菜单编辑
export function getMenuEdit(data){
    return http.post('/menuedit',data)  
}
//菜单删除
export function getMenuDel(data){
    return http.post('/menudelete',data)    
} 

/* ----角色接口----- */
//添加角色
export function getRoleAdd(data){
    return http.post('/roleadd',data)
}
//角色列表接口
export function getRoleList(){
    return http.get('/rolelist')
}
//角色获取（一条）
export function getRoleInfo(params){
    return http.get('/roleinfo',{
        params
    })
}
//角色编辑事件
export function getRoleEdit(data){
    return http.post('/roleedit',data)
}
//角色删除事件
export function getRoleDel(data){
    return http.post('/roledelete',data)
}

/* ----管理员接口----- */
//添加管理员
export function getUserAdd(data){
    return http.post('/useradd',data)
}
//管理员总数
export function getUserCount(){
    return http.get('/usercount')
}
//管理员列表接口
export function getUserList(params){
    return http.get('/userlist',{
        params
    })
}
//管理员获取（一条）
export function getUserInfo(params){
    return http.get('/userinfo',{
        params
    })
}
//管理员编辑事件
export function getUserEdit(data){
    return http.post('/useredit',data)
}
//管理员删除事件
export function getUserDel(data){
    return http.post('/userdelete',data)
}
//管理员登录
export function getLogin(data){
    return http.post('/userlogin',data)
}
