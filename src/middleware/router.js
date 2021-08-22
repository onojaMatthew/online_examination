import error from "../config/error";
import questionRoutes from "../controllers/question/router";
import userRoutes from "../controllers/user/router";
import userQuestionRoutes from "../controllers/user_question/router";

export default (app) => {
  app.use("/api/v1", questionRoutes);
  app.use("/api/v1", userRoutes);
  app.use("/api/v1", userQuestionRoutes);
  app.use(error);
}