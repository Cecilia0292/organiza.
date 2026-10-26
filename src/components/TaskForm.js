import React, { useState } from 'react';

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) return;
    onAdd(cleanTitle);
    setTitle('');
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <span className="input-icon">＋</span>
        <input
          aria-label="Nova tarefa"
          placeholder="O que você precisa fazer?"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <button className="primary-button" type="submit">Adicionar tarefa <span>→</span></button>
    </form>
  );
}
