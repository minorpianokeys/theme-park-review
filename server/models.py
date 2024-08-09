from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

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
    
    serialize_rules = ('-park.rides',)
    serialize_rules = ('-reviews.ride',)

class Park(db.Model, SerializerMixin):
    __tablename__ = 'parks'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    image = db.Column(db.String)

    rides = db.relationship('Ride', back_populates='park', cascade='all, delete-orphan')

    serialize_rules = ('-rides.park',)

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    body = db.Column(db.String)
    rating = db.Column(db.Integer)

    ride_id = db.Column(db.Integer, db.ForeignKey('rides.id'))

    ride = db.relationship('Ride', back_populates='reviews')

    serialize_rules = ('-rides.review',)