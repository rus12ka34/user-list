import { observer } from 'mobx-react';
import { useState } from 'react';
import { Table, Modal, Select, Skeleton, Alert, Button, Card, Descriptions, Tag } from 'antd';
import { COLUMNS, FILTER_OPTIONS } from './constants';
import { UserListStore } from './store';
import { User } from '@/src/interfaces/user';
import moment from 'moment';

export const UserList: React.FC = observer(() => {
	// Для инициализации стора в функциональном компоненте. Сработает лишь при первом рендере
	const [context] = useState(() => new UserListStore());
	const { onChangeFilter, filter, error, isLoading, onOpen, userList, modal, onClose } = context;

	return (
		<Card
			title='Пользователи'
			extra={
				<Select
					placeholder='Статус'
					style={{ width: '200px' }}
					onChange={onChangeFilter}
					allowClear
					value={filter}
					options={FILTER_OPTIONS}
				/>
			}
		>
			{error ? (
				<Alert message={error.message} type='error' />
			) : (
				<Skeleton loading={isLoading} active>
					<Table<User>
						onRow={(record: User) => {
							return {
								onClick: onOpen(record),
							};
						}}
						dataSource={userList}
						columns={COLUMNS}
					/>
				</Skeleton>
			)}

			{modal && (
				<Modal
					title={modal.fio}
					open={true}
					onOk={onClose}
					onCancel={onClose}
					footer={[
						<Button key='cancel' onClick={onClose}>
							Закрыть
						</Button>,
					]}
				>
					<Descriptions column={1}>
						<Descriptions.Item label='Дата регистрации'>
							{moment(modal.date).format('YYYY-MM-DD')}
						</Descriptions.Item>
						<Descriptions.Item label='Почта'> {modal.email}</Descriptions.Item>
						<Descriptions.Item label='Статус'>
							{modal.status === 'active' ? (
								<Tag color='success'>Активен</Tag>
							) : (
								<Tag color='error'>Не активен</Tag>
							)}
						</Descriptions.Item>
						<Descriptions.Item label='Телефон'>{modal.phone}</Descriptions.Item>
						<Descriptions.Item label='Адрес'>{modal.address}</Descriptions.Item>
					</Descriptions>
				</Modal>
			)}
		</Card>
	);
});
