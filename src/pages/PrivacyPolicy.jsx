export default function PrivacyPolicy() {
  const sections = [
    {
      title: "1. Information We Collect",
      content: null,
      subsections: [
        {
          subtitle: "Information You Provide Directly",
          text: "When you contact us, request a quote, schedule service, or otherwise communicate with us, we may collect:",
          list: [
            "Name",
            "Phone number",
            "Email address",
            "Service address and billing address",
            "Information about your water heater, plumbing issue, installation request, or emergency service request",
            "Preferred appointment date and time",
            "Photos, videos, notes, or documents you choose to send us",
            "Any other information you provide through forms, calls, texts, or emails",
          ],
        },
        {
          subtitle: "Service and Transaction Information",
          text: "If you become a customer, we may collect and maintain:",
          list: [
            "Estimate and booking details",
            "Product and installation information",
            "Service history",
            "Warranty-related information",
            "Invoice and payment status information",
            "Customer support communications",
          ],
          note: "Payment note: If you pay through a third-party payment processor, we may receive limited transaction details, but we do not necessarily store full payment card information on our own systems.",
        },
        {
          subtitle: "Information Collected Automatically",
          text: "When you use the Site, we and our service providers may automatically collect certain technical and usage information, such as:",
          list: [
            "IP address",
            "Browser type and device type",
            "Operating system",
            "Pages visited and time spent on pages",
            "Referral source",
            "Approximate location derived from IP address",
            "Cookies and similar tracking technologies",
            "Site interaction information such as clicks and navigation activity",
          ],
        },
        {
          subtitle: "Information from Third Parties",
          text: "We may receive information from third parties such as:",
          list: [
            "Website analytics providers",
            "Advertising platforms",
            "CRM, booking, or scheduling platforms",
            "Call tracking providers",
            "Payment processors",
            "Referral partners",
          ],
        },
      ],
    },
    {
      title: "2. How We Use Information",
      text: "We may use personal information to:",
      list: [
        "Respond to inquiries and provide quotes",
        "Schedule, confirm, and perform services",
        "Communicate about appointments, delays, invoices, warranties, and follow-up matters",
        "Improve the Site and our services",
        "Maintain business records",
        "Detect, investigate, and prevent fraud, abuse, or other unlawful activity",
        "Protect our rights, safety, property, and operations",
        "Comply with legal and regulatory obligations",
        "Send marketing communications where permitted by law",
      ],
    },
    {
      title: "3. Cookies and Analytics",
      text: "We may use cookies, pixels, analytics tools, and similar technologies to operate the Site, understand traffic and user behavior, improve performance, and measure advertising effectiveness.\n\nYou can usually control cookies through your browser settings. Disabling cookies may affect some Site functionality.",
    },
    {
      title: "4. How We Share Information",
      text: "We may share information with:",
      list: [
        "Service providers that help us operate our business and Site",
        "Vendors that provide hosting, analytics, booking, CRM, communications, call tracking, invoicing, or payment processing services",
        "Professional advisers such as lawyers, accountants, and insurers",
        "Government authorities, regulators, or law enforcement when required by law or when necessary to protect rights or safety",
        "A purchaser or successor in connection with a merger, sale, financing, or transfer of all or part of our business",
        "Other parties with your consent or at your direction",
      ],
      note: "We do not sell your personal information for money.",
    },
    {
      title: "5. Calls, Texts, and Email",
      text: "If you provide your phone number, you agree that we may contact you by call or text regarding your quote request, service request, scheduling, appointment reminders, and related customer service matters.\n\nIf you provide your email address, we may send you transactional messages such as quotes, confirmations, invoices, receipts, service updates, and warranty-related communications.\n\nIf we send promotional messages, you may opt out by following the unsubscribe instructions in the message or by contacting us directly.",
    },
    {
      title: "6. Data Retention",
      text: "We retain information for as long as reasonably necessary to:",
      list: [
        "Provide requested services",
        "Maintain service and warranty records",
        "Complete transactions",
        "Resolve disputes",
        "Comply with legal, tax, accounting, insurance, and regulatory obligations",
        "Enforce our agreements and protect our business",
      ],
    },
    {
      title: "7. Data Security",
      text: "We use reasonable administrative, technical, and physical safeguards designed to protect personal information from unauthorized access, use, alteration, or disclosure.\n\nIf we maintain sensitive personally identifying information covered by Michigan law, we intend to implement and maintain reasonable security measures appropriate to the nature of that information. Michigan law also imposes breach-notification requirements in the event of certain security breaches.\n\nHowever, no method of internet transmission or electronic storage is completely secure, and we cannot guarantee absolute security.",
    },
    {
      title: "8. Your Choices",
      text: "You may contact us to:",
      list: [
        "Update or correct your contact information",
        "Ask questions about the information we maintain",
        "Opt out of non-essential marketing communications",
      ],
      note: "We will review and respond as appropriate under applicable law and our business practices.",
    },
    {
      title: "9. Children's Privacy",
      text: "The Site is not directed to children under 13, and we do not knowingly collect personal information from children under 13. If you believe a child has submitted personal information to us, please contact us so we can take appropriate action.",
    },
    {
      title: "10. Third-Party Links",
      text: "The Site may contain links to third-party websites or services. We are not responsible for their privacy practices, content, or security. We encourage you to review their privacy policies before submitting information to them.",
    },
    {
      title: "11. Changes to This Privacy Policy",
      text: 'We may update this Privacy Policy from time to time. When we do, we will revise the "Last Updated" date above. Your continued use of the Site after any update becomes effective constitutes acceptance of the updated Privacy Policy, to the extent permitted by law.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Privacy Policy</h1>
          <p className="text-slate-500 text-sm">Last Updated: March 10, 2026</p>
        </div>

        {/* Intro */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 mb-6">
          <p className="text-slate-700 leading-relaxed mb-3">
            KOM Water Heaters ("KOM," "we," "us," or "our") respects your privacy. This Privacy Policy explains how we collect, use, disclose, and protect information when you visit our website or any other website or landing page we operate that links to this Privacy Policy (collectively, the "Site"), contact us, request a quote, schedule service, or otherwise interact with us.
          </p>
          <p className="text-slate-700 leading-relaxed">
            By using the Site or submitting information to us, you agree to the practices described in this Privacy Policy.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.title} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-4">{section.title}</h2>

              {section.text && section.text.split("\n\n").map((para, i) => (
                <p key={i} className="text-slate-700 leading-relaxed mb-3">{para}</p>
              ))}

              {section.list && (
                <ul className="mt-3 space-y-1.5 mb-4">
                  {section.list.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-slate-700">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-green-600 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {section.note && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-3">
                  <p className="text-slate-600 text-sm italic">{section.note}</p>
                </div>
              )}

              {section.subsections && section.subsections.map((sub) => (
                <div key={sub.subtitle} className="mt-6">
                  <h3 className="text-base font-semibold text-slate-800 mb-2">{sub.subtitle}</h3>
                  {sub.text && <p className="text-slate-700 leading-relaxed mb-2">{sub.text}</p>}
                  {sub.list && (
                    <ul className="space-y-1.5 mb-3">
                      {sub.list.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-slate-700">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-green-600 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {sub.note && (
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-2">
                      <p className="text-slate-600 text-sm italic">{sub.note}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}

          {/* Contact Section */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">12. Contact Us</h2>
            <p className="text-slate-700 mb-4">If you have questions about this Privacy Policy or our privacy practices, contact us at:</p>
            <div className="space-y-1 text-slate-800 font-medium">
              <p>KOM Water Heaters</p>
              <p className="text-slate-600 font-normal">KOM Construction LLC</p>
              <a href="mailto:Kom.construction.llc@gmail.com" className="text-green-700 hover:underline block">
                Kom.construction.llc@gmail.com
              </a>
              <a href="tel:3138040844" className="text-green-700 hover:underline block">
                313-804-0844
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}