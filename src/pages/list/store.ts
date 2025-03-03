import { action, makeAutoObservable, configure } from 'mobx';
import { User } from '@/src/interfaces/user';
import API from '@/src/API';

configure({ enforceActions: 'always' });

export class UserListStore {
	records: User[] = [];
	userList: User[] = [];
	modal: User | null = null;
	isLoading: boolean = false;
	error: Error | null = null;
	filter: 'active' | 'inactive' | null = null;

	constructor() {
		makeAutoObservable(this);
		this.init();
	}

	@action.bound
	async init() {
		this.isLoading = true;
		try {
			this.records = await API.getUsers(50);
			this.userList = this.records;
			//throw new Error('Что то сломалось');
		} catch (e) {
			this.error = e;
		} finally {
			this.isLoading = false;
		}
	}

	@action.bound
	doFilter = () => {
		this.userList = this.records.filter(({ status }: User) => {
			return this.filter ? this.filter === status : true;
		});
	};

	@action.bound
	onClose() {
		this.modal = null;
	}

	@action.bound
	onOpen = (record: User) => () => {
		this.modal = record;
	};

	@action.bound
	onChangeFilter(value: 'active' | 'inactive') {
		this.filter = value;
		this.doFilter();
	}
}
