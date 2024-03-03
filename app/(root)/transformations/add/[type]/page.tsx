import { auth } from '@/auth';
import Header from '@/components/shared/Header'
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants'
import { getUserById } from '@/lib/actions/user.actions';

import { redirect } from 'next/navigation';

const AddTransformationTypePage = async ({ params: { type } }: SearchParamProps) => {
  const session = await auth();
  const transformation = transformationTypes[type];

  if(!session) redirect('/sign-in')

  const user = await getUserById(session.user?.id!);

  return (
    <>
      <Header 
        title={transformation.title}
        subtitle={transformation.subTitle}
      />
    
      <section className="mt-10">
        <TransformationForm 
          action="Add"
          userId={user._id || ""}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance as number}
        />
      </section>
    </>
  )
}

export default AddTransformationTypePage