# TakeSpace Admin Dashboard - Data Structure Analysis

## API Data Structure Overview

Based on the API responses from `dev.takespace.com`, here's how the educational content is structured:

## 1. Subjects (Top Level)
**Endpoint:** `/api/v1/admin/students/subjects/`

Subjects are the highest level of educational content organization. Each subject represents a broad academic discipline.

### Subject Structure:
```json
{
    "id": "1-6",
    "name": "Subject Name",
    "image": null,
    "images": [],
    "progress": null,
    "status": null,
    "quest_remaining_days": null,
    "league": null,
    "subject_xp": "0"
}
```

### Available Subjects:
- **Math** (ID: 1)
- **English** (ID: 2) 
- **Science** (ID: 3)
- **Geography** (ID: 4)
- **Mathematics** (ID: 5) - *Note: This appears to be a duplicate of Math*
- **History** (ID: 6)

## 2. Units (Subject Level)
**Endpoint:** `/api/v1/subjects/{subject_id}/units/?page=1`

Units are the second level, organized within each subject. They represent major topic areas or chapters within a subject.

### Unit Structure:
```json
{
    "id": "3-22",
    "name": "Unit Name",
    "grade": "1-6",
    "subject": "5",
    "topics": [...]
}
```

### Key Observations:
- Units belong to a specific subject (e.g., subject "5" = Mathematics)
- Units have a grade level (1-6)
- Units contain multiple topics
- Pagination is used (79 total units for Mathematics)

## 3. Topics (Unit Level)
**Endpoint:** Same as units (topics are nested within units)

Topics are the most granular level of educational content, representing specific learning objectives or lessons.

### Topic Structure:
```json
{
    "id": "4-926",
    "name": "Topic Name",
    "subtitle": "Topic Description"
}
```

## 4. Grade Levels
Grades are associated with units, not directly with subjects. This allows for:
- Same subject content across different grade levels
- Progressive difficulty within subjects
- Grade-appropriate content organization

## Data Hierarchy

```
Subject (1-6)
├── Unit (3-22)
    ├── Grade Level (1-6)
    └── Topics (4-926)
        ├── Topic Name
        └── Topic Subtitle
```

## Example: Mathematics Subject (ID: 5)

### Grade 1 Units:
- **Basic Arithmetic** (ID: 5) - 6 topics
- **Linear Algebra** (ID: 4) - 5 topics

### Grade 2 Units:
- **Algebra Fundamentals** (ID: 7) - 6 topics
- **Basic Arithmetic** (ID: 8) - 6 topics
- **Geometry Basics** (ID: 9) - 6 topics

### Grade 3 Units:
- **Advanced Algebra** (ID: 10) - 5 topics
- **Basic Arithmetic** (ID: 11) - 6 topics
- **Linear Algebra** (ID: 12) - 5 topics
- **Statistics & Probability** (ID: 13) - 5 topics

### Grade 4 Units:
- **Geometry Basics** (ID: 14) - 6 topics
- **Linear Algebra** (ID: 15) - 5 topics
- **Calculus Introduction** (ID: 16) - 6 topics
- **Algebra Fundamentals** (ID: 17) - 6 topics

### Grade 5 Units:
- **Linear Algebra** (ID: 18) - 6 topics
- **Trigonometry** (ID: 19) - 6 topics
- **Basic Arithmetic** (ID: 20) - 6 topics

### Grade 6 Units:
- **Advanced Algebra** (ID: 21) - 4 topics
- **Linear Algebra** (ID: 22) - 5 topics

## Key Insights

1. **Content Duplication**: Some units appear across multiple grades (e.g., "Basic Arithmetic" appears in grades 1, 2, 3, and 5)

2. **Progressive Complexity**: Content becomes more advanced through grade levels (e.g., "Calculus Introduction" only appears in Grade 4+)

3. **Subject Focus**: Mathematics has the most comprehensive content structure with 79 units across 6 grade levels

4. **Topic Distribution**: Each unit typically contains 4-6 topics, providing focused learning objectives

5. **API Pagination**: The units endpoint uses pagination, indicating large amounts of content per subject

## API Usage Recommendations

- Use subject endpoint to get available subjects
- Use units endpoint with subject ID to get all units for a subject
- Filter units by grade level for grade-specific content
- Access topics through the nested structure in units response
- Implement pagination for subjects with many units

## Data Relationships Summary

- **1 Subject** → **Many Units** (1:Many)
- **1 Unit** → **1 Grade Level** (1:1)
- **1 Unit** → **Many Topics** (1:Many)
- **1 Subject** → **Multiple Grade Levels** (1:Many through Units)
