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
                <a-col :md="16" :sm="24">
                  <a-form-item>
                    <a-input-group compact>
                      <a-select style="width: 40%" :allowClear="true" @change="handleTableChange" placeholder="请选择车型" v-model="queryParam.type">
                        <!--<a-icon slot="suffixIcon" type="caret-down" style="icon: auto"/>-->
                        <a-select-option value="轿车">轿车</a-select-option>
                        <a-select-option value="新能源">新能源</a-select-option>
                        <a-select-option value="SUV/MPV">SUV/MPV</a-select-option>
                        <a-select-option value="油电混合">油电混合</a-select-option>
                      </a-select>
                      <a-input  style="width: 60%" @change="handleTableChange" placeholder="请输入车名称" v-model="queryParam.name"/>
                    </a-input-group>
                  </a-form-item>
                </a-col>

                <a-col :md="8" :sm="24">
                  <span class="table-page-search-submitButtons">
                    <a-button @click="searchQuery" icon="search" type="primary">查询</a-button>
                    <!--网格、列表视图切换控件-->
                    <a-button-group>
                    <a-button v-on:click="changeView('grid')" :type="layoutName === 'grid'?'primary':''" icon="table" style="margin-left: 10px"/>
                    <a-button @click="changeView('list')" :type="layoutName === 'list'?'primary':''" icon="bars" id="bars"/>
                    </a-button-group>
                  </span>
                </a-col>
              </a-row>
            </a-form>
          </div>
        </a-col>
      </a-row>

    </div>

    <!-- table视图区域-begin -->
    <div v-if="layoutName === 'grid'">
      <a-table
        :columns="columns"
        :dataSource="dataSource"
        :expandedRowKeys="expandedRowKeys"
        :loading="loading"
        :pagination="false"
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
                <span style="color: #779ecb; padding-right: 50px">
                  ID
                </span>{{record.id}}<br>
              <span style="color: #779ecb; padding-right: 50px">
                  别名
                </span>{{record.alias}}<br>
              <span style="color: #779ecb; padding-right: 50px">
                  logo图
                </span><img height="70px"  :src=record.logoImg width="100px"><br>
              <span style="color: #779ecb; padding-right: 50px">
                  入库记录
              </span>{{record.storageRecord}}
            </a-col>

            <a-col :span="12">
                <span style="color: #779ecb; padding-right: 50px">
                  标题
                </span>{{record.title}}<br>
              <span style="color: #779ecb; padding-right: 50px">
                  识别码
                </span>{{record.identificationCode}}<br>
              <span style="color: #779ecb; padding-right: 50px">
                  车型图
                </span><img height="70px"  :src=record.typeImg width="100px"><br>
              <span style="color: #779ecb; padding-right: 50px">
                  最近修改信息
              </span>{{record.updateRecord}}
            </a-col>
          </a-row>
        </div>

        <div slot="action" slot-scope="text, record">
          <span @click="handleEdit(record)" :disabled="isDisabledAuth('car:disable')"><a-icon type="edit" style="padding-right: 5px"/>编辑</span>
          <a-divider type="vertical"/>
          <!--<a-popconfirm @confirm="() => handleDelete(record.id)" @click="showDeleteConfirm" :disabled="isDisabledAuth('car:disable')" title="确定删除吗?">
            <a><a-icon type="delete" style="padding-right: 5px" @click="showDeleteConfirm" />删除</a>
          </a-popconfirm>-->

          <!-- <span :disabled="isDisabledAuth('car:disable')" @click="showDeleteConfirm(record.id)">
               <a-icon type="delete" style="padding-right: 5px" />删除
           </span>-->

          <span type="primary" @click="showModal"><span type="delete" style="padding-right: 5px"/>
            <a-button @click="showDeleteConfirm(record.id)" hidden="hidden">Confirm</a-button>删除
          </span>
          <a-modal title="删除确认" v-model="visible" @ok="hideModal" okText="确认" cancelText="取消">
              <p>此操作将永久删除该车型(<span style="color: red">{{record.name}}</span>),是否继续?</p>
          </a-modal>
        </div>
      </a-table>
    </div>
    <!-- table视图区域-end -->

  <div v-if="layoutName === 'list'"  @change="handleTableChange">
    <!--列表视图区域-begin-->
    <a-list class="table-page-search-wrapper" :dataSource="dataSource"  >
      <a-list-item  slot="renderItem"  slot-scope="record">
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
              <a-button :labelCol="{span: 4, offset: 2}">查看车型</a-button>
              <a-button>咨询底价</a-button>
          </a-col>
        </a-row>
      </a-list-item>
    </a-list>
    <!--列表视图区域-end-->
  </div>
    <div style="padding-top: 15px; float: right">
    <a-pagination :showQuickJumper="true" :showSizeChanger="true" :defaultCurrent="1" :total="ipagination.total" :showTotal="total => `共 ${total} 条`" :defaultPageSize="10" :pageSizeOptions="['10', '20', '30', '40']" @showSizeChange="onPageSizeChange" @change="onPageChange" />
    </div>
    <car-modal @ok="modalFormOk" ref="modalForm"></car-modal>
  </a-card>
