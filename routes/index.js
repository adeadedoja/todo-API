const express = require('express');

const router = express.Router();
const appController = require('../controllers/appController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers');

/*
GET Index
*/
router.get(
  '/',
  appController.getHome,
);

/*
GET All User Todo
*/
router.get(
  '/todos',
  authController.isLoggedIn,
  authController.getUserId,
  appController.getAllTodos,
);

/*
Router to Register User
*/
router.post(
  '/user/register',
  userController.validateRegister,
  catchErrors(userController.checkUserExists),
  catchErrors(userController.registerUser),
);

/*
Router to login User
*/
router.post(
  '/user/login',
  authController.checkLoginInput,
  authController.login,
);

/*
Route to Create New Todo
*/
router.post(
  '/todo/createTodo',
  authController.isLoggedIn,
  catchErrors(authController.getUserId),
  appController.validateCreateTodo,
  catchErrors(appController.addNewTodo),
);

// Route to get TOdo by Slug
router.get(
  '/todo/:slug',
  authController.isLoggedIn,
  catchErrors(authController.getUserId),
  catchErrors(appController.getTodoBySlug),
);


/*
Route to Update Todo
*/
router.put(
  '/todo/:id',
  authController.isLoggedIn,
  catchErrors(authController.getUserId),
  appController.validateUpdateTodo,
  catchErrors(appController.updateTodo),
);


/*
Route to Delete  Todo
*/
router.delete(
  '/todo/:id',
  authController.isLoggedIn,
  authController.getUserId,
  appController.deleteTodo,
);

/*
Route to add activities to todo
*/
router.post(
  '/todo/add/:id',
  authController.isLoggedIn,
  catchErrors(authController.getUserId),
  catchErrors(appController.verifyActivity),
  catchErrors(appController.addActivities),
);

/*
Route to Delete activities from todo
*/
router.delete(
  '/todo/delete/:id',
  authController.isLoggedIn,
  catchErrors(authController.getUserId),
  catchErrors(appController.verifyActivity),
  catchErrors(appController.deleteActivity),
);


module.exports = router;
