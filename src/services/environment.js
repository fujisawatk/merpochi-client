import Constants from 'expo-constants';

const ENVs = {
  dev: {
    // 開発環境の変数
    environment: "dev",
    baseApiUrl: "http://192.168.100.117:8000",
  },
  production: {
    // 本番環境の変数
    environment: "production",
    baseApiUrl: "https://api.merpochi.tk",
  },
};

function getEnvVars() {
  // サーバー管理画面のPRODUCTION MODEトグルを判別する関数
  const options = Constants.manifest.packagerOpts
  // リリースチャンネル読み込み関数
  const channel = Constants.manifest.releaseChannel
  const isDev = options != null ? options.dev : true
  if (isDev) {
    return ENVs.dev
  } else {
    if (channel.substring(0,10) === "production") {
      return ENVs.production
    } else {
      return ENVs.dev
    }
  }
}

export const ENV = getEnvVars()