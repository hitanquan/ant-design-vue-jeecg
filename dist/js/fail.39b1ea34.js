(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["fail","chunk-26c98b20","chunk-2d221f48"],{"0673":function(t,e,s){"use strict";s.r(e);var c=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"exception"},[s("div",{staticClass:"img"},[s("img",{attrs:{src:t.config[t.type].img}})]),s("div",{staticClass:"content"},[s("h1",[t._v(t._s(t.config[t.type].title))]),s("div",{staticClass:"desc"},[t._v(t._s(t.config[t.type].desc))]),s("div",{staticClass:"action"},[s("a-button",{attrs:{type:"primary"},on:{click:t.handleToHome}},[t._v("返回首页")])],1)])])},a=[],n=s("cd0a"),i={name:"Exception",props:{type:{type:String,default:"404"}},data:function(){return{config:n["default"]}},methods:{handleToHome:function(){this.$router.push({name:"dashboard"})}}},o=i,r=(s("879c"),s("2877")),l=Object(r["a"])(o,c,a,!1,null,"24c60121",null);e["default"]=l.exports},4227:function(t,e,s){},"879c":function(t,e,s){"use strict";var c=s("4227"),a=s.n(c);a.a},cc89:function(t,e,s){"use strict";s.r(e);var c=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("exception-page",{attrs:{type:"404"}})},a=[],n=s("0673"),i={components:{ExceptionPage:n["default"]}},o=i,r=s("2877"),l=Object(r["a"])(o,c,a,!1,null,"b5dd89e6",null);e["default"]=l.exports},cd0a:function(t,e,s){"use strict";s.r(e);var c={403:{img:"https://gw.alipayobjects.com/zos/rmsportal/wZcnGqRDyhPOEYFcZDnb.svg",title:"403",desc:"抱歉，你无权访问该页面"},404:{img:"https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg",title:"404",desc:"抱歉，你访问的页面不存在或仍在开发中"},500:{img:"https://gw.alipayobjects.com/zos/rmsportal/RVRUAYdCGeYNBWoKiIwB.svg",title:"500",desc:"抱歉，服务器出错了"}};e["default"]=c}}]);