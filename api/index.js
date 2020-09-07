import express from 'express';
const app = express();
import bookRoutes from './server/routes';
import morgan from 'morgan';


app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 8000;

app.use('/api/v1/books', bookRoutes);

// when a random route is inputed
app.get('*', (req, res) => res.status(200).send({
   message: 'Welcome to this API.'
}));

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
export default app;