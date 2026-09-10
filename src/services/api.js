// Mock API Services for TechNova Prototype
// These simulate backend API calls that would connect to real government systems

import { 
  userProfile, 
  competencies, 
  skillGaps, 
  recommendedCourses, 
  quizQuestions,
  adminAnalytics,
  integrations
} from '../data/mockData';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// User Profile Service
export const getUserProfile = async () => {
  await delay(300);
  return { ...userProfile };
};

// Competency Service
export const getCompetencies = async () => {
  await delay(400);
  return { ...competencies };
};

// Skill Gap Service
export const getSkillGaps = async () => {
  await delay(350);
  return [...skillGaps];
};

// Recommendation Service
export const getRecommendedCourses = async () => {
  await delay(500);
  return [...recommendedCourses];
};

// Assessment Service
export const generateQuiz = async (documentName, numQuestions = 5) => {
  await delay(800); // Simulate AI generation time
  return quizQuestions.slice(0, numQuestions);
};

export const submitQuiz = async (answers) => {
  await delay(500);

  let score = 0;
  const results = quizQuestions.map((q, index) => {
    const isCorrect = answers[index] === q.correctAnswer;
    if (isCorrect) score++;
    return {
      questionId: q.id,
      isCorrect,
      userAnswer: answers[index],
      correctAnswer: q.correctAnswer
    };
  });

  return {
    score,
    total: quizQuestions.length,
    percentage: Math.round((score / quizQuestions.length) * 100),
    results,
    feedback: generateFeedback(score, quizQuestions.length)
  };
};

const generateFeedback = (score, total) => {
  const percentage = (score / total) * 100;
  if (percentage >= 80) {
    return "Your understanding of sampling concepts is strong. Consider revisiting sampling error and survey design methodology to improve further.";
  } else if (percentage >= 60) {
    return "Good effort! Review the explanations for incorrect answers to strengthen your understanding.";
  } else {
    return "Consider reviewing the learning material again before retaking the assessment.";
  }
};

// Competency Update Service (Closed Learning Loop)
export const updateCompetency = async (skillUpdates) => {
  await delay(600);

  // Simulate updating competencies
  const updatedCompetencies = { ...competencies };

  skillUpdates.forEach(update => {
    const { skill, newScore } = update;

    // Find and update the skill in the appropriate category
    Object.keys(updatedCompetencies).forEach(category => {
      const categorySkills = updatedCompetencies[category].skills;
      const skillIndex = categorySkills.findIndex(s => s.name === skill || s.name.includes(skill));
      if (skillIndex !== -1) {
        categorySkills[skillIndex].current = newScore;
      }
    });
  });

  // Recalculate category scores
  Object.keys(updatedCompetencies).forEach(category => {
    const skills = updatedCompetencies[category].skills;
    const avgScore = Math.round(skills.reduce((sum, s) => sum + s.current, 0) / skills.length);
    updatedCompetencies[category].score = avgScore;
  });

  // Calculate new role readiness (weighted average)
  const newRoleReadiness = Math.round(
    (updatedCompetencies.statistical.score * 0.35 +
     updatedCompetencies.technical.score * 0.30 +
     updatedCompetencies.digitalGovernance.score * 0.15 +
     updatedCompetencies.managerial.score * 0.20) / 100 * 100
  );

  return {
    competencies: updatedCompetencies,
    newRoleReadiness,
    updatedSkills: skillUpdates
  };
};

// Admin Analytics Service
export const getAdminAnalytics = async () => {
  await delay(500);
  return { ...adminAnalytics };
};

// Integration Status Service
export const getIntegrationStatus = async () => {
  await delay(300);
  return { ...integrations };
};

// Prototype Recommendation Logic (Explainable AI)
export const calculateRecommendationPriority = (skill) => {
  // Simple explainable algorithm
  const skillGap = skill.required - skill.current;
  const roleRelevance = getRoleRelevance(skill.name); // 1-3 scale
  const learningHistory = 1; // Could factor in past learning

  const priority = skillGap + (roleRelevance * 10) + (learningHistory * 5);

  return {
    priority,
    breakdown: {
      skillGap,
      roleRelevance: roleRelevance * 10,
      learningHistory: learningHistory * 5
    },
    note: "Prototype Recommendation Logic - Production system will use validated competency frameworks"
  };
};

const getRoleRelevance = (skillName) => {
  const highRelevance = ['Python', 'SQL', 'GIS', 'AI/ML', 'Data Quality Frameworks'];
  const mediumRelevance = ['R', 'Cloud Computing', 'Data Visualization', 'Statistical Methods'];

  if (highRelevance.some(s => skillName.includes(s))) return 3;
  if (mediumRelevance.some(s => skillName.includes(s))) return 2;
  return 1;
};
