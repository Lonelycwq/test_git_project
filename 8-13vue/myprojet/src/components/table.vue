<template>
  <div id="app">
    <div class="add">
      编号:
      <input
        type="text"
        v-model="form.id"
        v-focus
      />
      品牌名称:
      <input
        type="text"
        v-model="form.name"
        v-color="'blue'"
      />
      <!-- 绑定事件 -->
      <input
        type="button"
        @click="add"
        value="添加"
      />
    </div>
    <div class="add">
      品牌名称:
      <input
        type="text"
        placeholder="请输入搜索条件"
        v-color="'red'"
        v-model="searchtext"
      />
    </div>
    <div>
      <table class="tb">
        <thead>
          <tr>
            <th>编号</th>
            <th>品牌名称</th>
            <th>创立时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(value,index) in tabledata"
            :key="index"
          >
            <td>{{value.id}}</td>
            <td>{{value.name}}</td>
            <td>{{value.date | getdate('-')}}</td>
            <td>
              <a
                href="#"
                @click.prevent="del(index)"
              >删除</a>
            </td>
          </tr>
          <tr>
            <td
              colspan="4"
              v-show="tabledata.length == 0"
            ></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { focus, color } from '@/tools/userdirective'
import { getdate } from '@/tools/userfilters'
// import { search } from '@/tools/usercomputed'
export default {
  data () {
    return {
      form: {
        id: '',
        name: ''
      },
      tabledata: [
        {
          id: 1,
          name: '玛莎拉蒂',
          date: new Date()
        },
        {
          id: 2,
          name: '布加迪威龙',
          date: new Date()
        },
        {
          id: 3,
          name: '劳斯莱斯幻影',
          date: new Date()
        }
      ],
      newarr: [],
      searchtext: ''
    }
  },
  methods: {
    // 点击新增数据方法
    add () {
      // let obj = this.form
      // 用一个新对象存储并使用展开运算符展开表单中的数据对象
      let newobj = { ...this.form }
      newobj.date = new Date()
      // console.log(newobj)
      // 将新添加的方法添加到数组中
      this.tabledata.push(newobj)
      // 添加完清空表单控件
      this.form.id = ''
      this.form.name = ''
    },
    // 删除数据方法
    del (index) {
      if (confirm('确定删除数据吗？')) {
        // 获取点击的当前数据的索引，从数组中移除元素
        this.tabledata.splice(index, 1)
      }
    }
  },
  directives: {
    focus,
    color
  },
  filters: {
    getdate
  },
  // computed: {
  // search
  // },
  watch: {
    searchtext: {
      handler (newvalue) {
        if (newvalue === '') {
          this.tabledata = [
            {
              id: 1,
              name: '玛莎拉蒂',
              date: new Date()
            },
            {
              id: 2,
              name: '布加迪威龙',
              date: new Date()
            },
            {
              id: 3,
              name: '劳斯莱斯幻影',
              date: new Date()
            }
          ]
        }
        let arr = this.tabledata.filter(value => {
          return value.name.indexOf(newvalue) !== -1
        })
        this.tabledata = arr
        console.log(arr)
      },
      deep: true
    }
    // searchtext(newvalue) {
    //   let arr = this.tabledata.filter(value => {
    //     return value.name.indexOf(newvalue) !== -1;
    //   });
    //   this.tabledata = arr;
    //   console.log(arr);
    // }
  }
}
</script>
<style lang="less">
#app {
  width: 600px;
  margin: 10px auto;
}

.tb {
  border-collapse: collapse;
  width: 100%;
}

.tb th {
  background-color: #0094ff;
  color: white;
}

.tb td,
.tb th {
  padding: 5px;
  border: 1px solid black;
  text-align: center;
}

.add {
  padding: 5px;
  border: 1px solid black;
  margin-bottom: 10px;
}
</style>
