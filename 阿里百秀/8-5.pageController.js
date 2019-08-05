//暴露前台主页请求逻辑
module.exports.getIndex = (req, res) => {
  res.render('index');
}
//暴露前台列表页请求逻辑
module.exports.getList = (req, res) => {
  res.render('list');
}
//暴露前台详情页请求逻辑
module.exports.getDetail = (req, res) => {
  res.render('detail');
}

//暴露后台主页请求逻辑
module.exports.getAdminIndex = (req, res) => {
  res.render('admin/index');
}

//暴露后台其他页面请求逻辑
module.exports.getAdminCategories = (req, res) => {
  res.render('admin/categories');
}
module.exports.getAdminComments = (req, res) => {
  res.render('admin/comments');
}
module.exports.getAdminLogin = (req, res) => {
  res.render('admin/login');
}
module.exports.getAdminNavMenus = (req, res) => {
  res.render('admin/nav-menus');
}
module.exports.getAdminPasswprdReset = (req, res) => {
  res.render('admin/password-reset');
}
module.exports.getAdminPostAdd = (req, res) => {
  res.render('admin/post-add');
}
module.exports.getAdminPosts = (req, res) => {
  res.render('admin/posts');
}
module.exports.getAdminProfile = (req, res) => {
  res.render('admin/profile');
}
module.exports.getAdminSettings = (req, res) => {
  res.render('admin/settings');
}
module.exports.getAdminSlides = (req, res) => {
  res.render('admin/slides');
}
module.exports.getAdminUsers = (req, res) => {
  res.render('admin/users');
}