from db import db
import datetime

class ItemModel(db.Model):
    __tablename__ = 'item'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    status = db.Column(db.String(255)) # DRAFT, ACTIVE, DISABLED
    price = db.Column(db.Float)
    menu_id = db.Column(db.Integer, db.ForeignKey('menu.id'), nullable=False)

    def __init__(self, name, status, price):
        self.name = name
        self.status = status
        self.menu_id = menu_id
        self.price = price