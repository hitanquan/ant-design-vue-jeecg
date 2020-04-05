<template>
  <a-card :bordered="false">
    
    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('车型管理功能数据表')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="根据车型查询">
              <a-select placeholder="请选择车型" default-value="0" v-model="queryParam.type">
                <a-select-option value="轿车">轿车</a-select-option>
                <a-select-option value="新能源">新能源</a-select-option>
                <a-select-option value="SUV/MPV">SUV/MPV</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :md="8" :sm="24">
            <a-form-item label="根据名称查询">
              <a-input placeholder="请输入车名称" v-model="queryParam.name"/>
            </a-form-item>
          </a-col>

          <a-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button style="margin-left: 8px" @click="searchReset" icon="reload">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :expandedRowKeys="expandedRowKeys"
        @change="handleTableChange"
        @expand="handleExpand"
        v-bind="tableProps">

        <div
          slot="expandedRowRender"
          slot-scope="record"
          style="margin: 0">
          <a-row>
            <a-row>
              <a-col :span="12">
                <span>ID：{{record.id}}</span><br>
                <!--尝试将图片显示，但是行不通-->
                <!--<img-drag-sort >logo图：{{record.logoImg}}</img-drag-sort>-->
                <!--<ImgTurnPage >logo图：{{record.logoImg}}</ImgTurnPage>-->
               <!-- <template slot="imgSlot" slot-scope="{{record.logoImg}}">
                  <span v-if="!text" style="font-size: 12px;font-style: italic;">无此图片</span>
                  <img v-else :src="getImgView(text)" height="25px" alt="图片不存在" style="max-width:80px;font-size: 12px;font-style: italic;"/>
                </template>-->
                <!--<span>logo图：<img src={{record.logoImg}} width="100px" height="100px"></span><br>-->
                <!--以下是从数据库拿到的图片路径，还没找到方式显示它们-->
               <!-- <span>logo图路径:{{record.logoImg}}</span><br>
                <span>type图路径:{{record.typeImg}}</span><br>-->
                <!--先静态写死路径代替一下-->
                <span>logo图：<img src="http://localhost:8080/jeecg-boot/upFiles/logo_levin2019_1585927616696.png" width="100px" height="100px"></span><br>
                <span>创建人：{{record.createBy}}</span><br>
                <span>更新人：{{record.updateBy}}</span><br>
              </a-col>
              <a-col :span="12">
                <span>别名：{{record.alias}}</span><br>
                <span>类型图：<img src="http://localhost:8080/jeecg-boot/upFiles/HEV-1_1585927701184.png" width="100px" height="100px"></span><br>
                <span>创建时间：{{record.createTime}}</span><br>
                <span>更新时间：{{record.updateTime}}</span><br>
              </a-col>
            </a-row>
          </a-row>
        </div>
        
        <template slot="imgSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无此图片</span>

          <img v-else :src="getImgView(text)" height="25px" alt="图片不存在" style="max-width:80px;font-size: 12px;font-style: italic;"/>
        </template>
        <template slot="fileSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无此文件</span>
          <a-button
            v-else
            :ghost="true"
            type="primary"
            icon="download"
            size="small"
            @click="uploadFile(text)">
            下载
          </a-button>
        </template>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>

    <car-modal ref="modalForm" @ok="modalFormOk"></car-modal>
  </a-card>
</template>

