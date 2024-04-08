"use client"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import * as z from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Link from "next/link"
import GoogleSignUpButton from "../GoogleSignInButton"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid Email'),
    password: z.string().min(1, 'Password is required.').min(8, 'Password must have more than 8 characters.')
})

const SignInForm = () => {
    const { toast } = useToast()
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const signInData = await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false
        })
        if(signInData?.error){
            toast({
                title: "Error",
                description: "Oops! Something when wrong!",
                variant: "destructive"
              })
        }else {
            router.refresh()
            router.push('/admin')
        }
    }
    return (<>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
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
        </div>
        <Button className="w-full mt-6" type="submit">Sign In</Button>
      </form>
      <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">or</div>
      <GoogleSignUpButton label="Sign In with Google"></GoogleSignUpButton>
      <p>If you don&apos;t have an account, plese&nbsp; 
        <Link className="hover:underline text-blue-500" href='/sign-up'>Sign Up</Link>
      </p>
    </Form>
    </>)
}

export default SignInForm