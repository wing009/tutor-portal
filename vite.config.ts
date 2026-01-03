import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteMockServe } from 'vite-plugin-mock';
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
      // 配置 mock 插件
    viteMockServe({
      // mock 文件存放目录
      mockPath: './src/mock',
      // 开发环境启用 mock
      watchFiles:true
    }),


  ],
  server: {
    port: 3000, // 开发服务器端口
    open: true, // 启动后自动打开浏览器
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  
})
