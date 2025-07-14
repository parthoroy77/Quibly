import { Container } from "@quibly/ui/components/container";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";
import Logo from "../ui/logo";

const Footer = () => {
  const productLinks = [
    { name: "Features", href: "#features" },
    { name: "AI Quiz Generator", href: "#generator" },
    { name: "Live Sessions", href: "#live" },
    { name: "Analytics", href: "#analytics" },
    { name: "Pricing", href: "#pricing" },
  ];

  const resourceLinks = [
    { name: "Documentation", href: "#docs" },
    { name: "Tutorials", href: "#tutorials" },
    { name: "Blog", href: "#blog" },
    { name: "Help Center", href: "#help" },
    { name: "API Reference", href: "#api" },
  ];

  const companyLinks = [
    { name: "About", href: "#about" },
    { name: "Careers", href: "#careers" },
    { name: "Contact", href: "#contact" },
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Terms of Service", href: "#terms" },
  ];

  return (
    <footer className="rounded-3xl border bg-background m-3 mb-0 rounded-b-none ">
      <Container className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 flex flex-col gap-2 justify-start items-start">
            <Logo />
            <p className="text-muted-foreground mb-6 max-w-sm text-sm">
              Quibly empowers educators to transform learning through AI-generated quizzes, real-time analytics, and
              engaging student experiences.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2 font-instrumental-serif">Product</h3>
            <ul className="space-y-2 text-sm">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2 font-instrumental-serif">Resources</h3>
            <ul className="space-y-2 text-sm">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2 font-instrumental-serif">Company</h3>
            <ul className="space-y-2 text-sm">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">© 2025 Quibly. All rights reserved.</p>
          <div className="flex space-x-6 text-sm">
            <a href="#privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#cookies" className="text-muted-foreground hover:text-foreground transition-colors">
              Cookie Settings
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
