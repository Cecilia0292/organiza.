const STORAGE_KEY = 'organiza-tarefas';

export const initialTasks = [
  { id: 1, title: 'Conhecer o painel de tarefas', completed: false },
  { id: 2, title: 'Criar uma rotina mais organizada', completed: false },
];

export function loadTasks() {
  try {
    const savedTasks = window.localStorage.getItem(STORAGE_KEY);
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  } catch (error) {
    console.error('Não foi possível carregar as tarefas salvas.', error);
    return initialTasks;
  }
}

export function saveTasks(tasks) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
