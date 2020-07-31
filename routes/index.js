'use strict';

const { Router } = require('express');
const router = Router();
const routeGuard = require('./../middleware/route-guard');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Hello World!' });
});

router.get('/private', routeGuard, (req, res, next) => {
  res.render('authentication/private');
});

const roleRouteGuard = require('./../middleware/role-route-guard');

router.get('/student-dashboard', routeGuard, (req, res, next) => {
  res.render('dashboard/student');
});

router.get(
  '/assistant-dashboard',
  routeGuard,
  roleRouteGuard(['assistant', 'teacher']),
  (req, res, next) => {
    res.render('dashboard/assistant');
  }
);

router.get(
  '/teacher-dashboard',
  routeGuard,
  roleRouteGuard(['teacher']),
  (req, res, next) => {
    res.render('dashboard/teacher');
  }
);

module.exports = router;
