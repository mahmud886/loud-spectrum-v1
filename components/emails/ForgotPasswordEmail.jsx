import {
  Body,
  Button,
  Container,
  Font,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;

const ForgotPasswordEmail = ({ email, token, locale }) => {
  // If resetUrl is not provided, construct it using the resetToken
  const passwordResetUrl = `${baseUrl}/${locale}/reset-password?token=${token}`;

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
      <Preview>Reset your password for Loud Spectrum</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: '#007291',
                'umbra-100': '#1a1a1a',
                'umbra-5': '#f5f5f5',
                'blue-50': '#eff6ff',
                'blue-100': '#dbeafe',
                'blue-600': '#2563eb',
                'blue-700': '#1d4ed8',
                'gray-50': '#f9fafb',
                'gray-100': '#f3f4f6',
                'gray-600': '#4b5563',
                'gray-700': '#374151',
                'gray-900': '#111827',
                'orange-50': '#fff7ed',
                'orange-600': '#ea580c',
                'orange-700': '#c2410c',
                'red-50': '#fef2f2',
                'red-600': '#dc2626',
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
              <Text className="bg-[linear-gradient(90deg,_#101820_21.53%,_#0077C8_44.13%,_#C0AEE7_74.27%,_#DDDAE8_107.64%)] bg-clip-text text-3xl font-bold text-transparent">
                LOUD SPECTRUM
              </Text>
            </Section>

            {/* Alert Banner */}
            <Section className="mb-6 rounded-md bg-orange-50 p-6">
              <Text className="mb-2 text-center text-2xl font-bold text-orange-700">🔐 Password Reset Request</Text>
              <Text className="m-0 text-center text-orange-600">
                We received a request to reset your password for your Loud Spectrum account.
              </Text>
            </Section>

            <Text className="mb-4 text-lg">Hi there,</Text>
            <Text className="mb-6 leading-relaxed text-gray-700">
              Someone (hopefully you!) has requested a password reset for your Loud Spectrum account associated with{' '}
              <strong>{email}</strong>.
              <br />
              <br />
              If this was you, click the button below to reset your password. This link will expire in{' '}
              <strong>1 hour</strong> for security reasons.
            </Text>

            {/* Reset Button */}
            <Section className="mb-6 text-center">
              <Button
                href={passwordResetUrl}
                className="rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white"
                style={{
                  backgroundColor: '#2563eb',
                  color: '#ffffff',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  padding: '16px 32px',
                  fontSize: '18px',
                  fontWeight: '600',
                  display: 'inline-block',
                }}
              >
                Reset My Password
              </Button>
            </Section>

            {/* Alternative Link */}
            <Section className="mb-6 rounded-lg bg-blue-50 p-4">
              <Text className="mb-2 text-sm font-semibold text-blue-700">Can't click the button?</Text>
              <Text className="m-0 text-sm text-blue-600">
                Copy and paste this link into your browser:
                <br />
                <span style={{ wordBreak: 'break-all', fontSize: '12px', fontFamily: 'monospace' }}>
                  {passwordResetUrl}
                </span>
              </Text>
            </Section>

            <Hr className="my-6 border-t border-gray-200" />

            {/* Security Notice */}
            <Section className="mb-6 rounded-lg bg-red-50 p-4">
              <Text className="mb-2 text-sm font-semibold text-red-700">⚠️ Security Notice</Text>
              <Text className="m-0 text-sm text-red-600">
                <strong>If you didn't request this password reset:</strong>
                <br />
                • Your account is still secure - no changes have been made
                <br />
                • You can safely ignore this email
                <br />
                • Consider changing your password if you're concerned about account security
                <br />• Contact our support team if you have any questions
              </Text>
            </Section>

            {/* Important Information */}
            <Section className="mb-6">
              <Text className="mb-4 text-lg font-semibold text-gray-900">Important Information:</Text>
              <Text className="m-0 text-sm text-gray-600">
                • This password reset link will expire in <strong>1 hour</strong>
                <br />
                • You can only use this link once
                <br />
                • If the link expires, you can request a new password reset
                <br />• Make sure to create a strong, unique password
              </Text>
            </Section>

            <Hr className="my-6 border-t border-gray-200" />

            {/* Help Section */}
            <Section className="mb-6">
              <Text className="mb-2 text-lg font-semibold text-gray-900">Need Help?</Text>
              <Text className="m-0 text-sm text-gray-600">
                If you're having trouble resetting your password or have any questions about your account, please don't
                hesitate to contact our support team:
                <br />
                <br />
                <strong>Email:</strong> support@loudspectrum.com
                <br />
                <strong>Phone:</strong> +1 (555) 123-4567
                <br />
                <strong>Hours:</strong> Monday - Friday, 9 AM - 6 PM PST
              </Text>
            </Section>

            <Hr className="my-6 border-t border-gray-200" />

            {/* Footer */}
            <Section className="rounded-md bg-gray-100 p-4">
              <Text className="m-0 text-center text-sm text-gray-700">
                This email was sent to <strong>{email}</strong> because a password reset was requested for your Loud
                Spectrum account.
                <br />
                <br />
                Loudspectrum.com
                <br />
                470 Noor Ave STE B #1148, South San Francisco, CA 94080
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ForgotPasswordEmail;
