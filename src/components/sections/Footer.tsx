import { PlayStoreButton } from "@/components/cta/PlayStoreButton";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/config/site";
import { footer, navLinks } from "@/content/landing";

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-sand/50 py-14">
      <Container>
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-earth-700">{footer.blurb}</p>
            <PlayStoreButton location="footer" variant="compact" className="mt-6" />
          </div>
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-3 md:grid-cols-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="font-semibold text-earth-800 hover:text-ink">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-12 space-y-2 border-t border-ink/10 pt-6 text-sm text-earth-700">
          <p>{footer.disclaimer}</p>
          {siteConfig.playStore.status === "live" && (
            <p>Google Play and the Google Play logo are trademarks of Google LLC.</p>
          )}
          <p>© {siteConfig.name}</p>
        </div>
      </Container>
    </footer>
  );
}
