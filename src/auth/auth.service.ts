import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class AuthService {
	private supabase: SupabaseClient;

	constructor() {
		this.supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
	}

	async signUp(email: string, password: string, nombre: string) {
		const { data, error } = await this.supabase.auth.signUp({
			email,
			password,
		});

		await this.supabase.from('profiles').insert([
			{
				nombre,
				id: data.user.id,
			},
		]);

		return { error };
	}

	async signIn(email: string, password: string) {
		const { data, error } = await this.supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});
		const nombre = await this.supabase
			.from('profiles')
			.select('nombre')
			.eq('id', data.user.id);

		const user = {
			id: data.user.id,
			nombre: nombre.data[0].nombre,
			session: data.session,
		};
		return { user, error };
	}

	async signOut() {
		const { error } = await this.supabase.auth.signOut();

		return { error };
	}

	async getAllProfile() {
		const { data, error } = await this.supabase.from('profiles').select('*');
		if (error) {
			throw new Error(error.message);
		}

		return data;
	}
}
