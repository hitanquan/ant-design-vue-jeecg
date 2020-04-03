<!--
<template>
  <a-card :bordered="false">
    
    &lt;!&ndash; 操作按钮区域 &ndash;&gt;
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('车型管理数据表')">导出</a-button>
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

    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="请选择车型">
              <a-select placeholder="请选择" default-value="0">
                <a-select-option value="0">轿车</a-select-option>
                <a-select-option value="1">新能源</a-select-option>
                <a-select-option value="2">SUV/MPV</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="">
              <a-input placeholder="请输入车型名称"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary">查询</a-button>
              <a-button style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    &lt;!&ndash; table区域-begin &ndash;&gt;
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
        :data="loadData"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :expandedRowKeys="expandedRowKeys"
        @change="handleTableChange"
        @expand="handleExpand"
        v-bind="tableProps">

        &lt;!&ndash;收缩、展开效果及数据显示&ndash;&gt;
        <div
          slot="expandedRowRender"
          slot-scope="record"
          style="margin: 0">
          <a-row
            :gutter="24"
            :style="{ marginBottom: '12px' }">
            <a-col >
              <a-col : span="4">
                <span>别名：{{car.alias}}</span><br>
                <span>logo图：{{car.logoImg}}</span><br>
                <span>指导价：{{car.alias}}</span><br>
                <span>类型图：{{car.typeImg}}</span>
              </a-col>

              <span>别名：{{car.alias}}</span><br>
              <span>logo图：{{car.logoImg}}</span><br>
              <span>指导价：{{car.alias}}</span><br>
              <span>类型图：{{car.typeImg}}</span>
            </a-col>

            &lt;!&ndash; <a-col>
               <span>指导价：{{record.alias}}</span><br>
               <span>类型图：{{record.typeImg}}</span>
             </a-col>&ndash;&gt;
          </a-row>

          &lt;!&ndash;<a-row align="right"
            :gutter="24"
            :style="{ marginBottom: '12px' }">
            <a-col>
              <span>别名：{{record.alias}}</span>
              <span>识别码：{{record.identificationCode}}</span>
            </a-col>

            <a-col>
              <span>别名：{{record.alias}}</span>
              <span>识别码：{{record.identificationCode}}</span>
            </a-col>
          </a-row>&ndash;&gt;
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
  import ARow from "ant-design-vue/es/grid/Row";
  import ACol from "ant-design-vue/es/grid/Col";
  import {filterMultiDictText} from '@/components/dict/JDictSelectUtil'
  
  export default {
    name: "CarList",
    mixins:[JeecgListMixin],
    components: {
      ACol,
      ARow,
      STable,
      CarModal
    },
    data () {
      return {
        description: '车型管理数据表管理页面',
        // 表头
        columns: [
          {
            title:'序号',
            align:"left",
            dataIndex: 'serialNumber'
          },
          {
            title:'名称',
            align:"left",
            dataIndex: 'name'
          },
          /*{
            title:'别名',
            align:"left",
            dataIndex: 'alias'
          },*/
          {
            title:'类型',
            align:"left",
            dataIndex: 'type'
          },
          /*{
            title:'识别码',
            align:"left",
            dataIndex: 'identificationCode'
          },*/
         /* {
            title:'指导价',
            align:"left",
            dataIndex: 'suggestPrice'
          },*/
          /*{
            title:'logo图',
            align:"left",
            dataIndex: 'logoImg'
          },*/
         /* {
            title:'类型图',
            align:"left",
            dataIndex: 'typeImg'
          },*/
         /* {
            title:'链接',
            align:"left",
            dataIndex: 'link'
          },*/
          {
            title:'是否新品',
            align:"left",
            dataIndex: 'isNew'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
        // 加载数据方法 必须为 Promise 对象
        /*loadData: parameter => {
          return this.$http.get('/api/car', {
            params: Object.assign(parameter, this.queryParam)
          }).then(res => {
            return res.result
          })
        },*/
        url: {
          list: "/car/rootList",
          childList: "/car/childList",
          delete: "/car/delete",
          deleteBatch: "/car/deleteBatch",
          exportXlsUrl: "/car/exportXls",
          importExcelUrl: "/car/importExcel",
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
-->
