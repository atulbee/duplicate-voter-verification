import * as React from "react";

export function Table({ className = "", ...props }: React.HTMLAttributes<HTMLTableElement>) {
  return <table className={`w-full caption-bottom text-sm ${className}`} {...props} />;
}
export function TableHeader({ className = "", ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={`[&_tr]:border-b ${className}`} {...props} />;
}
export function TableBody({ className = "", ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={`[&_tr:last-child]:border-0 ${className}`} {...props} />;
}
export function TableFooter({ className = "", ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tfoot className={`bg-zinc-50 font-medium text-zinc-900 ${className}`} {...props} />;
}
export function TableRow({ className = "", ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={`border-b transition-colors hover:bg-zinc-50 ${className}`} {...props} />;
}
export function TableHead({ className = "", ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={`h-10 px-2 text-left align-middle font-medium text-zinc-500 sticky top-0 bg-white ${className}`}
      {...props}
    />
  );
}
export function TableCell({ className = "", ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={`p-2 align-middle ${className}`} {...props} />;
}
export function TableCaption({ className = "", ...props }: React.HTMLAttributes<HTMLElement>) {
  return <caption className={`mt-4 text-sm text-zinc-500 ${className}`} {...props} />;
}
