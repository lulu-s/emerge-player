# emerge-player


## 前期准备
1. 环境 [node](http://nodejs.cn/download/) 
2. 静态服务器 [http-server](https://www.npmjs.com/package/http-server)  `npm install http-server -g`
3. 编译工具 [parcel-bundler](https://parceljs.org/getting_started.html) `npm install -g parcel-bundler`
4. 桌面应用程序 [electron](https://www.electronjs.org/) `npm i electron -g`
5. 库 [libao](https://github.com/luan007/libao) 
    * window： 将快捷方式libao删除，替换成下载后的libao
    * mac： 将快捷方式libao删除，链接🔗 `ln -s ./libao`

## 生成数据
```
    sh create.sh
```

## demo运行

```
    (新建终端0) cd assets
    (新建终端0) http-server --cors

    (新建终端1) cd main
    (新建终端1) parcel --no-hmr index.html

    (新建终端2) cd srvao-ipad
    (新建终端2) node main.js

    (新建终端4) cd electron
    (新建终端5) electron electronRunner.js

```


## 组件

### 1. viewer / 视频 🎬

| Key             | Value           | detail             | Required     |
| --------------- | ----------------| ------------------ | ------------ |
| type            | viewer          | 组件名              | ✅           |    
| name            | 标题             | 标题名              | ✅           |    
| path            | files/..        | 视频文件路径          | ✅          |
| endTime         | 0:52            | 结束时间             | ✅           |
| vtt             | files/..        | 字幕文件路径          |             |


### 2. message / 文字 📝

| Key             | Value           | detail                        | Required     |
| --------------- | ----------------| ----------------------------- | ------------ |
| type            | message         | 组件名                         | ✅           |  
| name            | 标题             | 标题名                         | ✅           |    
| msg             | 我是文字         | 文字内容                        | ✅           |
| size            | 30              | 字体大小，默认30px               |             |
| position        | [0, 0]          | 字体定位[left, top]，默认[0, 0]  |             |
| bg              | true            | 是否为背景                      |             |


### 3. photo / 图片 🌠

| Key             | Value           | detail                        | Required     |
| --------------- | ----------------| ----------------------------- | ------------ |
| type            | photo           | 组件名                         | ✅           |    
| name            | 标题             | 标题名                         | ✅           |    
| path            | files/..        | 图片文件路径                     | ✅          |
| position        | [0, 0]          | 字体定位[left, top]，默认[0, 0]  |             |
| bg              | true            | 是否为背景                      |             |


### 4. slide / ppt 📊 📉 📈

| Key             | Value                              | detail                        | Required     |
| --------------- | ---------------------------------- | ----------------------------- | ------------ |
| type            | slide                              | 组件名                         | ✅           |    
| name            | 标题                                | 标题名                         | ✅           |    
| path            | files/../                          | ppt文件夹路径                   | ✅          |
| content         | ['file1.png','file2.png', ... ]    | 字体定位[left, top]，默认[0, 0]  | ✅          |

