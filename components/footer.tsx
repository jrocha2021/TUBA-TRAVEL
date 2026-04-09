import type { Messages } from "@/lib/i18n";

type FooterProps = {
  messages: Messages;
};

export default function Footer({ messages }: FooterProps) {
  return (
    <footer className="border-t border-black/5 py-8 text-sm text-ink/70">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p>{messages.footer.tagline}</p>
        <p>
          {new Date().getFullYear()} {messages.brand.name}. {messages.footer.rights}
        </p>
      </div>
    </footer>
  );
}
