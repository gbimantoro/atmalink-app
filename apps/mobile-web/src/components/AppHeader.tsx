import React from "react";
import { Link } from "react-router-dom";
import { AtmaLinkLogo } from "@atmajaya/ui-core";
import { useAuth } from "../context/AuthContext";

interface AppHeaderProps {
  title?: string;
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  searchPlaceholder?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  showSearch = false,
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Cari di AtmaLink...",
  showBack = false,
  onBack,
  rightAction,
}) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-xs">
      {/* Top Brand Bar - Pure White Background with Official Logo */}
      <div className="px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack ? (
            <button
              onClick={onBack || (() => window.history.back())}
              className="p-1.5 -ml-1.5 text-gray-700 hover:bg-gray-50 rounded-full transition-colors active:scale-95"
              aria-label="Kembali"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          ) : null}

          {title ? (
            <div className="flex items-center gap-2">
              <Link to="/" className="flex-shrink-0">
                <AtmaLinkLogo variant="mark" size={32} alt="ATMALINK" />
              </Link>
              <h1 className="text-lg font-bold text-gray-900 tracking-tight">{title}</h1>
            </div>
          ) : (
            <Link to="/" className="inline-flex items-center" title="ATMALINK - Unika Atma Jaya">
              <AtmaLinkLogo variant="horizontal" size={168} alt="ATMALINK Unika Atma Jaya" />
            </Link>
          )}
        </div>

        {/* Right Actions: Notifications & Avatar */}
        <div className="flex items-center gap-2">
          {rightAction ? (
            rightAction
          ) : (
            <>
              {/* Notification Bell */}
              <Link
                to="/news"
                className="relative p-2 text-gray-600 hover:bg-gray-50 rounded-full transition-colors active:scale-95"
                title="Notifikasi"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-white animate-pulse" />
              </Link>

              {/* User Avatar */}
              <Link
                to="/profile"
                className="relative block w-8 h-8 rounded-full overflow-hidden border border-emerald-200 ring-2 ring-emerald-50 active:scale-95 transition-transform"
                title="Lihat Profil"
              >
                {user?.avatar_url ? (
                  <img src={user.avatar_url} alt={user.full_name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary to-emerald-700 text-white font-bold text-xs flex items-center justify-center">
                    {user?.full_name?.charAt(0) || user?.email?.charAt(0)?.toUpperCase() || "A"}
                  </div>
                )}
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Optional Search Bar integrated into Header */}
      {showSearch && (
        <div className="px-4 pb-3 pt-1">
          <div className="relative">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 hover:bg-gray-100/80 focus:bg-white text-sm text-gray-900 placeholder-gray-400 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none"
            />
          </div>
        </div>
      )}
    </header>
  );
};
