import { useState } from 'react';

function HabitForm({ onAdd }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault;
    if (!name.trim()) return;
    onAdd(name, description);
    setName('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
      <input
        className="flex-1 border rounded px-3 py-2 focus:outline-none focus: ring-2 focus: ring-blue-400"
        type="text"
        placeholder="Название привычки"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="flex-1 border rounded px-3 py-2 focus:outline-none focus: ring-2 focus: ring-blue-400"
        type="text"
        placeholder="Описание (необязательно)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        type="submit"
      >
        Добавить
      </button>
    </form>
  );
}

export default HabitForm;
