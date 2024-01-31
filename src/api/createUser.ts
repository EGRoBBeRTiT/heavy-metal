'use server';

import { z } from 'zod';
import { zfd } from 'zod-form-data';
import bcrypt from 'bcrypt';

import { getUser } from '@/api/getUser';
import { DATA_BASE, clientDb } from '@/api/config';
import type { User } from '@/types/User.types';
import { UserType } from '@/types/User.types';

export const createUser = async (data: FormData) => {
    const parsedData = zfd
        .formData({
            email: zfd.text(z.string().email()),
            password: zfd.text(z.string().min(8)),
            passwordRepeat: zfd.text(z.string().min(8)),
            firstName: zfd.text(z.string()),
            lastName: zfd.text(z.string()),
        })
        .safeParse(data);

    if (parsedData.success) {
        const { password, passwordRepeat, email, firstName, lastName } =
            parsedData.data;

        if (password !== passwordRepeat) {
            throw new Error('Пароли не совпадают');
        }

        const user = await getUser(email);

        if (user) {
            throw new Error('Пользователь с таким email уже существует');
        }

        const db = await clientDb();

        await db.collection<User>(DATA_BASE.COLLECTION.USERS).insertOne({
            email,
            password: await bcrypt.hash(password, 10),
            firstName,
            lastName,
            type: UserType.DEFAULT,
        });
    } else {
        throw new Error('Ошибка валидации формы');
    }
};
