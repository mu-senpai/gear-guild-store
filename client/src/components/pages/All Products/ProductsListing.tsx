'use client'

import { useState, useEffect } from 'react'
import { Row, Col, Drawer } from 'antd'
import { motion } from 'framer-motion'
import { SearchBar } from './SearchBar'
import { FilterSidebar } from './FilterSidebar'
import { ProductsGrid } from './ProductsGrid'
import { useGetProductsQuery } from '@/redux/api/product/productApi'

interface FilterState {
    searchTerm: string
    category: string
    sortBy: string
    page: number
    limit: number
}

export function ProductsListing() {
    const [filters, setFilters] = useState<FilterState>({
        searchTerm: '',
        category: '',
        sortBy: 'price-asc',
        page: 1,
        limit: 12
    })

    const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

    // Debounce search term
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(filters.searchTerm)
        }, 500)

        return () => clearTimeout(timer)
    }, [filters.searchTerm])

    const { data: productsData, isLoading, error } = useGetProductsQuery({
        searchTerm: debouncedSearchTerm,
        category: filters.category,
        sortBy: filters.sortBy,
        page: filters.page,
        limit: filters.limit
    })

    const handleFilterChange = (key: keyof FilterState, value: string | number) => {
        setFilters(prev => ({
            ...prev,
            [key]: value,
            ...(key !== 'page' && { page: 1 }) // Reset to page 1 when filters change
        }))
    }

    const handleResetFilters = () => {
        setFilters({
            searchTerm: '',
            category: '',
            sortBy: 'price-asc',
            page: 1,
            limit: 12
        })
    }

    return (
        <section className="py-8 lg:py-12 bg-white">
            <div className="w-11/12 2xl:w-[88%] max-w-[105.6rem] mx-auto">

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <SearchBar
                        value={filters.searchTerm}
                        onChange={(value) => handleFilterChange('searchTerm', value)}
                        onMobileFilterToggle={() => setMobileFilterOpen(true)}
                    />
                </motion.div>

                <Row gutter={[24, 24]}>
                    {/* Desktop Filter Sidebar */}
                    <Col xs={0} lg={6}>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="sticky top-24"
                        >
                            <FilterSidebar
                                filters={filters}
                                onFilterChange={handleFilterChange}
                                onResetFilters={handleResetFilters}
                                productsCount={productsData?.total || 0}
                            />
                        </motion.div>
                    </Col>

                    {/* Products Grid */}
                    <Col xs={24} lg={18}>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <ProductsGrid
                                products={productsData?.data || []}
                                pagination={{
                                    current: filters.page,
                                    total: productsData?.total || 0,
                                    pageSize: filters.limit,
                                    showSizeChanger: true,
                                    showQuickJumper: true,
                                    showTotal: (total, range) =>
                                        `${range[0]}-${range[1]} of ${total} products`,
                                    onChange: (page, pageSize) => {
                                        handleFilterChange('page', page)
                                        if (pageSize !== filters.limit) {
                                            handleFilterChange('limit', pageSize)
                                        }
                                    }
                                }}
                                loading={isLoading}
                                error={error}
                            />
                        </motion.div>
                    </Col>
                </Row>

                {/* Mobile Filter Drawer */}
                <Drawer
                    title="Filter Products"
                    placement="bottom"
                    height="70vh"
                    onClose={() => setMobileFilterOpen(false)}
                    open={mobileFilterOpen}
                    className="lg:hidden"
                    styles={{
                        body: { padding: 0 }
                    }}
                >
                    <div className="p-6">
                        <FilterSidebar
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            onResetFilters={handleResetFilters}
                            productsCount={productsData?.total || 0}
                            isMobile={true}
                            onClose={() => setMobileFilterOpen(false)}
                        />
                    </div>
                </Drawer>
            </div>
        </section>
    )
}