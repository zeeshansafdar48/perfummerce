// Central currency configuration
export const currencyConfig = {
  code: "PKR",
  symbol: "₨",
  locale: "en-PK",
  format(amount: number) {
    return new Intl.NumberFormat(this.locale, {
      style: "currency",
      currency: this.code,
      minimumFractionDigits: 2
    }).format(amount);
  }
};
