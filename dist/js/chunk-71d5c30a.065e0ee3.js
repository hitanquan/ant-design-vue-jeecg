(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-71d5c30a","chunk-2d0c9207"],{"19c0":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("a-card",{attrs:{bordered:!1}},[i("a-col",{staticClass:"clName",attrs:{span:4}},[i("a-tree",{staticStyle:{height:"500px","overflow-y":"auto"},attrs:{treeData:t.treeData,defaultExpandAll:t.defaultExpandAll},on:{select:this.onSelect}})],1),i("a-col",{attrs:{span:2}}),i("a-col",{attrs:{span:18}},[i("a-spin",{attrs:{tip:"Loading...",spinning:t.spinning}},t._l(t.dataSource,(function(e,n){return i("div",{key:n},[i("a-row",[i("a-col",{attrs:{span:24}},[i("p",[i("a-divider",{attrs:{orientation:"left"}},[t._v(t._s(e.fileName))])],1)]),i("a-col",{attrs:{span:24}},[e.filePdfPath?[i("div",{staticStyle:{float:"left",width:"104px",height:"104px","margin-right":"10px",margin:"0 8px 8px 0"}},[i("div",{staticStyle:{width:"100%",height:"100%",position:"relative",padding:"8px"},on:{click:function(a){return t.pdfPreview(e.title)}}},[i("img",{staticStyle:{width:"100%"},attrs:{src:a("c6cf8")}})])])]:[t._v('\n              (暂无材料，点击右侧"选择文件"或"扫描上传"上传文件)\n            ')]],2)],1)],1)})),0)],1),i("pdf-preview-modal",{ref:"pdfmodal"})],1)},n=[],r=a("0fea"),s=a("9fb0"),d=a("2b0e"),c=a("588f"),l=[{id:"1",key:"1",title:"实例.pdf",fileCode:"shili",fileName:"实例",filePdfPath:"实例"}],o={name:"JeecgPdfView",components:{PdfPreviewModal:c["default"]},data:function(){return{description:"PDF预览页面",treeData:[{title:"所有PDF电子档",key:"0-0",children:l}],dataSource:l,allData:l,defaultExpandAll:!0,spinning:!1,url:{pdfList:"/api/pdfList"}}},created:function(){},methods:{loadData:function(){var t=this;this.spinning=!1,Object(r["c"])(this.url.pdfList).then((function(e){e.length>0&&(t.allData=e,t.dataSource=e,t.treeData[0].children=e),t.spinning=!1}))},pdfPreview:function(t){var e=d["default"].ls.get(s["a"]);this.headers={"X-Access-Token":e},this.$refs.pdfmodal.previewFiles(t,e)},onSelect:function(t,e){this.dataSource=[],void 0===t[0]||"0-0"===t[0]?this.dataSource=this.allData:this.dataSource.push(e.node._props.dataRef)},modalFormOk:function(){this.loadData()}}},f=o,p=(a("8c43"),a("2877")),u=Object(p["a"])(f,i,n,!1,null,"fc50669c",null);e["default"]=u.exports},"588f":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{display:"none"}},[a("iframe",{attrs:{id:t.id,src:t.url,frameborder:"0",width:"100%",height:"550px",scrolling:"auto"}})])},n=[],r=a("2b0e"),s=a("9fb0"),d={name:"PdfPreviewModal",data:function(){return{url:window._CONFIG["pdfDomainURL"],id:"pdfPreviewIframe",headers:{}}},created:function(){var t=r["default"].ls.get(s["a"]);this.headers={"X-Access-Token":t}},computed:{},mounted:function(){window.addEventListener("message",this.handleScanFileMessage)},methods:{handleScanFileMessage:function(t){t.data},previewFiles:function(t,e){var a=document.getElementById("pdfPreviewIframe"),i={title:t,token:e};a.contentWindow.postMessage(i,"*")}}},c=d,l=a("2877"),o=Object(l["a"])(c,i,n,!1,null,"afa3ac78",null);e["default"]=o.exports},"729f":function(t,e,a){},"8c43":function(t,e,a){"use strict";var i=a("729f"),n=a.n(i);n.a},c6cf8:function(t,e,a){t.exports=a.p+"img/pdf4.a7783614.jpg"}}]);