import sqlite3
from datetime import datetime
import sys

def connect_db():
    """Connect to the SQLite database"""
    try:
        conn = sqlite3.connect('workflows.db')
        conn.row_factory = sqlite3.Row  # This enables column access by name
        return conn
    except sqlite3.Error as e:
        print(f"Error connecting to database: {e}")
        sys.exit(1)

def view_all_workflows():
    """View all workflows in the database"""
    conn = connect_db()
    cursor = conn.cursor()
    
    try:
        cursor.execute("SELECT * FROM workflows")
        workflows = cursor.fetchall()
        
        if not workflows:
            print("\nNo workflows found in database.")
            return
        
        print("\nAll Workflows:")
        print("-" * 80)
        for workflow in workflows:
            print(f"ID: {workflow['id']}")
            print(f"Title: {workflow['title']}")
            print(f"Content: {workflow['content']}")
            print(f"Created: {workflow['created_at']}")
            print(f"Updated: {workflow['updated_at']}")
            print("-" * 80)
    
    except sqlite3.Error as e:
        print(f"Error querying database: {e}")
    finally:
        conn.close()

def view_workflow(workflow_id):
    """View a specific workflow by ID"""
    conn = connect_db()
    cursor = conn.cursor()
    
    try:
        cursor.execute("SELECT * FROM workflows WHERE id = ?", (workflow_id,))
        workflow = cursor.fetchone()
        
        if workflow is None:
            print(f"\nNo workflow found with ID {workflow_id}")
            return
        
        print("\nWorkflow Details:")
        print("-" * 80)
        print(f"ID: {workflow['id']}")
        print(f"Title: {workflow['title']}")
        print(f"Content: {workflow['content']}")
        print(f"Created: {workflow['created_at']}")
        print(f"Updated: {workflow['updated_at']}")
        print("-" * 80)
    
    except sqlite3.Error as e:
        print(f"Error querying database: {e}")
    finally:
        conn.close()

def run_custom_query(query):
    """Run a custom SQL query"""
    conn = connect_db()
    cursor = conn.cursor()
    
    try:
        cursor.execute(query)
        
        if query.lower().startswith("select"):
            results = cursor.fetchall()
            if not results:
                print("\nNo results found.")
                return
            
            print("\nQuery Results:")
            print("-" * 80)
            for row in results:
                for key in row.keys():
                    print(f"{key}: {row[key]}")
                print("-" * 80)
        else:
            conn.commit()
            print("\nQuery executed successfully.")
    
    except sqlite3.Error as e:
        print(f"Error executing query: {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    while True:
        print("\nSQLite Database Utility")
        print("1. View all workflows")
        print("2. View specific workflow")
        print("3. Run custom query")
        print("4. Exit")
        
        choice = input("\nEnter your choice (1-4): ")
        
        if choice == "1":
            view_all_workflows()
        elif choice == "2":
            workflow_id = input("Enter workflow ID: ")
            view_workflow(int(workflow_id))
        elif choice == "3":
            query = input("Enter your SQL query: ")
            run_custom_query(query)
        elif choice == "4":
            print("\nExiting...")
            break
        else:
            print("\nInvalid choice. Please try again.")
