'use client';

const modules = [
  {
    title: "Distance's Effect on Magnetic Strength",
    icon: '▶️',
    bg: 'bg-green-600',
  },
  {
    title: 'Criteria B',
    icon: '🧠',
    bg: 'bg-red-500',
  },
  {
    title: 'Criteria C',
    icon: '📘',
    bg: 'bg-gameducation-navy',
  },
  {
    title: 'Strandhoot Quizzes',
    icon: '🎓',
    bg: 'bg-red-600',
  },
];

const FeatureCards = () => {
  return (
    <section className="container mx-auto py-16 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gameducation-navy dark:text-white mb-10">
        Interactive Learning Modules
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4">
        {modules.map((mod, idx) => (
          <div
            key={idx}
            className={`rounded-xl text-white font-semibold p-6 text-lg flex flex-col items-center justify-center shadow-md hover:scale-105 transition cursor-pointer ${mod.bg}`}
          >
            <div className="text-4xl mb-3">{mod.icon}</div>
            <p className="text-center">{mod.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;
