import { AlertTriangle, RefreshCcw, Truck } from 'lucide-react';

const shippingReturnsSections = [
  {
    icon: <Truck className="text-umbra-100 mr-3 text-2xl" />, // Shipping Policy
    title: 'Shipping Policy',
    content: (
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong>Global Shipping Available:</strong> We proudly ship to customers around the world using trusted
          carriers: USPS, UPS, and FedEx.
        </li>
        <li>
          <strong>Shipping Options & Rates:</strong>
          <ul className="list-disc pl-5">
            <li>Orders under $100: A standard shipping rate will apply at checkout.</li>
            <li>Orders over $100: Enjoy free shipping on us.</li>
            <li>
              Expedited Shipping: Need it faster? Reach out to us before placing your order, and we’ll provide upgraded
              shipping options for an additional fee.
            </li>
          </ul>
        </li>
        <li>
          <strong>Processing Time:</strong> Orders are typically processed within 1–3 business days. You will receive
          tracking information once your order ships.
        </li>
      </ul>
    ),
  },
  {
    icon: <RefreshCcw className="text-umbra-100 mr-3 text-2xl" />, // Refunds & Returns
    title: 'Refunds & Returns',
    content: (
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong>All Sales are Final:</strong> Due to the sensitive nature of our products, all sales are final. We
          follow strict quality and safety standards for returns.
        </li>
        <li>
          <strong>Return Eligibility:</strong>
          <ul className="list-disc pl-5">
            <li>Packages and products must be unopened, unused, and in their original intact condition.</li>
            <li>All return shipping costs are the responsibility of the customer.</li>
            <li>We do not accept returns or exchanges on opened items.</li>
            <li>Customized orders are not refundable.</li>
          </ul>
        </li>
        <li>
          <strong>Return Process:</strong> If you'd like to request a return or exchange, please contact our support
          team{' '}
          <a href="mailto:order@loudspectrum.com" className="text-blue-600 underline">
            order@loudspectrum.com
          </a>{' '}
          within 7 days of receiving your order. Approved returns must be shipped back within 14 days.
        </li>
      </ul>
    ),
  },
  {
    icon: <AlertTriangle className="text-umbra-100 mr-3 text-2xl" />, // Important Notes
    title: 'Important Notes',
    content: (
      <ul className="list-disc space-y-2 pl-5">
        <li>
          Domestic Orders are typically delivered between 1-7 days. We are not responsible for the carrier's delay.
        </li>
        <li>Damaged or incorrect items must be reported within 3 days of delivery.</li>
        <li>
          For any questions or support, feel free to email us at{' '}
          <a href="mailto:order@loudspectrum.com" className="text-blue-600 underline">
            order@loudspectrum.com
          </a>{' '}
          or use our contact form.
        </li>
      </ul>
    ),
  },
];

const ShippingReturnsPage = () => {
  return (
    <div className="container mt-[200px]">
      <div className="flex items-center justify-center">
        <h2 className="text-umbra-100 w-[85%] text-center font-sans text-[35px] leading-[120%] font-normal md:w-[55%] md:text-[60px]">
          Shipping & Refunds Policy
        </h2>
      </div>
      <div className="flex min-h-screen w-full items-center justify-center bg-white py-12">
        <div className="w-full rounded-2xl bg-white">
          <p className="text-umbra-40 mb-8 text-center">
            Thank you for choosing Loud Spectrum (formerly Medical Terpenes). We’re committed to delivering our premium
            terpene products efficiently and transparently to customers worldwide.
          </p>
          <div className="space-y-8">
            {shippingReturnsSections.map((section, idx) => (
              <div key={section.title}>
                <div className="mb-2 flex items-center">
                  {section.icon}
                  <h2 className="text-umbra-100 text-2xl font-semibold">{section.title}</h2>
                </div>
                <div className="text-umbra-100 font-mono text-base leading-relaxed">{section.content}</div>
                {idx !== shippingReturnsSections.length - 1 && <div className="border-umbra-10 my-6 border-b" />}
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <p className="text-umbra-40 text-sm">
              For any questions or support, feel free to email us at{' '}
              <a href="mailto:order@loudspectrum.com" className="text-blue-600 underline">
                order@loudspectrum.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingReturnsPage;
