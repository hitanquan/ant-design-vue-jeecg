<template>
  <a-card :bordered="false">
    <div>
      <!--采用栅格重新布局，使新建按钮、查询和视图切换控件显示在一行-->
      <a-row>
        <!--新建和批量删除按钮-->
        <a-col :span="12">
          <div class="table-operator">
            <a-button @click="handleAdd" :disabled="isDisabledAuth('car:disable')" icon="plus" type="primary">新建</a-button>

            <a-dropdown v-if="selectedRowKeys.length > 0">
              <a-menu slot="overlay">
                <a-menu-item :disabled="isDisabledAuth('car:disable')" @click="batchDel" key="1">
                  <a-icon type="delete"/>
                  删除
                </a-menu-item>
              </a-menu>
              <a-button style="margin-left: 8px">
                批量操作
                <a-icon type="down"/>
              </a-button>
            </a-dropdown>
          </div>
        </a-col>

        <!--查询、视图切换部分-->
        <a-col :span="12">
          <!-- 查询区域 -->
          <div class="table-page-search-wrapper">
            <a-form @keyup.enter.native="searchQuery" layout="inline">
              <a-row :gutter="1">
                <a-col :md="8" :sm="24">
                  <a-form-item>
                    <a-select :allowClear="true" @change="handleTableChange" placeholder="请选择车型" v-model="queryParam.type">
                      <!--<a-icon slot="suffixIcon" type="caret-down" style="icon: auto"/>-->
                      <a-select-option value="轿车">轿车</a-select-option>
                      <a-select-option value="新能源">新能源</a-select-option>
                      <a-select-option value="SUV/MPV">SUV/MPV</a-select-option>
                      <a-select-option value="油电混合">油电混合</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>

                <a-col :md="8" :sm="24">
                  <a-form-item>
                    <a-input @change="handleTableChange" placeholder="请输入车名称" v-model="queryParam.name"/>
                  </a-form-item>
                </a-col>

                <a-col :md="8" :sm="24">
                  <span class="table-page-search-submitButtons">
                    <a-button @click="searchQuery" icon="search" type="primary">查询</a-button>
                    <!--网格、列表视图切换控件-->
                    <a-button v-on:click="changeView('grid')"  icon="table" style="margin-left: 10px"/>
                    <a-button @click="changeView('list')" icon="bars" id="bars"/>
                  </span>
                </a-col>
              </a-row>
            </a-form>
          </div>
        </a-col>
      </a-row>

    </div>

    <!-- table视图区域-begin -->
    <div class="grid" v-show="showGrid">
      <a-table
        :columns="columns"
        :dataSource="dataSource"
        :expandedRowKeys="expandedRowKeys"
        :loading="loading"
        :pagination="ipagination"
        @change="handleTableChange"
        @expand="handleExpand"
        ref="table"
        rowKey="id"
        size="middle"
        v-bind="tableProps">

        <div
          slot="expandedRowRender"
          slot-scope="record"
          style="margin: 0">
          <a-row>
            <a-col :span="12">
                <span style="color: cornflowerblue; padding-right: 50px">
                  ID
                </span>{{record.id}}<br>
              <span style="color: cornflowerblue; padding-right: 50px">
                  别名
                </span>{{record.alias}}<br>
              <span style="color: cornflowerblue; padding-right: 50px">
                  logo图
                </span><img height="100px"  :src=record.logoImg width="100px"><br>
              <span style="color: cornflowerblue; padding-right: 50px">
                  入库记录
              </span><span v-if="record.createBy !== ''">{{record.createBy}} 于 </span>{{record.createTime}}<br>
            </a-col>

            <a-col :span="12">
                <span style="color: cornflowerblue; padding-right: 50px">
                  标题
                </span>{{record.title}}<br>
              <span style="color: cornflowerblue; padding-right: 50px">
                  识别码
                </span>{{record.identificationCode}}<br>
              <span style="color: cornflowerblue; padding-right: 50px">
                  类型图
                </span><img height="100px"  :src=record.typeImg width="100px"><br>
              <span style="color: cornflowerblue; padding-right: 50px">
                  最近修改信息
              </span>
              <p v-if="record.createBy !== ''">{{record.updateBy}}</p> 于 {{record.updateTime}}<br>
              <!--<p v-else>最近没有修改记录</p>-->
            </a-col>
          </a-row>
        </div>


        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" :disabled="isDisabledAuth('car:disable')"><a-icon type="edit" style="padding-right: 5px"/>编辑</a>
          <a-divider type="vertical"/>
          <a-popconfirm @confirm="() => handleDelete(record.id)" @click="showDeleteConfirm" :disabled="isDisabledAuth('car:disable')" title="确定删除吗?">
            <a><a-icon type="delete" style="padding-right: 5px"/>删除</a>
          </a-popconfirm>
           <!--<a-button @confirm="() => handleDelete(record.id)" @click="showDeleteConfirm" type="delete">-->
               <!--删除-->
           <!--</a-button>-->
        </span>

      </a-table>
    </div>
    <!-- table视图区域-end -->

  <div v-if="showList">
    <!--列表视图区域-begin-->
    <a-list class="table-page-search-wrapper" :dataSource="dataSource"  :pagination="ipagination"  @change="handleTableChange">
      <a-list-item  slot="renderItem"  slot-scope="record" >
        <a-row :gutter="16 + 8 * 10">
          <a-col :span="6">
            <img height="100px"  :src=record.logoImg width="100px"><br>
          </a-col>
          <a-col :span="6">
            <img height="100px"  :src=record.typeImg width="100px"><br>
          </a-col>
          <a-col :span="6">
            <span>官方指导价</span><br> <span style="color: #990055; font-weight: bold; font-size: large" >{{record.suggestPrice}}</span><br> 元起
          </a-col>
          <a-col :span="6">
              <a-button>查看车型</a-button>
              <a-button>咨询底价</a-button>
          </a-col>
        </a-row>
      </a-list-item>
    </a-list>

    <!--列表视图区域-end-->
  </div>

    <car-modal @ok="modalFormOk" ref="modalForm"></car-modal>
  </a-card>
