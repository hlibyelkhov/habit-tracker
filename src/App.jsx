import { useEffect, useState } from 'react';
import HabitForm from './components/HabitForm';
import HabitItem from './components/HabitItem';
import StatsPanel from './components/StatsPanel';

function App() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('habits');
    if (saved) setHabits(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const handleAddHabit = (title, color, goal) => {
    const newHabit = {
      id: Date.now(),
      title,
      color,
      goal,
      tracker: {},
    };
    setHabits([...habits, newHabit]);
  };

  const handleToggleDay = (habitId, date) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === habitId
          ? {
              ...habit,
              tracker: {
                ...habit.tracker,
                [date]: !habit.tracker?.[date],
              },
            }
          : habit
      )
    );
  };

  const handleDeleteHabit = (id) => {
    const confirmDelete = window.confirm('Удалить привычку?');
    if (!confirmDelete) return;
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  return (
    <div className="min-h-screen bg-background text-white font-sans px-4 py-6 md:px-10 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center tracking-wide">
          Трекер Привычек
        </h1>

        <HabitForm onAdd={handleAddHabit} />
        <StatsPanel habits={habits} />

        <ul className="space-y-6">
          {habits.map((habit) => (
            <li key={habit.id}>
              <HabitItem
                habit={habit}
                onToggle={handleToggleDay}
                onDelete={handleDeleteHabit}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
