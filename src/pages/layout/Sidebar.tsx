import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaBook, FaCalendarAlt, FaSignOutAlt } from 'react-icons/fa';
import { useLogout } from '@/stores/tutorPortalStore';
// 导入侧边栏样式文件
import styles from './css/Sidebar.module.css';

const Sidebar = () => {
  const logout = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={styles.sidebar}>
      {/* 侧边栏标题 */}
      <div className={styles.sidebarHeader}>
        <h2 className={styles.sidebarTitle}>Tutor Panel</h2>
      </div>

      {/* 菜单列表 */}
      <div className={styles.menuContainer}>
        {/* Home 菜单 */}
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => `${styles.menuLink} ${isActive ? styles.active : ''}`}
          end
        >
          <FaTachometerAlt className={styles.menuIcon} />
          <span>Home</span>
        </NavLink>

        {/* My Courses 菜单 */}
        <NavLink 
          to="/dashboard/my-courses" 
          className={({ isActive }) => `${styles.menuLink} ${isActive ? styles.active : ''}`}
        >
          <FaBook className={styles.menuIcon} />
          <span>My Courses</span>
        </NavLink>

        {/* Reservation 菜单 */}
        <NavLink 
          to="/dashboard/appointments" 
          className={({ isActive }) => `${styles.menuLink} ${isActive ? styles.active : ''}`}
        >
          <FaCalendarAlt className={styles.menuIcon} />
          <span>Reservation</span>
        </NavLink>

        {/* 退出登录按钮 */}
        <button 
          onClick={handleLogout}
          className={styles.logoutButton}
        >
          <FaSignOutAlt className={styles.menuIcon} />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;