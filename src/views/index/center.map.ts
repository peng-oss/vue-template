
import mapItemBg from "@/assets/img/map-item-bg.png";
import mapBg from "@/assets/img/map-bg.png"
//mapData数据结构
export interface MapdataType {
    name: string;
    value: [number, number, {
        servpartnersnum: number
        proservnum: number
        categorynum: number
        subcategorynum: number
    }]; //x,y,value  第一个x 第二个y  第三个value
    
}
export const optionHandle = (regionCode: string,
    list: object[],
    mapData: MapdataType[]) => {
    let top = 45;
    let zoom = ["china"].includes(regionCode) ? 1.05 : 1;

    return {
        backgroundColor: "rgba(0,0,0,0)",
        tooltip: {
            show: false,
        },
        
        visualMap: {
            seriesIndex:0,
            left: 20,
            bottom: 20,
            pieces: [
                { gte: 1000, label: ">1000" }, // 不指定 max，表示 max 为无限大（Infinity）。
                { gte: 501, lte: 1000, label: "501-1000" },
                { gte: 101, lte: 500, label: "101-500" },
                { gte: 0, lte: 100, label: "0-100" },
            ],  
            inRange: {
                color: [
                    '#0EADCC',
                    '#083D8D',
                    '#BC233C',
                    '#DD9701'
                ],
            },
        
            textStyle: {
                color: "#fff",
            },
        },
      
        series: [
            {
                name: "MAP",
                type: "map",
                map: regionCode,
                // aspectScale: 0.78,
                data: list,
                // data: [1,100],
                selectedMode: false, //是否允许选中多个区域
                zoom: zoom,
                geoIndex: 1,
                top: top,
                symbolSize: function (val: any) {
                    return 0
                    // return val[2] / 50;
                },
                tooltip: {
                    show: true,
                    extraCssText:'width:291px !important;height:182px !important;', //自定义的tooltip的大小
                    formatter: function (params: any) {
                     
                        if (!params.data) return;
                        return `<div style="background-image: url('${mapItemBg}'); padding-top: 10px;  background-repeat: no-repeat; background-size: cover;width: 291px;height: 182px;">
                        <p style="color:#FEFEFE; font-size: 16px;margin-left: 60px;">${params.name}</p>
                       <div style="color:#D3EBFB; font-size: 12px;margin-left: 30px;">
                       <div style="margin-top: 10px;">伙伴数量：${params.data.servpartnersnum}</div>
                            <div style="margin-top: 8px;">产品服务数量：${params.data.value}</div>
                                 <div style="margin-top: 8px;">服务大类数量：${params.data.categorynum}</div>
                                      <div style="margin-top: 8px;">服务小类数量：${params.data.subcategorynum}</div>
                       </div>
                      </div>`;
                    },
                    padding: [0, 0],
                    backgroundColor: 'rgba(255,255,255,0)',
                    borderWidth: 0,
                   
                },
                
                emphasis: {
                    label: {
                        show: false,
                    },
                    itemStyle: {
                        // areaColor: "rgba(56,155,183,.7)",
                        areaColor: {
                              // Add background image here
                 
                            size: 'cover',
                            type: "radial",
                            x: 0.5,
                            y: 0.5,
                            r: 0.8,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: "rgba(147, 235, 248, 0)", // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: "rgba(56,155,183, .8)", // 100% 处的颜色
                                },
                            ],
                            globalCoord: false, // 缺为 false
                        },
                        borderWidth: 1,
                    },
                },
                itemStyle: {
                    borderColor: "rgba(147, 235, 248, .8)",
                    borderWidth: 1,
                    areaColor: {
                        image: mapBg, // Replace with your image URL
                        repeat: 'repeat-y',
                        // type: "radial",
                        x: 70,
                        y: -30,
                        r: 0.8,
                        // colorStops: [
                        //     {
                        //         offset: 0,
                        //         color: "rgba(147, 235, 248, 0)", // 0% 处的颜色
                        //     },
                        //     {
                        //         offset: 1,
                        //         color: "rgba(147, 235, 248, .2)", // 100% 处的颜色
                        //     },
                        // ],
                        // globalCoord: false, // 缺为 false
                    },
                    shadowColor: "rgba(128, 217, 248, .3)",
                    shadowOffsetX: -2,
                    shadowOffsetY: 2,
                    shadowBlur: 10,
                },
            },
          
        ],
      
    };
}


