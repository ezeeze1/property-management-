import React from 'react';
import { Receipt } from '../../types';
import { X, Printer, Download, Building2, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ReceiptModalProps {
  receipt: Receipt | null;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ receipt, onClose }) => {
  if (!receipt) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadText = () => {
    const text = `
====================================================
SAMSON & SON LTD. OFFICIAL RENT RECEIPT
====================================================
Receipt No: ${receipt.receiptNumber}
Issued Date: ${new Date(receipt.issuedAt).toLocaleDateString()}

TENANT DETAILS:
Tenant Name: ${receipt.tenantName}
Property: ${receipt.propertyTitle}

PAYMENT DETAILS:
Amount Paid: ₦${receipt.amountPaid.toLocaleString()}
Payment Method: ${receipt.paymentMethod}
Reference: ${receipt.transactionReference}
Payment Date: ${receipt.paymentDate}

TENANCY COVERAGE:
Period Covered: ${receipt.rentPeriodStart} to ${receipt.rentPeriodEnd}
Next Rent Due Date: ${receipt.nextRentDueDate}

ISSUED BY:
SAMSON & SON LTD.
${receipt.companyInfo.address}
Phone: ${receipt.companyInfo.phone}
Email: ${receipt.companyInfo.email}
====================================================
    `.trim();

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Receipt_${receipt.receiptNumber}.txt`;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white text-slate-900 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-300 printable-receipt">
        
        {/* Controls Bar (Hidden during print) */}
        <div className="flex justify-between items-center pb-4 mb-6 border-b border-slate-200 print:hidden">
          <div className="text-xs font-bold text-amber-600 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Official E-Receipt Document</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" /> Print
            </button>
            <button
              onClick={handleDownloadText}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Download
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-800 rounded-full bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* RECEIPT CANVAS */}
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b-2 border-slate-900">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-slate-900 text-amber-400 rounded-xl flex items-center justify-center font-bold">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold font-serif text-slate-900 tracking-tight">
                  SAMSON & SON LTD.
                </h1>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                  Property Management & Advisory
                </div>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> CONFIRMED RECEIPT
              </div>
              <div className="text-xs font-mono font-bold text-slate-900 mt-1">
                {receipt.receiptNumber}
              </div>
              <div className="text-[11px] text-slate-500">
                Date: {new Date(receipt.issuedAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Details Table */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div className="space-y-1 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Tenant Name</div>
              <div className="text-sm font-bold text-slate-900">{receipt.tenantName}</div>
            </div>

            <div className="space-y-1 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Property Name / Unit</div>
              <div className="text-xs font-bold text-slate-900">{receipt.propertyTitle}</div>
            </div>
          </div>

          {/* Amount Box */}
          <div className="bg-slate-900 text-white p-5 rounded-xl flex justify-between items-center">
            <div>
              <div className="text-[10px] text-amber-400 font-semibold uppercase">Total Amount Paid</div>
              <div className="text-xs text-slate-400 mt-0.5">Method: {receipt.paymentMethod}</div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-serif">
              ₦{receipt.amountPaid.toLocaleString()}
            </div>
          </div>

          {/* Transaction Metadata */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <div className="text-[10px] text-slate-500 font-semibold">Reference No.</div>
              <div className="font-mono font-bold text-slate-900 truncate">{receipt.transactionReference}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 font-semibold">Payment Date</div>
              <div className="font-bold text-slate-900">{receipt.paymentDate}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 font-semibold">Tenancy Start</div>
              <div className="font-bold text-slate-900">{receipt.rentPeriodStart}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 font-semibold">Next Renewal Due</div>
              <div className="font-bold text-amber-600">{receipt.nextRentDueDate}</div>
            </div>
          </div>

          {/* Authorized Signature & Stamp */}
          <div className="pt-6 border-t border-slate-200 flex justify-between items-end text-xs">
            <div className="text-[10px] text-slate-500 space-y-1">
              <div className="font-bold text-slate-800">{receipt.companyInfo.name}</div>
              <div>{receipt.companyInfo.address}</div>
              <div>{receipt.companyInfo.phone} • {receipt.companyInfo.email}</div>
            </div>

            <div className="text-center">
              <div className="w-24 h-12 border-b border-dashed border-slate-400 mx-auto flex items-end justify-center pb-1 text-amber-700 font-serif italic text-xs font-bold">
                Amina Bello ACA
              </div>
              <div className="text-[10px] font-bold text-slate-700 mt-1 uppercase tracking-wider">Authorized Accountant</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
