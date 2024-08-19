import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';
import * as React from 'react';

interface VerificationLink {
  fullName?: string;

  verificationLink?: string;
}

export const VerifyEmail = ({
  fullName,
  verificationLink,
}: VerificationLink) => {
  const previewText = `${fullName} good to have you with us`;

  return (
    <Html>
      <Head />
      <Preview className="text-black font-bold text-xl">{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Heading className="text-white text-center">
              This is from IjeleSC Membership website, Please verify your email.
            </Heading>
            <Section className="mb-[50px] !flex !justify-center min-w-[100%] mx-auto">
              <Img
                src={`https://www.ijelesportsmembership.ng/logo.png`}
                width="70"
                height="70"
                alt="Vercel"
              />
            </Section>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3">
                Welcome to the Ijele SC {fullName}
              </Button>
            </Section>
            <Section className="flex justify-center">
              <Text className="text-black text-[14px] leading-[24px] text-center">
                follow this link to verify your email{' '}
                <Link
                  href={verificationLink}
                  className="text-blue-600 no-underline"
                >
                  {verificationLink}
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VerifyEmail;
