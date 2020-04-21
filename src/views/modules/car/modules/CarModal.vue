<template>
  <a-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    :destroyOnClose="true"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form" :layout="formLayout">
        <!--新增数据页表单-->
        <a-row span="24">
          <a-col>
          <a-form-item label="名称" :labelCol="{span: 2, offset: 1}" :wrapperCol="wrapperCol">
            <a-input v-decorator="[ 'name', validatorRules.name]" placeholder="请输入车型名" style="width: 125%; height: 35px"/>
          </a-form-item>
          </a-col>
        </a-row>

       <a-row span="24">
          <a-col :span="12">
            <a-form-item label="别名"  :labelCol="{span: 4, offset: 2}" :wrapperCol="wrapperCol">
              <a-input v-decorator="[ 'alias', validatorRules.alias]"  placeholder="请输入别名" style="height: 35px"/>
            </a-form-item>
          </a-col>

         <a-col :span="12">
           <a-form-item label="识别码" :labelCol="{span: 4, offset: 2}" :wrapperCol="wrapperCol">
             <a-input v-decorator="[ 'identificationCode', validatorRules.identificationCode]"  placeholder="请输入识别码" style="height: 35px"/>
           </a-form-item>
         </a-col>
       </a-row>

        <a-row span="24">
          <a-col :span="12">
            <a-form-item label="指导价" :labelCol="{span: 4, offset: 2}" :wrapperCol="wrapperCol">
              <a-input v-decorator="[ 'suggestPrice', validatorRules.suggestPrice]" placeholder="请输入指导价" style="height: 35px"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="类型" :labelCol="{span: 4, offset: 2}" :wrapperCol="wrapperCol">
              <a-select placeholder="请选择车型" v-decorator="[ 'type', validatorRules.type]" default-value="0">
                <a-select-option value="轿车">轿车</a-select-option>
                <a-select-option value="新能源">新能源</a-select-option>
                <a-select-option value="SUV/MPV">SUV/MPV</a-select-option>
                <a-select-option value="油电混合">油电混合</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-item label="logo图" :labelCol="{span: 4, offset: 2}" :wrapperCol="wrapperCol">
              <j-image-upload  v-decorator="['logoImg', validatorRules.logoImg]" :trigger-change="true" style="margin-left: 30px"></j-image-upload>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="类型图" :labelCol="{span: 4, offset: 2}" :wrapperCol="wrapperCol">
              <j-image-upload v-decorator="['typeImg', validatorRules.typeImg]" :trigger-change="true" style="margin-left: 30px"></j-image-upload>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :span="24">
          <a-col>
            <a-form-item label="链接" :labelCol="{span: 2, offset: 1}" :wrapperCol="wrapperCol">
              <a-input v-decorator="[ 'link', validatorRules.link]" placeholder="请输入链接" style="width: 125%; height: 35px"></a-input>
            </a-form-item>
            </a-col>
        </a-row>

        <a-form-item label="是否新品" :labelCol="{span: 2, offset: 1}" :wrapperCol="wrapperCol">
          <!--<a-checkbox value="1" v-decorator="['isNew', validatorRules.isNew]" defaultChecked @change="onChange" style="margin-left: 5px"/>-->
          <a-switch v-decorator="['isNew', validatorRules.isNew]" defaultChecked @change="onChange" checkedChildren="是"  unCheckedChildren="否" style="margin-left: 5px"/>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import { validate} from '@/utils/util'
  import JDate from '@/components/jeecg/JDate'
  import JUpload from '@/components/jeecg/JUpload'
  import JImageUpload from '@/components/jeecg/JImageUpload'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  import ARow from "ant-design-vue/es/grid/Row";
  import ACol from "ant-design-vue/es/grid/Col";

  export default {
    name: "CarModal",
    components: {
      ACol,
      ARow,
      JDate,
      JImageUpload,
      //JUpload,
      JTreeSelect
    },
    data () {
      return {
        form: this.$form.createForm(this),
        title:"操作",
        width:800,
        visible:false,
        model: {},
        formLayout: 'horizontal',
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },

        confirmLoading: false,
        // 表单数据检验
        validatorRules: {
          serialNumber: {rules: [
          ]},
          name: {rules: [
            {required: true, message: '请输入车名!'},
          ]},
          alias: {rules: [
            {required: true, message: '请输入别名!'},
          ]},
          type: {rules: [
            {required: true, message: '请输入车类型!'},
          ]},
          identificationCode: {rules: [
            {required: true, message: '请输入识别码!'},
           {pattern:/^.{6,16}$/, message: '请输入6到16位任意字符!'},
          ]},
          suggestPrice: {rules: [
            {required: true, message: '请输入指导价!'},
           {pattern:/^-?\d+\.?\d*$/, message: '请输入数字!'},
          ]},
          logoImg: {rules: [
          ]},
          typeImg: {rules: [
          ]},
          link: {rules: [
            {pattern:/^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/, message: '请输入正确的网址!'},
          ]},
          isNew: {rules: [
          ]},
          createBy: {rules: [
          ]},
          createTime: {rules: [
          ]},
          updateBy: {rules: [
          ]},
          updateTime: {rules: [
          ]},
        },
        url: {
          add: "/carManage/car/add",
          edit: "/carManage/car/edit",
        },
        expandedRowKeys:[],
        pidField:"pid"

      }
    },

    computed: {
      formItemLayout() {
        const { formLayout } = this;
        return formLayout === 'horizontal'
          ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          }
          : {};
      },
      buttonItemLayout() {
        const { formLayout } = this;
        return formLayout === 'horizontal'
          ? {
            wrapperCol: { span: 14, offset: 4 },
          }
          : {};
      },
    },

    methods: {

      handleFormLayoutChange(e) {
        this.formLayout = e.target.value;
      },

      onChange(checked) {
        console.log(`a-switch to ${checked}`);
        // TODO 是否新品传值逻辑
        this.loadData();
      },

      add () {
        this.edit({});
      },

      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'name','alias','type','identificationCode','suggestPrice','logoImg','typeImg','link','isNew'))
        })
      },

      close () {
        this.$emit('close');
        this.visible = false;
      },

      handleOk () {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if(!this.model.id){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            // let old_pid = this.model[this.pidField]
            let formData = Object.assign(this.model, values);
            // let new_pid = this.model[this.pidField]
            console.log("表单提交数据",formData)
            httpAction(httpurl,formData,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.submitSuccess(formData,old_pid==new_pid)
              }else{
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
              that.close();
            })
          }
        })
      },

      handleCancel () {
        this.close()
      },

      popupCallback(row){
        this.form.setFieldsValue(pick(row,'serialNumber','name','alias','type','identificationCode','suggestPrice','logoImg','typeImg','link','isNew','createBy','createTime','updateBy','updateTime','pid'))
      },

      submitSuccess(formData,flag){
        if(!formData.id){
          let treeData = this.$refs.treeSelect.getCurrTreeData()
          this.expandedRowKeys=[]
          this.getExpandKeysByPid(formData[this.pidField],treeData,treeData)
          this.$emit('ok',formData,this.expandedRowKeys.reverse());
        }else{
          this.$emit('ok',formData,flag);
        }
      },

      getExpandKeysByPid(pid,arr,all){
        if(pid && arr && arr.length>0){
          for(let i=0;i<arr.length;i++){
            if(arr[i].key==pid){
              this.expandedRowKeys.push(arr[i].key)
              this.getExpandKeysByPid(arr[i]['parentId'],all,all)
              this.getExpandKeysByPid(arr[i]['parentId'],all,all)
            }else{
              this.getExpandKeysByPid(pid,arr[i].children,all)
            }
          }
        }
      }
    }
  }
</script>