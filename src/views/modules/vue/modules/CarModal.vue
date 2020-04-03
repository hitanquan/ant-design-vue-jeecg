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
      <a-form :form="form">

        <a-form-item label="序号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'serialNumber', validatorRules.serialNumber]" placeholder="请输入序号" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'name', validatorRules.name]" placeholder="请输入名称"></a-input>
        </a-form-item>
        <a-form-item label="别名" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'alias', validatorRules.alias]" placeholder="请输入别名"></a-input>
        </a-form-item>
        <a-form-item label="类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'type', validatorRules.type]" placeholder="请输入类型"></a-input>
        </a-form-item>
        <a-form-item label="识别码" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'identificationCode', validatorRules.identificationCode]" placeholder="请输入识别码"></a-input>
        </a-form-item>
        <a-form-item label="指导价" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'suggestPrice', validatorRules.suggestPrice]" placeholder="请输入指导价" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="logo图" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'logoImg', validatorRules.logoImg]" placeholder="请输入logo图"></a-input>
        </a-form-item>
        <a-form-item label="类型图" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'typeImg', validatorRules.typeImg]" placeholder="请输入类型图"></a-input>
        </a-form-item>
        <a-form-item label="链接" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'link', validatorRules.link]" placeholder="请输入链接"></a-input>
        </a-form-item>
        <a-form-item label="是否新品" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'isNew', validatorRules.isNew]" placeholder="请输入是否新品" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="父级节点" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-tree-select
            ref="treeSelect"
            placeholder="请选择父级节点"
            v-decorator="['pid', validatorRules.pid]"
            dict="test_car2,tree,id"
            pidField="pid"
            pidValue="0"
            hasChildField="has_child">
          </j-tree-select>
        </a-form-item>
        
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'
  import JTreeSelect from '@/components/jeecg/JTreeSelect'
  
  export default {
    name: "CarModal",
    components: { 
      JTreeSelect
    },
    data () {
      return {
        form: this.$form.createForm(this),
        title:"操作",
        width:800,
        visible: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },

        confirmLoading: false,
        validatorRules: {
          serialNumber: {rules: [
          ]},
          name: {rules: [
          ]},
          alias: {rules: [
          ]},
          type: {rules: [
          ]},
          identificationCode: {rules: [
          ]},
          suggestPrice: {rules: [
          ]},
          logoImg: {rules: [
          ]},
          typeImg: {rules: [
          ]},
          link: {rules: [
          ]},
          isNew: {rules: [
          ]},
          pid: {rules: [
          ]},
        },
        url: {
          add: "/car/add",
          edit: "/car/edit",
        },
        expandedRowKeys:[],
        pidField:"pid"
     
      }
    },
    created () {
    },
    methods: {
      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'serialNumber','name','alias','type','identificationCode','suggestPrice','logoImg','typeImg','link','isNew','pid'))
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
            let old_pid = this.model[this.pidField]
            let formData = Object.assign(this.model, values);
            let new_pid = this.model[this.pidField]
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
        this.form.setFieldsValue(pick(row,'serialNumber','name','alias','type','identificationCode','suggestPrice','logoImg','typeImg','link','isNew','pid'))
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
            }else{
              this.getExpandKeysByPid(pid,arr[i].children,all)
            }
          }
        }
      }
      
      
    }
  }
</script>