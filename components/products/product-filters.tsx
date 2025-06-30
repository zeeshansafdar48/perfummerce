'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { X, Filter } from 'lucide-react'

interface ProductFiltersProps {
  categories: any[]
  brands: any[]
}

export function ProductFilters({ categories, brands }: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [priceRange, setPriceRange] = useState([0, 1000])

  const currentCategory = searchParams.get('category') || ''
  const currentBrand = searchParams.get('brand') || ''
  const currentGender = searchParams.get('gender') || ''
  const currentSearch = searchParams.get('search') || ''

  const genderOptions = [
    { label: 'All', value: '' },
    { label: 'Men', value: 'MEN' },
    { label: 'Women', value: 'WOMEN' },
    { label: 'Unisex', value: 'UNISEX' }
  ]

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    router.push(`/products?${params.toString()}`)
  }

  const clearAllFilters = () => {
    const params = new URLSearchParams()
    if (currentSearch) {
      params.set('search', currentSearch)
    }
    router.push(`/products?${params.toString()}`)
  }

  const hasActiveFilters = currentCategory || currentBrand || currentGender

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </CardTitle>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-red-600 hover:text-red-700"
              >
                Clear All
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Active Filters:</p>
              <div className="flex flex-wrap gap-2">
                {currentCategory && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Category: {categories.find(c => c.slug === currentCategory)?.name}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => updateFilter('category', '')}
                    />
                  </Badge>
                )}
                {currentBrand && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Brand: {brands.find(b => b.slug === currentBrand)?.name}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => updateFilter('brand', '')}
                    />
                  </Badge>
                )}
                {currentGender && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Gender: {genderOptions.find(g => g.value === currentGender)?.label}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => updateFilter('gender', '')}
                    />
                  </Badge>
                )}
              </div>
              <Separator />
            </div>
          )}

          {/* Gender Filter */}
          <div>
            <h3 className="font-medium mb-3">Gender</h3>
            <div className="space-y-2">
              {genderOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`gender-${option.value}`}
                    checked={currentGender === option.value}
                    onCheckedChange={() => updateFilter('gender', option.value)}
                  />
                  <label
                    htmlFor={`gender-${option.value}`}
                    className="text-sm cursor-pointer"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Category Filter */}
          <div>
            <h3 className="font-medium mb-3">Category</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="category-all"
                  checked={!currentCategory}
                  onCheckedChange={() => updateFilter('category', '')}
                />
                <label htmlFor="category-all" className="text-sm cursor-pointer">
                  All Categories
                </label>
              </div>
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.slug}`}
                    checked={currentCategory === category.slug}
                    onCheckedChange={() => updateFilter('category', category.slug)}
                  />
                  <label
                    htmlFor={`category-${category.slug}`}
                    className="text-sm cursor-pointer"
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Brand Filter */}
          <div>
            <h3 className="font-medium mb-3">Brand</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="brand-all"
                  checked={!currentBrand}
                  onCheckedChange={() => updateFilter('brand', '')}
                />
                <label htmlFor="brand-all" className="text-sm cursor-pointer">
                  All Brands
                </label>
              </div>
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand.slug}`}
                    checked={currentBrand === brand.slug}
                    onCheckedChange={() => updateFilter('brand', brand.slug)}
                  />
                  <label
                    htmlFor={`brand-${brand.slug}`}
                    className="text-sm cursor-pointer"
                  >
                    {brand.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Price Range Filter */}
          <div>
            <h3 className="font-medium mb-3">Price Range</h3>
            <div className="space-y-4">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={1000}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const params = new URLSearchParams(searchParams.toString())
                  params.set('minPrice', priceRange[0].toString())
                  params.set('maxPrice', priceRange[1].toString())
                  router.push(`/products?${params.toString()}`)
                }}
                className="w-full"
              >
                Apply Price Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}