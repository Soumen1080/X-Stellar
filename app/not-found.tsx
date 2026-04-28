import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative bg-[#F6F6F6]">
      {/* Background grid */}
      <div className="absolute inset-0 bg-hero-grid bg-[length:40px_40px] opacity-60" />
      <div className="absolute inset-0 bg-radial-lime" />

      <div className="relative z-10 text-center px-4">
        <h1 className="text-[8rem] sm:text-[12rem] font-black leading-none text-gradient-lime opacity-80">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0F0F14] -mt-4 mb-3">
          Page not found
        </h2>
        <p className="text-[#888] mb-10 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="btn-dark px-6 py-3 text-sm"
          >
            Go Home
          </Link>
          <Link
            href="/dashboard"
            className="btn-secondary px-6 py-3 text-sm"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
