export const search = function(){
    // // 声明一个空数组
    // let arr = []
    // // 循环遍历旧数据数组searchtext
    // for (let i = 0; i < this.tabledata.length; i++) {
    //   // 判断搜索框的值和数组中name的值
    //   if (this.tabledata[i].name.indexOf(this.searchtext) !== -1) {
    //     arr.push(this.tabledata[i])
    //   }
    // }
    // return arr
    let arr = this.tabledata.filter(value=>{
      return value.name.indexOf(this.searchtext) !== -1
    })
    return arr
}