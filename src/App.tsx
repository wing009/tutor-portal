import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '@/pages/login/Login';
import Layout from '@/pages/layout/Layout';
import Dashboard from '@/pages/layout/Dashboard';
// 导入新创建的组件
import MyCourses from '@/pages/lessons/MyCourses';
import Appointments from '@/pages/lessons/Appointments';
import { useIsAuthenticated } from './stores/tutorPortalStore';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useIsAuthenticated();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          {/* 修改：指向 MyCourses 组件 */}
          <Route path="my-courses" element={<MyCourses />} />
          {/* 修改：指向 Appointments 组件 */}
          <Route path="appointments" element={<Appointments />} />
        </Route>
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;