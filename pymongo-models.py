"""
MongoDB Models using PyMongo (Native Python Driver)
Install: pip install pymongo
"""

from pymongo import MongoClient, ASCENDING, DESCENDING
from datetime import datetime
from bson.objectid import ObjectId
import bcrypt


class Database:
    """Database connection manager"""
    
    def __init__(self, connection_string='mongodb://localhost:27017/', 
                 db_name='accent_learning'):
        """Initialize database connection"""
        self.client = MongoClient(connection_string)
        self.db = self.client[db_name]
        self._create_indexes()
    
    def _create_indexes(self):
        """Create all necessary indexes"""
        # User indexes
        self.db.users.create_index([('email', ASCENDING)], unique=True)
        self.db.users.create_index([('assigned_accent_system_id', ASCENDING)])
        
        # Admin indexes
        self.db.admins.create_index([('username', ASCENDING)], unique=True)
        self.db.admins.create_index([('email', ASCENDING)], unique=True)
        
        # Accent System indexes
        self.db.accent_systems.create_index([('name', ASCENDING)], unique=True)
        self.db.accent_systems.create_index([('managed_by_admin_id', ASCENDING)])
        
        # Task indexes
        self.db.tasks.create_index([('subpage_id', ASCENDING)])
        self.db.tasks.create_index([('accent_system_id', ASCENDING)])
        self.db.tasks.create_index([('difficulty', ASCENDING)])
        
        # User Task Attempt indexes
        self.db.user_task_attempts.create_index([('user_id', ASCENDING)])
        self.db.user_task_attempts.create_index([('task_id', ASCENDING)])
        self.db.user_task_attempts.create_index([('date', DESCENDING)])
        self.db.user_task_attempts.create_index([
            ('user_id', ASCENDING), 
            ('task_id', ASCENDING)
        ])
        
        # Initial Assessment indexes
        self.db.initial_assessments.create_index([('user_id', ASCENDING)], unique=True)
        self.db.initial_assessments.create_index([('accent_system_id', ASCENDING)])
        
        # Quiz Result indexes
        self.db.quiz_results.create_index([('user_id', ASCENDING)])
        self.db.quiz_results.create_index([('accent_system_id', ASCENDING)])
        self.db.quiz_results.create_index([('date', DESCENDING)])
        
        # Page indexes
        self.db.pages.create_index([('order', ASCENDING)])
        self.db.pages.create_index([('managed_by_admin_id', ASCENDING)])
        
        # Subpage indexes
        self.db.subpages.create_index([('page_id', ASCENDING)])
        self.db.subpages.create_index([('order', ASCENDING)])
        
        print("All indexes created successfully")


class UserModel:
    """User model operations"""
    
    def __init__(self, db):
        self.collection = db.users
    
    @staticmethod
    def hash_password(password):
        """Hash a password"""
        return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    @staticmethod
    def verify_password(password, hashed):
        """Verify a password against hash"""
        return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))
    
    def create(self, email, password, name, assigned_accent_system_id=None):
        """Create a new user"""
        user = {
            'email': email.lower(),
            'password': self.hash_password(password),
            'name': name,
            'assigned_accent_system_id': ObjectId(assigned_accent_system_id) if assigned_accent_system_id else None,
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        }
        result = self.collection.insert_one(user)
        return result.inserted_id
    
    def find_by_email(self, email):
        """Find user by email"""
        return self.collection.find_one({'email': email.lower()})
    
    def find_by_id(self, user_id):
        """Find user by ID"""
        return self.collection.find_one({'_id': ObjectId(user_id)})
    
    def update(self, user_id, update_data):
        """Update user"""
        update_data['updated_at'] = datetime.utcnow()
        return self.collection.update_one(
            {'_id': ObjectId(user_id)},
            {'$set': update_data}
        )
    
    def delete(self, user_id):
        """Delete user"""
        return self.collection.delete_one({'_id': ObjectId(user_id)})


