(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-833c6ec8","chunk-2d20fed6","chunk-2d20fed6","chunk-2d20fed6","chunk-2d20fed6","chunk-2d20fed6","chunk-2d20fed6"],{"040d":function(e,t,n){},2644:function(e,t,n){},"9ab5":function(e,t,n){"use strict";var i=n("040d"),o=n.n(i);o.a},b311:function(e,t,n){
/*!
 * clipboard.js v2.0.4
 * https://zenorocha.github.io/clipboard.js
 * 
 * Licensed MIT © Zeno Rocha
 */
(function(t,n){e.exports=n()})(0,(function(){return function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";var i="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=n(1),a=d(r),s=n(3),l=d(s),c=n(4),u=d(c);function d(e){return e&&e.__esModule?e:{default:e}}function f(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function h(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function m(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var p=function(e){function t(e,n){f(this,t);var i=h(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return i.resolveOptions(n),i.listenClick(e),i}return m(t,e),o(t,[{key:"resolveOptions",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action="function"===typeof e.action?e.action:this.defaultAction,this.target="function"===typeof e.target?e.target:this.defaultTarget,this.text="function"===typeof e.text?e.text:this.defaultText,this.container="object"===i(e.container)?e.container:document.body}},{key:"listenClick",value:function(e){var t=this;this.listener=(0,u.default)(e,"click",(function(e){return t.onClick(e)}))}},{key:"onClick",value:function(e){var t=e.delegateTarget||e.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new a.default({action:this.action(t),target:this.target(t),text:this.text(t),container:this.container,trigger:t,emitter:this})}},{key:"defaultAction",value:function(e){return y("action",e)}},{key:"defaultTarget",value:function(e){var t=y("target",e);if(t)return document.querySelector(t)}},{key:"defaultText",value:function(e){return y("text",e)}},{key:"destroy",value:function(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)}}],[{key:"isSupported",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:["copy","cut"],t="string"===typeof e?[e]:e,n=!!document.queryCommandSupported;return t.forEach((function(e){n=n&&!!document.queryCommandSupported(e)})),n}}]),t}(l.default);function y(e,t){var n="data-clipboard-"+e;if(t.hasAttribute(n))return t.getAttribute(n)}e.exports=p},function(e,t,n){"use strict";var i="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=n(2),a=s(r);function s(e){return e&&e.__esModule?e:{default:e}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var c=function(){function e(t){l(this,e),this.resolveOptions(t),this.initSelection()}return o(e,[{key:"resolveOptions",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action=e.action,this.container=e.container,this.emitter=e.emitter,this.target=e.target,this.text=e.text,this.trigger=e.trigger,this.selectedText=""}},{key:"initSelection",value:function(){this.text?this.selectFake():this.target&&this.selectTarget()}},{key:"selectFake",value:function(){var e=this,t="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandlerCallback=function(){return e.removeFake()},this.fakeHandler=this.container.addEventListener("click",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[t?"right":"left"]="-9999px";var n=window.pageYOffset||document.documentElement.scrollTop;this.fakeElem.style.top=n+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,this.container.appendChild(this.fakeElem),this.selectedText=(0,a.default)(this.fakeElem),this.copyText()}},{key:"removeFake",value:function(){this.fakeHandler&&(this.container.removeEventListener("click",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(this.container.removeChild(this.fakeElem),this.fakeElem=null)}},{key:"selectTarget",value:function(){this.selectedText=(0,a.default)(this.target),this.copyText()}},{key:"copyText",value:function(){var e=void 0;try{e=document.execCommand(this.action)}catch(t){e=!1}this.handleResult(e)}},{key:"handleResult",value:function(e){this.emitter.emit(e?"success":"error",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})}},{key:"clearSelection",value:function(){this.trigger&&this.trigger.focus(),window.getSelection().removeAllRanges()}},{key:"destroy",value:function(){this.removeFake()}},{key:"action",set:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"copy";if(this._action=e,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function(){return this._action}},{key:"target",set:function(e){if(void 0!==e){if(!e||"object"!==("undefined"===typeof e?"undefined":i(e))||1!==e.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&e.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(e.hasAttribute("readonly")||e.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=e}},get:function(){return this._target}}]),e}();e.exports=c},function(e,t){function n(e){var t;if("SELECT"===e.nodeName)e.focus(),t=e.value;else if("INPUT"===e.nodeName||"TEXTAREA"===e.nodeName){var n=e.hasAttribute("readonly");n||e.setAttribute("readonly",""),e.select(),e.setSelectionRange(0,e.value.length),n||e.removeAttribute("readonly"),t=e.value}else{e.hasAttribute("contenteditable")&&e.focus();var i=window.getSelection(),o=document.createRange();o.selectNodeContents(e),i.removeAllRanges(),i.addRange(o),t=i.toString()}return t}e.exports=n},function(e,t){function n(){}n.prototype={on:function(e,t,n){var i=this.e||(this.e={});return(i[e]||(i[e]=[])).push({fn:t,ctx:n}),this},once:function(e,t,n){var i=this;function o(){i.off(e,o),t.apply(n,arguments)}return o._=t,this.on(e,o,n)},emit:function(e){var t=[].slice.call(arguments,1),n=((this.e||(this.e={}))[e]||[]).slice(),i=0,o=n.length;for(i;i<o;i++)n[i].fn.apply(n[i].ctx,t);return this},off:function(e,t){var n=this.e||(this.e={}),i=n[e],o=[];if(i&&t)for(var r=0,a=i.length;r<a;r++)i[r].fn!==t&&i[r].fn._!==t&&o.push(i[r]);return o.length?n[e]=o:delete n[e],this}},e.exports=n},function(e,t,n){var i=n(5),o=n(6);function r(e,t,n){if(!e&&!t&&!n)throw new Error("Missing required arguments");if(!i.string(t))throw new TypeError("Second argument must be a String");if(!i.fn(n))throw new TypeError("Third argument must be a Function");if(i.node(e))return a(e,t,n);if(i.nodeList(e))return s(e,t,n);if(i.string(e))return l(e,t,n);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}function a(e,t,n){return e.addEventListener(t,n),{destroy:function(){e.removeEventListener(t,n)}}}function s(e,t,n){return Array.prototype.forEach.call(e,(function(e){e.addEventListener(t,n)})),{destroy:function(){Array.prototype.forEach.call(e,(function(e){e.removeEventListener(t,n)}))}}}function l(e,t,n){return o(document.body,e,t,n)}e.exports=r},function(e,t){t.node=function(e){return void 0!==e&&e instanceof HTMLElement&&1===e.nodeType},t.nodeList=function(e){var n=Object.prototype.toString.call(e);return void 0!==e&&("[object NodeList]"===n||"[object HTMLCollection]"===n)&&"length"in e&&(0===e.length||t.node(e[0]))},t.string=function(e){return"string"===typeof e||e instanceof String},t.fn=function(e){var t=Object.prototype.toString.call(e);return"[object Function]"===t}},function(e,t,n){var i=n(7);function o(e,t,n,i,o){var r=a.apply(this,arguments);return e.addEventListener(n,r,o),{destroy:function(){e.removeEventListener(n,r,o)}}}function r(e,t,n,i,r){return"function"===typeof e.addEventListener?o.apply(null,arguments):"function"===typeof n?o.bind(null,document).apply(null,arguments):("string"===typeof e&&(e=document.querySelectorAll(e)),Array.prototype.map.call(e,(function(e){return o(e,t,n,i,r)})))}function a(e,t,n,o){return function(n){n.delegateTarget=i(n.target,t),n.delegateTarget&&o.call(e,n)}}e.exports=r},function(e,t){var n=9;if("undefined"!==typeof Element&&!Element.prototype.matches){var i=Element.prototype;i.matches=i.matchesSelector||i.mozMatchesSelector||i.msMatchesSelector||i.oMatchesSelector||i.webkitMatchesSelector}function o(e,t){while(e&&e.nodeType!==n){if("function"===typeof e.matches&&e.matches(t))return e;e=e.parentNode}}e.exports=o}])}))},b65a:function(e,t,n){"use strict";n.d(t,"a",(function(){return u}));n("8e6e"),n("7f7f");var i=n("bd86"),o=(n("456d"),n("ac6a"),n("ca00")),r=n("0fea"),a=n("2b0e"),s=n("9fb0");function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){Object(i["a"])(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var u={data:function(){return{tokenHeader:{"X-Access-Token":a["default"].ls.get(s["a"])},queryParam:{},dataSource:[],ipagination:{current:1,pageSize:10,pageSizeOptions:["10","20","30"],showTotal:function(e,t){return t[0]+"-"+t[1]+" 共"+e+"条"},showQuickJumper:!0,showSizeChanger:!0,total:0},isorter:{column:"createTime",order:"desc"},filters:{},loading:!1,selectedRowKeys:[],selectionRows:[],toggleSearchStatus:!1,superQueryFlag:!1,superQueryParams:""}},created:function(){this.disableMixinCreated||(this.loadData(),this.initDictConfig())},methods:{loadData:function(e){var t=this;if(this.url.list){1===e&&(this.ipagination.current=1);var n=this.getQueryParams();this.loading=!0,Object(r["c"])(this.url.list,n).then((function(e){e.success&&(t.dataSource=e.result.records,t.ipagination.total=e.result.total),510===e.code&&t.$message.warning(e.message),t.loading=!1}))}else this.$message.error("请设置url.list属性!")},initDictConfig:function(){},handleSuperQuery:function(e){e?(this.superQueryFlag=!0,this.superQueryParams=JSON.stringify(e)):(this.superQueryParams="",this.superQueryFlag=!1),this.loadData()},getQueryParams:function(){var e={};this.superQueryParams&&(e["superQueryParams"]=encodeURI(this.superQueryParams));var t=Object.assign(e,this.queryParam,this.isorter,this.filters);return t.field=this.getQueryField(),t.pageNo=this.ipagination.current,t.pageSize=this.ipagination.pageSize,Object(o["d"])(t)},getQueryField:function(){var e="id";return this.columns.forEach((function(t){e+=","+t.dataIndex})),e},onSelectChange:function(e,t){this.selectedRowKeys=e,this.selectionRows=t},onClearSelected:function(){this.selectedRowKeys=[],this.selectionRows=[]},searchQuery:function(){this.loadData(1)},superQuery:function(){this.$refs.superQueryModal.show()},searchReset:function(){this.queryParam={},this.loadData(1)},batchDel:function(){if(this.url.deleteBatch)if(this.selectedRowKeys.length<=0)this.$message.warning("请选择一条记录！");else{for(var e="",t=0;t<this.selectedRowKeys.length;t++)e+=this.selectedRowKeys[t]+",";var n=this;this.$confirm({title:"确认删除",content:"是否删除选中数据?",onOk:function(){n.loading=!0,Object(r["a"])(n.url.deleteBatch,{ids:e}).then((function(e){e.success?(n.$message.success(e.message),n.loadData(),n.onClearSelected()):n.$message.warning(e.message)})).finally((function(){n.loading=!1}))}})}else this.$message.error("请设置url.deleteBatch属性!")},handleDelete:function(e){if(this.url.delete){var t=this;Object(r["a"])(t.url.delete,{id:e}).then((function(e){e.success?(t.$message.success(e.message),t.loadData()):t.$message.warning(e.message)}))}else this.$message.error("请设置url.delete属性!")},handleEdit:function(e){this.$refs.modalForm.edit(e),this.$refs.modalForm.title="编辑",this.$refs.modalForm.disableSubmit=!1},handleAdd:function(){this.$refs.modalForm.add(),this.$refs.modalForm.title="新增",this.$refs.modalForm.disableSubmit=!1},handleTableChange:function(e,t,n){Object.keys(n).length>0&&(this.isorter.column=n.field,this.isorter.order="ascend"==n.order?"asc":"desc"),this.ipagination=e,this.loadData()},handleToggleSearch:function(){this.toggleSearchStatus=!this.toggleSearchStatus},modalFormOk:function(){this.loadData()},handleDetail:function(e){this.$refs.modalForm.edit(e),this.$refs.modalForm.title="详情",this.$refs.modalForm.disableSubmit=!0},handleExportXls2:function(){var e=encodeURI(JSON.stringify(this.getQueryParams())),t="".concat(window._CONFIG["domianURL"],"/").concat(this.url.exportXlsUrl,"?paramsStr=").concat(e);window.location.href=t},handleExportXls:function(e){var t=this;e&&"string"==typeof e||(e="导出文件");var n=c({},this.queryParam);this.selectedRowKeys&&this.selectedRowKeys.length>0&&(n["selections"]=this.selectedRowKeys.join(",")),Object(r["b"])(this.url.exportXlsUrl,n).then((function(n){if(n)if("undefined"!==typeof window.navigator.msSaveBlob)window.navigator.msSaveBlob(new Blob([n],{type:"application/vnd.ms-excel"}),e+".xls");else{var i=window.URL.createObjectURL(new Blob([n],{type:"application/vnd.ms-excel"})),o=document.createElement("a");o.style.display="none",o.href=i,o.setAttribute("download",e+".xls"),document.body.appendChild(o),o.click(),document.body.removeChild(o),window.URL.revokeObjectURL(i)}else t.$message.warning("文件下载失败")}))},handleImportExcel:function(e){var t=this.$createElement;if(e.file.status,"done"===e.file.status)if(e.file.response.success){if(201===e.file.response.code){var n=e.file.response,i=n.message,o=n.result,r=o.msg,a=o.fileUrl,s=o.fileName,l=window._CONFIG["domianURL"]+a;this.$warning({title:i,content:t("div",[t("span",[r]),t("br"),t("span",["具体详情请 ",t("a",{attrs:{href:l,target:"_blank",download:s}},["点击下载"])," "])])})}else this.$message.success(e.file.response.message||"".concat(e.file.name," 文件上传成功"));this.loadData()}else this.$message.error("".concat(e.file.name," ").concat(e.file.response.message,"."));else"error"===e.file.status&&this.$message.error("文件上传失败: ".concat(e.file.msg," "))},getImgView:function(e){return e&&e.indexOf(",")>0&&(e=e.substring(0,e.indexOf(","))),window._CONFIG["staticDomainURL"]+"/"+e},uploadFile:function(e){e?(e.indexOf(",")>0&&(e=e.substring(0,e.indexOf(","))),window.open(window._CONFIG["staticDomainURL"]+"/"+e)):this.$message.warning("未知的文件")}}}},c954:function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("a-card",{attrs:{bordered:!1}},[n("div",{staticClass:"table-page-search-wrapper"},[n("a-form",{attrs:{layout:"inline"}},[n("a-row",{attrs:{gutter:24}},[n("a-col",{attrs:{xl:6,lg:7,md:8,sm:24}},[n("a-form-item",{attrs:{label:"表名"}},[n("a-input",{attrs:{placeholder:"请输入表名"},model:{value:e.queryParam.tableName,callback:function(t){e.$set(e.queryParam,"tableName",t)},expression:"queryParam.tableName"}})],1)],1),n("a-col",{attrs:{xl:6,lg:7,md:8,sm:24}},[n("span",{staticClass:"table-page-search-submitButtons",staticStyle:{float:"left",overflow:"hidden"}},[n("a-button",{attrs:{type:"primary",icon:"search"},on:{click:e.searchQuery}},[e._v("查询")]),n("a-button",{staticStyle:{"margin-left":"8px"},attrs:{type:"primary",icon:"reload"},on:{click:e.searchReset}},[e._v("重置")])],1)])],1)],1)],1),n("div",{staticClass:"table-operator"},[n("a-button",{attrs:{type:"primary",icon:"highlight"},on:{click:e.doCgformButton}},[e._v("自定义按钮")]),n("a-button",{attrs:{type:"primary",icon:"strikethrough"},on:{click:e.doEnhanceJs}},[e._v("JS增强")]),n("a-button",{attrs:{type:"primary",icon:"filter"},on:{click:e.doEnhanceSql}},[e._v("SQL增强")]),n("a-button",{attrs:{type:"primary",icon:"tool"},on:{click:e.doEnhanceJava}},[e._v("Java增强")]),e.selectedRowKeys.length>0?n("a-dropdown",[n("a-menu",{attrs:{slot:"overlay"},slot:"overlay"},[n("a-menu-item",{key:"1",on:{click:e.batchDel}},[n("a-icon",{attrs:{type:"delete"}}),e._v("\n          删除\n        ")],1)],1),n("a-button",[e._v(" 批量操作\n        "),n("a-icon",{attrs:{type:"down"}})],1)],1):e._e()],1),n("div",[n("div",{staticClass:"ant-alert ant-alert-info",staticStyle:{"margin-bottom":"16px"}},[n("i",{staticClass:"anticon anticon-info-circle ant-alert-icon"}),e._v("\n      已选择\n      "),n("a",{staticStyle:{"font-weight":"600"}},[e._v(e._s(e.selectedRowKeys.length))]),e._v("\n      项\n      "),n("a",{staticStyle:{"margin-left":"24px"},on:{click:e.onClearSelected}},[e._v("清空")])]),n("a-table",{ref:"table",attrs:{size:"middle",bordered:"",rowKey:"id",columns:e.columns,dataSource:e.dataSource,pagination:e.ipagination,loading:e.loading,rowSelection:{selectedRowKeys:e.selectedRowKeys,onChange:e.onSelectChange}},on:{change:e.handleTableChange},scopedSlots:e._u([{key:"action",fn:function(t,i){return[n("a",{on:{click:function(t){return e.handleEdit(i)}}},[e._v("编辑")]),n("a-divider",{attrs:{type:"vertical"}}),n("a-dropdown",[n("a",{staticClass:"ant-dropdown-link"},[e._v("更多\n            "),n("a-icon",{attrs:{type:"down"}})],1),n("a-menu",{attrs:{slot:"overlay"},slot:"overlay"},[n("a-menu-item",[n("a",{on:{click:function(t){return e.goPageOnline(i)}}},[e._v("功能测试")])]),n("a-menu-item",[n("a",{on:{click:function(t){return e.handleOnlineUrlShow(i)}}},[e._v("配置地址")])]),n("a-menu-item",[n("a",{on:{click:function(t){return e.handleRemoveRecord(i.id)}}},[e._v("移除")])])],1)],1)]}},{key:"dbsync",fn:function(t){return["Y"===t?n("span",{staticStyle:{color:"limegreen"}},[e._v("已同步")]):e._e(),"N"===t?n("span",{staticStyle:{color:"red"}},[e._v("未同步")]):e._e()]}}])})],1),n("onl-cgform-head-modal",{ref:"modalForm",attrs:{"action-button":!1},on:{ok:e.modalFormOk}}),n("a-modal",{attrs:{title:e.onlineUrlTitle,visible:e.onlineUrlVisible},on:{cancel:e.handleOnlineUrlClose}},[n("template",{slot:"footer"},[n("a-button",{on:{click:e.handleOnlineUrlClose}},[e._v("关闭")]),n("a-button",{staticClass:"copy-this-text",attrs:{type:"primary","data-clipboard-text":e.onlineUrl},on:{click:e.onCopyUrl}},[e._v("复制")])],1),n("p",[e._v(e._s(e.onlineUrl))])],2),n("enhance-js",{ref:"ehjs"}),n("enhance-sql",{ref:"ehsql"}),n("enhance-java",{ref:"ehjava"}),n("trans-db2-online",{ref:"transd2o",on:{ok:e.transOk}}),n("onl-cgform-button-list",{ref:"btnList"})],1)},o=[],r=n("0fea"),a=n("b65a"),s=n("b311"),l=n.n(s),c=n("ca00"),u={name:"OnlCgformHeadList",mixins:[a["a"]],components:{},data:function(){return{description:"Online表单视图",columns:[{title:"#",dataIndex:"",key:"rowIndex",width:60,align:"center",customRender:function(e,t,n){return parseInt(n)+1}},{title:"视图表名",align:"center",dataIndex:"tableName"},{title:"视图表描述",align:"center",dataIndex:"tableTxt"},{title:"原表版本",align:"center",dataIndex:"tableVersion"},{title:"视图版本",align:"center",dataIndex:"copyVersion"},{title:"操作",dataIndex:"action",align:"center",scopedSlots:{customRender:"action"}}],url:{list:"/online/cgform/head/list",delete:"/online/cgform/head/delete",deleteBatch:"/online/cgform/head/deleteBatch",removeRecord:"/online/cgform/head/removeRecord"},tableTypeDictOptions:[],sexDictOptions:[],syncModalVisible:!1,syncFormId:"",synMethod:"normal",syncLoading:!1,onlineUrlTitle:"",onlineUrlVisible:!1,onlineUrl:"",selectedRowKeys:[],selectedRows:[],physicId:""}},watch:{$route:function(){this.loadData()}},methods:{getQueryParams:function(){var e=Object.assign({},this.queryParam,this.isorter,this.filters);return e.field=this.getQueryField(),e.pageNo=this.ipagination.current,e.pageSize=this.ipagination.pageSize,e.copyType=1,e.physicId=this.physicId,Object(c["d"])(e)},loadData:function(e){var t=this;if(!this.$route.params.code)return!1;if(this.physicId=this.$route.params.code,this.url.list){1===e&&(this.ipagination.current=1);var n=this.getQueryParams();this.loading=!0,Object(r["c"])(this.url.list,n).then((function(e){e.success&&(t.dataSource=e.result.records,t.ipagination.total=e.result.total),510===e.code&&t.$message.warning(e.message),t.loading=!1}))}else this.$message.error("请设置url.list属性!")},goPageOnline:function(e){"Y"==e.isTree?this.$router.push({path:"/online/cgformTreeList/"+e.id}):this.$router.push({path:"/online/cgformList/"+e.id})},handleOnlineUrlClose:function(){this.onlineUrlTitle="",this.onlineUrlVisible=!1},handleOnlineUrlShow:function(e){"Y"==e.isTree?this.onlineUrl="/online/cgformTreeList/".concat(e.id):this.onlineUrl="/online/cgformList/".concat(e.id),this.onlineUrlVisible=!0,this.onlineUrlTitle="菜单链接["+e.tableTxt+"]"},handleRemoveRecord:function(e){var t=this;this.$confirm({title:"确认要移除此记录?",onOk:function(){Object(r["a"])(t.url.removeRecord,{id:e}).then((function(e){e.success?(t.$message.success("移除成功"),t.loadData()):t.$message.warning(e.message)}))},onCancel:function(){}})},doEnhanceJs:function(){this.selectedRowKeys&&1==this.selectedRowKeys.length?this.$refs.ehjs.show(this.selectedRowKeys[0]):this.$message.warning("请先选中一条记录")},doEnhanceSql:function(){this.selectedRowKeys&&1==this.selectedRowKeys.length?this.$refs.ehsql.show(this.selectedRowKeys[0]):this.$message.warning("请先选中一条记录")},doEnhanceJava:function(){this.selectedRowKeys&&1==this.selectedRowKeys.length?this.$refs.ehjava.show(this.selectedRowKeys[0]):this.$message.warning("请先选中一条记录")},doCgformButton:function(){this.selectedRowKeys&&1==this.selectedRowKeys.length?this.$refs.btnList.show(this.selectedRowKeys[0]):this.$message.warning("请先选中一条记录")},importOnlineForm:function(){this.$refs.transd2o.show()},transOk:function(){this.loadData()},onSelectChange:function(e,t){this.selectedRowKeys=e,this.selectedRows=t},onCopyUrl:function(){var e=this,t=new l.a(".copy-this-text");t.on("success",(function(){t.destroy(),e.$message.success("复制成功"),e.handleOnlineUrlClose()})),t.on("error",(function(){e.$message.error("该浏览器不支持自动复制"),t.destroy()}))},showMyCopyInfo:function(e){},copyConfig:function(e){var t=this;Object(r["i"])("".concat(this.url.copyOnline,"?code=").concat(e)).then((function(e){e.success?(t.$message.success("复制成功"),t.loadData()):t.$message.error("复制失败>>"+e.message)}))}}},d=u,f=(n("da81"),n("9ab5"),n("2877")),h=Object(f["a"])(d,i,o,!1,null,"54d89d82",null);t["default"]=h.exports},da81:function(e,t,n){"use strict";var i=n("2644"),o=n.n(i);o.a}}]);