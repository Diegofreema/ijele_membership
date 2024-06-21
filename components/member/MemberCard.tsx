import { colors } from '@/constant';
import { MemberType } from '@/types';
import {
  Card,
  CardBody,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Link } from 'next-view-transitions';

export const MemberCard = ({
  member,
  index,
}: {
  member: MemberType;
  index: number;
}) => {
  const color = useColorModeValue('#181818', '#fff');
  const bg = useColorModeValue('#fff', '#181818');

  return (
    <Link href={`/members/${member?.user_id}`}>
      <Card
        as={motion.div}
        initial={{ y: 50, opacity: 0 }}
        whileInView={{
          y: 0,
          opacity: 1,
          transition: {
            duration: 0.5,
            type: 'spring',
            damping: '8',
            ease: 'easeInOut',
            delay: 0.3 * index,
          },
        }}
        whileHover={{ y: -20 }}
        viewport={{ once: true }}
        borderRadius={5}
        cursor={'pointer'}
        shadow={'xl'}
        overflow={'hidden'}
      >
        <Image
          src={member?.img_url as string}
          alt="Green double couch with wooden legs"
          width={'100%'}
          height={250}
          objectFit={'fill'}
        />
        <CardBody bg={bg}>
          <Text
            textColor={colors.textOrange}
            fontSize={15}
            fontFamily={'var(--font-rubik)'}
            fontWeight={'500'}
          >
            {member?.title}
          </Text>
          <Text
            textColor={color}
            fontSize={20}
            fontFamily={'var(--font-rubik)'}
            fontWeight={'bold'}
          >
            {member?.salutation +
              ' ' +
              member?.first_name +
              ' ' +
              member?.last_name}
          </Text>
        </CardBody>
      </Card>
    </Link>
  );
};
