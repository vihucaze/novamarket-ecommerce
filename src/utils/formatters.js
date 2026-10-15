export function formatCurrency(amount) {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '$0';
  }
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(amount);
}
