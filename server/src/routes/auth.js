import { Router } from 'express';
import passport from 'passport';

export default () => {
  const api = Router();

  api.get(
    '/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  api.get(
    '/google/cb',
    passport.authenticate('google', { session: true }),

    (req, res) => {
      res.redirect('http://localhost:8080');
    }
  );

  api.get('/facebook', passport.authenticate('facebook'));

  api.get(
    '/facebook/cb',
    passport.authenticate('facebook', { session: true }),

    (req, res) => {
      res.redirect('http://localhost:8080');
    }
  );

  api.get('/', (req, res) => {
    res.append('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.append('Access-Control-Allow-Credentials', 'true');
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');

    res.send(req.isAuthenticated());
  });

  api.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
  });

  api.get('/getUser', (req, res) => {
    res.append('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.append('Access-Control-Allow-Credentials', 'true');
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');

    res.send(req.user);
  });

  return api;
};
