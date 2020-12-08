
# 2020 アップデート
- <a href="https://nodejs.org/ja/">Node.jsバージョンアップ</a> v14.15.1(安定版)
- npm バージョンアップ 6.14.8
- README.md <a href="https://github.com/1-10/web-starter-kit/tree/v2020#%E3%83%AC%E3%82%AE%E3%83%A5%E3%83%AC%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3">レギュレーションテンプレ追加</a>（案件単位で調整してください）
- uglifyjs-webpack-plugin非推奨のため、<a href="https://webpack.js.org/plugins/terser-webpack-plugin/">terser-webpack-plugin</a>に変更
- issues3: <a href="https://github.com/1-10/web-starter-kit/issues/3">gulp-connect-php修正対応</a>
- src/assets/jsの`@js`エイリアス追加 <a href="https://webpack.js.org/configuration/resolve/#resolvealias">[webpack configuration]</a>
- server起動コマンド変更 `npm run server` → `npm run srv`
- tasksに<a href="https://github.com/1-10/web-starter-kit/blob/v2020/gulpfile.babel.js/tasks/ejs.js">ejs追加</a>（タスク登録は案件単位で設定）
- build時のAPIの書き換え処理のオプション追加（dev, stg, prd等環境に合わせたAPIのURLに書き換え等）
- distコマンド追加 distフォルダにファイル生成オプション追加
- HTMLからmeta keywords削除
- gulp-sassからgulp-dart-sassに変更

