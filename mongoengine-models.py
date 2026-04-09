"""
MongoDB Models using MongoEngine (Python)
Install: pip install mongoengine
"""

from mongoengine import (
    Document, EmbeddedDocument, 
    StringField, IntField, BooleanField, DateTimeField,
    ReferenceField, ObjectIdField, EmailField,
    connect
)
from datetime import datetime
import bcrypt


class Admin(Document):
    """Admin user model"""
    username = StringField(required=True, unique=True)
    password = StringField(required=True)
    email = EmailField(required=True, unique=True)
    role = StringField(
        required=True, 
        choices=['super_admin', 'admin', 'moderator']
    )
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)
    
    meta = {
        'collection': 'admins',
        'indexes': [
            'username',
            'email'
        ]
    }
    
    def set_password(self, password):
        """Hash and set password"""
        self.password = bcrypt.hashpw(
            password.encode('utf-8'), 
            bcrypt.gensalt()
        ).decode('utf-8')
    
    def check_password(self, password):
        """Verify password"""
        return bcrypt.checkpw(
            password.encode('utf-8'), 
            self.password.encode('utf-8')
        )
    
    def save(self, *args, **kwargs):
        self.updated_at = datetime.utcnow()
        return super(Admin, self).save(*args, **kwargs)


class AccentSystem(Document):
    """Accent system/language model"""
    name = StringField(required=True, unique=True)
    managed_by_admin_id = ReferenceField(Admin, required=True)
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)
    
    meta = {
        'collection': 'accent_systems',
        'indexes': [
            'name',
            'managed_by_admin_id'
        ]
    }
    
    def save(self, *args, **kwargs):
        self.updated_at = datetime.utcnow()
        return super(AccentSystem, self).save(*args, **kwargs)


class User(Document):
    """User model"""
    email = EmailField(required=True, unique=True)
    password = StringField(required=True)
    name = StringField(required=True)
    assigned_accent_system_id = ReferenceField(AccentSystem)
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)
    
    meta = {
        'collection': 'users',
        'indexes': [
            'email',
            'assigned_accent_system_id'
        ]
    }
    
    def set_password(self, password):
        """Hash and set password"""
        self.password = bcrypt.hashpw(
            password.encode('utf-8'), 
            bcrypt.gensalt()
        ).decode('utf-8')
    
    def check_password(self, password):
        """Verify password"""
        return bcrypt.checkpw(
            password.encode('utf-8'), 
            self.password.encode('utf-8')
        )
    
    def save(self, *args, **kwargs):
        self.updated_at = datetime.utcnow()
        return super(User, self).save(*args, **kwargs)


class Page(Document):
    """Page model for content organization"""
    name = StringField(required=True)
    order = IntField(required=True)
    managed_by_admin_id = ReferenceField(Admin, required=True)
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)
    
    meta = {
        'collection': 'pages',
        'indexes': [
            'order',
            'managed_by_admin_id'
        ]
    }
    
    def save(self, *args, **kwargs):
        self.updated_at = datetime.utcnow()
        return super(Page, self).save(*args, **kwargs)


class Subpage(Document):
    """Subpage model"""
    page_id = ReferenceField(Page, required=True)
    name = StringField(required=True)
    order = IntField(required=True)
    managed_by_admin_id = ReferenceField(Admin, required=True)
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)
    
    meta = {
        'collection': 'subpages',
        'indexes': [
            'page_id',
            'order',
            'managed_by_admin_id'
        ]
    }
    
    def save(self, *args, **kwargs):
        self.updated_at = datetime.utcnow()
        return super(Subpage, self).save(*args, **kwargs)


class Task(Document):
    """Task/Question model"""
    subpage_id = ReferenceField(Subpage, required=True)
    accent_system_id = ReferenceField(AccentSystem, required=True)
    question_text = StringField(required=True)
    correct_answer = StringField(required=True)
    difficulty = StringField(
        required=True,
        choices=['easy', 'medium', 'hard']
    )
    managed_by_admin_id = ReferenceField(Admin, required=True)
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)
    
    meta = {
        'collection': 'tasks',
        'indexes': [
            'subpage_id',
            'accent_system_id',
            'difficulty',
            'managed_by_admin_id'
        ]
    }
    
    def save(self, *args, **kwargs):
        self.updated_at = datetime.utcnow()
        return super(Task, self).save(*args, **kwargs)


class UserTaskAttempt(Document):
    """User's attempt at a task"""
    user_id = ReferenceField(User, required=True)
    task_id = ReferenceField(Task, required=True)
    user_answer = StringField(required=True)
    is_correct = BooleanField(required=True)
    points = IntField(required=True, default=0)
    date = DateTimeField(default=datetime.utcnow)
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)
    
    meta = {
        'collection': 'user_task_attempts',
        'indexes': [
            'user_id',
            'task_id',
            'date',
            ('user_id', 'task_id')  # Compound index
        ]
    }
    
    def save(self, *args, **kwargs):
        self.updated_at = datetime.utcnow()
        return super(UserTaskAttempt, self).save(*args, **kwargs)


class InitialAssessment(Document):
    """Initial assessment for user (one-to-one with User)"""
    user_id = ReferenceField(User, required=True, unique=True)
    accent_system_id = ReferenceField(AccentSystem, required=True)
    score = IntField(required=True, min_value=0)
    date = DateTimeField(default=datetime.utcnow)
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)
    
    meta = {
        'collection': 'initial_assessments',
        'indexes': [
            'user_id',
            'accent_system_id',
            'date'
        ]
    }
    
    def save(self, *args, **kwargs):
        self.updated_at = datetime.utcnow()
        return super(InitialAssessment, self).save(*args, **kwargs)


class QuizResult(Document):
    """Quiz result for user"""
    user_id = ReferenceField(User, required=True)
    accent_system_id = ReferenceField(AccentSystem, required=True)
    score = IntField(required=True, min_value=0)
    date = DateTimeField(default=datetime.utcnow)
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)
    
    meta = {
        'collection': 'quiz_results',
        'indexes': [
            'user_id',
            'accent_system_id',
            'date',
            ('user_id', 'date')  # Compound index for user history
        ]
    }
    
    def save(self, *args, **kwargs):
        self.updated_at = datetime.utcnow()
        return super(QuizResult, self).save(*args, **kwargs)


# Database connection function
def connect_db(db_name='accent_learning', host='localhost', port=27017, 
               username=None, password=None):
    """
    Connect to MongoDB
    
    Args:
        db_name: Database name
        host: MongoDB host
        port: MongoDB port
        username: Optional username for authentication
        password: Optional password for authentication
    """
    if username and password:
        connect(
            db=db_name,
            host=host,
            port=port,
            username=username,
            password=password,
            authentication_source='admin'
        )
    else:
        connect(db=db_name, host=host, port=port)
    
    print(f"Connected to MongoDB: {db_name}")


# Example usage
if __name__ == "__main__":
    # Connect to database
    connect_db()
    
    # Example: Create an admin
    admin = Admin(
        username="admin1",
        email="admin@example.com",
        role="admin"
    )
    admin.set_password("securepassword123")
    admin.save()
    
    # Example: Create an accent system
    accent = AccentSystem(
        name="British English",
        managed_by_admin_id=admin
    )
    accent.save()
    
    # Example: Create a user
    user = User(
        email="user@example.com",
        name="John Doe",
        assigned_accent_system_id=accent
    )
    user.set_password("userpassword123")
    user.save()
    
    print("Sample data created successfully!")
