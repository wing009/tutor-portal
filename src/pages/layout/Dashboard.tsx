import { useEffect, useMemo } from 'react';
import { 
  useLessons, 
  useIsLoading, 
  useError, 
  useFetchLessons, 
  useFilters,
  useSetFilters,
  useResetFilters,
  useCurrentTutor
} from '@/stores/tutorPortalStore';
import   LessonCard  from '@/pages/components/LessonCard';
import type { Lesson } from '@/types/lesson';
// 导入公共样式 + 本页专属样式
import globalStyles from '@/styles/GlobalStyles.module.css';
import styles from './css/Dashboard.module.css';

const Dashboard = () => {
  const lessons = useLessons();
  const isLoading = useIsLoading();
  const error = useError();
  const fetchLessons = useFetchLessons();
  const filters = useFilters();
  const setFilters = useSetFilters();
  const resetFilters = useResetFilters();
  const currentTutor = useCurrentTutor();

  // 步骤1：导师过滤 - 只显示当前导师的课程 + 可选课程（未分配）
  const filteredByTutor = useMemo(() => {
    if (!lessons || lessons.length === 0 || !currentTutor) return [];
    return lessons.filter((lesson: Lesson) => {
    //  return lesson.status === 'Available' || lesson.tutor === currentTutor;
     return  lesson.tutor === currentTutor;
    });
  }, [lessons, currentTutor]);

  // 步骤2：月份过滤 - 默认显示所有，选择后过滤（基于导师过滤后的结果）
  const filteredByMonth = useMemo(() => {
    if (!filteredByTutor || filteredByTutor.length === 0) return [];
    if (!filters.selectedMonth) {
      return filteredByTutor; // 默认显示所有月份
    } else {
      return filteredByTutor.filter((lesson: Lesson) => {
        const lessonMonth = lesson.date.split('T')[0].slice(0, 7);
        return lessonMonth === filters.selectedMonth;
      });
    }
  }, [filteredByTutor, filters.selectedMonth]);

  // 步骤3：今日日期计算
  const today = useMemo(() => {
    return new Date().toISOString().split('T')[0];
  }, []);

  // 步骤4：按 type 分类四个板块
  // 今日课程：今日日期 + 导师过滤

  const todayLessons = useMemo(() => {
    if (!filteredByTutor || filteredByTutor.length === 0) return [];
    return filteredByTutor.filter((lesson: Lesson) => {
      const lessonDate = lesson.date.split('T')[0];
      const lessonMonth = lessonDate.slice(0, 7); // 新增：提取课程月份
      // 原有条件 + 新增月份过滤条件
      return lesson.status === 'Confirmed' && lessonDate === today && (filters.selectedMonth ? lessonMonth === filters.selectedMonth : true);
    });
  }, [filteredByTutor, today, filters.selectedMonth]); // 新增依赖：filters.selectedMonth

  // 历史课程：Completed + 月份过滤
  const historicLessons = useMemo(() => {
    return filteredByMonth.filter((lesson: Lesson) => lesson.type === 'Historic');
  }, [filteredByMonth]);

  // 即将到来：Upcoming + 非今日 + 月份过滤
  const upcomingLessons = useMemo(() => {
    return filteredByMonth.filter((lesson: Lesson) => {
      const lessonDate = lesson.date.split('T')[0];
      return lesson.type === 'Upcoming' && lessonDate !== today;
    });
  }, [filteredByMonth, today]);

  // 可选课程：Available + 月份过滤
  const availableLessons = useMemo(() => {
    return filteredByMonth.filter((lesson: Lesson) => lesson.type === 'Available');
  }, [filteredByMonth]);

  // 加载课程数据
  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

  // 加载中/错误提示（使用公共样式）
  if (isLoading) return <div className={globalStyles.loadingError}>Loading lessons...</div>;
  if (error) return <div className={`${globalStyles.loadingError} ${globalStyles.errorText}`}>{error}</div>;

  return (
    <div className={`${globalStyles.pageContainer} ${styles.pageContainer}`}  lang="en">
      {/* 月份筛选栏（使用公共样式） */}
      <div className={globalStyles.filterBar}>
        <label className={globalStyles.filterLabel}>Filter by Month:</label>
        <input 
          type="month"
          value={filters.selectedMonth || ""} 
          onChange={(e) => setFilters({ selectedMonth: e.target.value || null })}
          className={globalStyles.filterInput} 
          lang="en"
        />

        <button 
          onClick={resetFilters}
          className={globalStyles.filterButton}
        >
          Reset Filter
        </button>
      </div>

      {/* 今日课程板块（公共样式 + 本页专属边框样式） */}
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

      {/* 历史课程板块（公共样式 + 本页专属边框样式） */}
      <div className={globalStyles.section}>
        <h3 className={`${globalStyles.sectionTitle} ${styles.historicTitle}`}>
          📜 Historic Lessons ({historicLessons.length})
        </h3>
        {historicLessons.length === 0 ? (
          <div className={globalStyles.emptyState}>No completed lessons found.</div>
        ) : (
          <div className={globalStyles.cardGrid}>
            {historicLessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        )}
      </div>

      {/* 即将到来的课程板块（公共样式 + 本页专属边框样式） */}
      <div className={globalStyles.section}>
        <h3 className={`${globalStyles.sectionTitle} ${styles.upcomingTitle}`}>
          📆 Upcoming Lessons ({upcomingLessons.length})
        </h3>
        {upcomingLessons.length === 0 ? (
          <div className={globalStyles.emptyState}>No confirmed upcoming lessons found.</div>
        ) : (
          <div className={globalStyles.cardGrid}>
            {upcomingLessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        )}
      </div>

      {/* 可选课程板块（公共样式 + 本页专属边框样式） */}
      <div className={globalStyles.section}>
        <h3 className={`${globalStyles.sectionTitle} ${styles.availableTitle}`}>
          🎯 Available Lessons ({availableLessons.length})
        </h3>
        {availableLessons.length === 0 ? (
          <div className={globalStyles.emptyState}>No available lessons to assign.</div>
        ) : (
          <div className={globalStyles.cardGrid}>
            {availableLessons.map((lesson) => (
              <LessonCard 
                key={lesson.id} 
                lesson={lesson} 
                showAssignButton={true} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;