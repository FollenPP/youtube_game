import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { useAuthStore } from '../features/auth/authStore';

export function RegisterPage() {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);
  const isLoading = useAuthStore((state) => state.isLoading);
  const apiError = useAuthStore((state) => state.error);

  const [form, setForm] = useState({ email: '', username: '', password: '' });
  const [localError, setLocalError] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLocalError(null);

    if (!form.email || !form.username || !form.password) {
      setLocalError('Пожалуйста, заполните все поля.');
      return;
    }

    try {
      await register(form);
      navigate('/dashboard');
    } catch {
      // no-op, state error is handled in store
    }
  };

  return (
    <AuthLayout title="Регистрация" subtitle="Создайте аккаунт и начните прокачку канала.">
      <form className="space-y-4" onSubmit={onSubmit}>
        <input
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
        />
        <input
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2"
          placeholder="Имя пользователя"
          value={form.username}
          onChange={(event) => setForm((prev) => ({ ...prev, username: event.target.value }))}
        />
        <input
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2"
          placeholder="Пароль"
          type="password"
          value={form.password}
          onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
        />

        {(localError || apiError) && <p className="text-sm text-rose-400">{localError ?? apiError}</p>}

        <button
          className="w-full rounded-lg bg-brand-500 px-4 py-2 font-medium text-white transition hover:bg-violet-500 disabled:opacity-60"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? 'Создание аккаунта...' : 'Зарегистрироваться'}
        </button>

        <p className="text-sm text-slate-300">
          Уже есть аккаунт?{' '}
          <Link className="text-brand-500" to="/login">
            Войти
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
