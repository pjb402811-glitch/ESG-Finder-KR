import { DiagnosisResult } from '../types';

const DIAGNOSIS_STORAGE_KEY = 'esg_diagnoses';
const USAGE_STORAGE_KEY = 'esg_usage_tracker';
export const DAILY_LIMIT = 10;

// --- Usage Tracking ---

const getTodayString = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0]; // YYYY-MM-DD
};

interface UsageData {
  date: string;
  count: number;
}

export const getUsageCount = (): number => {
  try {
    const storedUsage = localStorage.getItem(USAGE_STORAGE_KEY);
    if (storedUsage) {
      const usageData: UsageData = JSON.parse(storedUsage);
      if (usageData.date === getTodayString()) {
        return usageData.count;
      }
    }
    return 0;
  } catch (error) {
    console.error("Failed to get usage count from localStorage", error);
    return 0;
  }
};

export const incrementUsageCount = (): void => {
  try {
    const today = getTodayString();
    const currentCount = getUsageCount();

    const newUsageData: UsageData = {
      date: today,
      count: currentCount + 1
    };
    localStorage.setItem(USAGE_STORAGE_KEY, JSON.stringify(newUsageData));
  } catch (error) {
    console.error("Failed to increment usage count in localStorage", error);
  }
};

export const isLimitReached = (): boolean => {
  return getUsageCount() >= DAILY_LIMIT;
};


// --- Diagnosis Data (localStorage) ---

export const saveDiagnosis = (result: DiagnosisResult): void => {
  try {
    // The history feature is not implemented, so we only save the latest result
    // to avoid accumulating unused data in localStorage.
    localStorage.setItem(DIAGNOSIS_STORAGE_KEY, JSON.stringify([result]));
  } catch (error) {
    console.error("Failed to save diagnosis to localStorage", error);
  }
};

// Fix: Added the getDiagnoses function back to support the HistoryPage component.
export const getDiagnoses = (): DiagnosisResult[] => {
  try {
    const storedData = localStorage.getItem(DIAGNOSIS_STORAGE_KEY);
    if (storedData) {
      return JSON.parse(storedData) as DiagnosisResult[];
    }
    return [];
  } catch (error) {
    console.error("Failed to get diagnoses from localStorage", error);
    return [];
  }
};

// savePerformanceData and getPerformanceData are removed as they are unused.

export const clearAllData = (): void => {
  try {
    localStorage.removeItem(DIAGNOSIS_STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear data from localStorage", error);
  }
};