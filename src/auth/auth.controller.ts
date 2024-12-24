import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('sign-up')
	async signUp(@Body() body: { email: string; password: string; nombre: string }) {
		return this.authService.signUp(body.email, body.password, body.nombre);
	}

	@Post('sign-in')
	async signIn(@Body() body: { email: string; password: string }, @Res() res: Response) {
		const { user, error } = await this.authService.signIn(body.email, body.password);

		if (user.session) {
			return res.status(200).json(user);
		} else {
			return res.status(401).json({ error });
		}
	}

	@Post('sign-out')
	async signOut() {
		return this.authService.signOut();
	}

	@Get('all-profiles')
	getAllProfile() {
		return this.authService.getAllProfile();
	}
}
