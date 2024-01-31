'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@nextui-org/button';
import { Input, Link } from '@nextui-org/react';
import { useState } from 'react';
import cnBind from 'classnames/bind';
import { useRouter, useSearchParams } from 'next/navigation';

import { register } from '@/api/register';
import { appRoutes } from '@/routes';

import styles from './RegisterForm.module.scss';

const cx = cnBind.bind(styles);

const RegisterButton = ({ disabled }: { disabled?: boolean }) => {
    const status = useFormStatus();

    return (
        <Button
            className="mt-4 w-full"
            aria-disabled={status.pending}
            disabled={status.pending || disabled}
            isLoading={status.pending}
            type="submit"
        >
            Зарегистрироваться
        </Button>
    );
};

export const RegisterForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const [errorMessage, dispatch] = useFormState(register, undefined);

    const [passwordError, setPasswordError] = useState('');

    return (
        <form action={dispatch} className={cx('form')}>
            <h1>Регистрация</h1>
            <div className={cx('input-container')}>
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
                    placeholder="Введите Email"
                    defaultValue=""
                    required
                    onClear={() => setEmail('')}
                    autoComplete="email"
                    labelPlacement="outside"
                />
                <Input
                    isRequired
                    id="firstName"
                    type="text"
                    name="firstName"
                    label="Имя"
                    placeholder="Введите свое имя"
                    required
                    autoComplete="given-name"
                    labelPlacement="outside"
                />
                <Input
                    isRequired
                    id="lastName"
                    type="text"
                    name="lastName"
                    label="Фамилия"
                    placeholder="Введите свою фамилию"
                    required
                    autoComplete="family-name"
                    labelPlacement="outside"
                />
                <Input
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    isRequired
                    id="password"
                    type="password"
                    name="password"
                    label="Пароль"
                    placeholder="Введите пароль"
                    required
                    minLength={8}
                    autoComplete="new-password"
                    labelPlacement="outside"
                />
                <Input
                    value={passwordRepeat}
                    onChange={(e) => {
                        setPasswordRepeat(e.target.value);

                        if (
                            e.target.value.length >= password.length &&
                            e.target.value !== password
                        ) {
                            setPasswordError('Пароли не совпадают');
                        } else {
                            setPasswordError('');
                        }
                    }}
                    isRequired
                    id="password-repeat"
                    type="password"
                    name="passwordRepeat"
                    placeholder="Повторите пароль"
                    required
                    minLength={8}
                    autoComplete="new-password"
                    isInvalid={!!passwordError}
                    errorMessage={passwordError}
                    labelPlacement="outside"
                />
            </div>
            <RegisterButton disabled={!!passwordError} />
            <span>
                {`Уже есть аккаунт? `}
                <Link
                    className={cx('link')}
                    href={appRoutes.login(searchParams.toString())}
                    onClick={(e) => {
                        e.preventDefault();

                        router.replace(
                            appRoutes.login(searchParams.toString()),
                        );
                    }}
                >
                    Войти
                </Link>
            </span>
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
