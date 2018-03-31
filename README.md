# minch-todolist

## 技術棧
Vue + Vue-cli + webpack + localStorage + hash + stylus + todomvc-app-css

## 功能描述(使用說明)
- 添加備忘錄(輸入標題後回車添加,如果內容為空或只有空格會清空，什麽都不添加)
- 刪除備忘錄(點擊標題後面的叉)
- 完成備忘錄(點擊標題前面的復選框)
- 編輯備忘錄(雙擊標題進入編輯模式)
- 取消編輯備忘錄(按ESC或者失去焦點時)
- 完成編輯備忘錄(按回車鍵完成[如果內容為空的時候會自動刪除]，此時也會調用到失去焦點事件)
- 壹鍵完成所有備忘錄(點擊第壹行的復選框)
- 過濾任務，顯示全部，未完成，已完成的備忘錄(點擊全部，未完成，已完成按鈕)
- 清空已完成備忘錄(點擊清空已完成)

## Vue相關知識點

- 單文件組件
- 數據屬性
- 計算屬性（get,set）
- 觀察屬性
- 方法
- 指令

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