class AdminModel:
    """Admin model operations"""
    
    def __init__(self, db):
        self.collection = db.admins
    
    @staticmethod
    def hash_password(password):
        """Hash a password"""
        return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    @staticmethod
    def verify_password(password, hashed):
        """Verify a password against hash"""
        return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))
    
    def create(self, username, password, email, role='admin'):
        """Create a new admin"""
        admin = {
            'username': username,
            'password': self.hash_password(password),
            'email': email.lower(),
            'role': role,
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        }
        result = self.collection.insert_one(admin)
        return result.inserted_id
    
    def find_by_username(self, username):
        """Find admin by username"""
        return self.collection.find_one({'username': username})
    
    def find_by_id(self, admin_id):
        """Find admin by ID"""
        return self.collection.find_one({'_id': ObjectId(admin_id)})


class AccentSystemModel:
    """Accent System model operations"""
    
    def __init__(self, db):
        self.collection = db.accent_systems
    
    def create(self, name, managed_by_admin_id):
        """Create a new accent system"""
        accent_system = {
            'name': name,
            'managed_by_admin_id': ObjectId(managed_by_admin_id),
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        }
        result = self.collection.insert_one(accent_system)
        return result.inserted_id
    
    def find_by_name(self, name):
        """Find accent system by name"""
        return self.collection.find_one({'name': name})
    
    def find_all(self):
        """Get all accent systems"""
        return list(self.collection.find())


class PageModel:
    """Page model operations"""
    
    def __init__(self, db):
        self.collection = db.pages
    
    def create(self, name, order, managed_by_admin_id):
        """Create a new page"""
        page = {
            'name': name,
            'order': order,
            'managed_by_admin_id': ObjectId(managed_by_admin_id),
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        }
        result = self.collection.insert_one(page)
        return result.inserted_id
    
    def find_all_ordered(self):
        """Get all pages ordered by order field"""
        return list(self.collection.find().sort('order', ASCENDING))


class SubpageModel:
    """Subpage model operations"""
    
    def __init__(self, db):
        self.collection = db.subpages
    
    def create(self, page_id, name, order, managed_by_admin_id):
        """Create a new subpage"""
        subpage = {
            'page_id': ObjectId(page_id),
            'name': name,
            'order': order,
            'managed_by_admin_id': ObjectId(managed_by_admin_id),
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        }
        result = self.collection.insert_one(subpage)
        return result.inserted_id
    
    def find_by_page(self, page_id):
        """Get all subpages for a page"""
        return list(self.collection.find(
            {'page_id': ObjectId(page_id)}
        ).sort('order', ASCENDING))


class TaskModel:
    """Task model operations"""
    
    def __init__(self, db):
        self.collection = db.tasks
    
    def create(self, subpage_id, accent_system_id, question_text, 
               correct_answer, difficulty, managed_by_admin_id):
        """Create a new task"""
        task = {
            'subpage_id': ObjectId(subpage_id),
            'accent_system_id': ObjectId(accent_system_id),
            'question_text': question_text,
            'correct_answer': correct_answer,
            'difficulty': difficulty,
            'managed_by_admin_id': ObjectId(managed_by_admin_id),
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        }
        result = self.collection.insert_one(task)
        return result.inserted_id
    
    def find_by_subpage(self, subpage_id):
        """Get all tasks for a subpage"""
        return list(self.collection.find({'subpage_id': ObjectId(subpage_id)}))
    
    def find_by_difficulty(self, difficulty):
        """Get all tasks by difficulty"""
        return list(self.collection.find({'difficulty': difficulty}))


class UserTaskAttemptModel:
    """User Task Attempt model operations"""
    
    def __init__(self, db):
        self.collection = db.user_task_attempts
    
    def create(self, user_id, task_id, user_answer, is_correct, points=0):
        """Create a new user task attempt"""
        attempt = {
            'user_id': ObjectId(user_id),
            'task_id': ObjectId(task_id),
            'user_answer': user_answer,
            'is_correct': is_correct,
            'points': points,
            'date': datetime.utcnow(),
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        }
        result = self.collection.insert_one(attempt)
        return result.inserted_id
    
    def find_by_user(self, user_id, limit=None):
        """Get all attempts by user"""
        query = self.collection.find(
            {'user_id': ObjectId(user_id)}
        ).sort('date', DESCENDING)
        
        if limit:
            query = query.limit(limit)
        
        return list(query)
    
    def get_user_statistics(self, user_id):
        """Get statistics for a user"""
        pipeline = [
            {'$match': {'user_id': ObjectId(user_id)}},
            {'$group': {
                '_id': None,
                'total_attempts': {'$sum': 1},
                'correct_attempts': {
                    '$sum': {'$cond': ['$is_correct', 1, 0]}
                },
                'total_points': {'$sum': '$points'}
            }}
        ]
        result = list(self.collection.aggregate(pipeline))
        return result[0] if result else None


