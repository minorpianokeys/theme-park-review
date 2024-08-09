#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Ride, Park, Review

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
                ride_id = request.json['ride_id']
            )
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


@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

