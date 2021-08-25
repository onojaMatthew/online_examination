import error from "../config/error";
import questionRoutes from "../controllers/question/router";
import userRoutes from "../controllers/user/router";
import userQuestionRoutes from "../controllers/user_question/router";
import adminRoutes from "../controllers/admin/router";

export default (app) => {
  app.use("/api/v1", questionRoutes);
  app.use("/api/v1", userRoutes);
  app.use("/api/v1", userQuestionRoutes);
  app.use("/api/v1", adminRoutes);
  app.use(error);
}