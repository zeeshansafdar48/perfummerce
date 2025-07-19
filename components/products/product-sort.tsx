"use client"

// Third-party imports
import { useRouter, useSearchParams } from 'next/navigation'

// Component imports
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

/**
 * ProductSort provides a dropdown to sort products by name, price, or date.
 */
export function ProductSort() {
  // Custom hooks
  const router = useRouter()
  const searchParams = useSearchParams()
  // State/derived
  const currentSort = searchParams.get('sort') || 'name'

  // Constants
  const sortOptions = [
    { label: 'Name (A-Z)', value: 'name' },
    { label: 'Price (Low to High)', value: 'price-asc' },
    { label: 'Price (High to Low)', value: 'price-desc' },
    { label: 'Newest First', value: 'newest' },
  ]

  // Functions
  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', value)
    router.push(`/products?${params.toString()}`)
  }

  // Render
  return (
    <Select value={currentSort} onValueChange={handleSortChange}>
      <SelectTrigger className="w-48" aria-label="Sort products">
        <SelectValue placeholder="Sort by..." />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value} aria-label={option.label}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}