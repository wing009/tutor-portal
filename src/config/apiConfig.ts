import type { Lesson } from '@/types/lesson';
import { initialLessons } from '@/data/initialLessons';

// 🌟 全局数据来源配置（仅在此处修改）
export const API_CONFIG = {
  // 开关：true = 真实接口，false = mock 数据
  USE_API: false,
  // 接口基础地址（从 .env 读取）
  BASE_URL: import.meta.env.VITE_API_BASE_URL
};

// 🌟 抽象数据获取方法（供 Store 调用，隔离所有数据来源逻辑）
export const apiService = {
  // 获取课程列表
  getLessons: async (): Promise<Lesson[]> => {
    if (API_CONFIG.USE_API) {
      // 真实接口逻辑
      if (!API_CONFIG.BASE_URL) {
        throw new Error('VITE_API_BASE_URL is not defined in .env file');
      }
      const response = await fetch(`${API_CONFIG.BASE_URL}/lessons`);
      if (!response.ok) {
        throw new Error(`Failed to fetch lessons: ${response.statusText}`);
      }
      return response.json();
    } else {
      // Mock 数据逻辑（保留原有延迟）
      return new Promise((resolve) => {
        setTimeout(() => resolve(initialLessons), 300);
      });
    }
  }
};