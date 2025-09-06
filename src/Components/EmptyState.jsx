/* EmptyState.jsx */
import React from "react";

export default function EmptyState({
  title = "Nothing here",
  message = "We couldn’t find any data to display.",
  icon,
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center text-center bg-base-200 rounded-2xl p-10 shadow-md max-w-md">
        <div className="mb-4">
          {icon ? (
            icon
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-primary mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 17v-2h6v2m-6-8h6m2 13H7a2 2 0 01-2-2V5a2 2 0 012-2h3l2-2h2l2 2h3a2 2 0 012 2v13a2 2 0 01-2 2z"
              />
            </svg>
          )}
        </div>

        <h2 className="text-xl font-semibold text-base-content">{title}</h2>
        <p className="text-base-content/70 mt-2">{message}</p>

        {actionLabel && (
          <button onClick={onAction} className="btn btn-primary mt-6">
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
