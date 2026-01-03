import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsAuthenticated, useLogin, useCurrentTutor } from '@/stores/tutorPortalStore';
// 导入样式文件
import styles from './Login.module.css';

const Login = () => {
  // 核心修改：设置默认用户名和密码
  const [name, setName] = useState<string>('SARAH_TAN'); // 默认为 SARAH_TAN
  const [password, setPassword] = useState<string>('123456'); // 默认为 123456
  const [error, setError] = useState<string>('');
  
  const isAuthenticated = useIsAuthenticated();
  const login = useLogin();
  const currentTutor = useCurrentTutor();
  const navigate = useNavigate();

  // 已登录则跳转到仪表盘
  useEffect(() => {
    if (isAuthenticated && currentTutor) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, currentTutor, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 简单验证：用户名非空 + 密码长度 ≥6
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // 执行登录逻辑，传入用户名
    login(name.trim());
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.pageTitle}>Tutor Login</h2>
        
        {error && (
          <div className={styles.errorAlert}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* 用户名输入框 */}
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.formLabel}>Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.formInput}
              placeholder="Enter your name"
            />
          </div>

          {/* 密码输入框 */}
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.formInput}
              placeholder="Enter your password"
            />
          </div>

          {/* 登录按钮 */}
          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;