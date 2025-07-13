'use client'

import { CheckoutModal } from './CheckoutModal'
import { SuccessModal } from './SuccessModal'

export function CheckoutContainer() {
    return (
        <>
            <CheckoutModal />
            <SuccessModal />
        </>
    )
}
