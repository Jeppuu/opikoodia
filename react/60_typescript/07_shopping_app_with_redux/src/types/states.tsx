import ShoppingItem from '../models/ShoppingItem';

export interface ShoppingState {
	list:ShoppingItem[];
	error:string;
}

export interface LoginState {
	isLogged:boolean;
	loading:boolean;
	token:string;
	error:string;
	user:string;
}

export interface AppState {
	shopping:ShoppingState;
	login:LoginState;
}