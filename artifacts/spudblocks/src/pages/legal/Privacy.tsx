export default function Privacy() {
  return (
    <div className="flex flex-col min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Privacy Policy</h1>
        <div className="text-sm font-mono text-muted-foreground uppercase tracking-wider mb-12">Last Updated: January 15, 2024</div>
        
        <div className="prose prose-invert prose-lg max-w-none prose-headings:tracking-tight prose-headings:font-bold prose-p:text-muted-foreground prose-p:leading-relaxed">
          <h2>Information We Collect</h2>
          <p>
            We collect information that you provide directly to us through our application forms, email communications, and newsletter subscriptions. This includes contact details (name, email), project information, technical documentation, and strategic roadmaps submitted for review. We also automatically collect basic analytics data regarding website usage.
          </p>

          <h2>How We Use It</h2>
          <p>
            Operational data submitted via our application flows is used strictly for qualification and scoping purposes. We use this information to determine operational fit, prepare for technical calls, and ultimately construct proposals. Analytics data is used to improve site performance.
          </p>

          <h2>Third-Party Services</h2>
          <p>
            We employ standard third-party services for site analytics, communication routing, and CRM management. We do not sell your personal data or project information to data brokers, marketing agencies, or external networks. 
          </p>

          <h2>Cookies</h2>
          <p>
            This site utilizes minimal functional cookies to maintain session state and basic analytics tracking. You may disable cookies in your browser, which will not impact your ability to read our materials or submit applications.
          </p>

          <h2>Your Rights & Data Retention</h2>
          <p>
            You have the right to request access to, correction of, or deletion of the personal data we hold about you. We retain application data for as long as necessary to evaluate potential engagements or comply with legal obligations. Confidential project data submitted by unqualified applicants is routinely purged.
          </p>

          <h2>International Transfers & Children</h2>
          <p>
            Our infrastructure is globally distributed. By using our services, you consent to the transfer of data across international borders. Our services are strictly designed for businesses and professionals; we do not knowingly collect data from individuals under 18.
          </p>

          <h2>Contact</h2>
          <p>
            To exercise your data rights or for privacy-related inquiries, contact privacy@spudblocks.com.
          </p>
        </div>
      </div>
    </div>
  );
}
