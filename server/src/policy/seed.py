from src.database.core import SessionLocal
from src.users.models import Policy

db = SessionLocal()

policies = [
    Policy(
        title="Health Shield Plan",
        policy_number="HSP-398274",
        policy_type="Health Insurance",
        coverage_amount="5,00,000",
        payment_frequency="Monthly"
    ),
    Policy(
        title="Family Care Plus",
        policy_number="FCP-782341",
        policy_type="Family Insurance",
        coverage_amount="10,00,000",
        payment_frequency="Yearly"
        
    ),
    Policy(
        title="Travel Safe Plan",
        policy_number="TSP-552341",
        policy_type="Travel Insurance",
        coverage_amount="2,00,000",
        payment_frequency="One Time"
       
    ),
    Policy(
        title="Senior Health Plan",
        policy_number="SHP-998231",
        policy_type="Senior Citizen Insurance",
        coverage_amount="6,00,000",
        payment_frequency="Monthly"
        
    ),
    Policy(
        title="Accident Guard",
        policy_number="AG-663218",
        policy_type="Accident Insurance",
        coverage_amount="3,00,000",
        payment_frequency="Yearly"
       
    ),
    Policy(
        title="Child Future Plan",
        policy_number="CFP-441287",
        policy_type="Child Insurance",
        coverage_amount="15,00,000",
        payment_frequency="Yearly"
        
    ),
    Policy(
        title="Retirement  Plans",
        policy_number="RP-441287",
        policy_type="Retirement Insurance",
        coverage_amount="15,00,000",
        payment_frequency="Yearly"
       
    ),
     Policy(
        title="Term Life Insurance",
        policy_number="TLI-441287",
        policy_type="Life Insurance",
        coverage_amount="15,00,000",
        payment_frequency="Yearly"
        
    ),
     Policy(
        title="Endowment Plans",
        policy_number="EP-441287",
        policy_type="Savings Plan",
        coverage_amount="15,00,000",
        payment_frequency="Yearly"
        
    )
    

]

db.add_all(policies)
db.commit()
db.close()

print("✅ Policies inserted successfully")
