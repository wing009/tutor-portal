import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useIsAuthenticated, useLogout, useCurrentTutor } from '@/stores/tutorPortalStore';
// 导入布局样式文件
import styles from './css/Layout.module.css';

const Layout = () => {
  const isAuthenticated = useIsAuthenticated();
  const logout = useLogout();
  const currentTutor = useCurrentTutor();

  // 未认证或无当前导师时，不渲染任何内容
  if (!isAuthenticated || !currentTutor) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.mainContent}>
        {/* 顶部导航栏（欢迎语+退出按钮） */}
        <div className={styles.headerBar}>
          <span className={styles.welcomeText}>
            Welcome, <strong>{currentTutor}</strong>
          </span>
          <button
            onClick={() => logout()}
            className={styles.logoutButton}
          >
            Log out
          </button>
        </div>
        {/* 页面内容容器（Outlet 渲染子页面） */}
        <div className={styles.contentContainer}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;