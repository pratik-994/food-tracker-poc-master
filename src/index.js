import express from 'express'; // default import
import { initialize } from './database/init.js';
import { router as exampleRoute } from './routes/example.route.js'; // named import since named export
import { router as userRoute } from './routes/user.route.js'; // named import since named export
import { router as foodRoute } from './routes/food.route.js';

const app = express(); // initialize express app
app.use(express.json()); // for post requests

// initialize database
initialize();

// add prefixes to route names
app.use('/example', exampleRoute);
app.use('/user', userRoute);
app.use('/food', foodRoute);

app.listen(3000, () => {
	// callback function
	console.log('Server up');
});
