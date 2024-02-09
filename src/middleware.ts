import { NextRequest, NextResponse} from "next/server";

export function middleware(req: NextRequest) {
  // 開発環境の場合は認証スキップして次の処理へ
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }

  // HTTPヘッダーからAuthorizationのエンコードされた値を取得
  // ex) Authorization: username password
  const basicAuth = req.headers.get('authorization');

  // envに指定したnameとpassword格納
  const USER_NAME = process.env.USER_NAME;
  const USER_PASSWORD = process.env.USER_PASSWORD;
  
  if(basicAuth) {
    const auth = basicAuth.split(' ')[1];
    // base64へデコード処理
    const decoded = Buffer.from(auth, 'base64').toString();
    const [ user, password ] = decoded.split(':');

    // 一致した場合は次の処理へ
    if (user === USER_NAME && password === USER_PASSWORD) {
      return NextResponse.next();
    }
  }

  // 認証失敗の場合
  return new Response('Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"'
    }
  });
}