(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f6d02986","chunk-2d0bdf09","chunk-2d0bdf09","chunk-2d0bdf09","chunk-2d0bdf09"],{"2dab":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("a-date-picker",{attrs:{disabled:e.disabled||e.readOnly,placeholder:e.placeholder,value:e.momVal,showTime:e.showTime,format:e.dateFormat,getCalendarContainer:e.getCalendarContainer},on:{change:e.handleDateChange}})},n=[],i=r("c1df"),l=r.n(i),o={name:"JDate",props:{placeholder:{type:String,default:"",required:!1},value:{type:String,required:!1},dateFormat:{type:String,default:"YYYY-MM-DD",required:!1},triggerChange:{type:Boolean,required:!1,default:!1},readOnly:{type:Boolean,required:!1,default:!1},disabled:{type:Boolean,required:!1,default:!1},showTime:{type:Boolean,required:!1,default:!1},getCalendarContainer:{type:Function,default:function(){return document.body}}},data:function(){var e=this.value;return{decorator:"",momVal:e?l()(e,this.dateFormat):null}},watch:{value:function(e){this.momVal=e?l()(e,this.dateFormat):null}},methods:{moment:l.a,handleDateChange:function(e,t){this.$emit("change",t)}},model:{prop:"value",event:"change"}},d=o,s=r("2877"),c=Object(s["a"])(d,a,n,!1,null,null,null);t["default"]=c.exports},"88bc":function(e,t,r){(function(t){var r=1/0,a=9007199254740991,n="[object Arguments]",i="[object Function]",l="[object GeneratorFunction]",o="[object Symbol]",d="object"==typeof t&&t&&t.Object===Object&&t,s="object"==typeof self&&self&&self.Object===Object&&self,c=d||s||Function("return this")();function u(e,t,r){switch(r.length){case 0:return e.call(t);case 1:return e.call(t,r[0]);case 2:return e.call(t,r[0],r[1]);case 3:return e.call(t,r[0],r[1],r[2])}return e.apply(t,r)}function m(e,t){var r=-1,a=e?e.length:0,n=Array(a);while(++r<a)n[r]=t(e[r],r,e);return n}function h(e,t){var r=-1,a=t.length,n=e.length;while(++r<a)e[n+r]=t[r];return e}var f=Object.prototype,b=f.hasOwnProperty,p=f.toString,g=c.Symbol,v=f.propertyIsEnumerable,y=g?g.isConcatSpreadable:void 0,w=Math.max;function C(e,t,r,a,n){var i=-1,l=e.length;r||(r=F),n||(n=[]);while(++i<l){var o=e[i];t>0&&r(o)?t>1?C(o,t-1,r,a,n):h(n,o):a||(n[n.length]=o)}return n}function k(e,t){return e=Object(e),j(e,t,(function(t,r){return r in e}))}function j(e,t,r){var a=-1,n=t.length,i={};while(++a<n){var l=t[a],o=e[l];r(o,l)&&(i[l]=o)}return i}function O(e,t){return t=w(void 0===t?e.length-1:t,0),function(){var r=arguments,a=-1,n=w(r.length-t,0),i=Array(n);while(++a<n)i[a]=r[t+a];a=-1;var l=Array(t+1);while(++a<t)l[a]=r[a];return l[t]=i,u(e,this,l)}}function F(e){return I(e)||x(e)||!!(y&&e&&e[y])}function S(e){if("string"==typeof e||A(e))return e;var t=e+"";return"0"==t&&1/e==-r?"-0":t}function x(e){return q(e)&&b.call(e,"callee")&&(!v.call(e,"callee")||p.call(e)==n)}var I=Array.isArray;function T(e){return null!=e&&$(e.length)&&!D(e)}function q(e){return Y(e)&&T(e)}function D(e){var t=B(e)?p.call(e):"";return t==i||t==l}function $(e){return"number"==typeof e&&e>-1&&e%1==0&&e<=a}function B(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function Y(e){return!!e&&"object"==typeof e}function A(e){return"symbol"==typeof e||Y(e)&&p.call(e)==o}var L=O((function(e,t){return null==e?{}:k(e,m(C(t,1),S))}));e.exports=L}).call(this,r("c8ba"))},aa8e:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("a-modal",{attrs:{title:e.title,width:800,visible:e.visible,okButtonProps:{props:{disabled:e.disableSubmit}},confirmLoading:e.confirmLoading,cancelText:"关闭"},on:{ok:e.handleOk,cancel:e.handleCancel}},[r("a-spin",{attrs:{spinning:e.confirmLoading}},[r("a-form",{attrs:{form:e.form}},[r("a-form-item",{attrs:{labelCol:e.labelCol,wrapperCol:e.wrapperCol,label:"航班号",hasFeedback:""}},[r("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["ticketCode",{rules:[{required:!0,message:"请输入航班号!"}]}],expression:"['ticketCode', {rules:[{ required: true,message: '请输入航班号!'}]}]"}],attrs:{placeholder:"请输入航班号",readOnly:e.disableSubmit}})],1),r("a-form-item",{attrs:{labelCol:e.labelCol,wrapperCol:e.wrapperCol,label:"航班时间",hasFeedback:""}},[r("j-date",{directives:[{name:"decorator",rawName:"v-decorator",value:["tickectDate",{rules:[{required:!0,message:"请输入航班号!"}]}],expression:"['tickectDate',{rules:[{ required: true,message: '请输入航班号!'}]}]"}],attrs:{"trigger-change":!0}})],1),r("a-form-item",{attrs:{labelCol:e.labelCol,wrapperCol:e.wrapperCol,label:"订单号码",hidden:e.hiding,hasFeedback:""},model:{value:this.orderId,callback:function(t){e.$set(this,"orderId",t)},expression:"this.orderId"}},[r("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["orderId",{}],expression:"[ 'orderId', {}]"}],attrs:{disabled:"disabled"}})],1),r("a-form-item",{attrs:{labelCol:e.labelCol,wrapperCol:e.wrapperCol,label:"创建人",hidden:e.hiding,hasFeedback:""}},[r("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["createBy",{}],expression:"[ 'createBy', {}]"}],attrs:{readOnly:e.disableSubmit}})],1),r("a-form-item",{attrs:{labelCol:e.labelCol,wrapperCol:e.wrapperCol,label:"创建时间",hidden:e.hiding,hasFeedback:""}},[r("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["createTime",{}],expression:"[ 'createTime', {}]"}],attrs:{readOnly:e.disableSubmit}})],1)],1)],1)],1)},n=[],i=r("0fea"),l=r("88bc"),o=r.n(l),d=r("c1df"),s=r.n(d),c=r("2dab"),u={components:{JDate:c["default"]},name:"JeecgOrderTicketModal",data:function(){return{title:"操作",visible:!1,model:{},labelCol:{xs:{span:24},sm:{span:5}},wrapperCol:{xs:{span:24},sm:{span:16}},moment:s.a,format:"YYYY-MM-DD HH:mm:ss",disableSubmit:!1,orderId:"",hiding:!1,confirmLoading:!1,form:this.$form.createForm(this),validatorRules:{},url:{add:"/test/order/addTicket",edit:"/test/order/editTicket"}}},created:function(){},methods:{add:function(e){e?this.edit({orderId:e},""):this.$message.warning("请选择一条航班数据")},detail:function(e){this.edit(e,"d")},edit:function(e,t){var r=this;"e"==t?(this.hiding=!1,this.disableSubmit=!1):"d"==t?(this.hiding=!1,this.disableSubmit=!0):(this.hiding=!0,this.disableSubmit=!1),this.form.resetFields(),this.orderId=e.orderId,this.model=Object.assign({},e),this.visible=!0,this.$nextTick((function(){r.form.setFieldsValue(o()(r.model,"ticketCode","tickectDate","orderId","createBy","createTime","updateBy","updateTime"))}))},close:function(){this.$emit("close"),this.visible=!1},handleOk:function(){var e=this,t=this;this.form.validateFields((function(r,a){if(!r){t.confirmLoading=!0;var n="",l="";e.model.id?(n+=e.url.edit,l="put"):(n+=e.url.add,l="post");var o=Object.assign(e.model,a);o.mainId=e.orderId,Object(i["h"])(n,o,l).then((function(e){e.success?(t.$message.success(e.message),t.$emit("ok")):t.$message.warning(e.message)})).finally((function(){t.confirmLoading=!1,t.close()}))}}))},handleCancel:function(){this.close()}}},m=u,h=r("2877"),f=Object(h["a"])(m,a,n,!1,null,"15e28c2b",null);t["default"]=f.exports}}]);