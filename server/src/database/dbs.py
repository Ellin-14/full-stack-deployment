import psycopg2
from psycopg2 import sql


DB_HOST = "localhost"
DB_PORT = "5432"
DB_SUPERUSER = "postgres"   
DB_SUPERPASS = "akshay"
DB_NAME = "auth_db"    


create_tables_queries = [
    """
    CREATE TABLE IF NOT EXISTS Users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        dob DATE,
        phone VARCHAR(10),
        risk_profile JSONB,
        role VARCHAR(10) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS Providers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        country VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS policies (
        id SERIAL PRIMARY KEY,
        provider_id INT REFERENCES Providers(id) ON DELETE CASCADE,
        policy_type VARCHAR(10) CHECK (policy_type IN ('auto', 'health', 'life', 'home', 'travel')),
        title VARCHAR(255) NOT NULL,
        coverage JSONB,
        premium NUMERIC(12,2),
        term_months INT,
        deductible NUMERIC(12,2),
        tnc_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS UserPolicies (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES Users(id) ON DELETE CASCADE,
        policy_id INT REFERENCES Policies(id) ON DELETE CASCADE,
        policy_number VARCHAR(50) NOT NULL,
        start_date DATE,
        end_date DATE,
        premium NUMERIC(12,2),
        status VARCHAR(10) CHECK (status IN ('active', 'expired', 'cancelled')),
        auto_renew BOOLEAN DEFAULT FALSE
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS Claims (
        id SERIAL PRIMARY KEY,
        user_policy_id INT REFERENCES UserPolicies(id) ON DELETE CASCADE,
        claim_number VARCHAR(50) NOT NULL,
        claim_type VARCHAR(50),
        incident_date DATE,
        amount_claimed NUMERIC(12,2),
        status VARCHAR(15) CHECK (status IN ('submitted', 'under_review', 'approved', 'rejected', 'paid')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS ClaimDocuments (
        id SERIAL PRIMARY KEY,
        claim_id INT REFERENCES Claims(id) ON DELETE CASCADE,
        file_url VARCHAR(255),
        doc_type VARCHAR(50),
        uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS Recommendations (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES Users(id) ON DELETE CASCADE,
        policy_id INT REFERENCES Policies(id) ON DELETE CASCADE,
        score NUMERIC(5,2),
        reason TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS FraudFlags (
        id SERIAL PRIMARY KEY,
        claim_id INT REFERENCES Claims(id) ON DELETE CASCADE,
        rule_code VARCHAR(50),
        severity VARCHAR(10) CHECK (severity IN ('low', 'medium', 'high')),
        details TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS AdminLogs (
        id SERIAL PRIMARY KEY,
        admin_id INT REFERENCES Users(id) ON DELETE CASCADE,
        action TEXT NOT NULL,
        target_type VARCHAR(50),
        target_id INT,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS Notifications (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES Users(id) ON DELETE CASCADE,
        notification_type VARCHAR(10) CHECK (notification_type IN ('email')),
        subject VARCHAR(255),
        message TEXT,
        status VARCHAR(10) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
        sent_at TIMESTAMP,
        retry_count INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """,
   
]


def create_database():
    try:
       
        conn = psycopg2.connect(
            dbname="postgres",
            user=DB_SUPERUSER,
            password=DB_SUPERPASS,
            host=DB_HOST,
            port=DB_PORT
        )
        conn.autocommit = True
        cur = conn.cursor()

   
        cur.execute(sql.SQL("CREATE DATABASE {}").format(
            sql.Identifier(DB_NAME)
        ))
        print(f"Database '{DB_NAME}' created successfully!")

        cur.close()
        conn.close()
    except psycopg2.errors.DuplicateDatabase:
        print(f"Database '{DB_NAME}' already exists.")
    except Exception as e:
        print(f"Error creating database: {e}")



def create_tables():
    try:
    
        conn = psycopg2.connect(
            dbname=DB_NAME,
            user=DB_SUPERUSER,
            password=DB_SUPERPASS,
            host=DB_HOST,
            port=DB_PORT
        )
        conn.autocommit = True
        cur = conn.cursor()

  
        for query in create_tables_queries:
            cur.execute(query)
            print("Table created successfully or already exists.")

        cur.close()
        conn.close()
        print("All tables created successfully!")

    except Exception as e:
        print(f"Error creating tables: {e}")



if __name__ == "__main__":
    create_database()
    create_tables()
