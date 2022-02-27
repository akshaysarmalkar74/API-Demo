const express = require('express');
const app = express();
const methodOverride = require('method-override');
const usersRepo = require('./repos/users');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Routes
app.get('/', (req, res) => {
	res.send('HOME Route');
});

app.get('/view', async (req, res) => {
	const { id } = req.query;
	if (id) {
		// Return Specific User
		const user = await usersRepo.getOne(id);
		res.send(user).status(200);
	} else {
		// Return All User
		const allUsers = await usersRepo.getAll();
		res.send(allUsers).status(200);
	}
});

// Create New User
app.post('/post', async (req, res) => {
	console.log(req.body);
	const newUser = await usersRepo.create(req.body);
	res.send({ status: 'User Added Successfully' }).status(200);
});

// Edit User
app.patch('/user/:id', async (req, res) => {
	const { id } = req.params;
	const curUser = await usersRepo.getOne(id);
	const user = await usersRepo.update(id, { ...curUser, ...req.body });
	res.send({ status: 'User Updated' }).status(200);
});

app.listen(3000, () => {
	console.log('Server is running on PORT 3000');
});
