import { Body, Container, Font, Head, Hr, Html, Img, Preview, Section, Tailwind, Text } from '@react-email/components';
import EmailFooter from './EmailFooter';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_EMAIL
  ? process.env.NEXT_PUBLIC_BASE_URL_EMAIL
  : 'http://localhost:3000';

const ContactSubmissionEmail = ({ name, email, message, is_subscriber }) => {
  return (
    <Html>
      <Head />
      <Font
        fontFamily="Space Grotesk"
        fallbackFontFamily="Arial"
        webFont={{
          url: 'https://fonts.gstatic.com/s/spacegrotesk/v16/V8mQQfforVEjOHrw6DQ0wrd3jv-q8L7geBCvMw.woff2',
          format: 'woff2',
        }}
        fontWeight={400}
        fontStyle="normal"
      />
      <Preview>New Contact Form Submission from {name}</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: '#007291',
                'umbra-100': '#1a1a1a',
                'umbra-5': '#f5f5f5',
                'blue-50': '#eff6ff',
                'blue-700': '#1d4ed8',
                'gray-50': '#f9fafb',
                'gray-100': '#f3f4f6',
                'gray-700': '#374151',
                'gray-900': '#111827',
                'green-50': '#f0fdf4',
                'green-700': '#15803d',
                'red-50': '#fef2f2',
                'red-700': '#b91c1c',
              },
            },
          },
        }}
      >
        <Body className="bg-gray-50 p-6">
          <Container className="rounded-lg bg-white p-6 shadow-md">
            {/* Logo Header */}
            <Section className="mb-6 text-center">
              <Img
                src={`${baseUrl}/assets/images/logo.png`}
                alt="Loud Spectrum Logo"
                width="200"
                height="40"
                className="mx-auto"
              />
            </Section>
            {/* Removed gradient text - using logo image instead */}
            <Section className="mb-6 rounded-md bg-blue-50 p-6">
              <Text className="mb-2 text-center text-2xl font-bold text-blue-700">New Contact Form Submission</Text>
              <Text className="m-0 text-center text-blue-700">
                You have received a new message from the website contact form.
              </Text>
            </Section>

            <Text className="mb-4 text-lg">Contact Details</Text>
            <Section className="mb-6 rounded-lg bg-gray-50 p-4">
              <Text className="m-0 text-sm text-gray-700">
                <strong>Name:</strong> {name}
              </Text>
              <Text className="m-0 text-sm text-gray-700">
                <strong>Email:</strong> {email}
              </Text>
              <Text className="m-0 text-sm text-gray-700">
                <strong>Is Subscriber:</strong> {is_subscriber}
              </Text>
            </Section>

            <Text className="mb-4 text-lg">Message</Text>
            <Section className="mb-6 rounded-lg bg-gray-50 p-4">
              <Text className="m-0 text-gray-900" style={{ whiteSpace: 'pre-line' }}>
                {message}
              </Text>
            </Section>

            <Hr className="my-4 border-t border-gray-200" />

            <Text className="text-center text-sm text-gray-500">
              This message was sent from the Loud Spectrum website contact form.
            </Text>
            <Hr className="my-6 border-t border-gray-200" />

            <EmailFooter baseUrl={baseUrl} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ContactSubmissionEmail;
