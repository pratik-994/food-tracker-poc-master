import { Router } from 'express';
import { UserModel } from '../database/init.js';
import crypto from 'crypto';

export const router = Router();

router.post('/', async (req, res) => {
	const reqBody = req.body;

	const fullName = reqBody.fullName;
	const email = reqBody.email;
	const password = reqBody.password;

	const hash = crypto.createHash('sha512').update(password).digest('hex');

	if (!email) {
		return res.json({
			ok: false,
			error: {
				message: 'Email is required',
			},
		});
	}

	const user = new UserModel();
	user.fullName = fullName;
	user.email = email;
	user.password = hash;

	const savedUser = await user.save();

	return res.json({
		ok: true,
		data: savedUser,
	});
});

router.get('/', async (req, res) => {
	const reqBody = req.body;

	const email = reqBody.email;
	const password = reqBody.password;

	const hash = crypto.createHash('sha512').update(password).digest('hex');
	const user = await UserModel.findOne({ email: email, password: hash });

	if (!user) {
		return res.json({
			ok: false,
			error: {
				message: 'User not found',
			},
		});
	}

	return res.json({
		ok: true,
		data: user,
	});
});
