import { FileText, HelpCircle, Link2, Lock, RefreshCcw, Shield, UserCheck } from 'lucide-react';

const privacySections = [
  {
    icon: <UserCheck className="text-umbra-100 mr-3 text-2xl" />,
    title: 'SECTION 1 – WHAT DO WE DO WITH YOUR INFORMATION?',
    content: (
      <div className="space-y-2">
        <p>
          When you purchase something from our store, as part of the buying and selling process, we collect the personal
          information you give us such as your name, address and email address.
        </p>
        <p>
          <b>Email marketing (if applicable):</b> With your permission, we may send you emails about our store, new
          products and other updates.
        </p>
      </div>
    ),
  },
  {
    icon: <Shield className="text-umbra-100 mr-3 text-2xl" />,
    title: 'SECTION 2 – CONSENT',
    content: (
      <div className="space-y-2">
        <p>
          <b>How do you get my consent?</b>
        </p>
        <p>
          When you provide us with personal information to complete a transaction, verify your credit card, place an
          order, arrange for a delivery or return a purchase, we imply that you consent to our collecting it and using
          it for that specific reason only.
        </p>
        <p>
          If we ask for your personal information for a secondary reason, like marketing, we will either ask you
          directly for your expressed consent, or provide you with an opportunity to say no.
        </p>
        <p>
          <b>How do I withdraw my consent?</b>
        </p>
        <p>
          If after you opt-in, you change your mind, you may withdraw your consent for us to contact you, for the
          continued collection, use or disclosure of your information, at anytime, by contacting us at{' '}
          <a href="mailto:info@medicalterpenes.com" className="text-blue-600 underline">
            info@medicalterpenes.com
          </a>
          .
        </p>
      </div>
    ),
  },
  {
    icon: <FileText className="text-umbra-100 mr-3 text-2xl" />,
    title: 'SECTION 3 – DISCLOSURE',
    content: (
      <div className="space-y-2">
        <p>
          We may disclose your personal information if we are required by law to do so or if you violate our Terms of
          Service.
        </p>
        <p>
          <b>Payment:</b>
        </p>
        <p>
          If you choose a direct payment gateway to complete your purchase, then Stripe Gateway Payment stores your
          credit card data. It is encrypted through the Payment Card Industry Data Security Standard (PCI-DSS). Your
          purchase transaction data is stored only as long as is necessary to complete your purchase transaction. After
          that is complete, your purchase transaction information is deleted.
        </p>
        <p>
          All direct payment gateways adhere to the standards set by PCI-DSS as managed by the PCI Security Standards
          Council, which is a joint effort of brands like Visa, MasterCard, American Express and Discover.
        </p>
        <p>
          PCI-DSS requirements help ensure the secure handling of credit card information by our store and its service
          providers.
        </p>
      </div>
    ),
  },
  {
    icon: <Link2 className="text-umbra-100 mr-3 text-2xl" />,
    title: 'SECTION 5 – THIRD-PARTY SERVICES',
    content: (
      <div className="space-y-2">
        <p>
          In general, the third-party providers used by us will only collect, use and disclose your information to the
          extent necessary to allow them to perform the services they provide to us.
        </p>
        <p>
          However, certain third-party service providers, such as payment gateways and other payment transaction
          processors, have their own privacy policies in respect to the information we are required to provide to them
          for your purchase-related transactions.
        </p>
        <p>
          For these providers, we recommend that you read their privacy policies so you can understand the manner in
          which your personal information will be handled by these providers.
        </p>
        <p>
          In particular, remember that certain providers may be located in or have facilities that are located in a
          different jurisdiction than either you or us. So if you elect to proceed with a transaction that involves the
          services of a third-party service provider, then your information may become subject to the laws of the
          jurisdiction(s) in which that service provider or its facilities are located.
        </p>
        <p>
          As an example, if you are located in Canada and your transaction is processed by a payment gateway located in
          the United States, then your personal information used in completing that transaction may be subject to
          disclosure under United States legislation, including the Patriot Act.
        </p>
        <p>
          Once you leave our store’s website or are redirected to a third-party website or application, you are no
          longer governed by this Privacy Policy or our website’s Terms of Service.
        </p>
        <p>
          <b>Links</b>
        </p>
        <p>
          When you click on links on our store, they may direct you away from our site. We are not responsible for the
          privacy practices of other sites and encourage you to read their privacy statements.
        </p>
      </div>
    ),
  },
  {
    icon: <Lock className="text-umbra-100 mr-3 text-2xl" />,
    title: 'SECTION 6 – SECURITY',
    content: (
      <div className="space-y-2">
        <p>
          To protect your personal information, we take reasonable precautions and follow industry best practices to
          make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed.
        </p>
        <p>
          If you provide us with your credit card information, the information is encrypted using secure socket layer
          technology (SSL) and stored with a AES-256 encryption. Although no method of transmission over the Internet or
          electronic storage is 100% secure, we follow all PCI-DSS requirements and implement additional generally
          accepted industry standards.
        </p>
        <p>
          By using this site, you represent that you are at least the age of majority in your state or province of
          residence, or that you are the age of majority in your state or province of residence and you have given us
          your consent to allow any of your minor dependents to use this site.
        </p>
      </div>
    ),
  },
  {
    icon: <RefreshCcw className="text-umbra-100 mr-3 text-2xl" />,
    title: 'SECTION 8 – CHANGES TO THIS PRIVACY POLICY',
    content: (
      <div className="space-y-2">
        <p>
          We reserve the right to modify this privacy policy at any time, so please review it frequently. Changes and
          clarifications will take effect immediately upon their posting on the website. If we make material changes to
          this policy, we will notify you here that it has been updated, so that you are aware of what information we
          collect, how we use it, and under what circumstances, if any, we use and/or disclose it.
        </p>
        <p>
          If our store is acquired or merged with another company, your information may be transferred to the new owners
          so that we may continue to sell products to you.
        </p>
      </div>
    ),
  },
  {
    icon: <HelpCircle className="text-umbra-100 mr-3 text-2xl" />,
    title: 'QUESTIONS AND CONTACT INFORMATION',
    content: (
      <div className="space-y-2">
        <p>
          If you would like to: access, correct, amend or delete any personal information we have about you, register a
          complaint, or simply want more information contact our Privacy Compliance Officer at{' '}
          <a href="mailto:info@sauceterps.com" className="text-blue-600 underline">
            info@sauceterps.com
          </a>
        </p>
        <p>[Re: Privacy Compliance Officer]</p>
        <p>[Los Angeles, CA, United States]</p>
      </div>
    ),
  },
];

const PrivacyPolicyPage = () => {
  return (
    <div className="container mt-[200px]">
      <div className="flex items-center justify-center">
        <h2 className="text-umbra-100 w-[85%] text-center font-sans text-[35px] leading-[120%] font-normal md:w-[35%] md:text-[60px]">
          Privacy Policy
        </h2>
      </div>
      <div className="flex min-h-screen w-full items-center justify-center bg-white py-12">
        <div className="w-full rounded-2xl bg-white">
          <div className="space-y-8">
            {privacySections.map((section, idx) => (
              <div key={section.title}>
                <div className="mb-2 flex items-center">
                  {section.icon}
                  <h2 className="text-umbra-100 text-2xl font-semibold">{section.title}</h2>
                </div>
                <div className="text-umbra-100 font-mono text-base leading-relaxed">{section.content}</div>
                {idx !== privacySections.length - 1 && <div className="border-umbra-10 my-6 border-b" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
