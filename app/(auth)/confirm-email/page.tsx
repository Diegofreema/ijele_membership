import { verifyEmail } from '@/actions/auth.action';
import { redirect } from 'next/navigation';

const page = async ({ searchParams }: { searchParams: { id: string } }) => {
  const { message } = await verifyEmail(searchParams.id);
  let text = '';
  if (message === 'Failed to verify email') {
    text = 'Failed to verify email, please try again';
  }

  if (message === 'Email verified') {
    text = 'Email verified successfully';
    redirect('/sign-in');
  }
  return (
    <div className="flex h-screen justify-center items-center space-y-3">
      <h1 className="text-black text-center">Verify your email.</h1>
      <h4 className="text-black text-center">{text}</h4>
    </div>
  );
};

export default page;
