import express from 'express';
import path from 'path';

const configViewEngine = (app) => {
    const publicPath = path.join(process.cwd(), 'src', 'public');
    const viewsPath = path.join(process.cwd(), 'src', 'views');
    app.use(express.static(publicPath));
    app.set('view engine', 'ejs');
    app.set('views', viewsPath);
};

export default configViewEngine;
