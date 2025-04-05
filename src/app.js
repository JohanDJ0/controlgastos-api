import express from "express";
import cors from "cors";
import indexRoutes from "./routes/index.routes.js";
import userRoutes from "./routes/user.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";
import budgetRoutes from "./routes/budget.routes.js";
import savingRoutes from './routes/savings.routes.js'
import categoriesRoutes from './routes/categories.routes.js'
const app = express();


app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(express.json());

app.use(indexRoutes);
app.use("/api", userRoutes, transactionRoutes, budgetRoutes,savingRoutes,categoriesRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: "enpoint not found",
  });
});

export default app;