</template>

<script>
  import STable from '@/components/table/';
  import {deleteAction, getAction} from '@/api/manage';
  import {JeecgListMixin} from '@/mixins/JeecgListMixin';
  import CarModal from './modules/CarModal';
  import ImagPreview from "@/views/jeecg/ImagPreview";
  // 单列数据权限过滤器
  import { colAuthFilter } from "@/utils/authFilter";
  // 页面控件禁用依赖
  import {DisabledAuthFilterMixin} from '@/mixins/DisabledAuthFilterMixin';
  import ARow from "ant-design-vue/es/grid/Row";
  import ACol from "ant-design-vue/es/grid/Col";

  export default {
    name: "CarList",
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
        layoutName: 'grid',
        showGrid: true,
        showList: false,
        sorter2: {},
        pageSize: 10,
        size: 10,
        visible: false,
        /* 分页参数 */
       /* ipagination:{
          current: 1,
          pageSize: 10,
          pageSizeOptions: ['10', '20', '30'],
          showTotal: (total, range) => {
            return range[0] + "-" + range[1] + " 共" + total + "条"
          },
          showQuickJumper: true,
          showSizeChanger: true,
          total: 0
        },*/
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
      // 数据条数变化后的回调
      onPageSizeChange(page, pageSize){
        this.loadData(page, pageSize)
      },

      // 页码变化后的回调
      onPageChange(current, size) {
        console.log("current:",current)
        console.log("size:",size)
        this.loadData(current, size)
      },

      changeView(view) {
        console.log("视图切换------id：", view)
        this.layoutName = view
        // if (view == "grid") {
        //   this.showGrid = true;
        //   this.showList = false;
        // }else if (view == "list") {
        //   this.showList = true;
        //   this.showGrid = false;
        // }
      },

      /*created() {
        this.disableMixinCreated=true;
        this.columns = colAuthFilter(this.columns,'testdemo:name');
        this.loadData();
        this.initDictConfig();
      },*/

      // 分页、筛选、排序
      handleTableChange(pagination, filters, sorter) {
        console.log("pagination", pagination);
        console.log("filters", filters);
        console.log("sorter", sorter);
        this.sorter2 = sorter
        // {currentDataSource}
        // console.log("currentDataSource", currentDataSource);
        this.loadData(pagination.current, pagination.pageSize);
      },

      handleListChange(pagination) {
        console.log("pagination", pagination);
        this.loadData(pagination.current);
      },

      // 加载数据
      // args 是通用参数，传入什么就代表什么
      loadData(args, size) {
        console.log("args：", args);
        console.log("size：", size);
        if (undefined !== args) {
          this.ipagination.current = args
        }
        if (undefined !== size) {
          this.ipagination.pageSize = size
        }
        this.loading = true;
        this.expandedRowKeys = [];
        // 获取查询参数，
        let params = this.getQueryParams();
        if (null != this.sorter2) {
          params.sorterName = this.sorter2.field;
          params.sorterRule = this.sorter2.order;
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

      handleAdd: function () {
        this.$refs.modalForm.add();
        this.$refs.modalForm.title = "新建车型";
        this.$refs.modalForm.disableSubmit = false;
        // 新增一条数据后应该重新加载页面数据
        this.loadData();
      },

      handleEdit: function (record) {
        this.$refs.modalForm.edit(record);
        this.$refs.modalForm.title = "编辑车型";
        this.$refs.modalForm.disableSubmit = false;
      },


      showModal() {
        this.visible = true;
       /* console.log("id:", id)
        let that =this;
        /!*this.$confirm({
          title: '此操作将永久删除该车型是否继续?',
          content: 'gggggggg',
          centered : true,
          okType: 'danger',
          icon: 'question-circle',
          okText: '确定',
          cancelText: '取消',
          onOk() {*!/
            deleteAction(that.url.delete, {id: id}).then((res) => {
              console.log('OK');
              if (res.success) {
                that.$message.success(res.message);
                that.loadData();
              } else {
                that.$message.warning(res.message);
              }
            });
         /!* },
          onCancel() {
            console.log('Cancel');
          }*!/
       // });*/
      },

      hideModal() {
        this.visible = false;
      },

      confirm() {
        this.$confirm({
          title: '删除确认',
          content: '此操作将永久删除该车型是否继续?',
          okText: '确认',
          cancelText: '取消',
        });
      },

      // 删除确认框
      showDeleteConfirm(id) {
        console.log("id:", id)
        let that = this;
        this.$confirm({
          title: '此操作将永久删除该车型是否继续?',
          content: 'gggggggg',
          centered : true,
          okType: 'danger',
          icon: 'question-circle',
          okText: '确定',
          cancelText: '取消',
          onOk() {
            deleteAction(that.url.delete, {id: id}).then((res) => {
              console.log('OK');
              if (res.success) {
                that.$message.success(res.message);
                that.loadData();
              } else {
                that.$message.warning(res.message);
              }
            });
          },
          onCancel() {
            console.log('Cancel');
          },
        });
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