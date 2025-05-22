'use client'; {/*  Ensure this file is client-side */}

import Image from "next/image";
import Link from "next/link";
import { RiGithubFill, RiMenu2Line, RiTwitterXFill } from "@remixicon/react";

import { useIsMobile } from "@/hooks/useIsMobile";  {/*  Corrected import */}
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";  {/*  Corrected import paths */}

{/*  A simple replacement for HeaderLink (using next/link directly) */}
const HeaderLink = ({ text, href, isNew }: { text: string, href: string, isNew?: boolean }) => (
  <Link href={href} className="text-gray-900 hover:text-gray-700">
    {text} {isNew && <span className="text-red-500">New</span>}
  </Link>
);

{/*  A simple theme toggle (light/dark mode toggle) */}
const ThemeToggle = () => {
  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <button tabIndex={0} role="button" onKeyDown={(e) => e.key === "Enter" && {toggleTheme} className="p-2">
      Toggle Theme
    </button>
  );
};

{/*  Navigation links */}
const links = [
  { text: "Layouts", href: "/layouts", isNew: true },
  { text: "Easing Classes", href: "/easings" },
];

export default function Header() {
  const isMobile = useIsMobile();  {/*  Check if the user is on a mobile device */}

  return (
    <header className="relative mb-14">
      <div
        className="before:bg-ring/50 after:bg-ring/50 before:absolute before:-bottom-px before:-left-12 before:z-10 before:-ml-px before:size-[3px] after:absolute after:-right-12 after:-bottom-px after:z-10 after:-mr-px after:size-[3px]"
        aria-hidden="true"
      ></div>
      <div className="mx-auto flex h-[72px] w-full max-w-6xl items-center justify-between gap-3">
        <Link className="shrink-0" href="/" aria-label="Home">
          <span className="sr-only">Origin UI</span>
          <Image
            src="/logo.svg"  {/*  Path for light mode logo */}
            alt="Origin UI logo"
            width={117}
            height={24}
            className="dark:hidden"
            priority={true}
          />
          <Image
            src="/logo-dark.svg"  {/*  Path for dark mode logo */}
            alt="Origin UI logo"
            width={117}
            height={24}
            className="hidden dark:block"
            priority={true}
          />
        </Link>
        <div className="flex items-center">
          {!isMobile (
            <>
              <div className="flex items-center gap-4 md:gap-10">
                {links.map((link) => (
                  <HeaderLink
                    key={link.href}
                    text={link.text}
                    href={link.href}
                    isNew={link.isNew}
                  />
                ))}
              </div>
              <div className="bg-input ms-4 me-4 h-5 w-px md:ms-10" aria-hidden="true"></div>
            </>
          )}
          <div className="flex items-center gap-1">
            {/* Social Links */}
            <a
              className="text-muted-foreground hover:text-foreground/80 focus-visible:border-ring focus-visible:ring-ring/50 inline-flex size-9 items-center justify-center rounded outline-none focus-visible:ring-[3px]"
              href="https:{/* x.com/origin_ui" */}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">Twitter</span>
              <RiTwitterXFill size={20} />
            </a>
            <a
              className="text-muted-foreground hover:text-foreground/80 focus-visible:border-ring focus-visible:ring-ring/50 inline-flex size-9 items-center justify-center rounded outline-none focus-visible:ring-[3px]"
              href="https:{/* github.com/origin-space/originui" */}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">GitHub</span>
              <RiGithubFill size={20} />
            </a>
            {/* Theme Toggle */}
            <ThemeToggle />
            {isMobile (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-muted-foreground hover:text-foreground/80 focus-visible:border-ring focus-visible:ring-ring/50 inline-flex size-9 items-center justify-center rounded outline-none focus-visible:ring-[3px]">
                    <RiMenu2Line size={20} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {links.map((link) => (
                    <DropdownMenuItem key={link.href} className="cursor-pointer focus:bg-transparent focus:underline">
                      <HeaderLink text={link.text} href={link.href} />
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
