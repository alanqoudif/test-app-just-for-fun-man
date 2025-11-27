const currencyFormatter = new Intl.NumberFormat('ar-SA', {
  style: 'currency',
  currency: 'SAR'
});

export const formatCurrency = (value: number) => currencyFormatter.format(value);

export const generatePickupCode = () => Math.random().toString(36).substring(2, 6).toUpperCase();
