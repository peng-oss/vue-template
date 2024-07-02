import {GET,POST,FILE,FILEPOST,PUT,GETNOBASE} from "../api";
const indexUrl=  {
    'leftTop':'/bigscreen/countDeviceNum',//左上
    'leftCenter':'/bigscreen/countUserNum',//左中
    "centerMap":"/bigscreen/centerMap",
    "centerBottom":"/bigscreen/installationPlan",
'UserLogin':'/UserLogin',//用户登录
    'leftBottom':"/bigscreen/leftBottom", //坐下
    'rightTop':"/bigscreen/alarmNum", //报警次数
    'rightBottom':'/bigscreen/rightBottom',//右下 
    'rightCenter': '/bigscreen/ranking',// 报警排名
    'Keywordpopularity':'/Keywordpopularity',
    "Servproductdata": "/Servproductdata",
    Servicepopularity: "/Servicepopularity",
    getnews: '/getnews',
    ServiceRanking: "/ServiceRanking",
    DialogueData: '/DialogueData',
    DataOverview: '/DataOverview',
    KeywordProdRelat: '/KeywordProdRelat',
    ScriptsCategoryRelat:'/ScriptsCategoryRelat'
}

export default indexUrl

/**左上--设备内总览 */
export const countDeviceNum=(param:any={})=>{
    return GET(indexUrl.leftTop,param)
}

/**左中--用户总览 */
export const countUserNum=(param:any={})=>{
    return GET(indexUrl.leftCenter,param)
}

/**左下--设备提醒 */
export const leftBottom=(param:any={})=>{
    return GET(indexUrl.leftBottom,param)
}

/**中上--地图 */
export const centerMap=(param:any={})=>{
    return GET(indexUrl.centerMap,param)
}

/**中下--安装计划 */
export const installationPlan=(param:any={})=>{
    return GET(indexUrl.centerBottom,param)
}

/**右上--报警次数 */
export const alarmNum=(param:any={})=>{
    return GET(indexUrl.rightTop,param)
}

/**右中--报警排名 */
export const ranking=(param:any={})=>{
    return GET(indexUrl.rightCenter,param)
}

/**右下--设备状态 */
export const rightBottom=(param:any={})=>{
    return GET(indexUrl.rightBottom,param)
}

export const userLogin=(param:any={})=>{
    return POST(indexUrl.UserLogin,param)
}
export const Servproductdata=(param:any={})=>{
    return POST(indexUrl.Servproductdata,param)
}

export const Keywordpopularity=(param:any={})=>{
    return POST(indexUrl.Keywordpopularity,param)
}
export const Servicepopularity=(param:any={})=>{
    return POST(indexUrl.Servicepopularity,param)
}

export const getnews = (param: any = {}) => {
    return POST(indexUrl.getnews, param)
}

export const ServiceRanking = (param: any = {}) => {
    return POST(indexUrl.ServiceRanking, param)
}


export const DialogueData = (param: any = {}) => {
    return POST(indexUrl.DialogueData, param)
}


export const DataOverview = (param: any = {}) => {
    return POST(indexUrl.DataOverview, param)
}   

export const KeywordProdRelat = (param: any = {}) => {
    return POST(indexUrl.KeywordProdRelat, param)
}


export const ScriptsCategoryRelat = (param: any = {}) => {
    return POST(indexUrl.ScriptsCategoryRelat, param)
}