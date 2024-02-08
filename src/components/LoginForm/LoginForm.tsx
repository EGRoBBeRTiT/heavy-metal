'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@nextui-org/button';
import { useSearchParams } from 'next/navigation';
import { Input, Link } from '@nextui-org/react';
import cnBind from 'classnames/bind';

import { authenticate } from '@/api/authenticate';
import { appRoutes } from '@/routes';
import { useHistory } from '@/hooks/context/useHistory';

import styles from './LoginForm.module.scss';

const cx = cnBind.bind(styles);

const LoginButton = () => {
    const { pending } = useFormStatus();

    return (
        <Button
            className="mt-4 w-full"
            aria-disabled={pending}
            disabled={pending}
            isLoading={pending}
            type="submit"
        >
            Войти
        </Button>
    );
};

export const LoginForm = () => {
    const searchParams = useSearchParams();
    const { replace } = useHistory();

    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    return (
        <form action={dispatch} className={cx('form')}>
            <h1>Авторизация</h1>
            <div className={cx('input-container')}>
                <Input
                    isClearable
                    isRequired
                    id="email"
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="Введите Email"
                    required
                    autoComplete="email"
                    labelPlacement="outside"
                />
                <Input
                    id="password"
                    type="password"
                    name="password"
                    label="Пароль"
                    placeholder="Введите пароль"
                    required
                    isRequired
                    minLength={8}
                    autoComplete="password"
                    labelPlacement="outside"
                />
            </div>
            <LoginButton />
            <span>
                {`Нет аккаунта? `}
                <Link
                    className={cx('link')}
                    href={appRoutes.register(searchParams.toString())}
                    onClick={(e) => {
                        e.preventDefault();

                        replace(appRoutes.register(searchParams.toString()));
                    }}
                >
                    Зарегистрироваться
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
