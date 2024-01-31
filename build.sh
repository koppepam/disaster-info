yarn install

# cloud_sql_proxyをダウンロード
curl -o cloud-sql-proxy https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.6.1/cloud-sql-proxy.linux.amd64

# ↑を実行可能に
chmod +x cloud-sql-proxy

# プロキシサーバを起動(起動後別のシェルでMySQLサーバにプロキシサーバ経由で接続する)
./cloud-sql-proxy "meta-leaf-412610:asia-northeast1:disaster-info-db?port=$PORT" --credentials-file=$GOOGLE_APPLICATION_CREDENTIALS

npx prisma db push

yarn build