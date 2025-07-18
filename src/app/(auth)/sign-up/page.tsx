'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { signUpSchema } from '@/schemas/signUpSchema'
import { ApiResponseDto } from '@/types/apiResponse'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { CircleX, Loader2, Verified } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from "sonner"
import { useDebounceCallback } from 'usehooks-ts'
import * as z from 'zod'

const page = () => {
    const router = useRouter();
    const [userName, setUserName] = useState('')
    const [userNameMessage, setUserNameMessage] = useState('')
    const [userNameStatus, setUserNameStatus] = useState(false)
    const [isCheckingUserName, setIsCheckingUserName] = useState(false)
    const [isFormSubmitting, setIsFormSubmitting] = useState(false)

    const debounced = useDebounceCallback(setUserName, 500)

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            userName: '',
            email: '',
            password: ''
        }
    });


    useEffect(() => {
        const checkUserNameUnique = async () => {
            if (userName) {
                setIsCheckingUserName(true)
                setUserNameMessage('')
                setUserNameStatus(false)
                try {
                    const requestUrl = `/api/check-unique-username?username=${userName}`
                    const response = await axios.get(requestUrl)
                    setUserNameMessage(response.data?.message);
                    setUserNameStatus(response.data?.success)
                } catch (error) {
                    console.log("Error checking the unique username", error)
                    const axiosError = error as AxiosError<ApiResponseDto>;
                    setUserNameMessage(axiosError.response?.data.message ?? 'Error Checking the unique username')
                    setUserNameStatus(axiosError.response?.data.success ?? false)
                } finally {
                    setIsCheckingUserName(false)
                }
            }
        }
        checkUserNameUnique();
    }, [userName])

    const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
        setIsFormSubmitting(true)
        console.log("SIgnup data", data)
        try {
            const response = await axios.post('/api/signup', data)
            toast('Success', {
                description: response.data.message,
                position: 'bottom-right',
                className: 'bg-green-500 text-white'
            })
            router.replace(`/verify/${userName}`)
        } catch (error) {
            console.log("Error Signing up the user", error)
            const axiosError = error as AxiosError<ApiResponseDto>;
            toast('Success', {
                description: axiosError.response?.data.message ?? 'Error Signing up user',
                position: 'bottom-right',
                className: 'bg-red-500 text-white',
            })
        } finally {
            setIsFormSubmitting(false)
        }

    }
    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='w-full max-w-md p-8 space-y-6 rounded-lg shadow-md'>
                <div className='text-center'>
                    <h1 className='text-4xl font-extrabold tracking-tight mb-6 lg:text-5xl'>Join Nextjs Project</h1>
                    <p className='mb-4'>Signup to start your anonymous adventure</p>
                </div>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                            <FormField
                                control={form.control}
                                name="userName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter username"
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e)
                                                    debounced(e.target.value)
                                                }}
                                            />
                                        </FormControl>
                                        {isCheckingUserName && <Loader2 size={20} className='animate-spin' />}
                                        {userNameMessage && (
                                            userNameStatus ? (
                                                <p className='text-sm text-green-500 flex gap-2'>
                                                    <Verified size={20} />
                                                    {userNameMessage}
                                                </p>
                                            ) : (
                                                <p className='text-sm text-red-500 flex gap-2'>
                                                    <CircleX size={20} />
                                                    {userNameMessage}
                                                </p>
                                            )
                                        )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='email'
                                                placeholder="Enter email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='password'
                                                placeholder="Enter password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type='submit' disabled={isFormSubmitting}>
                                {
                                    isFormSubmitting ? (
                                        <>
                                            <Loader2 size={25} className='animate-spin' />
                                            Signing up...
                                        </>
                                    ) : (
                                        <>
                                            Signup
                                        </>
                                    )
                                }
                            </Button>
                        </form>
                    </Form>
                    <div className='text-center mt-4'>
                        <p>Already a member ?</p>{''}
                        <Link href={"/sign-in"} className='text-blue-600 hover:text-blue-800'>
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page