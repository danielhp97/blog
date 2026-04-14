interface Props {
  url: string;
  title?: string;
  description?: string;
}

export default function GooglePhotosAlbum({
  url,
  title = "Photo Album",
  description,
}: Props) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group my-8 flex items-center gap-4 rounded-xl border border-border bg-light p-5 shadow-sm transition hover:shadow-md no-underline"
    >
      {/* Google Photos pinwheel icon */}
      <div className="flex-shrink-0">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="24" cy="24" r="24" fill="white" />
          <path d="M24 14a10 10 0 0 1 10 10H14a10 10 0 0 1 10-10z" fill="#EA4335" />
          <path d="M34 24a10 10 0 0 1-10 10V14a10 10 0 0 1 10 10z" fill="#FBBC04" />
          <path d="M24 34a10 10 0 0 1-10-10h20a10 10 0 0 1-10 10z" fill="#34A853" />
          <path d="M14 24a10 10 0 0 1 10-10v20a10 10 0 0 1-10-10z" fill="#4285F4" />
        </svg>
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-0.5 text-xs font-semibold uppercase tracking-wider text-text">
          Google Photos
        </div>
        <div className="truncate font-bold text-dark transition group-hover:text-primary">
          {title}
        </div>
        {description && (
          <div className="mt-0.5 line-clamp-2 text-sm text-text">
            {description}
          </div>
        )}
      </div>

      <div className="flex-shrink-0 text-text transition group-hover:text-primary">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
        </svg>
      </div>
    </a>
  );
}
