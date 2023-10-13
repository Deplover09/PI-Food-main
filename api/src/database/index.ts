import mongoose from 'mongoose';
import server from '../server/server';

mongoose.connect('mongodb://127.0.0.1:27017/recipes').then((result)=> console.log("server working"))