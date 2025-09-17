import { Header } from '@/components/Header';
import { TemplateCard } from '@/components/TemplateCard';
import { templates } from '@/lib/templates';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-16 md:py-24 text-center">
          <div className="container">
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-primary">
              Create Your Website in Minutes
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Select a professionally designed template, customize it with our AI-powered tools, and download your new website instantly.
            </p>
          </div>
        </section>
        <section className="pb-20">
          <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </section>
      </main>
      <footer className="py-6 border-t bg-muted/50">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Templatify. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
