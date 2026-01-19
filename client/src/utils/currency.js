export const formatCurrency = (amount, currency = 'RUB', locale = 'ru-RU') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    currencyDisplay: 'narrowSymbol' // 'symbol', 'narrowSymbol', 'code', 'name'
  }).format(amount);
};
