import Image from "next/image";

// Renders both logo variants and lets the `.dark` class pick one, so the right
// logo shows on first paint without waiting for the theme to resolve in JS.
// Preloading is dropped on purpose: it would fetch both files on every page.
export function BrandLogo({
  alt,
  className = "",
  priority,
  preload,
  loading,
  ...props
}) {
  return (
    <>
      <Image
        {...props}
        alt={alt}
        src="/peaceitech_logo.png"
        className={`${className} dark:hidden`}
      />
      <Image
        {...props}
        alt={alt}
        src="/peaceitech_logo_white.png"
        className={`${className} hidden dark:block`}
      />
    </>
  );
}
