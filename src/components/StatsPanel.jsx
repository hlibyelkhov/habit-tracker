import { FaList, FaCheckCircle, FaPercentage } from 'react-icons/fa';

function StatsPanel({ habits }) {
  const total = habits.length;

  const active = habits.filter((h) =>
    Object.values(h.tracker || {}).some(Boolean)
  ).length;

  const avgProgress = habits.length
    ? Math.round(
        habits.reduce((acc, h) => {
          const count = Object.values(h.tracker || {}).filter(Boolean).length;
          const total = 31; // фиксированный месяц
          return acc + count / total;
        }, 0) / habits.length * 100
      )
    : 0;

  const boxClass = "bg-gray-800 rounded-xl p-4 shadow text-center flex flex-col items-center justify-center";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-white">
      <div className={boxClass}>
        <FaList className="text-blue-400 mb-1 text-xl" />
        <div className="text-lg font-semibold">{total}</div>
        <div className="text-sm text-gray-400">Привычек всего</div>
      </div>
      <div className={boxClass}>
        <FaCheckCircle className="text-green-400 mb-1 text-xl" />
        <div className="text-lg font-semibold">{active}</div>
        <div className="text-sm text-gray-400">Активные привычки</div>
      </div>
      <div className={boxClass}>
        <FaPercentage className="text-yellow-400 mb-1 text-xl" />
        <div className="text-lg font-semibold">{avgProgress}%</div>
        <div className="text-sm text-gray-400">Средний прогресс</div>
      </div>
    </div>
  );
}

export default StatsPanel;
