import { PageBanner } from '@/components/shared/PageBanner/PageBanner'
import { ContactSection } from '@/components/pages/Contact/ContactSection'

export default function ContactPage() {
  return (
    <main>
      <PageBanner title="Contact Us" />
      <ContactSection />
    </main>
  )
}

export const metadata = {
  title: 'Contact Us - GearGuild',
  description: 'Get in touch with GearGuild for any questions, support, or inquiries about our premium electronics.',
}