<script>
  import STable from '@/components/table/'
  import { getAction } from '@/api/manage'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import CarModal from './modules/CarModal'
  import ImagPreview from "@/views/jeecg/ImagPreview";
  import ImgDragSort from "@/views/jeecg/ImgDragSort";
  import ImgTurnPage from "@/views/jeecg/ImgTurnPage";
  
  export default {
    name: "CarList",
    mixins:[JeecgListMixin],
    components: {
      ImgTurnPage,
      ImgDragSort,
      ImagPreview,
      STable,
      CarModal
    },
    data () {
      return {
        description: '车型管理功能数据表管理页面',
        // 表头
        columns: [
          {
            title:'序号',
            align:"left",
            dataIndex: 'serialNumber'
          },
          {
            title:'车名',
            align:"left",
            dataIndex: 'name'
          },
          /*{
            title:'别名',
            align:"left",
            dataIndex: 'alias'
          },*/
          {
            title:'车类型',
            align:"left",
            dataIndex: 'type'
          },
          /*{
            title:'识别码',
            align:"left",
            dataIndex: 'identificationCode'
          },*/
          {
            title:'指导价',
            align:"left",
            dataIndex: 'suggestPrice'
          },
          /*{
            title:'logo图',
            align:"left",
            dataIndex: 'logoImg',
            scopedSlots: {customRender: 'imgSlot'}
          },
          {
            title:'类型图',
            align:"left",
            dataIndex: 'typeImg',
            scopedSlots: {customRender: 'imgSlot'}
          },*/
          {
            title:'链接',
            align:"left",
            dataIndex: 'link'
          },
          {
            title:'是否新品',
            align:"left",
            dataIndex: 'isNew'
          },
          /*{
            title:'创建人',
            align:"left",
            dataIndex: 'createBy'
          },
          {
            title:'创建日期',
            align:"left",
            dataIndex: 'createTime'
          },
          {
            title:'更新人',
            align:"left",
            dataIndex: 'updateBy'
          },
          {
            title:'更新日期',
            align:"left",
            dataIndex: 'updateTime'
          },*/
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
        // 调用后台对应接口
        url: {
          list: "/carManage/car/rootList",
          childList: "/carManage/car/childList",
          delete: "/carManage/car/delete",
          deleteBatch: "/carManage/car/deleteBatch",
          exportXlsUrl: "/carManage/car/exportXls",
          importExcelUrl: "carManage/car/importExcel",
        },
        expandedRowKeys:[],
        hasChildrenField:"hasChild",
        pidField:"pid",
        dictOptions: {}
      }
    },
    computed: {
      importExcelUrl(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      },
      tableProps() {
        let _this = this
        return {
          // 列表项是否可选择
          rowSelection: {
            selectedRowKeys: _this.selectedRowKeys,
            onChange: (selectedRowKeys) => _this.selectedRowKeys = selectedRowKeys
          }
        }
      }
    },
    methods: {
      loadData(arg){
        if(arg==1){
          this.ipagination.current=1
        }
        this.loading = true
        this.expandedRowKeys = []
        let params = this.getQueryParams()
        return new Promise((resolve) => {
          getAction(this.url.list,params).then(res=>{
            if(res.success){
              let result = res.result
              if(Number(result.total)>0){
                this.ipagination.total = Number(result.total)
                this.dataSource = this.getDataByResult(res.result.records)
                resolve()
              }else{
                this.ipagination.total=0
                this.dataSource=[]
              }
            }else{
              this.$message.warning(res.message)
            }
            this.loading = false
          })
        })
      },
      getDataByResult(result){
        return result.map(item=>{
          //判断是否标记了带有子节点
          if(item[this.hasChildrenField]=='1'){
            let loadChild = { id: item.id+'_loadChild', name: 'loading...', isLoading: true }
            item.children = [loadChild]
          }
          return item
        })
      },
      handleExpand(expanded, record){
        // 判断是否是展开状态
        if (expanded) {
          this.expandedRowKeys.push(record.id)
          if (record.children.length>0 && record.children[0].isLoading === true) {
            let params = this.getQueryParams();//查询条件
            params[this.pidField] = record.id
            getAction(this.url.childList,params).then((res)=>{
              if(res.success){
                if(res.result && res.result.length>0){
                  record.children = this.getDataByResult(res.result)
                  this.dataSource = [...this.dataSource]
                }else{
                  record.children=''
                  record.hasChildrenField='0'
                }
              }else{
                this.$message.warning(res.message)
              }
            })
          }
        }else{
          let keyIndex = this.expandedRowKeys.indexOf(record.id)
          if(keyIndex>=0){
            this.expandedRowKeys.splice(keyIndex, 1);
          }
        }
      },
      initDictConfig(){
      },
      modalFormOk(formData,arr){
        if(!formData.id){
          this.addOk(formData,arr)
        }else{
          if(!arr){
            this.loadData()
          }else{
            this.editOk(formData,this.dataSource)
            this.dataSource=[...this.dataSource]
          }
        }
      },
      editOk(formData,arr){
        if(arr && arr.length>0){
          for(let i=0;i<arr.length;i++){
            if(arr[i].id==formData.id){
              arr[i]=formData
              break
            }else{
              this.editOk(formData,arr[i].children)
            }
          }
        }
      },
      async addOk(formData,arr){
        if(!formData[this.pidField]){
          this.loadData()
        }else{
          this.expandedRowKeys=[]
          for(let i of arr){
            await this.expandTreeNode(i)
          }
        }
      },
      expandTreeNode(nodeId){
        return new Promise((resolve,reject)=>{
          this.getFormDataById(nodeId,this.dataSource)
          let row = this.parentFormData
          this.expandedRowKeys.push(nodeId)
          let params = this.getQueryParams();//查询条件
          params[this.pidField] = nodeId
          getAction(this.url.childList,params).then((res)=>{
            if(res.success){
              if(res.result && res.result.length>0){
                row.children = this.getDataByResult(res.result)
                this.dataSource = [...this.dataSource]
                resolve()
              }else{
                reject()
              }
            }else{
              reject()
            }
          })
        })
      },
      getFormDataById(id,arr){
        if(arr && arr.length>0){
          for(let i=0;i<arr.length;i++){
            if(arr[i].id==id){
              this.parentFormData = arr[i]
            }else{
              this.getFormDataById(id,arr[i].children)
            }
          }
        }
      },
      
       
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less';
</style>