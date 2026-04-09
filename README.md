# MongoDB Schema Implementation Guide

This guide shows how to use the MongoDB models created from your ERD diagram in both JavaScript (Mongoose) and Python (MongoEngine & PyMongo).

## Installation

### JavaScript (Node.js)
```bash
npm install mongoose
```

### Python
```bash
# For MongoEngine (ORM approach)
pip install mongoengine bcrypt

# For PyMongo (native driver)
pip install pymongo bcrypt
```

## Quick Start

### JavaScript (Mongoose)

```javascript
const {
  User,
  Admin,
  AccentSystem,
  Task,
  UserTaskAttempt,
  connectDB
} = require('./mongoose-models');

// Connect to database
connectDB('mongodb://localhost:27017/accent_learning');

// Create an admin
const createAdmin = async () => {
  const admin = new Admin({
    username: 'admin1',
    password: 'hashed_password_here',
    email: 'admin@example.com',
    role: 'admin'
  });
  await admin.save();
  return admin;
};

// Create an accent system
const createAccentSystem = async (adminId) => {
  const accent = new AccentSystem({
    name: 'British English',
    managed_by_admin_id: adminId
  });
  await accent.save();
  return accent;
};

// Create a user
const createUser = async (accentSystemId) => {
  const user = new User({
    email: 'user@example.com',
    password: 'hashed_password_here',
    name: 'John Doe',
    assigned_accent_system_id: accentSystemId
  });
  await user.save();
  return user;
};

// Query with population (joins)
const getUserWithDetails = async (userId) => {
  const user = await User.findById(userId)
    .populate('assigned_accent_system_id')
    .exec();
  return user;
};

// Get user's task attempts
const getUserAttempts = async (userId) => {
  const attempts = await UserTaskAttempt.find({ user_id: userId })
    .populate('task_id')
    .sort({ date: -1 })
    .limit(10);
  return attempts;
};
```

### Python (MongoEngine)

```python
from mongoengine_models import (
    User, Admin, AccentSystem, Task, 
    UserTaskAttempt, connect_db
)

# Connect to database
connect_db(db_name='accent_learning')

# Create an admin
def create_admin():
    admin = Admin(
        username='admin1',
        email='admin@example.com',
        role='admin'
    )
    admin.set_password('securepassword')
    admin.save()
    return admin

# Create an accent system
def create_accent_system(admin):
    accent = AccentSystem(
        name='British English',
        managed_by_admin_id=admin
    )
    accent.save()
    return accent

# Create a user
def create_user(accent_system):
    user = User(
        email='user@example.com',
        name='John Doe',
        assigned_accent_system_id=accent_system
    )
    user.set_password('userpassword')
    user.save()
    return user

# Query with references
def get_user_with_details(user_id):
    user = User.objects(id=user_id).first()
    if user and user.assigned_accent_system_id:
        accent = user.assigned_accent_system_id
        print(f"User: {user.name}, Accent: {accent.name}")
    return user

# Get user's task attempts
def get_user_attempts(user):
    attempts = UserTaskAttempt.objects(user_id=user).order_by('-date').limit(10)
    return list(attempts)
```

### Python (PyMongo)

```python
from pymongo_models import (
    Database, UserModel, AdminModel, AccentSystemModel,
    TaskModel, UserTaskAttemptModel
)

# Initialize database
db_manager = Database(
    connection_string='mongodb://localhost:27017/',
    db_name='accent_learning'
)
db = db_manager.db

# Initialize models
user_model = UserModel(db)
admin_model = AdminModel(db)
accent_model = AccentSystemModel(db)
task_model = TaskModel(db)
attempt_model = UserTaskAttemptModel(db)

# Create an admin
admin_id = admin_model.create(
    username='admin1',
    password='securepassword',
    email='admin@example.com',
    role='admin'
)

# Create an accent system
accent_id = accent_model.create(
    name='British English',
    managed_by_admin_id=admin_id
)

# Create a user
user_id = user_model.create(
    email='user@example.com',
    password='userpassword',
    name='John Doe',
    assigned_accent_system_id=accent_id
)

# Find user by email
user = user_model.find_by_email('user@example.com')

# Get user statistics
stats = attempt_model.get_user_statistics(user_id)
print(f"Total attempts: {stats['total_attempts']}")
print(f"Correct: {stats['correct_attempts']}")
print(f"Points: {stats['total_points']}")
```

## Common Operations

### 1. User Registration and Authentication

**JavaScript:**
```javascript
const bcrypt = require('bcrypt');

// Register
const registerUser = async (email, password, name) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    email,
    password: hashedPassword,
    name
  });
  await user.save();
  return user;
};

// Login
const loginUser = async (email, password) => {
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return null;
  
  const isValid = await bcrypt.compare(password, user.password);
  return isValid ? user : null;
};
```

**Python (MongoEngine):**
```python
# Already built into the models with set_password() and check_password()

def register_user(email, password, name):
    user = User(email=email, name=name)
    user.set_password(password)
    user.save()
    return user

def login_user(email, password):
    user = User.objects(email=email.lower()).first()
    if user and user.check_password(password):
        return user
    return None
```

