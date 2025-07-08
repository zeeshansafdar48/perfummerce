import { currencyConfig } from '@/config/currencyConfig'

export function formatCurrency(amount: number) {
  return currencyConfig.format(amount)
}
