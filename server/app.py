#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api
# Add your model imports
from models import Ride, Park, Review, User

class Parks(Resource):
    
    def get(self):
        parks = [p.to_dict(rules=('-rides',)) for p in Park.query.all()]
        return parks, 200
    
    def post(self):
        try:
            new_park = Park(
                name = request.json['name'],
                image = request.json['image']
            )

            db.session.add(new_park)
            db.session.commit()
            return new_park.to_dict(), 201
        
        except:
            return {"errors": ["validation errors"]}, 400
    
api.add_resource(Parks, '/parks')

class ParksByID(Resource):

    def get(self, id):
        park = Park.query.filter_by(id=id).first()
        return park.to_dict(), 200
    
api.add_resource(ParksByID, '/parks/<int:id>')

class Rides(Resource):

    def get(self):
        rides = [r.to_dict(rules=('-park', '-reviews',)) for r in Ride.query.all()]
        return rides, 200
    
    def post(self):
        
        try:
            new_ride = Ride(
                name = request.json['name'],
                image = request.json['image'],
                description = request.json['description'],
                height = request.json['height'],
                park_id = request.json['park_id']
            )
            db.session.add(new_ride)
            db.session.commit()
            return new_ride.to_dict(), 201

        except:
            return {"errors": ["validation errors"]}, 400
    
api.add_resource(Rides, '/rides')

class RidesByID(Resource):

    def get(self, id):
        ride = Ride.query.filter_by(id=id).first()
        return ride.to_dict(), 200

api.add_resource(RidesByID, '/rides/<int:id>')

class Reviews(Resource):

    def get(self):
        reviews = [r.to_dict(rules=('-ride',)) for r in Review.query.all()]
        return reviews, 200

    def post(self):
        try:
            new_review = Review(
                title = request.json['title'],
                body = request.json['body'],
                rating = request.json['rating'],
                username = request.json['username'],
                ride_id = request.json['ride_id'],
                user_id = request.json['user_id']
            )
            print(new_review)
            db.session.add(new_review)
            db.session.commit()
            return new_review.to_dict(), 201
        except:
            return {"errors": ["validation errors"]}, 400
        
api.add_resource(Reviews, '/reviews')

class ReviewsById(Resource):

    def get(self, id):
        review = Review.query.filter_by(id=id).first().to_dict(rules=('-ride',))
        return review, 200
    
    def patch(self, id):
        try:
            review = Review.query.filter_by(id=id).first()
            if review:
                for attr in request.json:
                    setattr(review, attr, request.json[attr])

                db.session.add(review)
                db.session.commit()
                return review.to_dict(), 202
            return {"error": "Review not found"}, 404
        except:
            return {"errors": ["validation errors"]}, 400
        
    def delete(self, id):
        review = Review.query.filter_by(id=id).first()
        if review:
            db.session.delete(review)
            db.session.commit()
            return {}, 204
        return {"error": "Review not found"}, 404
        
api.add_resource(ReviewsById, '/reviews/<int:id>')


class Signup(Resource):

    def post(self):
        user = User(
            username=request.json['username'],
        )

        user.password_hash = request.json['password']

        try:
            db.session.add(user)
            db.session.commit()
            session['user.id'] = user.id
            return user.to_dict(), 201
        
        except IntegrityError:

            return {'error': '422 Unprocessable Entity'}, 422

api.add_resource(Signup, '/signup', endpoint='signup')

class Login(Resource):
    def post(self):
        username = request.get_json()['username']
        password = request.get_json()['password']

        user = User.query.filter(User.username == username).first()

        if user:
            if user.authenticate(password):
                session['user_id'] = user.id
                return user.to_dict(), 200
        
        return {'error': '401 Unauthorized'}, 401
    
api.add_resource(Login, '/login')

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return {}, 204
    
api.add_resource(Logout, '/logout')

class CheckSession(Resource):
    def get(self):
        user_id = session['user_id']
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            return user.to_dict(), 200
        else:
            return {"message": "401: Not Authorized"}, 401
        
api.add_resource(CheckSession, '/check_session')


@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

