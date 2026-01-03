import type { Lesson } from '@/types/lesson';
import { useTakeAvailableLesson } from '@/stores/tutorPortalStore';
// 导入公共样式（与页面共用 GlobalStyles）
import globalStyles from '@/styles/GlobalStyles.module.css';
// 导入组件专属样式
import styles from './LessonCard.module.css';

// 组件 Props 类型定义（明确传入参数）
interface LessonCardProps {
  lesson: Lesson;
  showAssignButton?: boolean; // 控制是否显示「领取课程」按钮
}

const LessonCard = ({ lesson, showAssignButton = false }: LessonCardProps) => {
  const takeAvailableLesson = useTakeAvailableLesson();

  // 格式化日期（保持与页面一致的显示效果）
  const formatLessonDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  // 领取课程事件（仅当按钮显示且课程类型为 Available 时生效）
  const handleTakeLesson = () => {
   
    if (showAssignButton && lesson.type === 'Available') {
      takeAvailableLesson(lesson.id);
    }
  };

  return (
    <div className={`${globalStyles.cardGridItem} ${styles.lessonCard}`}>
      <h4 className={styles.lessonSubject}>{lesson.subject}</h4>
      <p className={styles.lessonMeta}>
        <strong>Date:</strong> {formatLessonDate(lesson.date)}
      </p>
      <p className={styles.lessonMeta}>
        <strong>Status:</strong> {lesson.status}
      </p>
      {/* 有学生时显示学生列表 */}
      {lesson.students.length > 0 && (
        <p className={styles.lessonMeta}>
          <strong>Students:</strong> {lesson.students.join(', ')}
        </p>
      )}
      {/* 显示领取按钮（仅 Available 状态 + 开启显示开关） */}
      {showAssignButton && lesson.type === 'Available' && (
        <button 
          onClick={handleTakeLesson}
          className={`${globalStyles.filterButton} ${styles.assignButton}`}
        >
          Take Class
        </button>
      )}
    </div>
  );
};

export default LessonCard;