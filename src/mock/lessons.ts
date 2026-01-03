import type { MockMethod } from 'vite-plugin-mock';
import { initialLessons } from '@/data/initialLessons';

// Mock 配置
export default [
  {
    url: '/api/lessons', // 真实接口 URL（业务层直接请求此地址）
    method: 'get', // 请求方法
    timeout: 300, // 模拟延迟时间
    response: () => {
      // 返回 Mock 数据：直接使用你现有的 initialLessons
      return {
        code: 200,
        message: 'success',
        data: initialLessons,
      };
    },
  }
] as MockMethod[];