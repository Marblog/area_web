<template>
  <div>
    <div>
      <el-input style="width: 200px;" v-model="query.name" placeholder="请输入名称"></el-input>
      <el-button type="primary" :icon="Search" @click="search()">搜索</el-button>
      <el-button type="primary" @click="add()">新增商品</el-button>
    </div>
    <el-table :data="tableData" border stripe>
      <el-table-column prop="articleName" label="商品名称" width="180"/>
      <el-table-column prop="price" label="价格" width="180"/>
      <el-table-column prop="num" label="数量"/>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
          <el-button type="info" @click="inStock(scope.row.id)">入库</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :current-page="query.pageNo" :page-sizes="[1, 2, 5, 10,50]"
                   :page-size="query.pageSize" layout="total, sizes, prev, pager, next, jumper"
                   :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>

  <el-dialog
      v-model="dialogVisible"
      title="编辑"
      width="50%">
    <div>
      <el-form :model="form" label-width="120px">
        <el-form-item label="商品名称">
          <el-input v-model="form.articleName"/>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="form.price"/>
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="form.num"/>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save()">提交</el-button>
      </span>
    </template>
  </el-dialog>


  <el-dialog
      v-model="dialogAdd"
      title="新增"
      width="50%">
    <div>
      <el-form :model="formAdd" label-width="120px">
        <el-form-item label="商品名称">
          <el-input v-model="formAdd.articleName"/>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="formAdd.price"/>
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="formAdd.num"/>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveAdd()">提交</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog
      v-model="dialogIn"
      title="入库"
      width="50%">
    <div>
      <el-select v-model="value" class="m-2" placeholder="Select" size="large">
        <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.stockName"
            :value="item.value"
        />
      </el-select>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogIn = false">取消</el-button>
        <el-button type="primary" @click="saveIn()">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {Search} from "@element-plus/icons";

export default {
  name: "ArticleName",
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
      dialogVisible: false,
      handleClose: false,
      dialogAdd: false,
      dialogIn: false,
      form: {
        id: '',
        articleName: '',
        price: '',
        num: ''
      },
      formAdd: {
        id: '',
        articleName: '',
        price: 0,
        num: 0
      },
      value: '',
      options: []
    }
  },
  mounted() {
    this.getList()
    this.getStockList()
  },
  methods: {

    getList() {
      this.axios({
        url: 'http://localhost:8080/article/list',
        method: 'get',
        params: this.query
      }).then(res => {
        if (res.status === 200) {
          this.total = res.data.total
          this.tableData = res.data.records
        }
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error
        })
      })
    },
    getStockList() {
      this.axios({
        url: 'http://localhost:8080/stock/list',
        method: 'get',
      }).then(res => {
        if (res.status === 200) {
          this.options = res.data
        }
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error
        })
      })
    },


    add() {
      this.dialogAdd = true
    },
    saveAdd() {
      this.axios({
        url: 'http://localhost:8080/article/add',
        method: 'post',
        params: this.formAdd
      }).then(res => {
        if (res.status === 200) {
          this.$message({
            type: 'success',
            message: "新增成功"
          })
          this.dialogAdd = false
          this.getList()
        }
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error
        })
      })
    },

    edit(id) {
      console.log(id)
      this.dialogVisible = true
      this.axios({
        url: 'http://localhost:8080/article/listById?id=' + id,
        method: 'get',
      }).then(res => {
        if (res.status === 200) {
          this.form = res.data
        }
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error
        })
      })
    },
    save() {
      this.axios({
        url: 'http://localhost:8080/article/update',
        method: 'put',
        params: this.form
      }).then(res => {
        if (res.status === 200) {
          this.$message({
            type: 'success',
            message: "修改成功"
          })
          this.dialogVisible = false
          this.getList()
        }
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error
        })
      })

    },
    del(id) {
      this.axios({
        url: 'http://localhost:8080/article/delete?id=' + id,
        method: 'delete',
      }).then(res => {
        if (res.status === 200) {
          this.$message({
            type: 'success',
            message: "删除成功"
          })
          this.dialogVisible = false
          this.getList()
        }
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error
        })
      })
    },
    inStock() {
      this.dialogIn = true
    },
    saveIn() {

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
