<template>
  <div>
      <elbread></elbread>
      <el-button type="primary" plain size="mini">添加</el-button>
    <el-table
    :data="tableData"
    border
    style="width: 42%">
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      >
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="">
         <el-button type="primary" icon="el-icon-edit" size="small" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" circle></el-button>
        </template>
      </el-table-column>
  </el-table>
      
  </div>
</template>

<script>
import elbread from '../components/elbread'
export default {
  data() {
    return {
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
           {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          },
           {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, 
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }
          ]
        }
  },
  components:{
      elbread
  }
};
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl';

.el-button {
  margin-top: 15px;
  margin-bottom: 5px;
}
</style>
