import { Router } from 'express';
import fetch from 'node-fetch';
import { FoodHabitModel, MacroModel } from '../database/init.js';

export const router = Router();

router.post('/', async (req, res) => {
	try {
		const reqBody = req.body;

		const userId = reqBody.userId;
		const dailyIntake = reqBody.dailyIntake;

		const apiResponse = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${dailyIntake}`, {
			headers: {
				'X-Api-Key': 'm1QAKx25HT6Vrl1js6m2og==zLVpVUiDfUpnrQUj',
			},
		});
		const apiData = await apiResponse.json();

		let totalCalorie = apiData.items.reduce((accumulator, currentValue) => accumulator + currentValue.calories, 0);

		// for (let i = 0; i < apiData.items.length; i++) {
		// 	console.log(apiData.items[i]);
		// 	totalCalorie += apiData.items[i].calories;
		// }

		const foodHabit = new FoodHabitModel({
			userId,
			calorie: totalCalorie,
		});
		const savedFoodHabit = await foodHabit.save(); // _id

		const macros = [];
		for (let i = 0; i < apiData.items.length; i++) {
			const macro = new MacroModel(apiData.items[i]);
			macro.foodHabitId = savedFoodHabit._id;
			macros.push(macro);
		}

		const savedMacros = await MacroModel.insertMany(macros);

		return res.json({
			ok: true,
			data: {
				foodHabit: savedFoodHabit,
				macros: savedMacros,
			},
		});
	} catch (error) {
		console.log(error);

		return res.json({
			ok: false,
			error: {
				message: error,
			},
		});
	}
});

router.get('/progress', async (req, res) => {
	try {
		const reqBody = req.body;
		const userId = reqBody.userId;

		const foodHabits = await FoodHabitModel.find({ userId });

		return res.json({
			ok: true,
			data: {
				foodHabits,
			},
		});
	} catch (error) {
		console.log(error);

		return res.json({
			ok: false,
			error: {
				message: error,
			},
		});
	}
});
