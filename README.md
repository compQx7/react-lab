# アプリの起動

## 依存パッケージのインストール
```
cd app
npm install
```

## テスト実行
```
npm run test
```

## アプリ起動
```
npm run start
```

# Dockerを使う場合

## Dockerイメージのビルド
```
docker build -t react-image ./docker
```

## コンテナの起動・コンテナへアタッチ
```
docker run -d -it --name calculator -p 3000:3000 -v $(pwd)/app:/app react-image
docker exec -it calculator sh
```

## コンテナの終了・削除
```
docker container stop calculator
docker container rm calculator
```

