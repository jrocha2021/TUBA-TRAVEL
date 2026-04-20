import type { Messages } from "@/lib/i18n";

type FooterProps = {
  messages: Messages;
};

export default function Footer({ messages }: FooterProps) {
  return (
    <footer className="mt-8 rounded-[2rem] border border-white/10 bg-black/90 px-6 py-8 text-sm text-white/65 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p>{messages.footer.tagline}</p>
        <p>
          <span className="text-white">{new Date().getFullYear()} {messages.brand.name}</span>.{" "}
          {messages.footer.rights}
        </p>
      </div>
    </footer>
  );
}
