import mongoose from 'mongoose';

export const initialize = async () => {
	try{
		mongoose.set('strictQuery', false);
		const connectionString = 'mongodb+srv://pratik:root@cluster0.ochioig.mongodb.net/?retryWrites=true&w=majority';
	
		await mongoose.connect(connectionString, ()=>{
			console.log('Connected to database');
		});
	}catch(e){
		console.log('Error connecting to db');
		console.log(e)
	}
};

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
	fullName: String,
	email: String,
	password: String,
});

const FoodHabitSchema = new Schema({
	userId: ObjectId,
	calorie: Number,
	date: { type: Date, default: Date.now },
});

const MacroSchema = new Schema({
	foodHabitId: ObjectId,
	name: String,
	calories: Number,
	service_size_g: Number,
	fat_total_g: Number,
	fat_saturated_g: Number,
	protein_g: Number,
	sodium_mg: Number,
	potassium_mg: Number,
	cholesterol_mg: Number,
	carbohydrates_total_g: Number,
	fiber_g: Number,
	sugar_g: Number,
});

export const UserModel = mongoose.model('user', UserSchema);
export const FoodHabitModel = mongoose.model('foodHabit', FoodHabitSchema);
export const MacroModel = mongoose.model('macro', MacroSchema);
