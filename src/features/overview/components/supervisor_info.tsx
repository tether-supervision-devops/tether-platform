type SupervisingPhysicianCardProps = {
  name?: string;
  roleLabel?: string;
  phone?: string;
  imageUrl?: string;
  online?: boolean;
};

export function SupervisingPhysicianCard({
  name = "Supervising Physician",
  roleLabel,
  phone,
  imageUrl,
  online = true,
}: SupervisingPhysicianCardProps) {
  return (
    <div
      className="
        w-full max-w-md mx-auto 
        rounded-2xl border border-slate-200 dark:border-slate-800
        bg-white dark:bg-slate-900 shadow-sm 
        p-6 flex flex-col items-center text-center
      "
    >
      {/* Label */}
      <span className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">
        Supervising Physician
      </span>

      {/* Avatar Container */}
      <div className="relative h-24 w-24">
        <img
          src={imageUrl}
          alt={name}
          className="
            h-24 w-24 
            rounded-full 
            object-cover shadow-md
          "
        />

        {/* Status Dot */}
        <div className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 flex items-center justify-center">
          <span
            className="
              h-4 w-4 rounded-full 
              border-2 border-white dark:border-slate-900
              relative right-2
            "
            style={{
              backgroundColor: online ? "#22c55e" : "#9ca3af", // FORCE COLOR (green/gray)
            }}
          >
            {online && (
              <span
                className="
                  absolute inset-0 rounded-full
                  animate-ping
                "
                style={{
                  backgroundColor: "rgba(34, 197, 94, 0.45)", // green halo
                }}
              />
            )}
          </span>
        </div>
      </div>

      {/* Name */}
      <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
        {name}
      </h3>

      {/* Role */}
      {roleLabel && (
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {roleLabel}
        </p>
      )}

      {/* Phone */}
      {phone && (
        <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-400">
          {phone}
        </p>
      )}
    </div>
  );
}