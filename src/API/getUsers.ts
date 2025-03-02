import { faker } from '@faker-js/faker';
import { User } from '@/src/interfaces/user';

export const getUsers = (count: number): Promise<User[]> => {
	// throw new Error('Какая то ошибка');
	const generateUsers = (count: number): User[] => {
		const users: User[] = [];

		for (let i = 0; i < count; i++) {
			const user: User = {
				key: faker.string.uuid(),
				fio: faker.person.fullName(),
				email: faker.internet.email(),
				date: faker.date.birthdate(),
				phone: '+7' + faker.phone.number({ style: 'national' }),
				address: faker.location.streetAddress(),
				status: faker.datatype.boolean() ? 'active' : 'inactive',
			};
			users.push(user);
		}

		return users;
	};

	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(generateUsers(count));
		}, 1500);
	});
};
