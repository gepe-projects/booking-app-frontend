"use client"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useForm } from "@tanstack/react-form"
import { AlertCircleIcon } from "lucide-react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"



export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [globalError, setGlobalError] = useState<string | null>(null)

  const callbackUrl = searchParams.get('callbackUrl')

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const result = await signIn('credentials', {
          email: value.email,
          password: value.password,
          redirect: false
        });
        // Periksa hasil signIn
        if (result?.error) {
          setGlobalError(result.code!);
        } else {
          // Redirect manual setelah berhasil login
          router.replace(callbackUrl || '/');
        }
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          setGlobalError(error.message);
        } else {
          setGlobalError('An unknown error occurred');
        }
      }
    },
  })
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {globalError && (
            <Alert className="my-3" variant='destructive'>
              <AlertCircleIcon />
              <AlertTitle>{globalError}</AlertTitle>
              {/* <AlertDescription>
                This is an alert with icon, title and description.
              </AlertDescription> */}
            </Alert>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            <div className="flex flex-col gap-6">
              <form.Field
                name="email"
                children={(field) => (
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="text"
                      placeholder="m@example.com"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={e => field.handleChange(e.target.value)}
                      required
                    />
                    {field.state.meta.errors.length > 0 && <p className="text-sm text-red-500">{field.state.meta.errors}</p>}
                  </div>
                )}
              />
              <form.Field
                name="password"
                children={field => (
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={e => field.handleChange(e.target.value)}
                      required
                    />
                    {field.state.meta.errors.length > 0 && <p className="text-sm text-red-500">{field.state.meta.errors}</p>}
                  </div>
                )}
              />
              <div className="flex flex-col gap-3">
                <Button loading={form.state.isSubmitting} loadingText="Loading Icon left" loadingIconPlacement="left" type="submit" onClick={() => form.handleSubmit({ action: "submit login" })} className="w-full">
                  Login
                </Button>
                <Button disabled variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
