import { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import HabitForm from './HabitForm';
import HabitList from './HabitList';

function Habits() {
  const [habits, setHabits] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [habitsRes, recordsRes] = await Promise.all([
          axios.get('/api/habits'),
          axios.get('/api/habits-record'),
        ]);
        setHabits(habitsRes.data);
        setRecords(recordsRes.data);
      } catch (err) {
        console.error('Ошибка загрузки:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addHabit = async (name, description) => {
    try {
      const res = await axios.post('/api/habits', { name, description });
      console.log('Response:', res);
      setHabits([...habits, res.data]);
    } catch (err) {
      console.error('Ошибка добавления:', err);
    }
  };

  const deleteHabit = async (id) => {
    if (!window.confirm('Вы уверены, что хотите удалить привычку ?')) return;

    try {
      await axios.delete(`/api/habits/${id}`);
      setHabits(habits.filter((h) => h.id !== id));
      setRecords(records.filter((r) => r.habitId !== id));
    } catch (err) {
      console.error('Ошибка удаления привычки:', err);
      alert('не удалось удалить привычку');
    }
  };

  const editHabit = async (id, updatedData) => {
    try {
      const res = await axios.put(`/api/habits/${id}`, updatedData);
      setHabits(habits.map((h) => (h.id === id ? res.data : h)));
    } catch (err) {
      console.error('Ошибка редактирования:', err);
      alert('Не удалось обновить привычку');
    }
  };

  const toggleCompletion = async (habitId, today) => {
    const existing = records.find((r) => r.habitId === habitId && r.date === today);
    try {
      if (existing) {
        await axios.delete(`/api/habits-record/${existing.id}`);
        setRecords(records.filter((r) => r.id !== existing.id));
      } else {
        const res = await axios.post('/api/habits-record', {
          habitId,
          date: today,
          notes: '',
        });
        setRecords([...records, res.data]);
      }
    } catch (err) {
      console.error('Ошибка отметки:', err);
    }
  };

  if (loading) return <div className='text-center p-4'>Загрузка</div>;

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className='max-w-2xl mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6 text-center'>Трекер привычек</h1>
      <HabitForm onAdd={addHabit} />
      <HabitList
        habits={habits}
        records={records}
        today={today}
        onToggle={toggleCompletion}
        onDeleteHabit={deleteHabit}
        onEdit={editHabit}
      />
    </div>
  );
}

export default Habits;
