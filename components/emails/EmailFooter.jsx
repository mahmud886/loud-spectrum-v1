import { Img, Section, Text } from '@react-email/components';

const EmailFooter = ({ baseUrl }) => {
  return (
    <Section className="rounded-md bg-gray-100 p-4">
      <Section className="mb-6 text-center">
        <Img
          src={`${baseUrl}/assets/images/logo.png`}
          alt="Loud Spectrum Logo"
          width="200"
          height="40"
          className="mx-auto"
        />
      </Section>
      <Text className="m-0 text-center text-sm text-gray-700">
        Email: hi@loudspectrum.com
        <br />
        Phone: +1 714 905 9681
        <br />
        Hours: Monday to Friday - 9AM - 5PM PST
        <br />
        1907 N Main St, Santa Ana CA 92706
      </Text>
    </Section>
  );
};

export default EmailFooter;
