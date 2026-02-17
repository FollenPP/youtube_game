import { useEffect } from 'react';
import { useAuthStore } from '../features/auth/authStore';

export function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const fetchMe = useAuthStore((state) => state.fetchMe);
  const logout = useAuthStore((state) => state.logout);
  const error = useAuthStore((state) => state.error);

  useEffect(() => {
    void fetchMe();
  }, [fetchMe]);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <section className="mx-auto max-w-5xl rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-brand-500">Личный кабинет</p>
            <h1 className="mt-2 text-3xl font-bold">Добро пожаловать, {user?.username ?? 'автор'}!</h1>
            <p className="mt-2 text-slate-300">Этап 2 завершен: JWT авторизация и защищенные маршруты работают.</p>
          </div>
          <button
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-500"
            onClick={logout}
            type="button"
          >
            Выйти
          </button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <article className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h2 className="font-semibold">Профиль</h2>
            <p className="mt-2 text-sm text-slate-300">Email: {user?.email ?? '—'}</p>
            <p className="mt-1 text-sm text-slate-300">ID: {user?.id ?? '—'}</p>
          </article>
          <article className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h2 className="font-semibold">Проверка доступа</h2>
            <p className="mt-2 text-sm text-emerald-400">Маршрут защищен и доступен только после входа.</p>
            {error && <p className="mt-2 text-sm text-rose-400">{error}</p>}
          </article>
        </div>
      </section>
    </main>
  );
}
