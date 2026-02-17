import type { ReactNode } from 'react';

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-100">
      <section className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="mt-2 text-sm text-slate-300">{subtitle}</p>
        <div className="mt-6">{children}</div>
      </section>
    </main>
  );
}
