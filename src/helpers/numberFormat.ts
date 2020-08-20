import numbro from 'numbro';

// define a language
numbro.registerLanguage({
  languageTag: 'pt-BR',
  delimiters: {
    thousands: '.',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'k',
    million: 'm',
    billion: 'b',
    trillion: 't',
  },
  ordinal: number => {
    return number === 1 ? 'er' : 'ème';
  },
  currency: {
    symbol: 'R$ ',
    position: 'prefix',
    code: 'BRL',
  },
  currencyFormat: {
    thousandSeparated: true,
    totalLength: 4,
    spaceSeparated: true,
    average: true,
  },
  formats: {
    fourDigits: {
      totalLength: 4,
      spaceSeparated: true,
      average: true,
    },
    fullWithTwoDecimals: {
      output: 'currency',
      mantissa: 2,
      spaceSeparated: true,
      thousandSeparated: true,
    },
    fullWithTwoDecimalsNoCurrency: {
      mantissa: 2,
      thousandSeparated: true,
    },
    fullWithNoDecimals: {
      output: 'currency',
      spaceSeparated: true,
      thousandSeparated: true,
      mantissa: 0,
    },
  },
});

/**
 * Format number pattern pt-BR
 * @param value
 * @param maximumFractionDigits
 * @returns {string}
 */
function numberFormat(value: string | number | null | undefined, maximumFractionDigits = 2): string {
  if (typeof value === 'string' && value !== '') value = parseFloat(value);

  value = !value ? 0 : value;

  return numbro(value).format({
    mantissa: maximumFractionDigits,
    thousandSeparated: true,
  });
}

/**
 * Format currency pattern pt-BR
 * @param value
 * @param maximumFractionDigits
 * @returns {string}
 */
function moneyFormat(value: string | number | null | undefined, maximumFractionDigits = 2): string {
  if (typeof value === 'string' && value !== '') value = parseFloat(value);

  value = !value ? 0 : value;

  numbro.setLanguage('pt-BR');

  return numbro(value).formatCurrency({
    mantissa: maximumFractionDigits,
    thousandSeparated: true,
  });
}

/**
 * Format percent number pattern pt-BR
 * @param value
 * @param maximumFractionDigits
 * @returns {string}
 */
function percentFormat(value: string | number | null, maximumFractionDigits = 2): string {
  if (typeof value === 'string') value = parseFloat(value);

  value = !value ? 0 : value;

  return (
    value.toLocaleString('pt-BR', {
      maximumFractionDigits: maximumFractionDigits,
    }) + '%'
  );
}

export { moneyFormat, numberFormat, percentFormat };
