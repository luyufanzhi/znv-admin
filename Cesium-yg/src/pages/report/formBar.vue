<template>
  <div class="form_box">
    <div style="margin-top:2.2vh" class="pr">
      <!-- <btn-group></btn-group> -->
      <search :data="search" :model="ser_model" @search="handleSearch()"></search>
      <con class="por ilt cp">
        <con class="ilm">
          <img-icon type="newReport" :w="19" :h="20" class="ilm" m="0 8 0 0"></img-icon>
          <txt class="ilm">新建报告</txt>
        </con>
        <con class="ilm" m="0 0 0 10">
          <img-icon type="export" :w="28" :h="28" class="ilm"></img-icon>
          <txt class="ilm">导出</txt>
        </con>
      </con>
    </div>
    <base-table
      class="mt20"
      :headers="headers"
      :listLoading="dataListLoading"
      :datas="dataList"
      :tableHeight="440"
    >
    <template slot-scope="scope" slot="detail">
				<span class="el-icon-document export_span">详情</span>
			</template>
       <template slot-scope="scope" slot="act">
				<span class=" export_span">编辑</span>
        <span class=" export_span">删除</span>
			</template>
    </base-table>

    <pagination
      :pageNum="pageNum"
      :pageSize="pageSize"
      :total="total"
      @handleCurrentChange="handleCurrentChange"
    ></pagination>
  </div>
</template>

<script>
import { getReportList } from "@/api/api";
import viewModule from "common/mixins/view-module";
export default {
  data() {
    return {
      ser_model: {
        name: ""
      },
      mixinViewModuleOptions: {
        getDataListCallBack: getReportList, //获取list数据
        getDataListIsPage: true //分页
      }
    };
  },
  components: {},
   mixins: [viewModule],
  methods: {
    _initCreatedData() {
      this.headers = [
        { label: "录入报告时间", name: "date" },
        { label: "渔港名", name: "portName" },
        { label: "船名", name: "boatName" },
        { label: "船主", name: "userName" },
        { label: "报告行为", name: "action" },
        { label: "来源", name: "source" },
        { label: "出入港时间", name: "time" },
        { label: "录入报告时间", name: "date" },
        { label: "查看详情",name:"detail",type:"slot" },
        { label: "操作",name:"act",type:"slot" }
      ];
      this.search = [
        { name: "name", type: "text", placeholder: "船名/船主" },
        {
          name: "type",
          type: "select",
          placeholder: "进港报告",
          options: [
            { value: "进港", label: "1" },
            { value: "出港", label: "2" }
          ]
        },
        { name: "time", type: "startAndEndDate", placeholder: "时间" }
      ];
    }
  },
  created() {
    this._initCreatedData();
  }
};
</script>

<style lang="less" scoped>
.form_box {
  width: 100%;
}
	.export_span {
		font-size: 1.5vh;
		font-family: MicrosoftYaHeiLight;
		font-weight: 300;
		color: rgba(0, 252, 255, 1);
    line-height: 1.7vh;
    cursor: pointer;
    &:first-child{margin-right: 30px;}
    &:hover{
      color: rgba(0, 252, 255, 0.5);
    }
	}
</style>