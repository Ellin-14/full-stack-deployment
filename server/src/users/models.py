from sqlalchemy import Column, Integer, String, ForeignKey
from src.database.core import Base

class Policy(Base):
    __tablename__ = "policies"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    policy_number = Column(String(50))
    policy_type = Column(String(50))       
    coverage_amount = Column(String(20))    
    payment_frequency = Column(String(20))   

    
class UserPolicy(Base):
    __tablename__ = "userpolicies"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    policy_id = Column(Integer, ForeignKey("policies.id"))
