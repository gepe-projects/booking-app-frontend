import React, { Suspense } from 'react'
import { LoginForm } from './LoginForm'

const page = async () => {
    return (
        <div className='h-screen flex justify-center items-center'>
            <Suspense>
                <LoginForm className='w-96' />
            </Suspense>
        </div>
    )
}

export default page