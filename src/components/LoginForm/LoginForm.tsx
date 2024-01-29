'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';
import { Link } from '@nextui-org/react';

import { authenticate } from '@/api/authenticate';
import { appRoutes } from '@/routes';

const LoginButton = () => {
    const { pending } = useFormStatus();

    return (
        <Button className="mt-4 w-full" aria-disabled={pending} type="submit">
            Log in
        </Button>
    );
};

export const LoginForm = () => {
    const router = useRouter();
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    return (
        <form action={dispatch} className="space-y-3">
            <h1 className={` mb-3 text-2xl`}>Please log in to continue.</h1>
            <div className="w-full">
                <div>
                    <label
                        className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                        htmlFor="email"
                    >
                        Email
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                required
                            />
                        </div>
                    </label>
                </div>
                <div className="mt-4">
                    <label
                        className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                        htmlFor="password"
                    >
                        Password
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                required
                                minLength={6}
                            />
                        </div>
                    </label>
                </div>
            </div>
            <LoginButton />
            <Link
                href={appRoutes.register()}
                onClick={(e) => {
                    e.preventDefault();

                    router.replace(appRoutes.register());
                }}
            >
                Зарегистрироваться
            </Link>
            <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
            >
                {errorMessage && (
                    <p className="text-sm text-red-500">{errorMessage}</p>
                )}
            </div>
        </form>
    );
};
