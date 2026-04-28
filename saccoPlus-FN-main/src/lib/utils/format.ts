export const formatCurrency = (amount: number, currency = 'RWF'): string =>
  new Intl.NumberFormat('rw-RW', { style: 'currency', currency, minimumFractionDigits: 0 })
    .format(amount);

export const formatDate = (iso: string): string =>
  new Intl.DateTimeFormat('en-RW', { day: '2-digit', month: 'short', year: 'numeric' })
    .format(new Date(iso));

export const formatDateTime = (iso: string): string =>
  new Intl.DateTimeFormat('en-RW', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    .format(new Date(iso));
