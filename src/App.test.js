import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  window.localStorage.clear();
});

test('adiciona e conclui uma tarefa', () => {
  render(<App />);
  const input = screen.getByLabelText('Nova tarefa');
  fireEvent.change(input, { target: { value: 'Estudar React' } });
  fireEvent.click(screen.getByRole('button', { name: /adicionar tarefa/i }));

  expect(screen.getByText('Estudar React')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /concluir tarefa: estudar react/i }));
  expect(screen.getByRole('button', { name: /reabrir tarefa: estudar react/i })).toBeInTheDocument();
});

test('filtra e remove tarefas', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('tab', { name: 'Concluídas' }));
  expect(screen.getByText('Nada por aqui')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('tab', { name: 'Todas' }));
  fireEvent.click(screen.getByRole('button', { name: /excluir tarefa: conhecer o painel/i }));
  expect(screen.queryByText('Conhecer o painel de tarefas')).not.toBeInTheDocument();
});
