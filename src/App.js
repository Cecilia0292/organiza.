import React from 'react';
import './App.css';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';
import useTasks from './hooks/useTasks';

export default function App() {
  const {
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
  } = useTasks();

  return (
    <div className="app-shell">
      <Header pendingTasks={pendingTasks} />

      <main className="app-content">
        <section className="welcome-section">
          <div>
            <p className="eyebrow">SEU ESPAÇO DE FOCO</p>
            <h1>Olá, vamos organizar o dia?</h1>
            <p className="welcome-copy">
              Pequenos passos todos os dias fazem grandes diferenças.
            </p>
          </div>
          <div className="date-card" aria-label="Data de hoje">
            <span className="date-icon">✦</span>
            <div>
              <strong>Hoje</strong>
              <span>{new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date())}</span>
            </div>
          </div>
        </section>

        <section className="stats-grid" aria-label="Resumo das tarefas">
          <div className="stat-card stat-card-primary">
            <span className="stat-icon">○</span>
            <div><strong>{pendingTasks}</strong><span>pendentes</span></div>
          </div>
          <div className="stat-card">
            <span className="stat-icon success">✓</span>
            <div><strong>{completedTasks}</strong><span>concluídas</span></div>
          </div>
          <div className="stat-card">
            <span className="stat-icon accent">↗</span>
            <div><strong>{tasks.length ? Math.round((completedTasks / tasks.length) * 100) : 0}%</strong><span>de progresso</span></div>
          </div>
        </section>

        <TaskForm onAdd={addTask} />

        <section className="tasks-section">
          <div className="section-heading">
            <div>
              <h2>Minhas tarefas</h2>
              <p>{tasks.length === 0 ? 'Comece adicionando uma tarefa.' : `${tasks.length} ${tasks.length === 1 ? 'tarefa cadastrada' : 'tarefas cadastradas'}`}</p>
            </div>
            {completedTasks > 0 && (
              <button className="text-button" type="button" onClick={clearCompleted}>
                Limpar concluídas
              </button>
            )}
          </div>

          <div className="filter-tabs" role="tablist" aria-label="Filtrar tarefas">
            {[
              ['all', 'Todas'],
              ['pending', 'Pendentes'],
              ['completed', 'Concluídas'],
            ].map(([value, label]) => (
              <button
                className={filter === value ? 'filter-tab active' : 'filter-tab'}
                key={value}
                type="button"
                role="tab"
                aria-selected={filter === value}
                onClick={() => setFilter(value)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="task-list">
            {visibleTasks.length > 0 ? visibleTasks.map((task) => (
              <TaskItem key={task.id} task={task} onToggle={toggleTask} onRemove={removeTask} />
            )) : (
              <div className="empty-state">
                <span>✧</span>
                <strong>Nada por aqui</strong>
                <p>{filter === 'completed' ? 'Você ainda não concluiu tarefas.' : 'Adicione uma tarefa para começar.'}</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer>Feito para deixar sua rotina mais leve <span>♥</span></footer>
    </div>
  );
}
