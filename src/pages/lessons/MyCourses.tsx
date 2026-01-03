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
import styles from './css/MyCourses.module.css';

const MyCourses = () => {
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

  // 今日课程：Confirmed + 今日日期
  const todayLessons = useMemo(() => {
    return filteredByTutor.filter((lesson: Lesson) => {
      const lessonDate = lesson.date.split('T')[0];
      return lesson.status === 'Confirmed' && lessonDate === today;
    });
  }, [filteredByTutor, today]);

  // 历史课程：Completed
  const historicLessons = useMemo(() => {
    return filteredByTutor.filter((lesson: Lesson) => lesson.status === 'Completed');
  }, [filteredByTutor]);

  // 加载课程数据
  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

  // 加载中/错误提示（使用公共样式）
  if (isLoading) return <div className={globalStyles.loadingError}>Loading courses...</div>;
  if (error) return <div className={`${globalStyles.loadingError} ${globalStyles.errorText}`}>{error}</div>;

  return (
    <div className={globalStyles.pageContainerSlim}>
      <h2 className={globalStyles.pageTitle}>My Course</h2>

      {/* 今日课程板块（公共样式 + 专属边框） */}
      <div className={globalStyles.section}>
        <h3 className={`${globalStyles.sectionTitle} ${styles.todayTitle}`}>
          📅 Today's Lessons ({todayLessons.length})
        </h3>
        {todayLessons.length === 0 ? (
          <div className={globalStyles.emptyState}>
            No confirmed lessons scheduled for today.
          </div>
        ) : (
          <div className={globalStyles.cardGrid}>
            {todayLessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        )}
      </div>

      {/* 历史课程板块（公共样式 + 专属边框） */}
      <div className={globalStyles.section}>
        <h3 className={`${globalStyles.sectionTitle} ${styles.historicTitle}`}>
          📜 Historic Lessons ({historicLessons.length})
        </h3>
        {historicLessons.length === 0 ? (
          <div className={globalStyles.emptyState}>暂无历史课程</div>
        ) : (
          <div className={globalStyles.cardGrid}>
            {historicLessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;