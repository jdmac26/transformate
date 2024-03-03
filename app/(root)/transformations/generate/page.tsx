import { auth } from '@/auth';
import GenerationForm from '@/components/shared/GenerationForm';
import Header from '@/components/shared/Header';
import { transformationTypes } from '@/constants';
import { getUserById } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import React from 'react'

const GenerateImage = async ({ params: { type } }: SearchParamProps) => {
    const session = await auth();
    const transformation = transformationTypes["generate"];

    if (!session) redirect('/sign-in')

    const user = await getUserById(session.user?.id!);

    return (
        <>
            <Header
                title={transformation.title}
                subtitle={transformation.subTitle}
            />

            <section className="mt-10">
                <GenerationForm
                    action="Add"
                    userId={user._id || ""}
                    type={transformation.type as TransformationTypeKey}
                    creditBalance={user.creditBalance as number}
                />
            </section>
        </>
    )
}
export default GenerateImage