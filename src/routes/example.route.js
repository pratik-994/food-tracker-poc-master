import { Router } from 'express'; // named import
import fetch from 'node-fetch';

export const router = Router(); // named export - multiple exorts per file

// GET, POST, PUT/PATCH, DELETE
// first param - route path
// second param = call back (NOT OPTIONAL)
router.get('/', (req, res) => {
	return res.json({
		ok: true,
		data: {
			message: 'Hello world',
		},
	});
});

router.post('/', (req, res) => {
	return res.json({
		ok: true,
		data: {
			message: 'New data created',
		},
	});
});

router.post('/food', async (req, res) => {
	const reqBody = req.body;

	const apiRes = await fetch(
		`https://api.spoonacular.com/recipes/complexSearch?query=${reqBody.food}&maxFat=${reqBody.maxFat}&number=${reqBody.number}`,
		{
			headers: {
				'x-api-key': 'd127f62b4ec54b7e821ec41b6924b2cb',
			},
		},
	);
	const data = await apiRes.json();

	return res.json({
		ok: true,
		data: data,
	});
});

// default export - one per file
// export default router;
