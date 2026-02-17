import PropTypes from 'prop-types';
import { useState } from 'react';

function HabitItem({ habit, isCompleted, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(habit.name);
  const [editedDescription, setEditedDescription] = useState(habit.description || '');

  const handleSave = () => {
    if (!editedName.trim()) return;
    onEdit(habit.id, { name: editedName, description: editedDescription });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(habit.name);
    setEditedDescription(habit.description || '');
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="border rounded-lg p-4 shadow-sm bg-white">
        <input
          className="w-full border rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          placeholder="Название привычки"
        />
        <input
          className="w-full border rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          placeholder="Описание привычки"
        />
        <div className="flex gap-2">
          <button
            className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition"
            type="submit"
            onClick={handleSave}
          >
            Сохранить
          </button>
          <button
            className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600 transition"
            type="submit"
            onClick={handleCancel}
          >
            Отмена
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between border rounded-lg p-4 shadow-sm bg-white">
      <div>
        <h3 className="font-semibold text-lg">{habit.name}</h3>
        {habit.description && <p className="text-gray-600">{habit.description}</p>}
      </div>
      <div className="flex gap-2">
        <button
          onClick={onToggle}
          className={`px-4 py-2 rounded text-white transition ${
            isCompleted ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isCompleted ? '✓ Выполнено' : '○ Выполнить'}
        </button>
        <button
          className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600 transition"
          onClick={() => setIsEditing(true)}
        >
          Редактировать
        </button>
        <button
          className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
          type="submit"
          onClick={() => onDelete(habit.id)}
        >
          Удалить
        </button>
      </div>
    </div>
  );
}

HabitItem.propTypes = {
  habit: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  isCompleted: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default HabitItem;
