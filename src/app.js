import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import configViewEngine from './config/configEngine.js';
import routes from './routes/web.js';

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup view engine & static assets
configViewEngine(app);

// Initialize routes
routes.initWebRouter(app);

app.get('/', (req, res) => {
    res.redirect('/home');
});

export default app;
