# realword-nuxt


## 介绍
- GitHub仓库：https://github.com/gothinkster/realworld
- 在线演示： http://106.75.152.204:3000/
- 接口文档： https://github.com/gothinkster/realworld/tree/master/api
- 页面模版： https://github.com/gothinkster/realworld-starter-kit/blob/master/FRONTEND_INSTRUCTIONS.md
- 技术 Nuxt： https://zh.nuxtjs.org/docs/2.x/get-started/installation

## 创建项目
```
# 创建项目目录
mkdir realworld-nuxt
# 进入项目目录cd realworld-nuxt
# 生成 package.json 文件
yarn init -yes
# 安装 nuxt 依赖
yarn add nuxt
```  
在package.json中添加启动脚本：
```
"scripts": {
  "dev": "nuxt"
}
```
创建pages/index.vue  
启动服务后访问 `http://localhost:3000` 访问测试
```
npm run dev
```

## 基本界面及路径  
|  页面 | 路径页面 |
|  --  | ----  |
| 首页 | /  |
| 登录   | /login |
| 注册   | /register |
| 用户设置   | /settings |
| 发布文章   | /editor |
| 编辑文章   | /editor/:slug |
| 文章详情   | /article/:slug |
| 用户页面   | /profile/:username |
| 用户页面/喜欢的文章   | /profile/:username/favorites |

## 基本功能实现
### 登录注册
- 实现基本登录功能
- 封装请求方法
- 表单验证
- 错误处理
- 用户注册
- 存储用户登录状态
- 处理页面访问权限
### 首页模块
- 展示公共文章列表
- 展示分页及分页处理
- 展示关注文章列表
- 展示文章标签列表
- 日期格式处理
- 文章点赞

### 文章详情

### 发布文章  

### 用户中心

### 个人中心  

## 发布部署  
1. [购买服务器](https://gitee.com/lagoufed/fed-e-questions/tree/master/part3/%E7%AC%94%E8%AE%B01-%E6%9C%8D%E5%8A%A1%E5%99%A8%E8%B4%AD%E4%B9%B0%E4%B8%8E%E5%88%9D%E5%A7%8B%E5%8C%96)，并在服务器上安装上 node / pm2 
2. [Nuxt.js](https://zh.nuxtjs.org/docs/2.x/get-started/installation) 提供了一系列常用的命令, 用于开发或发布部署。   
 
| 命令 | 描述 |  
|  --  | -- | 
|  nuxt | 启动一个热加载的Web服务器（开发模式）localhost:3000。 |
|  nuxt build  | 利用webpack编译应用，压缩JS和CSS资源（发布用）。  |
| nuxt start | 以生产模式启动一个Web服务器 (需要先执行nuxt build)  |
| nuxt generate | 编译应用，并依据路由配置生成对应的HTML文件 (用于静态站点的部署)。|

Nuxt.js 提供了两种发布部署应用的方式：  
服务端渲染应用部署和静态应用部署。部署 Nuxt.js 服务端渲染的应用不能直接使用nuxt命令，而应该先进行编译构建，然后再启动 Nuxt服务，可通过以下两个命令来完成：  
```
nuxt build
nuxt start
```  
package.json配置如下  
```
{
  "name": "my-app",
  "dependencies": {
    "nuxt": "latest"  
  },
  "scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "start": "nuxt start"  
  }
}
```  
提示：建议将`.nuxt`加入`.npmignore`和`.gitignore`文件中


3. 配置github 的 [Personal access tokens](https://github.com/settings/tokens)   
> 该 token 会生成一个密码，密码只会展示一次，如果忘记了就需要重新生成   


4. 配置 Github Actions 执行脚本  
- 在项目根目录下创建 .github/workflows 目录
- 下载 main.yml 到 workflows 目录中
- 修改配置， 官网地址： https://docs.github.com/cn/actions/reference/workflow-syntax-for-github-actions   
- 配置pm2文件`pm2.config.json`    
```
{
  "apps": [
    {
      "name": "RealWorld",
      "script": "yarn",
      "args": "start"
    }
  ]
}
```  
- 通过打tag来提交更新，触发自动部署  
```
// 查看所有的tag  
git tag  

// 创建tag  
git tag v0.1.0

// 将tag 推到远程仓库
git push origin v0.1.0
```  
- 在项目的action中查看打包结果
- 访问网站