import type { Lesson } from '@/types/lesson';

// 21 条课程初始数据（完整抽离）
export const initialLessons: Lesson[] = [
  {
    id: "L000",
    date: `${new Date().toISOString().split('T')[0]}T10:00:00Z`,
    type: "Upcoming",
    subject: "Today's Special - Scratch Game Workshop",
    students: ["Ethan", "Ava", "Liam"],
    tutor: "SARAH_TAN",
    status: "Confirmed"
  },
  {
    id: "L001",
    date: "2025-09-05T09:00:00Z",
    type: "Historic",
    subject: "Minecraft Game Design - Level 1",
    students: ["Ethan", "Ava"],
    tutor: "SARAH_TAN",
    status: "Completed"
  },
  {
    id: "L002",
    date: "2025-09-12T11:30:00Z",
    type: "Historic",
    subject: "Scratch Animation Basics",
    students: ["Liam", "Olivia"],
    tutor: "Mike Johnson",
    status: "Completed"
  },
  {
    id: "L003",
    date: "2025-09-19T14:00:00Z",
    type: "Historic",
    subject: "Python for Kids - Variables",
    students: ["Noah", "Emma"],
    tutor: "SARAH_TAN",
    status: "Completed"
  },
  {
    id: "L004",
    date: "2025-09-26T11:15:00Z",
    type: "Upcoming",
    subject: "Roblox Game Creation",
    students: ["Elijah", "Sophia"],
    tutor: "Mike Johnson",
    status: "Confirmed"
  },
  {
    id: "L005",
    date: "2025-09-30T15:45:00Z",
    type: "Available",
    subject: "HTML/CSS for Beginners",
    students: [],
    tutor: null,
    status: "Available"
  },
  {
    id: "L006",
    date: "2025-10-03T09:00:00Z",
    type: "Historic",
    subject: "JavaScript Basics - Functions",
    students: ["Lucas", "Ava"],
    tutor: "SARAH_TAN",
    status: "Completed"
  },
  {
    id: "L007",
    date: "2025-10-10T13:00:00Z",
    type: "Historic",
    subject: "Minecraft Redstone Engineering",
    students: ["Mason", "Olivia"],
    tutor: "Mike Johnson",
    status: "Completed"
  },
  {
    id: "L008",
    date: "2025-10-17T10:30:00Z",
    type: "Upcoming",
    subject: "Python Game Projects - Pong",
    students: ["Ethan", "Emma"],
    tutor: "SARAH_TAN",
    status: "Confirmed"
  },
  {
    id: "L009",
    date: "2025-10-24T14:45:00Z",
    type: "Upcoming",
    subject: "Scratch Game Design - Platformer",
    students: ["Liam", "Sophia"],
    tutor: "Mike Johnson",
    status: "Confirmed"
  },
  {
    id: "L010",
    date: "2025-10-31T16:00:00Z",
    type: "Available",
    subject: "Introduction to AI for Kids",
    students: [],
    tutor: null,
    status: "Available"
  },
  {
    id: "L011",
    date: "2025-11-07T09:30:00Z",
    type: "Historic",
    subject: "Python Data Visualization",
    students: ["Noah", "Ava"],
    tutor: "SARAH_TAN",
    status: "Completed"
  },
  {
    id: "L012",
    date: "2025-11-14T11:00:00Z",
    type: "Historic",
    subject: "Roblox Scripting Basics",
    students: ["Elijah", "Olivia"],
    tutor: "Mike Johnson",
    status: "Completed"
  },
  {
    id: "L013",
    date: "2025-11-21T14:00:00Z",
    type: "Upcoming",
    subject: "JavaScript Game Development - Snake",
    students: ["Lucas", "Emma"],
    tutor: "SARAH_TAN",
    status: "Confirmed"
  },
  {
    id: "L014",
    date: "2025-11-28T15:30:00Z",
    type: "Available",
    subject: "3D Modeling with Tinkercad",
    students: [],
    tutor: null,
    status: "Available"
  },
  {
    id: "L015",
    date: "2025-11-30T10:00:00Z",
    type: "Available",
    subject: "Cybersecurity for Kids",
    students: [],
    tutor: null,
    status: "Available"
  },
  {
    id: "L016",
    date: "2025-12-05T09:00:00Z",
    type: "Upcoming",
    subject: "Minecraft Modding Basics",
    students: ["Mason", "Sophia"],
    tutor: "Mike Johnson",
    status: "Confirmed"
  },
  {
    id: "L017",
    date: "2025-12-12T13:15:00Z",
    type: "Upcoming",
    subject: "Python Machine Learning for Kids",
    students: ["Ethan", "Ava"],
    tutor: "SARAH_TAN",
    status: "Confirmed"
  },
  {
    id: "L018",
    date: "2025-12-19T11:30:00Z",
    type: "Available",
    subject: "Scratch Advanced Animation",
    students: [],
    tutor: null,
    status: "Available"
  },
  {
    id: "L019",
    date: "2025-12-26T14:45:00Z",
    type: "Available",
    subject: "Web Design with Bootstrap",
    students: [],
    tutor: null,
    status: "Available"
  },
  {
    id: "L020",
    date: "2025-12-30T10:30:00Z",
    type: "Available",
    subject: "Game Design Workshop - Final Project",
    students: [],
    tutor: null,
    status: "Available"
  },
{
    id: "L021",
    date: "2025-10-15T14:30:00Z",
    type: "Upcoming",
    subject: "Advanced Python Game Development",
    students: ["Noah", "Emma", "Lucas"],
    tutor: "SARAH_TAN",
    status: "Confirmed"
  },
 {
    id: "L022",
    date: "2026-1-10T10:30:00Z",
    type: "Available",
    subject: "Game Design Workshop - Final Project",
    students: [],
    tutor: 'SARAH_TAN',
    status: "Available"
  }
];