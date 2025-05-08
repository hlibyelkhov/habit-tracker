const COLOR_MAP = {
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500',
    yellow: 'bg-yellow-400',
    pink: 'bg-pink-500',
    orange: 'bg-orange-400',
  };
  
  const TEXT_COLOR_MAP = {
    green: 'text-green-500',
    blue: 'text-blue-500',
    red: 'text-red-500',
    purple: 'text-purple-500',
    yellow: 'text-yellow-400',
    pink: 'text-pink-500',
    orange: 'text-orange-400',
  };
  
  const WEEKDAYS_LABELS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  
  function getCalendarDays() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const result = [];
  
    const firstDay = new Date(year, month, 1);
    const firstOffset = (firstDay.getDay() + 6) % 7;
  
    const lastDate = new Date(year, month + 1, 0).getDate();
  
    for (let i = 0; i < firstOffset; i++) {
      result.push({ iso: null, isEmpty: true });
    }
  
    for (let d = 1; d <= lastDate; d++) {
      const date = new Date(year, month, d);
      const iso = date.toISOString().split('T')[0];
      const shortDate = date.toLocaleDateString('ru-RU', { day: '2-digit' });
      result.push({ iso, shortDate, isEmpty: false });
    }
  
    return result;
  }
  
  function HabitItem({ habit, onToggle, onDelete }) {
    const days = getCalendarDays();
    const colorClass = COLOR_MAP[habit.color] || 'bg-gray-500';
    const textColor = TEXT_COLOR_MAP[habit.color] || 'text-gray-500';
  
    const completedCount = days.reduce((acc, d) =>
      d.iso && habit.tracker?.[d.iso] ? acc + 1 : acc, 0);
  
    const totalDays = days.filter(d => !d.isEmpty).length;
    const percentage = Math.round((completedCount / totalDays) * 100);
    const goalAchieved = completedCount >= habit.goal;
  
    const today = new Date();
    const monthLabel = today.toLocaleDateString('ru-RU', {
      month: 'long',
      year: 'numeric',
    });
  
    return (
      <div className="bg-gray-800 text-white rounded-2xl shadow-xl p-5 relative transition">
        <button
          onClick={() => onDelete(habit.id)}
          className="absolute top-3 right-4 text-red-400 hover:text-red-600 text-sm"
          title="Удалить привычку"
        >
          ✕
        </button>
  
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-3 h-3 rounded-full ${colorClass}`}></div>
          <h3 className="text-lg font-semibold tracking-wide">{habit.title}</h3>
        </div>
  
        <h4 className="text-center font-medium text-sm mb-2 text-gray-300 capitalize">
          {monthLabel}
        </h4>
  
        <div className="grid grid-cols-7 text-xs text-center mb-1 text-gray-400">
          {WEEKDAYS_LABELS.map((label) => (
            <div key={label}>{label}</div>
          ))}
        </div>
  
        <div className="grid grid-cols-7 gap-1 text-xs mb-4">
          {days.map((d, idx) => {
            if (d.isEmpty) {
              return <div key={`empty-${idx}`} className="invisible select-none">--</div>;
            }
  
            const isDone = habit.tracker?.[d.iso];
  
            return (
              <div key={d.iso} className="flex flex-col items-center">
                <div
                  onClick={() => onToggle(habit.id, d.iso)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer transition 
                    ${isDone
                      ? `${colorClass} text-white`
                      : 'bg-gray-700 hover:bg-gray-600'} 
                    border border-gray-600 hover:border-white`}
                  title={d.iso}
                >
                  {isDone ? '✔' : ''}
                </div>
                <span className="text-[10px] mt-0.5 text-gray-400">{d.shortDate}</span>
              </div>
            );
          })}
        </div>
  
        <div className="text-sm mb-1">
          Прогресс: {completedCount} / {totalDays} дней ({percentage}%)
        </div>
  
        <div className="w-full h-2 bg-gray-600 rounded overflow-hidden">
          <div
            className={`h-full ${colorClass} transition-all duration-300`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
  
        <div className="flex justify-end mt-2 text-sm">
          <span>
            🎯 Цель:{' '}
            {goalAchieved ? (
              <span className="text-green-400 font-semibold">Выполнено</span>
            ) : (
              <span className="text-red-400 font-semibold">Нет</span>
            )}
          </span>
        </div>
      </div>
    );
  }
  
  export default HabitItem;
  