import { useEffect } from "react";

export default function TermsOfService() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Terms of Service</h1>
        <p className="text-slate-500 text-sm mb-6">Last Updated: April 9, 2026</p>

        <div className="space-y-6 text-slate-700 text-sm leading-relaxed">

          <p>Welcome to KOM Chimney Care. These Terms of Service ("Terms") govern your access to and use of this website and any related pages, forms, content, communications, and services offered through the site (collectively, the "Site").</p>

          <p>These Terms form a binding agreement between you and KOM Construction LLC, doing business as KOM Chimney Care ("KOM," "we," "us," or "our"). By accessing or using the Site, submitting a request, booking an appointment, or otherwise engaging with us through the Site, you agree to these Terms. If you do not agree, do not use the Site.</p>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">1. Services Covered by These Terms</h2>
            <p className="mb-2">KOM Chimney Care offers the services displayed on the Site, which currently include:</p>
            <ul className="list-disc pl-6 space-y-1 mb-2">
              <li>Chimney cleaning and sweeping</li>
              <li>Chimney inspection</li>
              <li>Chimney repair</li>
              <li>Emergency chimney service</li>
            </ul>
            <p>Any additional services or service plans are offered only if expressly shown on the Site or confirmed by KOM in writing.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">2. Eligibility and Permitted Use</h2>
            <p className="mb-2">You may use the Site only if you are legally capable of entering into a binding agreement and are using the Site for lawful purposes.</p>
            <p className="mb-2">You agree not to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>use the Site in violation of any law or regulation;</li>
              <li>interfere with the Site's operation or security;</li>
              <li>attempt unauthorized access to the Site or related systems;</li>
              <li>submit false, misleading, or fraudulent information; or</li>
              <li>copy, reproduce, distribute, scrape, or exploit Site content except as permitted by law or with our prior written consent.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">3. Website Content and Informational Use</h2>
            <p className="mb-2">The Site is provided for informational and commercial purposes. Product descriptions, service descriptions, images, and pricing information are intended to help customers evaluate and request services, but the final details of any specific job depend on site conditions, diagnostic review, availability, and written confirmation from KOM.</p>
            <p>Content on the Site is general information only and is not a substitute for an in-person inspection or professional diagnosis of your particular system or property.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">4. Booking and Service Process</h2>
            <p className="mb-2">For standard chimney-care service appointments, the process is generally as follows:</p>
            <ul className="list-disc pl-6 space-y-1 mb-2">
              <li><strong>Service selection.</strong> The client browses KOM's service offerings and selects the chimney-care service that appears to fit their needs.</li>
              <li><strong>Diagnostic visit.</strong> The client books a diagnostic visit so KOM can assess site conditions and confirm the appropriate scope of service work.</li>
              <li><strong>Approval and service.</strong> If diagnostics are approved, KOM arranges for service work to be completed through an external vendor within 48 hours after approval.</li>
            </ul>
            <p className="mb-2">This process applies to standard service workflow. Emergency service may follow a different operational process depending on the nature of the issue.</p>
            <p>The 48-hour service target applies after diagnostic approval and is subject to reasonable operational conditions, including customer availability, access to the site, parts availability, safety conditions, and circumstances beyond KOM's reasonable control.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">5. Diagnostic Appointment Fee</h2>
            <p className="mb-2">A diagnostic appointment fee is charged when KOM approves the diagnostic appointment.</p>
            <p className="mb-2"><strong>That diagnostic appointment fee is non-refundable.</strong></p>
            <p>The diagnostic appointment fee applies to the diagnostic visit itself. Unless KOM expressly states otherwise in writing, the diagnostic appointment fee is not a refundable deposit and is not refundable in the event the customer cancels, reschedules, is unavailable, declines service, or the proposed service does not proceed.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">6. Website Pricing and Standard Service Assumptions</h2>
            <p className="mb-2">Prices displayed on the Site are intended to apply to the specific listed service package shown on the corresponding page.</p>
            <p className="mb-2">Unless expressly stated otherwise, posted prices assume a standard residential service appointment, including reasonable access and standard site conditions.</p>
            <p className="mb-2">Additional charges may apply where required by actual site conditions or service requirements, including for example:</p>
            <ul className="list-disc pl-6 space-y-1 mb-2">
              <li>permit requirements;</li>
              <li>code compliance upgrades;</li>
              <li>flue or ventilation issues;</li>
              <li>flue liner or structural conditions;</li>
              <li>access limitations;</li>
              <li>hauling or disposal requirements outside the standard scope;</li>
              <li>non-standard chimney or fireplace conditions; or</li>
              <li>other conditions discovered before or during the diagnostic visit or service work.</li>
            </ul>
            <p>Where additional charges apply, KOM or its external vendor will communicate the revised scope or pricing before proceeding.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">7. Service Listings and Availability</h2>
            <p className="mb-2">Service descriptions, images, and references on the Site are for general display and marketing purposes.</p>
            <p className="mb-2">Actual service scope may vary due to:</p>
            <ul className="list-disc pl-6 space-y-1 mb-2">
              <li>site conditions discovered during the diagnostic visit;</li>
              <li>code requirements;</li>
              <li>access or safety constraints; or</li>
              <li>revised scope agreed upon by the customer.</li>
            </ul>
            <p>KOM does not guarantee that every listed service will be available at all times or for all property types.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">8. Quotes, Estimates, and Approval</h2>
            <p className="mb-2">Any information on the Site, in a message, or in a preliminary communication is informational unless and until KOM confirms the applicable service details.</p>
            <p className="mb-2">If site conditions, code requirements, compatibility issues, or other job-specific facts differ from what was originally assumed, KOM may issue a revised recommendation, revised scope, or revised price.</p>
            <p>No service work will proceed unless the customer approves the applicable scope and price.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">9. Emergency Service</h2>
            <p className="mb-2">Emergency service requests submitted through the Site are requests only. Submission of a request does not guarantee acceptance, technician dispatch, arrival time, or same-day service.</p>
            <p>Emergency service is subject to technician availability, external vendor availability, service area, traffic, weather, safety conditions, parts availability, and the nature of the issue reported.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">10. External Vendor Services</h2>
            <p className="mb-2">KOM may fulfill chimney-care services through one or more external vendors, contractors, or service providers.</p>
            <p className="mb-2">By booking services through KOM, you acknowledge and agree that service work may be performed by a third-party vendor engaged by KOM.</p>
            <p>KOM remains the customer-facing contracting party unless explicitly stated otherwise in writing, but scheduling, dispatch, performance timing, and onsite execution may involve third-party personnel.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">11. Customer Responsibilities</h2>
            <p className="mb-2">The customer agrees to:</p>
            <ul className="list-disc pl-6 space-y-1 mb-2">
              <li>provide accurate and complete information;</li>
              <li>provide safe and reasonable access to the property and work area;</li>
              <li>disclose relevant known site conditions;</li>
              <li>ensure that an authorized adult is available if required for inspection or installation;</li>
              <li>secure pets and maintain a reasonably safe working environment; and</li>
              <li>obtain any required permission from landlords, property owners, HOAs, or other third parties if the customer is not the owner of the property.</li>
            </ul>
            <p>KOM is not responsible for delays, added costs, or inability to perform caused by inaccurate information, denied access, unsafe conditions, or missing permissions.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">12. Permits, Code Compliance, and Site Conditions</h2>
            <p className="mb-2">Service requirements may vary depending on local code, municipal requirements, existing infrastructure, venting configuration, masonry condition, or other site-specific conditions.</p>
            <p>Unless expressly included in writing, Site pricing should not be interpreted to include unrelated structural work, finish work, carpentry, drywall repair, painting, flooring repair, restoration, or other general construction work.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">13. Payments</h2>
            <p className="mb-2">The customer agrees to pay all charges applicable to the approved service, including, where applicable:</p>
            <ul className="list-disc pl-6 space-y-1 mb-2">
              <li>service charges;</li>
              <li>parts and materials costs;</li>
              <li>diagnostic appointment fees;</li>
              <li>permit fees;</li>
              <li>taxes; and</li>
              <li>any customer-approved additional charges arising from site conditions or scope changes.</li>
            </ul>
            <p className="mb-2">Payment timing and method may be stated on the Site, in the booking flow, in the invoice, or in the service confirmation.</p>
            <p>KOM may use third-party payment processors. Payment transactions may be subject to the third party's own terms and policies.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">14. Cancellations and Rescheduling</h2>
            <p className="mb-2">Customers may request to cancel or reschedule by contacting KOM.</p>
            <p className="mb-2">The diagnostic appointment fee remains non-refundable once KOM approves the diagnostic appointment.</p>
            <p>KOM may reschedule or cancel appointments due to safety concerns, weather, technician or vendor availability, inventory issues, operational constraints, or other reasonable business factors.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">15. Workmanship Warranty</h2>
            <p className="mb-2">KOM provides a <strong>3-month workmanship warranty</strong> on labor for covered service work, beginning on the date service is completed.</p>
            <p className="mb-2">This workmanship warranty applies only to labor-related defects in the service work performed through KOM and does not apply to:</p>
            <ul className="list-disc pl-6 space-y-1 mb-2">
              <li>manufacturer defects;</li>
              <li>equipment failure unrelated to workmanship;</li>
              <li>ordinary wear and tear;</li>
              <li>misuse, abuse, neglect, or improper maintenance;</li>
              <li>water quality issues;</li>
              <li>freezing;</li>
              <li>utility or power issues;</li>
              <li>pre-existing chimney, venting, or structural conditions;</li>
              <li>work performed or modified by anyone not authorized by KOM; or</li>
              <li>damage caused by events outside KOM's reasonable control.</li>
            </ul>
            <p className="mb-2">Any manufacturer warranty remains subject to the manufacturer's own terms, conditions, exclusions, and claims procedures.</p>
            <p>Except for the express workmanship warranty stated in this section, KOM does not provide any additional warranty unless expressly stated in writing.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">16. Communications</h2>
            <p className="mb-2">By providing your contact information, you agree that KOM may contact you regarding:</p>
            <ul className="list-disc pl-6 space-y-1 mb-2">
              <li>quote requests;</li>
              <li>diagnostic appointments;</li>
              <li>scheduling;</li>
              <li>appointment reminders;</li>
              <li>service coordination;</li>
              <li>invoices;</li>
              <li>customer support; and</li>
              <li>related operational matters.</li>
            </ul>
            <p>If promotional communications are sent, you may opt out as described in the message or by contacting KOM directly.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">17. Electronic Records and Signatures</h2>
            <p className="mb-2">You agree that approvals, acknowledgments, invoices, service confirmations, and other records relating to your transaction with KOM may be created, transmitted, stored, and enforced electronically to the extent permitted by law.</p>
            <p>By using the Site and communicating electronically with KOM, you consent to electronic records and electronic communications in connection with your use of the Site and any related transaction.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">18. Intellectual Property</h2>
            <p className="mb-2">The Site and all content on it, including text, logos, graphics, design elements, layout, branding, and images, are owned by or licensed to KOM and are protected by applicable intellectual property laws.</p>
            <p>You may not use, copy, reproduce, republish, distribute, or create derivative works from Site content without KOM's prior written permission, except as permitted by law.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">19. User Submissions</h2>
            <p className="mb-2">If you submit reviews, comments, photos, testimonials, feedback, or suggestions to KOM, you grant KOM a non-exclusive, royalty-free, worldwide license to use, reproduce, adapt, publish, and display that content for business and marketing purposes, subject to applicable law and the Privacy Policy.</p>
            <p>You represent that you have the right to provide any content you submit.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">20. Third-Party Links and Tools</h2>
            <p className="mb-2">The Site may contain or use third-party tools, links, payment processors, maps, scheduling tools, or other outside services. KOM is not responsible for the availability, content, practices, or policies of third-party services.</p>
            <p>Your use of third-party services may be governed by separate terms and privacy policies.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">21. Disclaimer of Warranties</h2>
            <p className="mb-2 uppercase font-semibold">The Site is provided on an "as is" and "as available" basis to the maximum extent permitted by law.</p>
            <p className="mb-2 uppercase font-semibold">To the maximum extent permitted by law, KOM disclaims all warranties, express or implied, regarding the Site, including implied warranties of merchantability, fitness for a particular purpose, title, and non-infringement.</p>
            <p>Nothing in these Terms excludes any rights that cannot lawfully be excluded under applicable law.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">22. Limitation of Liability</h2>

            <h3 className="text-sm font-bold text-slate-800 mb-2">A. Website Claims</h3>
            <p className="mb-2 uppercase font-semibold">To the maximum extent permitted by law, KOM shall not be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages arising out of or relating to your use of, or inability to use, the Site.</p>
            <p className="mb-2 uppercase font-semibold">To the maximum extent permitted by law, KOM's total liability for site-only claims shall not exceed the greater of:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>the amount you paid to KOM through the Site for the specific transaction giving rise to the claim; or</li>
              <li>$100.</li>
            </ul>

            <h3 className="text-sm font-bold text-slate-800 mb-2">B. Service Claims</h3>
            <p className="mb-2 uppercase font-semibold">To the maximum extent permitted by law, KOM shall not be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages arising out of or relating to any diagnostic visit, service appointment, emergency service, or related service transaction.</p>
            <p className="mb-2 uppercase font-semibold">To the maximum extent permitted by law, KOM's total liability for service-related claims shall not exceed the total amount paid by the customer to KOM for the specific service giving rise to the claim.</p>
            <p>These limitations apply only to the extent permitted by law and do not exclude liability that cannot lawfully be limited or excluded.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">23. Indemnification</h2>
            <p className="mb-2">You agree to indemnify, defend, and hold harmless KOM and its owners, officers, employees, contractors, agents, vendors, and affiliates from and against claims, liabilities, damages, losses, and expenses arising out of or relating to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>your misuse of the Site;</li>
              <li>your violation of these Terms;</li>
              <li>your violation of law; or</li>
              <li>your infringement of any third-party rights.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">24. Governing Law and Venue</h2>
            <p className="mb-2">These Terms are governed by the laws of the State of Michigan, without regard to conflict-of-law principles.</p>
            <p className="mb-2">Any dispute arising out of or relating to these Terms, the Site, or any service provided by or through KOM shall be brought exclusively in the state or federal courts located in Michigan.</p>
            <p className="mb-2">You consent to the jurisdiction and venue of those courts.</p>
            <p>There is no arbitration requirement under these Terms.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">25. Order of Precedence</h2>
            <p>If there is any conflict between these Terms and a job-specific booking confirmation, estimate, invoice, service authorization, warranty document, or other written service record issued by KOM, the job-specific document controls for that specific transaction.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">26. Severability</h2>
            <p>If any provision of these Terms is found unenforceable or invalid, the remaining provisions will remain in full force and effect to the fullest extent permitted by law.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">27. Changes to These Terms</h2>
            <p className="mb-2">KOM may update these Terms from time to time. When that happens, the "Last Updated" date will be revised.</p>
            <p>Your continued use of the Site after updated Terms become effective constitutes acceptance of the revised Terms.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-900 mb-2">28. Contact Information</h2>
            <address className="not-italic space-y-1">
              <p><strong>KOM Chimney Care</strong></p>
              <p>Legal Business Name: KOM Construction LLC</p>
              <p>2712 Northwestern St</p>
              <p>Detroit, MI 48206</p>
              <p>United States</p>
              <p><a href="mailto:Kom.construction.llc@gmail.com" className="text-green-700 hover:underline">Kom.construction.llc@gmail.com</a></p>
              <p><a href="tel:+17346662338" className="text-green-700 hover:underline">+1 734-666-2338</a></p>
            </address>
          </section>

        </div>
      </div>
    </div>
  );
}