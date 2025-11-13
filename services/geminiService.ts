// Fix: Replaced placeholder content with a full implementation of the Gemini API service.
// Fix: Removed deprecated GoogleGenAIError from import.
import { GoogleGenAI, Type } from "@google/genai";
import { DiagnosisResult, ESGTopic, Indicator, ReportSuggestions } from "../types";
import { INDICATORS } from "../constants";

// AI 클라이언트 인스턴스를 저장하기 위한 Promise
// 한 번 초기화되면 계속 재사용하여 불필요한 API 호출을 방지합니다.
let aiClientPromise: Promise<GoogleGenAI> | null = null;

/**
 * API 키를 서버리스 함수에서 가져와 GoogleGenAI 클라이언트를 비동기적으로 초기화합니다.
 * Promise를 사용하여 클라이언트 초기화가 단 한 번만 실행되도록 보장합니다.
 * @returns GoogleGenAI 클라이언트 인스턴스를 담은 Promise.
 */
const getAiClient = (): Promise<GoogleGenAI> => {
    if (aiClientPromise) {
        return aiClientPromise;
    }

    // Promise를 생성하여 API 키를 가져오고 클라이언트를 초기화하는 비동기 작업을 캡슐화합니다.
    aiClientPromise = new Promise(async (resolve, reject) => {
        try {
            // 새로 만든 Vercel 서버리스 함수 엔드포인트로 요청을 보냅니다.
            const response = await fetch('/api/config');
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API 설정 가져오기 실패: ${response.status} ${response.statusText} - ${errorData.error}`);
            }
            
            const config = await response.json();
            const apiKey = config.apiKey;

            if (!apiKey) {
                throw new Error("서버로부터 API 키를 받지 못했습니다.");
            }

            const ai = new GoogleGenAI({ apiKey });
            resolve(ai);
        } catch (error) {
            console.error("GoogleGenAI 클라이언트 초기화 실패:", error);
            // Promise를 reject하여 호출한 쪽에서 에러를 처리할 수 있도록 합니다.
            reject(new Error("AI 클라이언트를 초기화할 수 없습니다. 네트워크 또는 서버 설정을 확인해주세요."));
        }
    });

    return aiClientPromise;
};


const formatAnswersForPrompt = (result: DiagnosisResult): string => {
    let formatted = "";
    const topics: ESGTopic[] = ['E', 'S', 'G'];

    const findIndicator = (id: string): Indicator | undefined => INDICATORS.find(i => i.id === id);

    topics.forEach(topic => {
        const answeredIndicatorIds = Object.keys(result.answers).filter(id => findIndicator(id)?.topic === topic);

        if (answeredIndicatorIds.length > 0) {
            formatted += `\n[${topic} 분야 답변 요약]\n`;
            answeredIndicatorIds.forEach(indicatorId => {
                const indicator = findIndicator(indicatorId);
                if (!indicator) return;
                
                formatted += `- ${indicator.indicator}:\n`;
                Object.entries(result.answers[indicatorId]).forEach(([sqId, answerIds]) => {
                    const subQuestion = indicator.subQuestions.find(sq => sq.id === sqId);
                    if (subQuestion?.type === 'choice' && answerIds.length > 0) {
                        const answerTexts = answerIds.map(ansId => subQuestion.options.find(o => o.id === ansId)?.text).filter(Boolean);
                        formatted += `  - ${subQuestion.text}: ${answerTexts.join(', ')}\n`;
                    }
                });
            });
        }
    });
    return formatted;
};


export const generateSuggestions = async (result: DiagnosisResult): Promise<ReportSuggestions> => {
    const formattedAnswers = formatAnswersForPrompt(result);
    
    const prompt = `
        당신은 대한민국 중소기업을 위한 최고 수준의 ESG 경영 컨설턴트입니다.
        아래에 제공되는 한 중소기업의 ESG 자가진단 결과를 바탕으로, SWOT 분석 프레임워크를 활용하여 매우 상세하고 전문적인 진단 보고서를 작성해주세요.
        보고서는 A4 용지 2~3페이지 분량의 깊이 있는 분석을 담아야 합니다.

        [진단 결과 요약]
        - 기업명: ${result.companyName}
        - 종합 ESG 점수: ${result.scores.overall.toFixed(1)}/5.0
        - 환경(E) 점수: ${result.scores.E.toFixed(1)}/5.0
        - 사회(S) 점수: ${result.scores.S.toFixed(1)}/5.0
        - 지배구조(G) 점수: ${result.scores.G.toFixed(1)}/5.0

        [사용자 답변 상세 내역]
        ${formattedAnswers}

        [보고서 작성 지침]
        1.  **종합 전략 제언 (Overall Summary)**: 진단 결과 전체를 종합하여, 기업의 현재 ESG 경영 수준을 총평하고, 지속가능한 성장을 위해 나아가야 할 가장 중요한 전략적 방향을 1~2문단으로 요약하여 제시해주세요.
        2.  **주요 강점 (Strengths)**: 답변 내용과 점수를 분석하여, 현재 가장 잘하고 있는 ESG 활동 2~3가지를 구체적으로 언급하고 칭찬해주세요.
        3.  **주요 개선 영역 (Weaknesses)**: 가장 시급하게 개선이 필요하거나 잠재적 리스크가 큰 취약점 2~3가지를 지적해주세요.
        4.  **부문별 상세 분석 (Detailed Analysis)**: E, S, G 각 분야별로 나누어 다음을 작성해주세요.
            -   **현황 분석 (Current Status)**: 해당 분야의 답변 내용을 바탕으로 현재 수준을 객관적으로 분석하고 평가해주세요.
            -   **구체적인 개선 제언 (Recommendations)**: 현황 분석을 바탕으로, 실행 가능한 개선 방안을 2~3가지 상세하게 제안해주세요. 제안은 '무엇을(What)', '어떻게(How)'를 포함해야 합니다. **각 제안에 대해 대한민국 중소기업이 참고할 수 있는 타 기업의 우수 사례를 1-2문장으로 구체적으로 추가해주세요.** (예: [사례] A기업은... 하여 ... 효과를 보았습니다.)

        위 지침에 따라, 아래 JSON 스키마 형식에 맞춰 응답을 생성해주세요. 모든 텍스트는 한국어로 작성되어야 합니다.
    `;

    const maxRetries = 2;
    let attempt = 0;

    while (attempt <= maxRetries) {
        try {
            const client = await getAiClient();
            
            const response = await client.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            overallSummary: { type: Type.STRING, description: "진단 결과에 대한 종합적인 전략 제언 및 총평." },
                            strengths: { type: Type.ARRAY, description: "기업의 주요 ESG 강점 2~3가지.", items: { type: Type.STRING } },
                            weaknesses: { type: Type.ARRAY, description: "개선이 시급한 주요 ESG 취약점 2~3가지.", items: { type: Type.STRING } },
                            detailedAnalysis: {
                                type: Type.OBJECT,
                                properties: {
                                    E: {
                                        type: Type.OBJECT,
                                        properties: {
                                            currentStatus: { type: Type.STRING, description: "환경(E) 분야 현황에 대한 상세 분석." },
                                            recommendations: { type: Type.ARRAY, description: "환경(E) 분야에 대한 구체적인 개선 제언 2~3가지.", items: { type: Type.STRING } }
                                        },
                                        required: ["currentStatus", "recommendations"]
                                    },
                                    S: {
                                        type: Type.OBJECT,
                                        properties: {
                                            currentStatus: { type: Type.STRING, description: "사회(S) 분야 현황에 대한 상세 분석." },
                                            recommendations: { type: Type.ARRAY, description: "사회(S) 분야에 대한 구체적인 개선 제언 2~3가지.", items: { type: Type.STRING } }
                                        },
                                         required: ["currentStatus", "recommendations"]
                                    },
                                    G: {
                                        type: Type.OBJECT,
                                        properties: {
                                            currentStatus: { type: Type.STRING, description: "지배구조(G) 분야 현황에 대한 상세 분석." },
                                            recommendations: { type: Type.ARRAY, description: "지배구조(G) 분야에 대한 구체적인 개선 제언 2~3가지.", items: { type: Type.STRING } }
                                        },
                                         required: ["currentStatus", "recommendations"]
                                    }
                                },
                                required: ["E", "S", "G"]
                            }
                        },
                        required: ["overallSummary", "strengths", "weaknesses", "detailedAnalysis"]
                    },
                },
            });
            
            const jsonText = response.text.trim();
            const suggestions = JSON.parse(jsonText);
            return suggestions;

        } catch (error) {
            console.error(`Gemini API 호출 시도 ${attempt + 1} 실패:`, error);
            
            // 503 오류 또는 네트워크 오류인 경우 재시도
            // Fix: GoogleGenAIError is deprecated and no longer exported.
            // The official SDK errors are generic, so we retry on any 'Error' instance,
            // as most API errors are potentially transient.
            if (error instanceof Error) {
                if (attempt < maxRetries) {
                    console.log(`${attempt + 1}차 재시도 대기...`);
                    await new Promise(resolve => setTimeout(resolve, 1000)); // 1초 대기
                    attempt++;
                } else {
                    console.error("최대 재시도 횟수 초과. 최종 실패.");
                    throw error; // 재시도 모두 실패 시 오류를 던짐
                }
            } else {
                 // 재시도할 수 없는 다른 유형의 오류
                throw error;
            }
        }
    }
    // 루프가 어떤 이유로든 끝나면, 기본 오류를 던짐
    throw new Error("AI 제안 생성에 실패했습니다. 알 수 없는 오류입니다.");
};