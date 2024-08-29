from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

class Ride(db.Model, SerializerMixin):
    __tablename__ = 'rides'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    image = db.Column(db.String)
    description = db.Column(db.String)
    height = db.Column(db.String)

    park_id = db.Column(db.Integer, db.ForeignKey('parks.id'))
    park = db.relationship('Park', back_populates='rides')

    reviews = db.relationship('Review', back_populates='ride', cascade='all, delete-orphan')
    
    serialize_rules = ('-park.rides', '-reviews.ride', '-reviews.user',)

class Park(db.Model, SerializerMixin):
    __tablename__ = 'parks'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    image = db.Column(db.String)

    rides = db.relationship('Ride', back_populates='park', cascade='all, delete-orphan')

    serialize_rules = ('-rides.park', '-rides.reviews',)

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    body = db.Column(db.String)
    rating = db.Column(db.Integer)
    username = db.Column(db.String)

    ride_id = db.Column(db.Integer, db.ForeignKey('rides.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    ride = db.relationship('Ride', back_populates='reviews')
    user = db.relationship('User', back_populates='reviews')

    serialize_rules = ('-rides.review', '-users.review',)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)

    reviews = db.Relationship('Review', back_populates='user', cascade='all, delete-orphan')

    serialize_rules = ('-reviews.user', '-reviews.ride',)

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

