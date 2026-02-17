import { useAppStore } from '../store/appStore';

const stageBlocks = [
  {
    title: 'Этап 1',
    description: 'Базовая архитектура проекта, фронтенд, бэкенд и база данных готовы к запуску.'
  },
  {
    title: 'Что дальше',
    description: 'Следующий шаг: регистрация, логин и защищенные маршруты на JWT.'
  }
];

export function HomePage() {
  const appName = useAppStore((state) => state.appName);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <p className="text-sm uppercase tracking-[0.2em] text-brand-500">MVP</p>
        <h1 className="mt-2 text-4xl font-bold">Платформа роста YouTube и Twitch</h1>
        <p className="mt-4 max-w-2xl text-slate-300">
          {appName} — это игровой карьерный режим для авторов контента. Подключайте канал,
          выполняйте задания, получайте опыт и улучшайте реальные метрики.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {stageBlocks.map((block) => (
            <article key={block.title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <h2 className="text-lg font-semibold">{block.title}</h2>
              <p className="mt-2 text-slate-300">{block.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
