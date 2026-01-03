import { useEffect, useMemo } from 'react';
import {
  useLessons,
  useIsLoading,
  useError,
  useFetchLessons,
  useCurrentTutor
} from '@/stores/tutorPortalStore';
import type { Lesson } from '@/types/lesson';
// 导入公共组件和样式
import   LessonCard  from '@/pages/components/LessonCard';
import globalStyles from '@/styles/GlobalStyles.module.css';
import styles from './css/Appointments.module.css';

const Appointments = () => {
  const lessons = useLessons();
  const isLoading = useIsLoading();
  const error = useError();
  const fetchLessons = useFetchLessons();
  const currentTutor = useCurrentTutor();

  // 过滤当前导师的课程
  const filteredByTutor = useMemo(() => {
    if (!lessons || !currentTutor) return [];
    return lessons.filter((lesson: Lesson) => lesson.tutor === currentTutor);
  }, [lessons, currentTutor]);

  // 今日日期计算
  const today = useMemo(() => {
    return new Date().toISOString().split('T')[0];
  }, []);

  // 即将到来的课程：Confirmed + 非今日
  const upcomingLessons = useMemo(() => {
    return filteredByTutor.filter((lesson: Lesson) => {
      const lessonDate = lesson.date.split('T')[0];
      return lesson.status === 'Confirmed' && lessonDate !== today;
    });
  }, [filteredByTutor, today]);

  // 加载课程数据
  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

  // 加载中/错误提示（使用公共样式）
  if (isLoading) return <div className={globalStyles.loadingError}>Loading appointments...</div>;
  if (error) return <div className={`${globalStyles.loadingError} ${globalStyles.errorText}`}>{error}</div>;

  return (
    <div className={globalStyles.pageContainerSlim}>
      <h2 className={globalStyles.pageTitle}>Appointments</h2>

      {/* 未来预约课程板块（公共样式 + 专属边框） */}
      <div className={globalStyles.section}>
        <h3 className={`${globalStyles.sectionTitle} ${styles.sectionTitle}`}>
          📆 Upcoming Appointments ({upcomingLessons.length})
        </h3>
        {upcomingLessons.length === 0 ? (
          <div className={globalStyles.emptyState}>No upcoming appointments</div>
        ) : (
          <div className={globalStyles.cardGrid}>
            {upcomingLessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;