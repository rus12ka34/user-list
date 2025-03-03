import moment from 'moment';
import type { TableProps } from 'antd';
import { User } from '@/src/interfaces/user';
// import { Tag } from 'antd';

export const COLUMNS: TableProps<User>['columns'] = [
	{
		title: 'Фио',
		dataIndex: 'fio',
		sorter: (a: User, b: User) => a.fio.localeCompare(b.fio),
		sortDirections: ['descend', 'ascend'],
		key: 'fio',
	},
	{
		title: 'Почта',
		dataIndex: 'email',
		sorter: (a: User, b: User) => a.email.localeCompare(b.email),
		sortDirections: ['descend', 'ascend'],
		key: 'email',
	},
	{
		title: 'Дате регистрации',
		dataIndex: 'date',
		key: 'date',
		sorter: (a: User, b: User) => a.date.getTime() - b.date.getTime(),
		sortDirections: ['descend', 'ascend'],
		render: (date: Date) => moment(date).format('YYYY-MM-DD'),
	},
	{
		title: 'Статус',
		dataIndex: 'status',
		key: 'status',
		sorter: (a: User, b: User) => a.status.localeCompare(b.status),
		sortDirections: ['descend', 'ascend'],
		render: (status: string) => (status === 'active' ? 'Активный' : 'Не активный'),
	},
];

export const FILTER_OPTIONS = [
	{ value: 'active', label: 'Активный' },
	{ value: 'inactive', label: 'Не активный' },
];
