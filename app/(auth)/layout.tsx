import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

const layout = async ({ children }: Props) => {
  const id = cookies().get('id')?.value;
  if (id) redirect('/profile');
  return <div>{children}</div>;
};

export default layout;
