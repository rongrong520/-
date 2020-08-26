
import http from './axios'
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