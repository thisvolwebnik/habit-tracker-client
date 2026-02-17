/*
 * Вычислить текущую серию выполнений для привычки
 * @param {number} habitId - id привычки
 * @param {Array} records - массив всех записей выполнений
 * @param {string} today - сегодняшняя дата в формате YYYY-MM-DD
 * @returns {number} - длина текущей серии
 * */
export function getCurrentStreak(habitId, record, today) {
  //Фильтруем записи только для этой привычки
  const habitRecords = record
    .filter((r) => r.habitId === habitId)
    .map((r) => r.date)
    .sort((a, b) => b.localeCompare(a));

  if (habitRecords.length === 0) return 0;

  //Проверяем выполнена ли привычка сегодня
  if (habitRecords[0] !== today) return 0;

  let streak = 1;
  let currentDate = new Date(today);

  for (let i = 1; i < habitRecords.length; i++) {
    //Вычисляем предыдущий день
    const prevDate = new Date(currentDate);
    prevDate.setDate(prevDate.getDate() - 1);
    const prevDateStr = prevDate.toISOString().split('T')[0];

    if (habitRecords[i] === prevDateStr) {
      streak++;
      currentDate = prevDate;
    } else {
      break;
    }
  }

  return streak;
}
