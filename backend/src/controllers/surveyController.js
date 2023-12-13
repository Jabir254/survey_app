const { Survey, Response, User } = require("../models");

// create a new survey
const createSurvey = async (req, res) => {
  const { question, options } = req.body;
  const createdBy = req.User.id;

  try {
    const newSurvey = await Survey.create({ question, options, createdBy });
    res.status(201).json(newSurvey);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create a survey" });
  }
};

// Controller to get all surveys
const getAllSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find().populate("createdBy", "username"); // Populate createdBy field with user's username
    res.status(200).json(surveys);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve surveys" });
  }
};

// Controller to get a specific survey by ID
const getSurveyById = async (req, res) => {
  const surveyId = req.params.id;

  try {
    const survey = await Survey.findById(surveyId).populate(
      "createdBy",
      "username"
    );
    if (!survey) {
      return res.status(404).json({ error: "Survey not found" });
    }
    res.status(200).json(survey);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve survey" });
  }
};

// Controller to submit a response to a survey
const submitSurveyResponse = async (req, res) => {
  const { surveyId, choices } = req.body;
  const userId = req.user.id; // Assuming you have user information in the request's user object

  try {
    const survey = await Survey.findById(surveyId);
    if (!survey) {
      return res.status(404).json({ error: "Survey not found" });
    }

    // Check if the user has already submitted a response for this survey
    const existingResponse = await Response.findOne({
      user: userId,
      survey: surveyId,
    });
    if (existingResponse) {
      return res
        .status(400)
        .json({
          error: "User has already submitted a response for this survey",
        });
    }

    // Create a new response
    const newResponse = await Response.create({
      user: userId,
      survey: surveyId,
      choices,
    });

    // Update the survey's responses array
    survey.responses.push(newResponse._id);
    await survey.save();

    res.status(201).json(newResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to submit survey response" });
  }
};

module.exports = {
  createSurvey,
  getAllSurveys,
  getSurveyById,
  submitSurveyResponse,
  // ... other survey-related controllers
};
