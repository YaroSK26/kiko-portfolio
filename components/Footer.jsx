export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="p-6 border-t text-center text-sm">
      © {currentYear} Felix Gray. All rights reserved.
      <p>Created by  &nbsp;
      <a className="underline"
        href="https://www.jaroslav.website/"
        target="_blank"
        rel="noopener noreferrer"
        >Jaroslav Barabáš</a>
        </p>
    </footer>
  );
}