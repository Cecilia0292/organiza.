import React from 'react';

export default function TaskItem({ task, onToggle, onRemove }) {
  return (
    <article className={task.completed ? 'task-item completed' : 'task-item'}>
      <button
        className="check-button"
        type="button"
        aria-label={task.completed ? `Reabrir tarefa: ${task.title}` : `Concluir tarefa: ${task.title}`}
        aria-pressed={task.completed}
        onClick={() => onToggle(task.id)}
      >
        {task.completed && '✓'}
      </button>
      <span className="task-title">{task.title}</span>
      <button className="remove-button" type="button" aria-label={`Excluir tarefa: ${task.title}`} onClick={() => onRemove(task.id)}>
        ×
      </button>
    </article>
  );
}
