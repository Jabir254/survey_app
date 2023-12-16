const express = require("express");
const surveyController = require("../controllers/surveyController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

//create a new survey
router.post(
  "/create",
  authMiddleware.authenticateUser,
  surveyController.createSurvey
);

//to get all surveys
router.get("/", surveyController.getAllSurveys);

//get a specific survey by ID
//router.get("/:id", surveyController.getSurveyById);

// to submit a response to a survey
router.post(
  "/:id/submit",
  authMiddleware.authenticateUser,
  surveyController.submitSurveyResponse
);

module.exports = router;
