---

### **1. a) What is a database? Discuss some benefits of using a database to store data.**

- **Database:**
  A database is a structured collection of data that is organized, stored, and managed in a way that allows efficient retrieval, modification, and analysis. It is typically managed by a Database Management System (DBMS).

- **Benefits of Using a Database:**
  1. **Data Centralization:** All data is stored in one place, making it easier to manage and access.
  2. **Data Integrity:** Databases enforce constraints (e.g., primary keys, foreign keys) to ensure data consistency and accuracy.
  3. **Concurrency Control:** Multiple users can access and modify the database simultaneously without conflicts.
  4. **Security:** Databases provide mechanisms like user authentication and authorization to protect sensitive data.
  5. **Scalability:** Databases can handle large volumes of data and grow as needed.
  6. **Efficient Querying:** SQL and other query languages allow users to retrieve and manipulate data quickly.

---

### **b) What do you mean by data abstraction? State briefly all the levels of data abstraction.**

- **Data Abstraction:**
  Data abstraction is the process of hiding complex details of how data is stored and managed, providing users with simplified views of the database.

- **Levels of Data Abstraction:**
  1. **Physical Level:**
     - The lowest level of abstraction, describing how data is physically stored on disk (e.g., file structures, indexing).
  2. **Logical Level:**
     - Describes what data is stored in the database and the relationships between the data (e.g., tables, schemas).
  3. **View Level:**
     - The highest level of abstraction, presenting only a portion of the database to users based on their needs (e.g., customized views for different users).

---

### **c) What are the differences between DELETE, DROP, and TRUNCATE? Discuss DDL and DML commands used in SQL with examples.**

- **DELETE vs. DROP vs. TRUNCATE:**

  | Command   | Description                                                                 | Example                                  |
  |-----------|-----------------------------------------------------------------------------|------------------------------------------|
  | DELETE    | Removes specific rows from a table based on a condition.                   | `DELETE FROM Employees WHERE age > 60;` |
  | DROP      | Deletes an entire table or database schema, including its structure.       | `DROP TABLE Employees;`                 |
  | TRUNCATE  | Removes all rows from a table but retains the table structure.             | `TRUNCATE TABLE Employees;`             |

- **DDL (Data Definition Language):**
  DDL commands define and modify the structure of database objects.
  - Examples:
    - `CREATE TABLE`: Creates a new table.

      ```sql
      CREATE TABLE Students (
          studentID INT PRIMARY KEY,
          name VARCHAR(50)
      );
      ```

    - `ALTER TABLE`: Modifies an existing table.

      ```sql
      ALTER TABLE Students ADD email VARCHAR(50);
      ```

    - `DROP TABLE`: Deletes a table.

      ```sql
      DROP TABLE Students;
      ```

- **DML (Data Manipulation Language):**
  DML commands manipulate data within database objects.
  - Examples:
    - `INSERT INTO`: Adds new rows to a table.

      ```sql
      INSERT INTO Students (studentID, name) VALUES (1, 'John');
      ```

    - `UPDATE`: Modifies existing rows.

      ```sql
      UPDATE Students SET name = 'Jane' WHERE studentID = 1;
      ```

    - `DELETE`: Removes rows from a table.

      ```sql
      DELETE FROM Students WHERE studentID = 1;
      ```

---

### **2. a) What is key constraints? Write down the rules regarding referential integrity constraints in the context of relational databases.**

- **Key Constraints:**
  Key constraints ensure the uniqueness and identification of records in a table. Common types include:
  - **Primary Key:** Uniquely identifies each record in a table.
  - **Foreign Key:** Establishes a relationship between two tables by referencing the primary key of another table.
  - **Unique Key:** Ensures that all values in a column are distinct.

- **Referential Integrity Constraints:**
  Referential integrity ensures the consistency of relationships between tables. Rules include:
  1. A foreign key must reference a valid primary key or unique key in another table.
  2. If a referenced row is deleted, the foreign key must either:
     - Cascade the deletion (delete related rows),
     - Set the foreign key to NULL, or
     - Restrict the deletion.
  3. Updates to the referenced primary key must propagate to the foreign key.

---

### **b) Write down the difference between entity and attribute in E-R diagram? Briefly explain different mapping cardinalities with mapping diagrams.**

