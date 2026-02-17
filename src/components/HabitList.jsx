import PropTypes from 'prop-types';
import HabitItem from './HabitItem';

function HabitList({ habits, records, today, onToggle, onDeleteHabit, onEdit }) {
  if (habits.length === 0) {
    return <p className="text-gray-500 text-center">Пока нет привычек. Добавьте первую!</p>;
  }

  return (
    <div className="space-y-3">
      {habits.map((habit) => (
        <HabitItem
          key={habit.id}
          habit={habit}
          isCompleted={records.some((r) => r.habitId === habit.id && r.date === today)}
          onToggle={() => onToggle(habit.id, today)}
          onDelete={onDeleteHabit}
          onEdit={onEdit}
          records={records}
        />
      ))}
    </div>
  );
}

HabitList.propTypes = {
  habits: PropTypes.arrayOf(PropTypes.object).isRequired,
  records: PropTypes.arrayOf(
    PropTypes.shape({
      habitId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  today: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
  onDeleteHabit: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default HabitList;
