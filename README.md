### 乐高组件整理文档

#### 功能
1. 显示widget的图片，来进行索引
2. 显示widget的example图片及其配置（可增加和删除）
3. 显示widget对应的spec文件（可修改）
4. 显示widget对应的impl模板
5. 显示impl模板对应的线上物料（lego-off）

#### 相关命令
1. npm start: 启动应用
2. npm run-script refresh: 更新lego-widgets，并且重新统计widget的信息
3. npm run-script autograb: 对widget自动截图（依赖phantomjs，一般本地更新上传至服务器)