- **Entity vs. Attribute:**
  - **Entity:** Represents a real-world object or concept (e.g., "Employee").
  - **Attribute:** Represents a property or characteristic of an entity (e.g., "Employee Name").

- **Mapping Cardinalities:**
  Mapping cardinalities define the number of entities related to each other in a relationship.
  1. **One-to-One (1:1):**
     - Each entity in one set relates to exactly one entity in another set.
     ![1:1](https://i.imgur.com/abc123.png)
  2. **One-to-Many (1:N):**
     - One entity in the first set relates to multiple entities in the second set.
     ![1:N](https://i.imgur.com/def456.png)
  3. **Many-to-One (N:1):**
     - Multiple entities in the first set relate to one entity in the second set.
     ![N:1](https://i.imgur.com/ghi789.png)
  4. **Many-to-Many (M:N):**
     - Multiple entities in both sets relate to each other.
     ![M:N](https://i.imgur.com/jkl012.png)

---

### **c) Explain the following terms in relational databases:**

1. **Surrogate Key and Composite Key:**
   - **Surrogate Key:** An artificial key (e.g., an auto-incremented ID) used to uniquely identify rows when no natural key exists.
   - **Composite Key:** A combination of two or more columns used to uniquely identify rows.

2. **Total Participation and Partial Participation:**
   - **Total Participation:** Every entity in a set must participate in a relationship (denoted by double lines in E-R diagrams).
   - **Partial Participation:** Not all entities in a set need to participate in a relationship (denoted by single lines).

3. **Weak Entity and Strong Entity:**
   - **Weak Entity:** An entity that depends on another entity for its existence (e.g., "Dependent" depends on "Employee").
   - **Strong Entity:** An entity that exists independently (e.g., "Employee").

---

### **d) Construct the E-R diagram for the following relational schemas:**

#### Schema

1. **Employee** (`employeeID`, gender, street, city, firstName, middleName, lastName)
2. **Department** (`departmentID`, deptName, locationName, employeeID, startDate)
3. **Project** (`projectID`, projectName, departmentID)
4. **WorksOn** (`employeeID`, projectID, hours)

#### E-R Diagram Components

1. **Entities:**
   - Employee, Department, Project.
2. **Attributes:**
   - Employee: `employeeID`, `gender`, `street`, `city`, `firstName`, `middleName`, `lastName`.
   - Department: `departmentID`, `deptName`, `locationName`, `startDate`.
   - Project: `projectID`, `projectName`.
3. **Relationships:**
   - WorksFor: Between Employee and Department (1:N).
   - Manages: Between Employee and Department (1:1).
   - WorksOn: Between Employee and Project (M:N).

#### Diagram

```plaintext
[Employee] --<WorksFor>-- [Department]
[Employee] --<Manages>-- [Department]
[Employee] --<WorksOn>-- [Project]
```

---
---

### **3. a) What is relational algebra? Explain selection, projection, and union operations in relational algebra with examples.**

- **Relational Algebra:**
  Relational algebra is a formal query language used to manipulate relations (tables) in a database. It consists of a set of operations that take one or more relations as input and produce a new relation as output.

#### **Operations:**

1. **Selection ($ \sigma $):**
   - Selects tuples (rows) from a relation that satisfy a given condition.
   - Syntax: $ \sigma_{\text{condition}}(R) $
   - Example:

     ```sql
     σage > 20(Student)
     ```

     This selects all students whose age is greater than 20.

2. **Projection ($ \pi $):**
   - Projects specific columns (attributes) from a relation.
   - Syntax: $ \pi_{\text{attribute list}}(R) $
   - Example:

     ```sql
     πname, age(Student)
     ```

     This retrieves only the `name` and `age` attributes of all students.

3. **Union ($ \cup $):**
   - Combines tuples from two relations into a single relation, removing duplicates.
   - Syntax: $ R_1 \cup R_2 $
   - Example:

     ```sql
     Student ∪ Faculty
     ```

     This combines all tuples from the `Student` and `Faculty` tables.

---

### **b) Consider the following expressions, which use the result of a relational algebra operation as the input to another operation. For each expression, explain in words what the expression does.**

#### i. $ \pi_{\text{year}=2009}(\text{takes}) \bowtie \text{student} $

- **Explanation:**
  - The expression first applies a selection ($ \sigma $) on the `takes` relation to filter tuples where the `year` is 2009.
  - Then, it performs a natural join ($ \bowtie $) between the filtered `takes` relation and the `student` relation.
  - This retrieves information about students who took courses in the year 2009.

#### ii. $ \pi_{\text{ID, name, course\_id}}(\sigma_{\text{year}=2009}(\text{takes}) \bowtie \text{student}) $

- **Explanation:**
  - The expression first filters tuples from the `takes` relation where the `year` is 2009.
  - It then joins the filtered `takes` relation with the `student` relation.
  - Finally, it projects the `ID`, `name`, and `course_id` attributes.
  - This retrieves the IDs, names, and course IDs of students who took courses in 2009.

---

### **c) Write down the expressions in relational algebra for the following queries:**

#### **Relation Schema:**

- **Student** (`studentID`, `name`, `fatherName`, `admissionDate`, `regNo`)
- **Courses** (`courseID`, `courseTitle`, `courseType`, `credit`, `deptID`)
- **Major** (`studentID`, `deptID`, `admissionSession`)
- **CourseRegistration** (`studentID`, `courseID`, `year`, `semester`, `session`)
- **CourseComplete** (`studentID`, `courseID`, `year`, `semester`, `gradeLetter`, `session`, `gradePoint`)

---

#### **i. List the students of the "CSE" department of "1st Year" and "2nd Semester".**

- **Expression:**

  ```sql
  πstudentID, name(
    σdeptID = 'CSE' ∧ year = '1st' ∧ semester = '2nd' (
      Student ⨝ Major ⨝ CourseRegistration
    )
  )
  ```

- **Explanation:**
  - Join the `Student`, `Major`, and `CourseRegistration` relations.
  - Apply a selection to filter students in the "CSE" department, "1st Year", and "2nd Semester".
  - Project the `studentID` and `name` attributes.

---

#### **ii. List the students of "EEE" who have completed 5 courses.**

- **Expression:**

  ```sql
  πstudentID, name(
    σdeptID = 'EEE' ∧ count(courseID) = 5 (
      Student ⨝ Major ⨝ CourseComplete
    )
  )
  ```

- **Explanation:**
  - Join the `Student`, `Major`, and `CourseComplete` relations.
  - Apply a selection to filter students in the "EEE" department who have completed exactly 5 courses.
  - Project the `studentID` and `name` attributes.

---

#### **iii. List the students who get grade points below 2.50 in any course in session 2014-15.**

- **Expression:**

  ```sql
  πstudentID, name(
    σgradePoint < 2.50 ∧ session = '2014-15' (
      Student ⨝ CourseComplete
    )
  )
  ```

- **Explanation:**
  - Join the `Student` and `CourseComplete` relations.
  - Apply a selection to filter students who received grade points below 2.50 in any course during the session 2014-15.
  - Project the `studentID` and `name` attributes.

---

#### **iv. List the Student ID, Student's name, and Father's name of students who got "A+" in course "CSE-2201".**

- **Expression:**

  ```sql
  πstudentID, name, fatherName(
    σcourseID = 'CSE-2201' ∧ gradeLetter = 'A+' (
      Student ⨝ CourseComplete
    )
  )
  ```

- **Explanation:**
  - Join the `Student` and `CourseComplete` relations.
  - Apply a selection to filter students who received an "A+" grade in the course "CSE-2201".
  - Project the `studentID`, `name`, and `fatherName` attributes.

---

---

### **4. a) Explain the terms primary key, candidate key, and foreign key. State the use of "%" character in string operations.**

- **Primary Key:**
  - A primary key is a column (or set of columns) that uniquely identifies each record in a table. It must be unique and cannot contain NULL values.
  - Example: In a `Student` table, `studentID` could be the primary key.

- **Candidate Key:**
  - A candidate key is any column (or set of columns) that can uniquely identify records in a table. A table may have multiple candidate keys, but only one is chosen as the primary key.
  - Example: In a `Person` table, both `DriverNo` and `SSN` could be candidate keys.

- **Foreign Key:**
  - A foreign key is a column (or set of columns) in one table that refers to the primary key of another table. It establishes a relationship between two tables.
  - Example: In an `Owns` table, `DriverNo` is a foreign key referencing the `Person` table.

- **Use of "%" in String Operations:**
  - The `%` wildcard is used in SQL's `LIKE` operator to match zero or more characters in a string.
  - Example:

    ```sql
    SELECT * FROM Person WHERE Name LIKE 'Mr.%';
    ```

    This retrieves all names starting with "Mr.".

---

### **b) What is SQL? Write down the difference between DROP and TRUNCATE commands in SQL.**

- **SQL (Structured Query Language):**
  SQL is a domain-specific language used to manage and manipulate relational databases. It is used for querying, inserting, updating, and deleting data, as well as creating and modifying database schemas.

- **Difference Between DROP and TRUNCATE:**

  | Command   | Description                                                                 | Example                                  |
  |-----------|-----------------------------------------------------------------------------|------------------------------------------|
  | DROP      | Deletes an entire table or database schema, including its structure.       | `DROP TABLE Employees;`                 |
  | TRUNCATE  | Removes all rows from a table but retains the table structure.             | `TRUNCATE TABLE Employees;`             |

  Key Differences:
  - `DROP` removes the table entirely, while `TRUNCATE` only removes the data.
  - `DROP` cannot be rolled back, whereas `TRUNCATE` can sometimes be rolled back depending on the DBMS.

---

### **c) Define relationship sets. Briefly explain its types.**

- **Relationship Set:**
  A relationship set is a collection of relationships of the same type between entities in an entity-relationship (E-R) diagram. For example, the relationship "Enrolls" connects students to courses.

- **Types of Relationships:**
  1. **One-to-One (1:1):**
     - Each entity in one set relates to exactly one entity in another set.
     - Example: A person has one passport, and a passport belongs to one person.
  2. **One-to-Many (1:N):**
     - One entity in the first set relates to multiple entities in the second set.
     - Example: A department has many employees, but each employee belongs to one department.
  3. **Many-to-One (N:1):**
     - Multiple entities in the first set relate to one entity in the second set.
     - Example: Many employees work in one department.
  4. **Many-to-Many (M:N):**
     - Multiple entities in both sets relate to each other.
     - Example: Students enroll in multiple courses, and courses have multiple students.

---

### **d) Consider an insurance database that maintains the following information:**

#### Schema

- **Person** (`DriverNo`, `Name`, `Address`)
- **Car** (`LicenseNo`, `Model`, `Year`)
- **Accident** (`ReportNo`, `Date`, `Location`)
- **Owns** (`DriverNo`, `LicenseNo`)
- **Participated** (`DriverNo`, `LicenseNo`, `ReportNo`, `DamageAmount`)

#### Queries

##### i. **Find the total number of people whose cars were involved in accidents.**

```sql
SELECT COUNT(DISTINCT DriverNo)
FROM Participated;
```

##### ii. **Find the number of accidents in which the car belongs to "Mr. X".**

```sql
SELECT COUNT(*)
FROM Participated p
JOIN Owns o ON p.LicenseNo = o.LicenseNo
JOIN Person pr ON o.DriverNo = pr.DriverNo
WHERE pr.Name = 'Mr. X';
```

##### iii. **Delete the "CAR1" car belonging to "Mr. X".**

```sql
DELETE FROM Car
WHERE LicenseNo = 'CAR1' AND LicenseNo IN (
    SELECT LicenseNo
    FROM Owns o
    JOIN Person p ON o.DriverNo = p.DriverNo
    WHERE p.Name = 'Mr. X'
);
```

##### iv. **Add a new accident report for the "CAR2" car belonging to "Mr. Y".**

```sql
INSERT INTO Accident (ReportNo, Date, Location)
VALUES ('R101', '2023-10-01', 'New York');

INSERT INTO Participated (DriverNo, LicenseNo, ReportNo, DamageAmount)
SELECT o.DriverNo, o.LicenseNo, 'R101', 5000
FROM Owns o
JOIN Person p ON o.DriverNo = p.DriverNo
WHERE p.Name = 'Mr. Y' AND o.LicenseNo = 'CAR2';
```

---

### **5. a) What are key constraints? Describe them briefly.**

- **Key Constraints:**
  Key constraints ensure the uniqueness and identification of records in a table. Types include:
  1. **Primary Key:** Uniquely identifies each record in a table.
  2. **Foreign Key:** Establishes a relationship between two tables by referencing the primary key of another table.
  3. **Unique Key:** Ensures that all values in a column are distinct.
  4. **Candidate Key:** Any column (or set of columns) that can uniquely identify records.

---

### **b) Explain different types of relationships present in ER-Diagram with examples.**

1. **One-to-One (1:1):**
   - Example: A person has one passport, and a passport belongs to one person.

2. **One-to-Many (1:N):**
   - Example: A department has many employees, but each employee belongs to one department.

3. **Many-to-One (N:1):**
   - Example: Many employees work in one department.

4. **Many-to-Many (M:N):**
   - Example: Students enroll in multiple courses, and courses have multiple students.

---

### **c) Differences between strong entity set and weak entity set.**

| **Strong Entity Set**                          | **Weak Entity Set**                                |
|------------------------------------------------|---------------------------------------------------|
| Exists independently of other entities.        | Depends on a strong entity for its existence.     |
| Has a primary key to uniquely identify records.| Does not have a primary key; uses a partial key. |
| Example: `Employee`                            | Example: `Dependent` (depends on `Employee`)      |

---

### **d) Explain Stored Procedure and Trigger in Database.**

- **Stored Procedure:**
  - A stored procedure is a precompiled collection of SQL statements stored in the database. It can be executed repeatedly with different parameters.
  - Example:

    ```sql
    CREATE PROCEDURE GetEmployeeDetails (@empID INT)
    AS
    BEGIN
        SELECT * FROM Employee WHERE employeeID = @empID;
    END;
    ```

- **Trigger:**
  - A trigger is a special type of stored procedure that automatically executes in response to certain events (e.g., INSERT, UPDATE, DELETE) on a table.
  - Example:

    ```sql
    CREATE TRIGGER UpdateSalary
    AFTER UPDATE ON Employee
    FOR EACH ROW
    BEGIN
        IF NEW.salary > OLD.salary THEN
            INSERT INTO SalaryHistory (employeeID, oldSalary, newSalary)
            VALUES (OLD.employeeID, OLD.salary, NEW.salary);
        END IF;
    END;
    ```

---
---

### **6. a) Consider the relation scheme $ R = \{E, F, G, H, I, J, K, L, M, N\} $ and the set of functional dependencies:**

#### Functional Dependencies

1. $\{E, F\} \to \{G\}$
2. $\{F\} \to \{I, J\}$
3. $\{E, H\} \to \{K, L\}$
4. $\{K\} \to \{M\}$
5. $\{L\} \to \{N\}$

**What is/are the key(s) for $ R $? Why?**

- To determine the key(s), we need to compute the closure of all possible attribute sets to find the minimal superkey that determines all attributes in $ R $.

#### Step 1: Analyze the functional dependencies

- From $\{E, F\} \to \{G\}$: $\{E, F\}$ determines $ G $.
- From $\{F\} \to \{I, J\}$: $ F $ determines $ I $ and $ J $.
- From $\{E, H\} \to \{K, L\}$: $\{E, H\}$ determines $ K $ and $ L $.
- From $\{K\} \to \{M\}$: $ K $ determines $ M $.
- From $\{L\} \to \{N\}$: $ L $ determines $ N $.

#### Step 2: Compute the closure of candidate keys

- Start with $\{E, F, H\}$ (since these appear on the left-hand side of multiple FDs).
  - $\{E, F, H\}^+$:
    - From $\{E, F\} \to \{G\}$: Add $ G $.
    - From $\{F\} \to \{I, J\}$: Add $ I, J $.
    - From $\{E, H\} \to \{K, L\}$: Add $ K, L $.
    - From $\{K\} \to \{M\}$: Add $ M $.
    - From $\{L\} \to \{N\}$: Add $ N $.
    - Final closure: $\{E, F, H, G, I, J, K, L, M, N\}$.

- Since $\{E, F, H\}^+ = R$, $\{E, F, H\}$ is a candidate key.

#### Step 3: Check if there are other candidate keys

- Any subset of $\{E, F, H\}$ does not determine all attributes, so $\{E, F, H\}$ is the **only candidate key**.

**Answer:** The key for $ R $ is $\boxed{\{E, F, H\}}$.

---

### **b) Define Minimal Cover? Minimize $\{A \to C, AC \to D, E \to H, E \to AD\}$ by using the rules of Minimal Cover.**

#### **Minimal Cover:**

A minimal cover is a simplified version of a set of functional dependencies such that:

1. Each dependency has only one attribute on the right-hand side.
2. No extraneous attributes exist on the left-hand side.
3. No redundant dependencies exist.

#### **Steps to Minimize:**

1. **Split RHS into single attributes:**
   - Original: $\{A \to C, AC \to D, E \to H, E \to AD\}$
   - Split $ E \to AD $ into $ E \to A $ and $ E \to D $:
     $$\{A \to C, AC \to D, E \to H, E \to A, E \to D\}$$

2. **Remove extraneous attributes from LHS:**
   - For $ AC \to D $, check if $ A \to D $ or $ C \to D $ holds:
     - Neither $ A \to D $ nor $ C \to D $ holds, so $ AC \to D $ remains.

3. **Remove redundant dependencies:**
   - Check if any dependency can be inferred from others:
     - $ E \to A $ and $ E \to D $ are already covered by $ E \to AD $, so remove them.
   - Final minimal cover:
     $$\{A \to C, AC \to D, E \to H\}$$

**Answer:** The minimal cover is $\boxed{\{A \to C, AC \to D, E \to H\}}$.

---

### **c) Prove that 3NF always ensures "Dependency Preserving Decomposition," but BCNF does not always ensure it, while both 3NF and BCNF ensure "Lossless Decomposition."**

#### **Dependency Preservation:**

- A decomposition is dependency-preserving if all functional dependencies in the original schema can be enforced by the dependencies in the decomposed relations.
- **3NF:** Always ensures dependency preservation because it allows some redundancy (e.g., transitive dependencies) to preserve dependencies.
- **BCNF:** May lose dependency preservation because it eliminates all redundancies, even if it means breaking dependencies.

#### **Lossless Decomposition:**

- A decomposition is lossless if the natural join of the decomposed relations reconstructs the original relation without losing data.
- Both **3NF** and **BCNF** ensure lossless decomposition by requiring at least one common attribute between relations to act as a superkey.

---

### **7. a) Write down the differences between primary key and foreign key.**

| **Primary Key**                              | **Foreign Key**                                |
|----------------------------------------------|------------------------------------------------|
| Uniquely identifies each record in a table.  | Establishes a relationship between two tables. |
| Cannot contain NULL values.                  | Can contain NULL values.                       |
| Only one primary key per table.              | Multiple foreign keys can exist in a table.    |
| Example: `studentID` in `Student` table.     | Example: `deptID` in `Employee` referencing `Department`. |

---

### **b) Write the differences between "Cartesian Product" and "Natural Join" operations in relational algebra.**

| **Cartesian Product ($ \times $)**                 | **Natural Join ($ \bowtie $)**                     |
|-----------------------------------------------------|----------------------------------------------------|
| Combines every tuple from one relation with every tuple from another. | Combines tuples based on matching attribute values. |
| Produces a large result set (cross product).       | Produces a smaller result set (filtered matches).  |
| Example: $ R \times S $ includes all combinations. | Example: $ R \bowtie S $ includes only matching rows. |

---

### **c) Consider the following tables and answer all the questions:**

#### Schema

- **Employee** (`emp_id`, `emp_name`, `emp_address`, `salary`, `dept_id`)
- **Department** (`dept_id`, `dept_name`, `dept_location`)

---

#### i. **Write a query to find the employee whose name starts with "R" and the second last letter is "a".**

```sql
SELECT *
FROM Employee
WHERE emp_name LIKE 'R%a_';
```

---

#### ii. **Write a query to find the maximum, minimum, and average salary from the Employee table.**

```sql
SELECT MAX(salary) AS MaxSalary,
       MIN(salary) AS MinSalary,
       AVG(salary) AS AvgSalary
FROM Employee;
```

---

#### iii. **Write a query to add a column named "age" to the Employee table.**

```sql
ALTER TABLE Employee
ADD age INT;
```

---

#### iv. **Write a query to display `emp_id`, `dept_id`, `emp_name`, `Dept_name`, and `salary`.**

```sql
SELECT e.emp_id, e.dept_id, e.emp_name, d.dept_name, e.salary
FROM Employee e
JOIN Department d ON e.dept_id = d.dept_id;
```

---
