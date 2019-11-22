<template>
  <div>
    <el-table :data="tableData" style="width: 100%;" :max-height="tableHeight" class="tb">
      <el-table-column prop="date" label="录入报告时间"></el-table-column>
      <el-table-column prop="portName" label="渔港名"></el-table-column>
      <el-table-column prop="boatName" label="船名"></el-table-column>
      <el-table-column prop="userName" label="船主"></el-table-column>
      <el-table-column prop="action" label="报告行为"></el-table-column>
      <el-table-column prop="source" label="来源"></el-table-column>
      <el-table-column prop="time" label="出入港时间"></el-table-column>
      <el-table-column label="查看详情">
        <template slot-scope="scope">
          <span class="details"></span>
          <el-button @click="handleClick(scope.row)" type="text">详情</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text">编辑</el-button>
          <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script >
export default {
  data() {
    return {
      tableHeight: 0,
      tableData: [
        {
          date: "2019/03/28 09:00:00",
          portName: "深圳",
          boatName: "粤蛇渔18029",
          userName: "李明",
          action: "进港",
          source: "自行填表",
          time: "2019/03/28 09:00:00"
        },
        {
          date: "2019/03/28 09:00:00",
          portName: "深圳",
          boatName: "粤蛇渔18029",
          userName: "李明",
          action: "进港",
          source: "自行填表",
          time: "2019/03/28 09:00:00"
        },
        {
          date: "2019/03/28 09:00:00",
          portName: "深圳",
          boatName: "粤蛇渔18029",
          userName: "李明",
          action: "进港",
          source: "自行填表",
          time: "2019/03/28 09:00:00"
        },
        {
          date: "2019/03/28 09:00:00",
          portName: "深圳",
          boatName: "粤蛇渔18029",
          userName: "李明",
          action: "进港",
          source: "自行填表",
          time: "2019/03/28 09:00:00"
        },
        {
          date: "2019/03/28 09:00:00",
          portName: "深圳",
          boatName: "粤蛇渔18029",
          userName: "李明",
          action: "进港",
          source: "自行填表",
          time: "2019/03/28 09:00:00"
        },
        {
          date: "2019/03/28 09:00:00",
          portName: "深圳",
          boatName: "粤蛇渔18029",
          userName: "李明",
          action: "进港",
          source: "自行填表",
          time: "2019/03/28 09:00:00"
        },
        {
          date: "2019/03/28 09:00:00",
          portName: "深圳",
          boatName: "粤蛇渔18029",
          userName: "李明",
          action: "进港",
          source: "自行填表",
          time: "2019/03/28 09:00:00"
        },
        {
          date: "2019/03/28 09:00:00",
          portName: "深圳",
          boatName: "粤蛇渔18029",
          userName: "李明",
          action: "进港",
          source: "自行填表",
          time: "2019/03/28 09:00:00"
        },
        {
          date: "2019/03/28 09:00:00",
          portName: "深圳",
          boatName: "粤蛇渔18029",
          userName: "李明",
          action: "进港",
          source: "自行填表",
          time: "2019/03/28 09:00:00"
        },
        {
          date: "2019/03/28 09:00:00",
          portName: "深圳",
          boatName: "粤蛇渔18029",
          userName: "李明",
          action: "进港",
          source: "自行填表",
          time: "2019/03/28 09:00:00"
        }
      ]
    };
  },
  created () {
    this.setTableH();
    this.setTableH = this.setTableH.bind( this )
    window.addEventListener("resize", this.setTableH);
  },
   destroy () {
    window.removeEventListener( 'resize', this.setTableH )
  },
  methods: {
    setTableH() {
      this.tableHeight=window.innerHeight*0.36
    }
  },
};
</script>

<style lang="less" scoped>
/deep/ .el-table th,
/deep/.el-table tr {
  background-color: #0f2a4c;
}
/deep/.el-table,
/deep/.el-table thead {
  color: #ffffff;
  font-size: 1.5vh;
  line-height: 3.6vh;
}
/deep/.el-table--enable-row-hover .el-table__body tr:hover > td,
/deep/.el-table__row:hover {
  background-color: #2b6b9f;
}
/deep/.el-table td,
/deep/.el-table th.is-leaf {
  border-color: #266199;
}
/deep/.el-table::before {
  height: 0;
}
/deep/.el-table--medium td,
/deep/.el-table--medium th {
  padding: 0;
  height: 39px;
}

/deep/.el-button--text {
  color: #00fcff;
  font-size: 1.5vh;
}
</style>
<style scoped>
.details {
  display: inline-block;
  width: 15px;
  height: 18px;
  background: url("/static/img/report/ico_details.png") no-repeat center bottom;
  float: left;
  margin-top: 10px;
  margin-right: 5px;
}

.tb ::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: transparent;
}

/*定义滚动条轨道 内阴影+圆角*/
.tb ::-webkit-scrollbar-track {
  border-radius: 3px;
  background-color: transparent;
}

/*定义滑块 内阴影+圆角*/
.tb ::-webkit-scrollbar-thumb {
  border-radius: 3px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background: rgba(47, 184, 255, 1);
}

</style>
<style>
.el-table__body-wrapper{
    background: #0f2a4c;
}
</style>

