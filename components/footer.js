import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full">
      <div className="w-full h-24 mt-12 bg-gray-800 flex flex-col items-center justify-center">
        <div className="text-white">Built by Paul Biberstein</div>
        <div className="text-blue-200 underline">
          <Link href="/">Return to main site</Link>
        </div>
      </div>
    </footer>
  );
}
