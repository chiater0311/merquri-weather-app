import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

import ConfirmationModal from "../ui/ConfirmationModal";

import type { WeatherSearchHistoryItem } from "../../types/weather";
import { formatDateTime } from "../../utils/formatDateTime";

type HistoryListProps = {
  history: WeatherSearchHistoryItem[];
  onSearch: (item: WeatherSearchHistoryItem) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
};

const HistoryList = ({
  history,
  onSearch,
  onDelete,
  onClearAll,
}: HistoryListProps) => {
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  if (history.length === 0) return null;

  return (
    <div className="text-black dark:text-white bg-white/20 dark:bg-[#1A1A1A4D]/70 px-4 py-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xs lg:text-sm font-semibold">Search History</h2>
        {history.length > 1 && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-[11px] underline hover:text-slate-700 dark:hover:text-gray-300 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      <ul className="space-y-2">
        {history.map((item) => (
          <li
            key={item.id}
            className="h-[60px] flex items-center justify-between gap-2 rounded-xl p-5 text-xs lg:text-sm bg-white/50 dark:bg-[#2A2A2A] hover:bg-white/70 dark:hover:bg-[#3A3A3A] transition-colors cursor-pointer"
          >
            <div className="flex flex-col lg:flex-row lg:justify-between w-full">
              <span className="font-medium capitalize">
                {item.city}, {item.country}
              </span>
              <span className="text-xs lg:text-sm text-black dark:text-white/50">
                {item.dt != null && item.timezone != null
                  ? formatDateTime(item.dt, item.timezone)
                  : new Date(item.createdAt).toLocaleString()}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onSearch(item)}
                className="
                          w-[34px] h-[34px] 
                          flex items-center justify-center  
                          rounded-full
                          bg-white 
                          cursor-pointer
                          dark:bg-transparent
                          dark:border dark:border-white/40
                          hover:opacity-80
                          transition
                        "
                aria-label="Search again"
                title="Search again"
              >
                <MagnifyingGlassIcon className="w-4 h-4 text-gray-500 dark:text-white/50" />
              </button>

              <button
                type="button"
                onClick={() => setPendingDeleteId(item.id)}
                className="
                          w-[34px] h-[34px] 
                          flex items-center justify-center
                          rounded-full
                          bg-white 
                          cursor-pointer
                          dark:bg-transparent
                          dark:border dark:border-white/40
                          hover:opacity-80
                          transition
                        "
                aria-label="Delete history"
                title="Delete history"
              >
                <TrashIcon className="w-4 h-4 text-gray-500 dark:text-white/50" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <ConfirmationModal
        open={pendingDeleteId !== null}
        title="Delete history record?"
        message="Are you sure you want to delete this search record? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => {
          if (pendingDeleteId) {
            onDelete(pendingDeleteId);
            setPendingDeleteId(null);
          }
        }}
        onCancel={() => setPendingDeleteId(null)}
      />
    </div>
  );
};

export default HistoryList;
