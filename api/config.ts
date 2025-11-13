// 이 파일은 프로젝트 루트의 'api' 폴더 안에 위치해야 합니다.
// 예: /api/config.ts

// Vercel 서버리스 함수는 요청(req)과 응답(res) 객체를 자동으로 처리합니다.
// 이 함수는 클라이언트가 /api/config 경로로 요청을 보낼 때 실행됩니다.
export default function handler(req, res) {
  // Vercel 서버 환경에서는 process.env에 접근할 수 있습니다.
  const apiKey = process.env.VITE_API_KEY;

  if (apiKey) {
    // API 키가 존재하면, JSON 형식으로 클라이언트에 응답합니다.
    res.status(200).json({ apiKey: apiKey });
  } else {
    // Vercel 대시보드에 환경 변수가 설정되지 않은 경우, 서버 로그에 오류를 남기고
    // 클라이언트에는 500 서버 오류를 보냅니다.
    console.error("CRITICAL: VITE_API_KEY environment variable is not set on the Vercel server.");
    res.status(500).json({ error: "Server configuration error: API key is missing." });
  }
}
