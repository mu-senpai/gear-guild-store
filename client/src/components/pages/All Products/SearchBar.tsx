'use client'

import { Input, Button } from 'antd'
import { SearchOutlined, FilterOutlined } from '@ant-design/icons'

interface SearchBarProps {
    value: string
    onChange: (value: string) => void
    onMobileFilterToggle: () => void
}

export function SearchBar({ value, onChange, onMobileFilterToggle }: SearchBarProps) {
    return (
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 border border-slate-200">
            <div className="flex gap-4 items-center">
                <div className="flex-1">
                    <Input
                        placeholder="Search for products... (e.g., iPhone, Samsung, Laptop)"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        size="large"
                        allowClear
                        className="rounded-lg"
                        prefix={<SearchOutlined className="text-slate-400" />}
                    />
                </div>

                {/* Mobile Filter Toggle Button */}
                <Button
                    type="default"
                    icon={<FilterOutlined />}
                    size="large"
                    onClick={onMobileFilterToggle}
                    className="lg:!hidden flex items-center justify-center w-12 h-12 rounded-lg border-slate-300 hover:border-blue-500 hover:text-blue-600"
                >
                </Button>
            </div>

            {value && (
                <div className="mt-3 text-sm text-slate-600">
                    Searching for: <span className="font-medium text-blue-600">&quot;{value}&quot;</span>
                </div>
            )}
        </div>
    )
}