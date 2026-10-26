import { useEffect, useMemo, useState } from 'react';
import { loadTasks, saveTasks } from '../services/taskStorage';

export default function useTasks() {
  const [tasks, setTasks] = useState(loadTasks);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const pendingTasks = tasks.filter((task) => !task.completed).length;
  const completedTasks = tasks.length - pendingTasks;

  const visibleTasks = useMemo(() => {
    if (filter === 'pending') return tasks.filter((task) => !task.completed);
    if (filter === 'completed') return tasks.filter((task) => task.completed);
    return tasks;
  }, [filter, tasks]);

  function addTask(title) {
    setTasks((currentTasks) => [
      ...currentTasks,
      { id: Date.now(), title, completed: false },
    ]);
  }

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function removeTask(taskId) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
  }

  function clearCompleted() {
    setTasks((currentTasks) => currentTasks.filter((task) => !task.completed));
  }

  return {
    tasks,
    filter,
    setFilter,
    pendingTasks,
    completedTasks,
    visibleTasks,
    addTask,
    toggleTask,
    removeTask,
    clearCompleted,
  };
}
