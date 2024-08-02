<div align=center>
  <img src="https://media.mxchensir.com/morgana-form/logo-name.png" height=240px />
</div>

# MorGana 问卷星

## 项目介绍

最近研究Next全栈开发，做一个全栈问卷星表单搭建器项目，能够帮助快速搭建一个问卷表单收集项目，项目采用Next全栈开发，涉及技术栈如下:

- [x] React 18
- [x] Next 14
- [x] Typescript
- [x] Ant Design 5
- [x] Ant Design Charts
- [x] PostgreSQL
- [x] Drizzle ORM
- [x] TRPC
- [x] Tailwind CSS
- [x] Next-Auth 登陆认证
- [x] Uppy 文件上传


## 项目目录

```
├── README.md
├── package.json
├── next.config.js
├── src
│   ├── components
│   │   ├── featur 功能型组件
│   │   ├── UI 基础UI组件
│   ├── hooks 自定义hooks
│   ├── lib 工具包
│   ├── app 项目页面
│   ├── constants 常量
│   ├── store redux store
│   ├── theme 主题定义
│   ├── typings 类型定义
│   ├── server 服务端代码
│   ├── types 类型定义
|── packages
│   ├── components 搭建组件代码包
```

## 项目启动

```
# 安装依赖  
pnpm install 

# 启动项目  
pnpm run dev
```

## 环境变量

项目依赖的一些必要环境参数

**数据库相关**

`DB_HOST` 数据库域名  
`DB_PORT` 数据库端口  
`DB_USER` 数据库用户名  
`DB_PASSWORD` 数据库密码  
`DB_DATABASE` 数据库名称  

**NextAuth登陆相关**

`NEXT_AUTH_SECRET` NextAuth登陆秘钥  
`GIT_HUB_CLIENT_ID` Github OAuth Client ID  
`GIT_HUB_CLIENT_SECRET` Github OAuth Client Secret  
`GITLAB_CLIENT_ID` Gitlab OAuth Client ID  
`GITLAB_CLIENT_SECRET` Gitlab OAuth Client Secret  

**上传服务相关**

> 项目采用的七牛云存储，如果采用其他云存储，保持七牛云环境变量名，设置对应存储服务的相关参数即可。

`QINIU_BUCKET` 存储空间名  
`QINIU_ACCESS_KEY` AccessKey  
`QINIU_SECRET_KEY` SecretKey  
`QINIU_ENDPOINT` 填写对应服务的S3上传域名  
`QINIU_REGION` 区域
`QINIU_HOST` 上传域名

**AI模型**

> 项目采用了阿里千问大模型进行表单生成，可以尝试将大模型自行切换，调整 server/routes/llm.ts 文件中的调用逻辑即可。如果不需要AI能力，去除项目中的相关代码即可。

`LLM_URL`: 千问大模型API地址  
`LLM_APP_KEY`: 千问大模型API Key  

## 联系

当前项目开发第一版，可能存在较多问题，欢迎大家提出宝贵意见。

如果您发现任何代码问题，请随时提交问题。作者会及时更新和修复。谢谢

> ![](https://open.weixin.qq.com/zh_CN/htmledition/res/assets/res-design-download/icon16_wx_logo.png) *bangtz* (Add please note vue-weui)

# License

[Apache License 2.0](LICENSE)