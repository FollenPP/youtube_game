import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-16">
        <p className="text-sm uppercase tracking-[0.2em] text-brand-500">MVP</p>
        <h1 className="text-4xl font-bold">Платформа роста YouTube и Twitch</h1>
        <p className="max-w-2xl text-slate-300">
          Карьерный режим для авторов контента: подключайте канал, выполняйте задания и прокачивайте
          реальные метрики.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link className="rounded-lg bg-brand-500 px-4 py-2 font-medium hover:bg-violet-500" to="/register">
            Регистрация
          </Link>
          <Link className="rounded-lg border border-slate-700 px-4 py-2 hover:border-slate-500" to="/login">
            Вход
          </Link>
        </div>
      </section>
    </main>
  );
}