export const regionCodes: any = {
    "中国": {
        "adcode": "100000",
        "level": "country",
        "name": "中华人民共和国"
    },
    "新疆维吾尔自治区": {
        "adcode": "650000",
        "level": "province",
        "name": "新疆维吾尔自治区"
    },
    "湖北省": {
        "adcode": "420000",
        "level": "province",
        "name": "湖北省"
    },
    "辽宁省": {
        "adcode": "210000",
        "level": "province",
        "name": "辽宁省"
    },
    "广东省": {
        "adcode": "440000",
        "level": "province",
        "name": "广东省"
    },
    "内蒙古自治区": {
        "adcode": "150000",
        "level": "province",
        "name": "内蒙古自治区"
    },
    "黑龙江省": {
        "adcode": "230000",
        "level": "province",
        "name": "黑龙江省"
    },
    "河南省": {
        "adcode": "410000",
        "level": "province",
        "name": "河南省"
    },
    "山东省": {
        "adcode": "370000",
        "level": "province",
        "name": "山东省"
    },
    "陕西省": {
        "adcode": "610000",
        "level": "province",
        "name": "陕西省"
    },
    "贵州省": {
        "adcode": "520000",
        "level": "province",
        "name": "贵州省"
    },
    "上海市": {
        "adcode": "310000",
        "level": "province",
        "name": "上海市"
    },
    "重庆市": {
        "adcode": "500000",
        "level": "province",
        "name": "重庆市"
    },
    "西藏自治区": {
        "adcode": "540000",
        "level": "province",
        "name": "西藏自治区"
    },
    "安徽省": {
        "adcode": "340000",
        "level": "province",
        "name": "安徽省"
    },
    "福建省": {
        "adcode": "350000",
        "level": "province",
        "name": "福建省"
    },
    "湖南省": {
        "adcode": "430000",
        "level": "province",
        "name": "湖南省"
    },
    "海南省": {
        "adcode": "460000",
        "level": "province",
        "name": "海南省"
    },
    "江苏省": {
        "adcode": "320000",
        "level": "province",
        "name": "江苏省"
    },
    "青海省": {
        "adcode": "630000",
        "level": "province",
        "name": "青海省"
    },
    "广西壮族自治区": {
        "adcode": "450000",
        "level": "province",
        "name": "广西壮族自治区"
    },
    "宁夏回族自治区": {
        "adcode": "640000",
        "level": "province",
        "name": "宁夏回族自治区"
    },
    "浙江省": {
        "adcode": "330000",
        "level": "province",
        "name": "浙江省"
    },
    "河北省": {
        "adcode": "130000",
        "level": "province",
        "name": "河北省"
    },
    "香港特别行政区": {
        "adcode": "810000",
        "level": "province",
        "name": "香港特别行政区"
    },
    "台湾省": {
        "adcode": "710000",
        "level": "province",
        "name": "台湾省"
    },
    "澳门特别行政区": {
        "adcode": "820000",
        "level": "province",
        "name": "澳门特别行政区"
    },
    "甘肃省": {
        "adcode": "620000",
        "level": "province",
        "name": "甘肃省"
    },
    "四川省": {
        "adcode": "510000",
        "level": "province",
        "name": "四川省"
    },
    "天津市": {
        "adcode": "120000",
        "level": "province",
        "name": "天津市"
    },
    "江西省": {
        "adcode": "360000",
        "level": "province",
        "name": "江西省"
    },
    "云南省": {
        "adcode": "530000",
        "level": "province",
        "name": "云南省"
    },
    "山西省": {
        "adcode": "140000",
        "level": "province",
        "name": "山西省"
    },
    "北京市": {
        "adcode": "110000",
        "level": "province",
        "name": "北京市"
    },
    "吉林省": {
        "adcode": "220000",
        "level": "province",
        "name": "吉林省"
    }
}