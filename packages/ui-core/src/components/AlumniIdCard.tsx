import React from "react";
import { AtmaLinkLogo } from "./AtmaLinkLogo";

export interface AlumniIdCardProps {
  name: string;
  memberId: string;
  faculty?: string;
  graduationYear?: string | number;
  avatarUrl?: string;
  status?: "Aktif" | "Non-Aktif" | "Pending";
  validThru?: string;
  onShowBarcode?: () => void;
  className?: string;
}

export const AlumniIdCard: React.FC<AlumniIdCardProps> = ({
  name,
  memberId,
  faculty = "Fakultas Teknik",
  graduationYear = "2018",
  avatarUrl,
  status = "Aktif",
  validThru = "Seumur Hidup",
  onShowBarcode,
  className = "",
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-card-xl p-5 text-neutral-900 border border-emerald-100 shadow-card-elevated ${className}`}
      style={{
        background: "linear-gradient(145deg, #FFFFFF 0%, #F4FBF7 50%, #FFF7ED 100%)",
      }}
    >
      {/* Decorative background watermark */}
      <div className="absolute -right-6 -bottom-8 w-44 h-44 opacity-10 pointer-events-none">
        <AtmaLinkLogo variant="mark" size="100%" />
      </div>

      {/* Top row: Greeting & Status Badge */}
      <div className="flex items-start justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-13 h-13 w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm bg-neutral-200">
              {avatarUrl ? (
                <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-600 to-teal-800 text-white font-bold text-lg">
                  {name.charAt(0)}
                </div>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
              <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div>
            <span className="text-xs font-medium text-neutral-500 block">Halo !</span>
            <h3 className="font-bold text-base text-neutral-900 leading-tight">{name}</h3>
            <span className="text-[11px] text-neutral-500">{faculty} • {graduationYear}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500 text-white shadow-sm">
            {status}
          </span>
          {onShowBarcode && (
            <button
              onClick={onShowBarcode}
              aria-label="Tampilkan Barcode"
              className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition text-neutral-700"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Card Info Details */}
      <div className="mt-5 pt-3 border-t border-neutral-100 flex items-end justify-between relative z-10">
        <div>
          <span className="text-[10px] uppercase font-semibold text-neutral-400 tracking-wider block">Masa Berlaku</span>
          <span className="text-xs font-medium text-neutral-700">{validThru}</span>
        </div>
        <div className="text-right font-mono text-sm tracking-widest font-semibold text-neutral-800">
          {memberId}
        </div>
      </div>
    </div>
  );
};
