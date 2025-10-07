import { Section, Text } from '@react-email/components';

const EmailFooter = () => {
  return (
    <Section className="rounded-md bg-gray-100 p-4">
      <Section className="mb-4 text-center">
        <Text className="bg-[linear-gradient(90deg,_#101820_21.53%,_#0077C8_44.13%,_#C0AEE7_74.27%,_#DDDAE8_107.64%)] bg-clip-text text-3xl font-bold text-transparent">
          LOUD SPECTRUM
        </Text>
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
