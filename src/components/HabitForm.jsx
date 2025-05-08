import { useState } from 'react';

const COLORS = [
  'green', 'blue', 'red', 'purple', 'yellow', 'pink', 'orange',
];

function HabitForm({ onAdd }) {
  const [habit, setHabit] = useState('');
  const [color, setColor] = useState(COLORS[0]);
  const [goal, setGoal] = useState(20);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (habit.trim() === '') {
      alert('Введите название привычки.');
      return;
    }

    if (isNaN(goal) || goal < 1 || goal > 31) {
      alert('Цель должна быть числом от 1 до 31.');
      return;
    }

    onAdd(habit.trim(), color, parseInt(goal));
    setHabit('');
    setColor(COLORS[0]);
    setGoal(20);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 text-white rounded-2xl shadow-md p-4 mb-6 flex flex-wrap items-center gap-3"
    >
      <input
        type="text"
        value={habit}
        onChange={(e) => setHabit(e.target.value)}
        placeholder="Новая привычка..."
        className="flex-grow min-w-[160px] px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {COLORS.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <input
        type="number"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        min={1}
        max={31}
        placeholder="Цель"
        className="w-20 px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl transition transform hover:scale-105 active:scale-95 font-semibold"
      >
        Добавить
      </button>
    </form>
  );
}

export default HabitForm;
