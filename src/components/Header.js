import React from 'react';

export default function Header({ pendingTasks }) {
  return (
    <header className="topbar">
      <a className="brand" href="/" aria-label="Organiza início">
        <span className="brand-mark">✓</span>
        <span>organiza<span className="brand-dot">.</span></span>
      </a>
      <div className="topbar-status">
        <span className="status-dot" />
        <span>{pendingTasks === 0 ? 'Tudo em dia' : `${pendingTasks} ${pendingTasks === 1 ? 'tarefa pendente' : 'tarefas pendentes'}`}</span>
      </div>
    </header>
  );
}
