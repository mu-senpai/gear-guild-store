import { NavbarClient } from './NavbarClient'
import { MobileNavDrawer } from './MobileNavDrawer'
import { CartSidebar } from './CartSidebar'

export function Navbar() {
    return (
        <>
            <NavbarClient />
            <MobileNavDrawer />
            <CartSidebar />
        </>
    )
}