class InitialAssessmentModel:
    """Initial Assessment model operations"""
    
    def __init__(self, db):
        self.collection = db.initial_assessments
    
    def create(self, user_id, accent_system_id, score):
        """Create initial assessment (one per user)"""
        assessment = {
            'user_id': ObjectId(user_id),
            'accent_system_id': ObjectId(accent_system_id),
            'score': score,
            'date': datetime.utcnow(),
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        }
        result = self.collection.insert_one(assessment)
        return result.inserted_id
    
    def find_by_user(self, user_id):
        """Get initial assessment for user"""
        return self.collection.find_one({'user_id': ObjectId(user_id)})


class QuizResultModel:
    """Quiz Result model operations"""
    
    def __init__(self, db):
        self.collection = db.quiz_results
    
    def create(self, user_id, accent_system_id, score):
        """Create a quiz result"""
        result = {
            'user_id': ObjectId(user_id),
            'accent_system_id': ObjectId(accent_system_id),
            'score': score,
            'date': datetime.utcnow(),
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        }
        insert_result = self.collection.insert_one(result)
        return insert_result.inserted_id
    
    def find_by_user(self, user_id, limit=None):
        """Get quiz results for a user"""
        query = self.collection.find(
            {'user_id': ObjectId(user_id)}
        ).sort('date', DESCENDING)
        
        if limit:
            query = query.limit(limit)
        
        return list(query)


# Example usage
if __name__ == "__main__":
    # Initialize database
    db_manager = Database()
    db = db_manager.db
    
    # Initialize models
    user_model = UserModel(db)
    admin_model = AdminModel(db)
    accent_model = AccentSystemModel(db)
    page_model = PageModel(db)
    subpage_model = SubpageModel(db)
    task_model = TaskModel(db)
    attempt_model = UserTaskAttemptModel(db)
    initial_assessment_model = InitialAssessmentModel(db)
    quiz_result_model = QuizResultModel(db)
    
    # Create sample data
    print("Creating sample data...")
    
    # Create admin
    admin_id = admin_model.create(
        username="admin1",
        password="securepassword",
        email="admin@example.com",
        role="admin"
    )
    print(f"Created admin: {admin_id}")
    
    # Create accent system
    accent_id = accent_model.create(
        name="British English",
        managed_by_admin_id=admin_id
    )
    print(f"Created accent system: {accent_id}")
    
    # Create user
    user_id = user_model.create(
        email="user@example.com",
        password="userpassword",
        name="John Doe",
        assigned_accent_system_id=accent_id
    )
    print(f"Created user: {user_id}")
    
    # Create page
    page_id = page_model.create(
        name="Introduction",
        order=1,
        managed_by_admin_id=admin_id
    )
    print(f"Created page: {page_id}")
    
    # Create subpage
    subpage_id = subpage_model.create(
        page_id=page_id,
        name="Lesson 1",
        order=1,
        managed_by_admin_id=admin_id
    )
    print(f"Created subpage: {subpage_id}")
    
    # Create task
    task_id = task_model.create(
        subpage_id=subpage_id,
        accent_system_id=accent_id,
        question_text="How do you pronounce 'water'?",
        correct_answer="waw-tuh",
        difficulty="easy",
        managed_by_admin_id=admin_id
    )
    print(f"Created task: {task_id}")
    
    # Create initial assessment
    assessment_id = initial_assessment_model.create(
        user_id=user_id,
        accent_system_id=accent_id,
        score=75
    )
    print(f"Created initial assessment: {assessment_id}")
    
    print("\nSample data created successfully!")
