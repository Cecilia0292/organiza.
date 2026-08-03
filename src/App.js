import './App.css';
import React, { useState } from 'react';


export default function App() {

    const [tarefas, setTarefas] = useState([]);
    const [novoTitulo, setNovoTitulo] = useState('');

    function novaTarefa() {
        if(novoTitulo.trim() === '') {
            alert('Digite uma tarefa!');
            return;
        }
        const id = Date.now();
        const novaTarefa = { id, titulo: novoTitulo.trim(), completa: false };
        setTarefas(prev => [...prev, novaTarefa]);
        setNovoTitulo('');
    }

    function concluirTarefa(tarefaId) {
        setTarefas(prev => prev.map(t => t.id === tarefaId ? { ...t, completa: !t.completa } : t));
    }

    return (
        <div className="App">
            <header className='Cabecalho'>
                <h1>Aplicativo de Tarefas</h1>
            </header>

            <div className='NovaTarefa'>
                <textarea
                    placeholder='Digite uma nova tarefa'
                    value={novoTitulo}
                    onChange={e => setNovoTitulo(e.target.value)}
                    rows={2}
                />
                <button type="button" onClick={novaTarefa}>Adicionar tarefa</button>
                <button type="button" onClick={() => setTarefas([])}>Limpar tarefas</button>
            </div>

            <div className='ListaTarefas'>
                <h2>Tarefas Pendentes:</h2>

                {tarefas.filter(tarefa => !tarefa.completa).map(tarefa => (
                    <div key={tarefa.id} className='Tarefa'>
                        <span>{tarefa.titulo}</span>
                        <button type='button' onClick={()=>concluirTarefa(tarefa.id)}>Tarefa concluída?</button>
                    </div>
                ))}
            </div>

            <div className='ListaTarefas'>
                <h2>Tarefas Concluídas:</h2>
                {tarefas.filter(tarefa => tarefa.completa).map(tarefa => (
                    <div key={tarefa.id} className='Tarefa'>
                        <span style={{textDecoration:'line-through'}}>{tarefa.titulo}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}


