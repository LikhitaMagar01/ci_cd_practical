"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import * as z from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Link from "next/link"
import GoogleSignUpButton from "../GoogleSignInButton"
import { useRouter } from "next/navigation"
import { useToast } from "../ui/use-toast"

const formSchema = z.object({
    username: z.string().min(1, 'Username is required.').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid Email'),
    password: z.string().min(1, 'Password is required.').min(8, 'Password must have more than 8 characters.'),
    confirmPassword: z.string().min(1, 'Password confirmation is required.')
}).refine((data)=> data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password do not match'
})

const SignUpForm = () => {
    const router = useRouter()
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    })
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const response = await fetch('api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: values.username,
                email: values.email,
                password: values.password
            })
        })
        if(response.ok){
            router.push('/sign-in')
        }else {
            toast({
                title: "Error",
                description: "Oops! Something when wrong!",
                variant: "destructive"
              })
        }
    }
    return (<>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
        <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                        <Input placeholder="Username" type="username" {...field} />
                    </FormControl>
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
                        <Input placeholder="mail@example.com" type="email" {...field} />
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
                        <Input placeholder="Enter your password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Re-enter your password</FormLabel>
                    <FormControl>
                        <Input placeholder="Re-enter your password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>
        <Button className="w-full mt-6" type="submit">Sign Up</Button>
      </form>
      <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">or</div>
      <GoogleSignUpButton label="Sign Up with Google"></GoogleSignUpButton>
      <p>If you already have an account, plese&nbsp; 
        <Link className="hover:underline text-blue-500" href='/sign-in'>Sign In</Link>
      </p>
    </Form>
    </>)
}

export default SignUpForm