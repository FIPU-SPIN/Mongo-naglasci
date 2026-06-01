const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  assigned_accent_system_id: {
    type: Schema.Types.ObjectId,
    ref: 'AccentSystem'
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


const User = mongoose.model('User', userSchema);

// Admin Schema
const adminSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  role: {
    type: String,
    required: true,
    enum: ['super_admin', 'admin', 'moderator']
  }
}, {
  timestamps: true
});

const Admin = mongoose.model('Admin', adminSchema);

// Accent System Schema
const accentSystemSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  managed_by_admin_id: {
    type: Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  }
}, {
  timestamps: true
});

const AccentSystem = mongoose.model('AccentSystem', accentSystemSchema);

// Task Schema
const taskSchema = new Schema({
  subpage_id: {
    type: Schema.Types.ObjectId,
    ref: 'Subpage',
    required: true
  },
  accent_system_id: {
    type: Schema.Types.ObjectId,
    ref: 'AccentSystem',
    required: true
  },
  question_text: {
    type: String,
    required: true
  },
  correct_answer: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['easy', 'medium', 'hard']
  },
  managed_by_admin_id: {
    type: Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  }
}, {
  timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

// User Task Attempt Schema
const userTaskAttemptSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  task_id: {
    type: Schema.Types.ObjectId,
    ref: 'Task',
    required: true
  },
  user_answer: {
    type: String,
    required: true
  },
  is_correct: {
    type: Boolean,
    required: true
  },
  points: {
    type: Number,
    required: true,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const UserTaskAttempt = mongoose.model('UserTaskAttempt', userTaskAttemptSchema);

// Initial Assessment Schema
const initialAssessmentSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true  // One-to-one relationship
  },
  accent_system_id: {
    type: Schema.Types.ObjectId,
    ref: 'AccentSystem',
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const InitialAssessment = mongoose.model('InitialAssessment', initialAssessmentSchema);

// Quiz Result Schema
const quizResultSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  accent_system_id: {
    type: Schema.Types.ObjectId,
    ref: 'AccentSystem',
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const QuizScore = mongoose.model('QuizScore', quizResultSchema);

// Page Schema
const pageSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  managed_by_admin_id: {
    type: Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  }
}, {
  timestamps: true
});

const Page = mongoose.model('Page', pageSchema);

// Subpage Schema
const subpageSchema = new Schema({
  page_id: {
    type: Schema.Types.ObjectId,
    ref: 'Page',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  managed_by_admin_id: {
    type: Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  }
}, {
  timestamps: true
});

const Subpage = mongoose.model('Subpage', subpageSchema);

// Database connection function
async function connectDB(uri = 'mongodb+srv://admin:admin@cluster0.dd1tf36.mongodb.net/Naglasci') {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

// Export all models and connection function
module.exports = {
  User,
  Admin,
  AccentSystem,
  Task,
  UserTaskAttempt,
  InitialAssessment,
  QuizScore,
  Page,
  Subpage,
  connectDB
};
