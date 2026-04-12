import { ChevronDown } from "lucide-react";

interface LegalPageLayoutProps {
  title: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

export function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <main className="min-h-screen bg-white">
      {/* Header band */}
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <nav className="text-xs text-slate-400 flex items-center gap-1.5 mb-4">
            <a href="/" className="hover:text-sky-500 transition-colors">Inicio</a>
            <ChevronDown className="h-3 w-3 -rotate-90" />
            <span className="text-slate-600">{title}</span>
          </nav>
          <h1 className="text-3xl font-black text-slate-900">{title}</h1>
          {lastUpdated && (
            <p className="text-sm text-slate-400 mt-1">{lastUpdated}</p>
          )}
        </div>
      </div>

      {/* Content — custom rich-text styles via [&_*] selectors */}
      <div
        className="
          max-w-3xl mx-auto px-4 py-12
          [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-8 [&_h2]:mb-3
          [&_p]:text-slate-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_p]:text-sm
          [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ul>li]:text-slate-600 [&_ul>li]:text-sm [&_ul>li]:mb-1.5
          [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4 [&_ol>li]:text-slate-600 [&_ol>li]:text-sm [&_ol>li]:mb-2
          [&_a]:text-sky-500 [&_a]:font-medium hover:[&_a]:underline
          [&_strong]:text-slate-800 [&_strong]:font-semibold
          [&_hr]:border-slate-200 [&_hr]:my-8
        "
      >
        {children}
      </div>

      {/* Back link */}
      <div className="max-w-3xl mx-auto px-4 pb-16">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-sky-500 hover:text-sky-600 transition-colors"
        >
          <ChevronDown className="h-4 w-4 rotate-90" />
          Volver al inicio
        </a>
      </div>
    </main>
  );
}
