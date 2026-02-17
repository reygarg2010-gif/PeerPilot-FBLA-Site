export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600">
            © {new Date().getFullYear()} PeerPilot • Math Learning Platform
          </p>
          <p className="text-xs text-slate-500">
            Built for FBLA Website Design
          </p>
        </div>
      </div>
    </footer>
  );
}
