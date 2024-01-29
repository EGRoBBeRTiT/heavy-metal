/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/react';
import { useState } from 'react';

import { register } from '@/api/register';

const LoginButton = () => {
    const { pending } = useFormStatus();

    return (
        <Button className="mt-4 w-full" aria-disabled={pending} type="submit">
            Register
        </Button>
    );
};

export const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const [errorMessage, dispatch] = useFormState(register, undefined);

    return (
        <form action={dispatch}>
            <h1>Регистрация</h1>
            <div>
                <label htmlFor="email">
                    Email
                    <Input
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        isClearable
                        isRequired
                        id="email"
                        type="email"
                        name="email"
                        label="Email"
                        placeholder="Enter your email address"
                        defaultValue=""
                        required
                        onClear={() => setEmail('')}
                        autoComplete="email"
                    />
                </label>
                <label htmlFor="firstName">
                    First Name
                    <Input
                        isRequired
                        id="firstName"
                        type="text"
                        name="firstName"
                        label="First Name"
                        placeholder="Enter your first name"
                        required
                        autoComplete="given-name"
                    />
                </label>
                <label htmlFor="lastName">
                    Last Name
                    <Input
                        isRequired
                        id="lastName"
                        type="text"
                        name="lastName"
                        label="Last Name"
                        placeholder="Enter your last name"
                        required
                        autoComplete="family-name"
                    />
                </label>
                <label htmlFor="password">
                    Password
                    <Input
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        isRequired
                        id="password"
                        type="password"
                        name="password"
                        label="Password"
                        placeholder="Enter password"
                        required
                        minLength={8}
                        autoComplete="new-password"
                    />
                </label>
                <label htmlFor="password-repeat">
                    Repeat Password
                    <Input
                        value={passwordRepeat}
                        onChange={(e) => {
                            setPasswordRepeat(e.target.value);
                        }}
                        isRequired
                        id="password-repeat"
                        type="password"
                        name="passwordRepeat"
                        label="Repeat Password"
                        placeholder="Repeat password"
                        required
                        minLength={8}
                        autoComplete="new-password"
                    />
                </label>
            </div>
            <LoginButton />
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