### 2. Get User's Learning Progress

**JavaScript:**
```javascript
const getUserProgress = async (userId) => {
  const attempts = await UserTaskAttempt.aggregate([
    { $match: { user_id: userId } },
    {
      $group: {
        _id: null,
        totalAttempts: { $sum: 1 },
        correctAttempts: {
          $sum: { $cond: ['$is_correct', 1, 0] }
        },
        totalPoints: { $sum: '$points' }
      }
    }
  ]);
  
  return attempts[0] || {
    totalAttempts: 0,
    correctAttempts: 0,
    totalPoints: 0
  };
};
```

**Python (PyMongo):**
```python
# Already implemented in the model
stats = attempt_model.get_user_statistics(user_id)
```

### 3. Get Tasks by Difficulty and Accent System

**JavaScript:**
```javascript
const getTasksByDifficulty = async (accentSystemId, difficulty) => {
  return await Task.find({
    accent_system_id: accentSystemId,
    difficulty: difficulty
  }).populate('subpage_id');
};
```

**Python (MongoEngine):**
```python
def get_tasks_by_difficulty(accent_system, difficulty):
    return Task.objects(
        accent_system_id=accent_system,
        difficulty=difficulty
    )
```

### 4. Record Task Attempt and Calculate Points

**JavaScript:**
```javascript
const recordAttempt = async (userId, taskId, userAnswer) => {
  const task = await Task.findById(taskId);
  const isCorrect = userAnswer.toLowerCase() === task.correct_answer.toLowerCase();
  
  const points = isCorrect ? (
    task.difficulty === 'easy' ? 10 :
    task.difficulty === 'medium' ? 20 : 30
  ) : 0;
  
  const attempt = new UserTaskAttempt({
    user_id: userId,
    task_id: taskId,
    user_answer: userAnswer,
    is_correct: isCorrect,
    points: points
  });
  
  await attempt.save();
  return { isCorrect, points };
};
```

### 5. Get User's Recent Quiz Results

**JavaScript:**
```javascript
const getRecentQuizzes = async (userId, limit = 5) => {
  return await QuizResult.find({ user_id: userId })
    .populate('accent_system_id')
    .sort({ date: -1 })
    .limit(limit);
};
```

**Python (PyMongo):**
```python
recent_quizzes = quiz_result_model.find_by_user(user_id, limit=5)
```

## Data Relationships

### Entity Relationships Overview:

1. **USER ↔ ACCENTSYSTEM**: Many-to-One (many users can be assigned to one accent system)
2. **USER ↔ INITIAL_ASSESSMENT**: One-to-One (each user has one initial assessment)
3. **USER ↔ QUIZRESULT**: One-to-Many (user has many quiz results)
4. **USER ↔ USERTASKATTEMPT**: One-to-Many (user has many task attempts)
5. **ADMIN ↔ ACCENTSYSTEM**: One-to-Many (admin manages many accent systems)
6. **ADMIN ↔ PAGE**: One-to-Many (admin manages many pages)
7. **ADMIN ↔ SUBPAGE**: One-to-Many (admin manages many subpages)
8. **ADMIN ↔ TASK**: One-to-Many (admin manages many tasks)
9. **PAGE ↔ SUBPAGE**: One-to-Many (page has many subpages)
10. **SUBPAGE ↔ TASK**: One-to-Many (subpage has many tasks)
11. **TASK ↔ USERTASKATTEMPT**: One-to-Many (task has many attempts)

## Indexes

All important queries have been optimized with indexes:

- **Users**: email (unique), assigned_accent_system_id
- **Admins**: username (unique), email (unique)
- **AccentSystems**: name (unique)
- **Tasks**: subpage_id, accent_system_id, difficulty
- **UserTaskAttempts**: user_id, task_id, date, compound(user_id + task_id)
- **InitialAssessments**: user_id (unique)
- **QuizResults**: user_id, date
- **Pages**: order
- **Subpages**: page_id, order

## Best Practices

1. **Always use ObjectId references** for relationships between documents
2. **Hash passwords** before storing (bcrypt recommended)
3. **Use indexes** for frequently queried fields
4. **Populate references** when you need related document data
5. **Use aggregation** for complex queries and statistics
6. **Validate data** before saving to database
7. **Use transactions** for operations that need to be atomic
8. **Implement pagination** for large result sets

## Environment Variables

Create a `.env` file:

```env
MONGODB_URI=mongodb://localhost:27017/accent_learning
DB_NAME=accent_learning
JWT_SECRET=your-secret-key-here
SALT_ROUNDS=10
```

## Testing

Make sure MongoDB is running:
```bash
# Start MongoDB
mongod

# Or with Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

Then run your application:
```bash
# JavaScript
node mongoose-models.js

# Python (MongoEngine)
python mongoengine-models.py

# Python (PyMongo)
python pymongo-models.py
```
