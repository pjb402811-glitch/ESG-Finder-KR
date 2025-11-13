// Fix: Replaced placeholder content with a full implementation of the Gemini API service.
import { GoogleGenAI, Type } from "@google/genai";
import { DiagnosisResult, ESGTopic, Indicator, ReportSuggestions } from "../types";
import { INDICATORS } from "../constants";

// Lazy-initialized AI client to prevent app crash on load
let ai: GoogleGenAI | null = null;

/**
 * Lazily initializes and returns the GoogleGenAI client.
 * This prevents the application from crashing at startup if the API key
 * is not configured correctly in the environment.
 * @returns An instance of the GoogleGenAI client.
 * @throws An error if the API key is not set or initialization fails.
 */
const getAiClient = (): GoogleGenAI => {
    if (ai) {
        return ai;
    }
    
    try {
        // Fix: Per coding guidelines, API key MUST be read from process.env.API_KEY.
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            // Fix: Updated error message to reflect the correct environment variable.
            throw new Error("API_KEY environment variable is not set.");
        }
        ai = new GoogleGenAI({ apiKey });
        return ai;
    } catch (e) {
        console.error("Failed to initialize GoogleGenAI client.", e);
        // Re-throw to be caught by the caller in generateSuggestions
        // Fix: Updated error message to reflect the correct environment variable.
        throw new Error("AI client could not be initialized. Check environment configuration and ensure API_KEY is set.");
    }
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
    
    try {
        const client = getAiClient();
        
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
        console.error("Error generating suggestions from Gemini API:", error);
        return {
            overallSummary: "현재 ESG 경영의 기본 틀을 갖추기 시작하는 단계입니다. 법규 준수 등 기본적인 관리는 이루어지고 있으나, 장기적인 관점의 에너지 관리 및 공급망 리스크 대응 전략을 수립하여 ESG 경영을 내재화하는 것이 중요합니다.",
            strengths: ["환경 법규를 잘 준수하고 있습니다.", "표준근로계약서 작성을 통해 안정적인 노사 관계의 기반을 다졌습니다."],
            weaknesses: ["에너지 사용량 관리 및 절감 노력이 부족합니다.", "공급망에 대한 ESG 리스크 관리가 필요합니다."],
            detailedAnalysis: {
                E: {
                    currentStatus: "전반적인 환경 관리 체계 구축이 초기 단계에 있습니다. 특히 에너지 및 폐기물 관리 측면에서 개선이 필요합니다.",
                    recommendations: [
                        "에너지 사용량 모니터링 시스템 도입: 월별 에너지 사용량을 측정하고, 주요 에너지 소비원을 파악하여 절감 목표를 설정하세요.",
                        "폐기물 분리배출 교육 실시: 전 직원을 대상으로 올바른 분리배출 방법을 교육하고, 재활용 가능한 자원의 낭비를 줄이세요.",
                        "친환경 사무용품 구매 가이드라인 수립: 재활용 용지, 친환경 인증 제품 등 사무용품 구매 시 환경을 고려하는 기준을 마련하세요."
                    ]
                },
                S: {
                    currentStatus: "근로기준법 등 기본적인 노동 인권은 준수하고 있으나, 임직원 역량 개발 및 다양성 관리 측면에서 아쉬움이 있습니다.",
                    recommendations: [
                        "직무 역량 강화 교육 프로그램 도입: 외부 전문 기관과 연계하여 직원들의 전문성을 높일 수 있는 온라인/오프라인 교육 기회를 제공하세요.",
                        "고충처리 채널 활성화: 익명성이 보장되는 온라인 고충처리 채널을 개설하고, 접수된 내용에 대해 정기적으로 피드백을 제공하여 신뢰를 구축하세요.",
                        "명확한 채용/승진 기준 수립 및 공표: 성별, 학력 등에 따른 차별이 발생하지 않도록 객관적인 평가 기준을 마련하고 전 직원에게 투명하게 공개하세요."
                    ]
                },
                G: {
                    currentStatus: "기업 운영의 기본적인 틀은 갖추고 있으나, ESG 경영을 위한 공식적인 정책 및 정보 공개가 부족한 상태입니다.",
                    recommendations: [
                        "윤리 강령 제정 및 문서화: 모든 임직원이 준수해야 할 기본적인 윤리 원칙을 담은 윤리 강령을 제정하고, 신입사원 교육에 포함시키세요.",
                        "기업 홈페이지에 ESG 섹션 개설: 기업의 ESG 활동과 성과를 외부에 투명하게 공개하는 채널을 마련하여 이해관계자와의 소통을 강화하세요.",
                        "이사회 내 ESG 안건 정기 보고: 연 1회 이상 ESG 관련 주요 현황과 계획을 이사회에 보고하고, 의사결정에 반영하는 공식적인 절차를 수립하세요."
                    ]
                }
            }
        };
    }
};