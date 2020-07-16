<template>
  <!-- 卡片 start -->
  <a-card title="申请待办列表" style="width: 100%" :bordered="false">
    <!-- 查询区域 start-->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :md="6" :sm="12">
            <a-form-item label="地区">
              <a-tree-select
                v-model="value"
                show-search
                style="width: 100%"
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                placeholder="请选择地区模糊查询"
                allow-clear
                tree-default-expand-all
              >
                <a-tree-select-node key="0-1" value="parent 1" title="parent 1">
                  <a-tree-select-node key="0-1-1" value="parent 1-0" title="parent 1-0">
                    <a-tree-select-node key="random" :selectable="false" value="leaf1" title="my leaf" />
                    <a-tree-select-node key="random1" value="leaf2" title="your leaf" />
                  </a-tree-select-node>
                  <a-tree-select-node key="random2" value="parent 1-1" title="parent 1-1">
                    <a-tree-select-node key="random3" value="sss">
                      <b slot="title" style="color: #08c">sss</b>
                    </a-tree-select-node>
                  </a-tree-select-node>
                </a-tree-select-node>
              </a-tree-select>
              <!--<j-input placeholder="输入地区模糊查询" v-model="queryParam.username"></j-input>-->
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="姓名">
              <a-input placeholder="请输入真实名字" v-model="queryParam.realname"></a-input>
            </a-form-item>
          </a-col>

          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item label="身份证号码">
                <a-input placeholder="请输入身份证号码查询" v-model="queryParam.phone"></a-input>
              </a-form-item>
            </a-col>

            <a-col :md="6" :sm="8">
              <a-form-item label="申请日期">
                <a-range-picker/>
              </a-form-item>
            </a-col>

            <a-col :md="6" :sm="8">
              <a-form-item label="办理状态">
                <a-select v-model="queryParam.status" placeholder="请选择">
                  <a-select-option value="">请选择</a-select-option>
                  <a-select-option value="1">正常</a-select-option>
                  <a-select-option value="2">冻结</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </template>

          <a-col :md="6" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>
    <!-- 查询区域-end -->

    <!-- 操作按钮区域 start -->
    <div>
      <a-row>
        <a-col :span="12">
          <a-button  @click="handleAdd" icon="plus" style="margin-bottom: 16px" type="primary">
            录入申请
          </a-button>

          <a-dropdown v-if="selectedRowKeys.length > 0">
            <a-menu slot="overlay">
              <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
            </a-menu>
            <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
          </a-dropdown>
        </a-col>
      </a-row>
    </div>
    <!-- 操作按钮区域 end -->

    <!-- 表格数据区域 start -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        rowKey="id"
        v-bind="tableProps">

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
            <a>删除</a>
          </a-popconfirm>
        </span>

      </a-table>
    </div>
    <!-- 表格数据区域 end -->
  </a-card>
  <!-- 卡片 end -->

</template>
i
<script>
  import { getAction } from '@/api/manage'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import JInput from '@/components/jeecg/JInput'

  export default {
    name: "apply",
    mixins:[JeecgListMixin],
    components: {
      JInput
    },
    data () {
      return {
        treeExpandedKeys: [],
        value: undefined,
        description: '低保申请页面',
        // 表头
        columns: [
          {
            title:'街道',
            dataIndex: 'street'
          },
          {
            title:'社区',
            dataIndex: 'community'
          },
          {
            title:'姓名',
            dataIndex: 'name'
          },
          {
            title:'身份证号码',
            dataIndex: 'idCardNo'
          },
          {
            title:'家庭人口数',
            dataIndex: 'populace'
          },
          {
            title:'申请日期',
            dataIndex: 'createTime'
          },
          {
            title:'办理时限',
            dataIndex: 'limitTime'
          },
          {
            title:'办理状态',
            dataIndex: 'status'
          },
          {
            title:'救助金',
            dataIndex: 'salvageMoney'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
        url: {
          list: "/help/apply/rootList",
          childList: "/help/apply/childList",
          delete: "/help/apply/delete",
          deleteBatch: "/help/apply/deleteBatch",
          exportXlsUrl: "/help/apply/exportXls",
          importExcelUrl: "/help/apply/importExcel",
        },
        expandedRowKeys:[],
        hasChildrenField:"hasChild",
        pidField:"pid",
        dictOptions:{
        }
      }
    },
    computed: {
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
      loadData(arg) {
        if(arg === 1) {
          this.ipagination.current = 1
        }
        this.loading = true
        let params = this.getQueryParams()
        return new Promise((resolve) => {
          getAction(this.url.list, params).then(res=>{
            if(res.success) {
              let result = res.result
              if(Number(result.total) > 0) {
                this.ipagination.total = Number(result.total)
                this.dataSource = this.getDataByResult(res.result.records)
                resolve()
              }else {
                this.ipagination.total=0
                this.dataSource=[]
              }
            }else {
              this.$message.warning(res.message)
            }
            this.loading = false
          })
        })
      },
      getDataByResult(result) {
        return result.map(item=>{
          //判断是否标记了带有子节点
          if(item[this.hasChildrenField]=='1'){
            let loadChild = { id: item.id+'_loadChild', name: 'loading...', isLoading: true }
            item.children = [loadChild]
          }
          return item
        })
      },
    }
  }
</script>

<style scoped>

</style>