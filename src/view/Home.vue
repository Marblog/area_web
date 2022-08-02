<template>
  <div>
    <div>
      <el-input style="width: 200px;" v-model="query.name" placeholder="请输入名称"></el-input>
      <el-button type="primary" :icon="Search" @click="search()">搜索</el-button>
    </div>
    <el-table :data="tableData" border stripe>
      <el-table-column prop="name" label="名称" width="180"/>
      <el-table-column prop="provinceCode" label="省/直辖市代码" width="180"/>
      <el-table-column prop="cityCode" label="市代码"/>
      <el-table-column prop="areaCode" label="区/县代码"/>
      <el-table-column prop="streetCode" label="街道/镇代码"/>
      <el-table-column prop="committeeType" label=" 城乡分类代码"/>
    </el-table>
    <el-pagination :current-page="query.pageNo" :page-sizes="[1, 2, 5, 10,50]"
                   :page-size="query.pageSize" layout="total, sizes, prev, pager, next, jumper"
                   :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>

import {Search} from "@element-plus/icons";

export default {
  name: "HomeName",
  component: {
    Search
  },
  data() {
    return {
      tableData: [],
      total: 0,
      Search,
      query: {
        pageNo: 1,
        pageSize: 10,
        name: ''
      },
    }
  },

  mounted() {
    this.getList()
  },
  methods: {

    getList() {
      this.axios({
        url: 'http://localhost:8080/area/list',
        method: 'get',
        params: this.query
      }).then(res => {
        if (res.status === 200) {
          this.total = res.data.total
          this.tableData = res.data.records
        }
      }).catch(error => {
        console.log(error)
      })
    },
    handleSizeChange(newSize) {
      this.query.pageSize = newSize
      this.getList()
    },
    handleCurrentChange(newPage) {
      this.query.pageNo = newPage
      this.getList()
    },
    search() {
      this.getList()
    }
  }
}
</script>

<style scoped>

</style>
