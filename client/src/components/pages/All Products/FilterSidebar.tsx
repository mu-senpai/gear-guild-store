'use client'

import { Card, Radio, Button, Divider, Space, Badge } from 'antd'
import { ClearOutlined, CheckOutlined } from '@ant-design/icons'

interface FilterState {
    searchTerm: string
    category: string
    sortBy: string
    page: number
    limit: number
}

interface FilterSidebarProps {
    filters: {
        category: string
        sortBy: string
    }
    onFilterChange: (key: keyof FilterState, value: string | number) => void
    onResetFilters: () => void
    productsCount: number
    isMobile?: boolean
    onClose?: () => void
}

export function FilterSidebar({
    filters,
    onFilterChange,
    onResetFilters,
    productsCount,
    isMobile = false,
    onClose
}: FilterSidebarProps) {
    const categories = [
        { value: '', label: 'All Categories', count: productsCount },
        { value: 'Mobiles', label: 'Mobile Phones', count: 0 },
        { value: 'Laptops', label: 'Laptops', count: 0 },
        { value: 'Accessories', label: 'Accessories', count: 0 }
    ]

    const sortOptions = [
        { value: 'price-asc', label: 'Price: Low to High' },
        { value: 'price-desc', label: 'Price: High to Low' },
        { value: 'name-asc', label: 'Name: A to Z' },
        { value: 'name-desc', label: 'Name: Z to A' },
        { value: 'newest', label: 'Newest First' }
    ]

    const hasActiveFilters = filters.category !== '' || filters.sortBy !== 'price-asc'

    const handleApplyFilters = () => {
        if (isMobile && onClose) {
            onClose()
        }
    }

    return (
        <Card className="!border !rounded-2xl !shadow-sm p-6">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h3 className="text-xl sm:text-2xl font-semibold text-slate-900">Filters</h3>
                    {hasActiveFilters && (
                        <Button
                            type="text"
                            icon={<ClearOutlined />}
                            onClick={onResetFilters}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            size="small"
                        >
                            Clear All
                        </Button>
                    )}
                </div>

                {/* Results Count */}
                <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-700">
                        <span className="font-semibold">{productsCount}</span> products found
                    </p>
                </div>

                <Divider className="my-4" />

                {/* Categories */}
                <div>
                    <h4 className="font-semibold text-slate-800 mb-3">Categories</h4>
                    <Radio.Group
                        value={filters.category}
                        onChange={(e) => onFilterChange('category', e.target.value)}
                        className="w-full"
                    >
                        <Space direction="vertical" className="w-full">
                            {categories.map((category) => (
                                <Radio key={category.value} value={category.value} className="w-full">
                                    <div className="flex items-center gap-3 w-full">
                                        <span>{category.label}</span>
                                        {category.value === filters.category && (
                                            <Badge
                                                count={category.count}
                                                style={{ backgroundColor: '#3b82f6' }}
                                                size="small"
                                            />
                                        )}
                                    </div>
                                </Radio>
                            ))}
                        </Space>
                    </Radio.Group>
                </div>

                <Divider className="my-4" />

                {/* Sort Options */}
                <div>
                    <h4 className="font-semibold text-slate-800 mb-3">Sort By</h4>
                    <Radio.Group
                        value={filters.sortBy}
                        onChange={(e) => onFilterChange('sortBy', e.target.value)}
                        className="w-full"
                    >
                        <Space direction="vertical" className="w-full">
                            {sortOptions.map((option) => (
                                <Radio key={option.value} value={option.value} className="w-full">
                                    {option.label}
                                </Radio>
                            ))}
                        </Space>
                    </Radio.Group>
                </div>

                {/* Mobile Apply Button */}
                {isMobile && (
                    <>
                        <Divider className="my-4" />
                        <div className="flex gap-3">
                            <Button
                                type="primary"
                                icon={<CheckOutlined />}
                                onClick={handleApplyFilters}
                                size="large"
                                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 border-0"
                            >
                                Apply Filters
                            </Button>
                            <Button
                                onClick={onResetFilters}
                                size="large"
                                className="flex-1"
                            >
                                Reset
                            </Button>
                        </div>
                    </>
                )}

                {/* Filter Summary */}
                {hasActiveFilters && !isMobile && (
                    <>
                        <Divider className="my-4" />
                        <div className="bg-slate-50 p-3 rounded-lg">
                            <h5 className="text-sm font-medium text-slate-700 mb-2">Active Filters:</h5>
                            <div className="space-y-1">
                                {filters.category && (
                                    <div className="text-xs text-slate-600">
                                        Category: <span className="font-medium">{filters.category}</span>
                                    </div>
                                )}
                                {filters.sortBy !== 'price-asc' && (
                                    <div className="text-xs text-slate-600">
                                        Sort: <span className="font-medium">
                                            {sortOptions.find(opt => opt.value === filters.sortBy)?.label}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Card>
    )
}