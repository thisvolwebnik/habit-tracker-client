import PropTypes from 'prop-types';

function HabitItem({ habit, isCompleted, onToggle, onDelete }) {
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
};

export default HabitItem;
