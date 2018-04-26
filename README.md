# Parrot
## Summary
* Node.js・Julius・OpenJTalkを使用した、喋ったことをオウム返ししてくれるアプリ
* Linux環境推奨:Debian9.4で動作確認済み

## Usage
* 初回は(通信環境の良い場所で)`npm install`,`npm run setting`を行ってください。
* `npm run server`の後、別の端末で`npm start`を実行するとアプリが起動します。
* 起動したら録音が始まり、スペースを押すと録音が止まります。もう一度スペースを押すと音声が再生され、録音も再開されます。

## Future Releases
* アプリの実行時にサーバーも同時に立てるようにする

## Requirement
* Node.js : v9.10.1
* npm     : v5.8.0

## License
[MIT](./LICENSE)