</template>

<script>
  import STable from '@/components/table/';
  import {getAction} from '@/api/manage';
  // 这个文件是拷贝的JeecgListMixin，试图做些修改，但是引入不了
  // import {MyJeecgListMixin} from '@/mixins/MyJeecgListMixin';
  import {JeecgListMixin} from '@/mixins/JeecgListMixin';
  import CarModal from './modules/CarModal';
  import ImagPreview from "@/views/jeecg/ImagPreview";
  // 单列数据权限过滤器
  import { colAuthFilter } from "@/utils/authFilter";
  // 页面控件禁用依赖
  import {DisabledAuthFilterMixin} from '@/mixins/DisabledAuthFilterMixin';
  import ARow from "ant-design-vue/es/grid/Row";
  import ACol from "ant-design-vue/es/grid/Col";

  const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];

  export default {
    name: "CarList2",
    mixins: [JeecgListMixin,DisabledAuthFilterMixin],
    components: {
      ACol,
      ARow,
      ImagPreview,
      STable,
      CarModal
    },
    data() {
      return {
        description: '车型管理数据操作页面',
        picUrl: false,
        showGrid: true,
        showList: false,
        data,
        // 表头
        columns: [
          {
            title: '序号',
            align: "left",
            dataIndex: 'serialNumber'
          },
          {
            title: '名称',
            align: "left",
            dataIndex: 'name'
          },
          {
            title: '类型',
            align: "right",
            key: 'type',
            dataIndex: 'type',
            // 默认排序方式
            // defaultSortOrder: 'descend',
            sorter: true
          },
          {
            title: '指导价',
            align: "right",
            key: 'suggestPrice',
            dataIndex: 'suggestPrice',
            sorter: true
          },
          {
            title: '入库时间',
            align: "right",
            key: 'createTime',
            dataIndex: 'createTime',
            sorter: true
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: {customRender: 'action'},
          }
        ],
        // 调用后台对应接口
        url: {
          list: "/carManage/car/rootList",
          childList: "/carManage/car/childList",
          delete: "/carManage/car/delete",
          deleteBatch: "/carManage/car/deleteBatch",
        },
        // 点击“+”和“-”控件拓展显示数据
        expandedRowKeys: [],
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

      changeView(view) {
        console.log("视图切换------id：", view)
        if (view == "grid") {
          this.showGrid = true;
          this.showList = false;
        }else if (view == "list") {
          this.showList = true;
          this.showGrid = false;
        }
      },

      created() {
        this.disableMixinCreated=true;
        this.columns = colAuthFilter(this.columns,'testdemo:name');
        this.loadData();
        this.initDictConfig();
      },

      // 删除确认框
      showDeleteConfirm() {
        this.$confirm({
          title: 'Are you sure delete this task?',
          content: 'Some descriptions',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            console.log('OK');
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      },

      handleTableChange(pagination, filters, sorter, value) {
        console.log("pagination", pagination);
        console.log("filters", filters);
        console.log("sorter", sorter);
        // {currentDataSource}
        // console.log("currentDataSource", currentDataSource);
        this.loadData(pagination.current, sorter, value);
      },
      // args 是当前页码数
      loadData(args, sorter, value) {
        console.log("args：", args);
        if (undefined !== args) {
          this.ipagination.current = args
        }
        this.loading = true;
        this.expandedRowKeys = [];
        // 获取查询参数，
        let params = this.getQueryParams();
        if (null != sorter) {
          params.sorterName = sorter.field;
          params.sorterRule = sorter.order;
        }
        return new Promise((resolve) => {
          console.log("params:", params);
          getAction(this.url.list, params).then(res => {
            console.log("res:", res);
            if (res.success) {
              let result = res.result;
              if (Number(result.total) > 0) {
                this.ipagination.total = Number(result.total);
                this.dataSource = this.getDataByResult(res.result.records);
                resolve()
              } else {
                this.ipagination.total = 0;
                this.dataSource = []
              }
            } else {
              this.$message.warning(res.message)
            }
            this.loading = false
          })
        })
      },
      getDataByResult(result) {
        return result.map(item => {
          //判断是否标记了带有子节点
          if (item[this.hasChildrenField] == '1') {
            let loadChild = {id: item.id + '_loadChild', name: 'loading...', isLoading: true}
            item.children = [loadChild]
          }
          return item
        })
      },
      handleExpand(expanded, record) {
        // 判断是否是展开状态
        if (expanded) {
          this.expandedRowKeys.push(record.id)
          if (record.children.length > 0 && record.children[0].isLoading === true) {
            let params = this.getQueryParams();//查询条件
            params[this.pidField] = record.id
            getAction(this.url.childList, params).then((res) => {
              if (res.success) {
                if (res.result && res.result.length > 0) {
                  record.children = this.getDataByResult(res.result)
                  this.dataSource = [...this.dataSource]
                } else {
                  record.children = ''
                  record.hasChildrenField = '0'
                }
              } else {
                this.$message.warning(res.message)
              }
            })
          }
        } else {
          let keyIndex = this.expandedRowKeys.indexOf(record.id)
          if (keyIndex >= 0) {
            this.expandedRowKeys.splice(keyIndex, 1);
          }
        }
      },
      initDictConfig() {
      },
      modalFormOk(formData, arr) {
        if (!formData.id) {
          this.addOk(formData, arr)
        } else {
          if (!arr) {
            this.loadData()
          } else {
            this.editOk(formData, this.dataSource)
            this.dataSource = [...this.dataSource]
          }
        }
      },
      editOk(formData, arr) {
        if (arr && arr.length > 0) {
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].id == formData.id) {
              arr[i] = formData
              break
            } else {
              this.editOk(formData, arr[i].children)
            }
          }
        }
      },
      async addOk(formData, arr) {
        if (!formData[this.pidField]) {
          this.loadData()
        } else {
          this.expandedRowKeys = []
          for (let i of arr) {
            await this.expandTreeNode(i)
          }
        }
      },
      expandTreeNode(nodeId) {
        return new Promise((resolve, reject) => {
          this.getFormDataById(nodeId, this.dataSource)
          let row = this.parentFormData
          this.expandedRowKeys.push(nodeId)
          let params = this.getQueryParams();//查询条件
          params[this.pidField] = nodeId
          getAction(this.url.childList, params).then((res) => {
            if (res.success) {
              if (res.result && res.result.length > 0) {
                row.children = this.getDataByResult(res.result)
                this.dataSource = [...this.dataSource]
                resolve()
              } else {
                reject()
              }
            } else {
              reject()
            }
          })
        })
      },
      getFormDataById(id, arr) {
        if (arr && arr.length > 0) {
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].id == id) {
              this.parentFormData = arr[i]
            } else {
              this.getFormDataById(id, arr[i].children)
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