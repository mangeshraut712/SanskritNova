# Sanskrit Knowledge Base - Digital Implementation

## 🗄️ Database Structure and Search System

---

## 📊 Database Schema

### Primary Tables

```sql
-- Texts Table
CREATE TABLE texts (
    id INTEGER PRIMARY KEY,
    title_sanskrit TEXT NOT NULL,
    title_english TEXT NOT NULL,
    title_hindi TEXT,
    category TEXT NOT NULL, -- Veda, Upanishad, Darshana, etc.
    subcategory TEXT, -- Rigveda, Advaita, etc.
    period TEXT NOT NULL, -- Vedic, Classical, Medieval, Modern
    century_min INTEGER,
    century_max INTEGER,
    author_sanskrit TEXT,
    author_english TEXT,
    editor TEXT,
    publisher TEXT,
    year_published INTEGER,
    isbn TEXT,
    manuscript_count INTEGER,
    verse_count INTEGER,
    word_count INTEGER,
    language_script TEXT, -- Devanagari, Grantha, etc.
    critical_edition BOOLEAN,
    digital_available BOOLEAN,
    gretil_id TEXT,
    muktabodha_id TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Manuscripts Table
CREATE TABLE manuscripts (
    id INTEGER PRIMARY KEY,
    text_id INTEGER REFERENCES texts(id),
    repository TEXT NOT NULL, -- BORI, Cambridge, etc.
    manuscript_id TEXT NOT NULL,
    script TEXT NOT NULL, -- Devanagari, Grantha, etc.
    material TEXT, -- Palm leaf, birch bark, paper
    century_min INTEGER,
    century_max INTEGER,
    location TEXT,
    catalog_number TEXT,
    digitized BOOLEAN,
    digital_url TEXT,
    provenance TEXT,
    condition TEXT,
    folios INTEGER,
    lines_per_folio INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Verses Table
CREATE TABLE verses (
    id INTEGER PRIMARY KEY,
    text_id INTEGER REFERENCES texts(id),
    chapter_number INTEGER,
    verse_number INTEGER,
    sanskrit_text TEXT NOT NULL,
    iast_transliteration TEXT NOT NULL,
    english_translation TEXT,
    hindi_translation TEXT,
    commentary_sanskrit TEXT,
    commentary_english TEXT,
    keywords TEXT,
    themes TEXT,
    meter TEXT,
    deities TEXT,
    concepts TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Academic References Table
CREATE TABLE academic_references (
    id INTEGER PRIMARY KEY,
    text_id INTEGER REFERENCES texts(id),
    author TEXT NOT NULL,
    title TEXT NOT NULL,
    publisher TEXT,
    year INTEGER,
    journal TEXT,
    volume TEXT,
    pages TEXT,
    doi TEXT,
    url TEXT,
    reference_type TEXT, -- Book, Article, Dissertation
    peer_reviewed BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Geographical Distribution Table
CREATE TABLE geographical_data (
    id INTEGER PRIMARY KEY,
    text_id INTEGER REFERENCES texts(id),
    region TEXT NOT NULL, -- North, South, East, West, Central
    country TEXT NOT NULL,
    state_province TEXT,
    city TEXT,
    temple_monastery TEXT,
    inscription_site TEXT,
    latitude REAL,
    longitude REAL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Philosophical Schools Table
CREATE TABLE philosophical_schools (
    id INTEGER PRIMARY KEY,
    text_id INTEGER REFERENCES texts(id),
    school_name TEXT NOT NULL, -- Advaita, Vishishtadvaita, etc.
    sub_school TEXT, -- Dvaita, etc.
    founder TEXT,
    founding_century INTEGER,
    key_concepts TEXT,
    related_texts TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔍 Search Implementation

### Full-Text Search System

```python
import sqlite3
import re
from typing import List, Dict, Optional
from dataclasses import dataclass
from datetime import datetime

@dataclass
class SearchResult:
    text_id: int
    title: str
    category: str
    period: str
    relevance_score: float
    matching_verses: List[Dict]
    manuscripts: List[Dict]
    references: List[Dict]

class SanskritKnowledgeBase:
    def __init__(self, db_path: str):
        self.db_path = db_path
        self.conn = sqlite3.connect(db_path)
        self.conn.row_factory = sqlite3.Row
        self._create_indexes()
    
    def _create_indexes(self):
        """Create search indexes for performance"""
        indexes = [
            "CREATE INDEX IF NOT EXISTS idx_texts_title ON texts(title_sanskrit, title_english)",
            "CREATE INDEX IF NOT EXISTS idx_texts_category ON texts(category, subcategory)",
            "CREATE INDEX IF NOT EXISTS idx_texts_period ON texts(period, century_min, century_max)",
            "CREATE INDEX IF NOT EXISTS idx_verses_sanskrit ON verses(sanskrit_text)",
            "CREATE INDEX IF NOT EXISTS idx_verses_iast ON verses(iast_transliteration)",
            "CREATE INDEX IF NOT EXISTS idx_verses_english ON verses(english_translation)",
            "CREATE INDEX IF NOT EXISTS idx_verses_keywords ON verses(keywords)",
            "CREATE INDEX IF NOT EXISTS idx_verses_themes ON verses(themes)",
            "CREATE INDEX IF NOT EXISTS idx_manuscripts_repository ON manuscripts(repository)",
            "CREATE INDEX IF NOT EXISTS idx_manuscripts_script ON manuscripts(script)",
            "CREATE INDEX IF NOT EXISTS idx_references_author ON references(author)",
            "CREATE INDEX IF NOT EXISTS idx_geo_region ON geographical_data(region, country)"
        ]
        
        for index_sql in indexes:
            self.conn.execute(index_sql)
        self.conn.commit()
    
    def search_sanskrit_text(self, query: str, limit: int = 50) -> List[SearchResult]:
        """Search for Sanskrit text with IAST transliteration support"""
        # Normalize query for IAST
        normalized_query = self._normalize_iast(query)
        
        sql = """
        SELECT DISTINCT 
            t.id, t.title_sanskrit, t.title_english, t.category, t.period,
            COUNT(v.id) as verse_matches,
            COUNT(m.id) as manuscript_count
        FROM texts t
        LEFT JOIN verses v ON t.id = v.text_id
        LEFT JOIN manuscripts m ON t.id = m.text_id
        WHERE 
            t.title_sanskrit LIKE ? OR
            t.title_english LIKE ? OR
            v.sanskrit_text LIKE ? OR
            v.iast_transliteration LIKE ? OR
            v.english_translation LIKE ? OR
            v.keywords LIKE ?
        GROUP BY t.id
        ORDER BY verse_matches DESC, manuscript_count DESC
        LIMIT ?
        """
        
        pattern = f"%{normalized_query}%"
        cursor = self.conn.execute(sql, (pattern, pattern, pattern, pattern, pattern, pattern, limit))
        
        results = []
        for row in cursor.fetchall():
            # Get matching verses
            verses_sql = """
            SELECT sanskrit_text, iast_transliteration, english_translation, chapter_number, verse_number
            FROM verses 
            WHERE text_id = ? AND (
                sanskrit_text LIKE ? OR 
                iast_transliteration LIKE ? OR 
                english_translation LIKE ?
            )
            LIMIT 5
            """
            verses_cursor = self.conn.execute(verses_sql, (row['id'], pattern, pattern, pattern))
            verses = [dict(v) for v in verses_cursor.fetchall()]
            
            # Get manuscripts
            manuscripts_sql = """
            SELECT repository, manuscript_id, script, century_min, century_max, location
            FROM manuscripts 
            WHERE text_id = ?
            """
            manuscripts_cursor = self.conn.execute(manuscripts_sql, (row['id'],))
            manuscripts = [dict(m) for m in manuscripts_cursor.fetchall()]
            
            # Get references
            references_sql = """
            SELECT author, title, year, journal, peer_reviewed
            FROM academic_references 
            WHERE text_id = ?
            """
            references_cursor = self.conn.execute(references_sql, (row['id'],))
            references = [dict(r) for r in references_cursor.fetchall()]
            
            result = SearchResult(
                text_id=row['id'],
                title=row['title_sanskrit'],
                category=row['category'],
                period=row['period'],
                relevance_score=row['verse_matches'],
                matching_verses=verses,
                manuscripts=manuscripts,
                references=references
            )
            results.append(result)
        
        return results
    
    def _normalize_iast(self, text: str) -> str:
        """Normalize IAST transliteration for search"""
        # Handle diacritics and special characters
        replacements = {
            'ā': 'a', 'ī': 'i', 'ū': 'u', 'ṛ': 'r', 'ṝ': 'r', 'ḷ': 'l', 'ḹ': 'l',
            'ṃ': 'm', 'ḥ': 'h',
            'ñ': 'n', 'ṅ': 'n', 'ṇ': 'n',
            'ś': 's', 'ṣ': 's',
            'ṭ': 't', 'ṭh': 'th', 'ḍ': 'd', 'ḍh': 'dh',
            'ḍ': 'd', 'ḍh': 'dh',
            'ṁ': 'm'
        }
        
        normalized = text.lower()
        for old, new in replacements.items():
            normalized = normalized.replace(old, new)
        
        return normalized
    
    def search_by_period(self, period: str, century_min: Optional[int] = None, century_max: Optional[int] = None) -> List[SearchResult]:
        """Search texts by historical period"""
        sql = """
        SELECT DISTINCT 
            t.id, t.title_sanskrit, t.title_english, t.category, t.period,
            t.century_min, t.century_max,
            COUNT(m.id) as manuscript_count
        FROM texts t
        LEFT JOIN manuscripts m ON t.id = m.text_id
        WHERE t.period = ?
        """
        
        params = [period]
        
        if century_min is not None:
            sql += " AND t.century_min >= ?"
            params.append(century_min)
        
        if century_max is not None:
            sql += " AND t.century_max <= ?"
            params.append(century_max)
        
        sql += " GROUP BY t.id ORDER BY manuscript_count DESC"
        
        cursor = self.conn.execute(sql, params)
        results = []
        
        for row in cursor.fetchall():
            manuscripts_sql = """
            SELECT repository, manuscript_id, script, century_min, century_max, location
            FROM manuscripts 
            WHERE text_id = ?
            """
            manuscripts_cursor = self.conn.execute(manuscripts_sql, (row['id'],))
            manuscripts = [dict(m) for m in manuscripts_cursor.fetchall()]
            
            result = SearchResult(
                text_id=row['id'],
                title=row['title_sanskrit'],
                category=row['category'],
                period=row['period'],
                relevance_score=row['manuscript_count'],
                matching_verses=[],
                manuscripts=manuscripts,
                references=[]
            )
            results.append(result)
        
        return results
    
    def search_by_manuscript_repository(self, repository: str) -> List[SearchResult]:
        """Search texts by manuscript repository"""
        sql = """
        SELECT DISTINCT 
            t.id, t.title_sanskrit, t.title_english, t.category, t.period,
            COUNT(m.id) as manuscript_count
        FROM texts t
        JOIN manuscripts m ON t.id = m.text_id
        WHERE m.repository = ?
        GROUP BY t.id
        ORDER BY manuscript_count DESC
        """
        
        cursor = self.conn.execute(sql, (repository,))
        results = []
        
        for row in cursor.fetchall():
            manuscripts_sql = """
            SELECT repository, manuscript_id, script, century_min, century_max, location
            FROM manuscripts 
            WHERE text_id = ? AND repository = ?
            """
            manuscripts_cursor = self.conn.execute(manuscripts_sql, (row['id'], repository))
            manuscripts = [dict(m) for m in manuscripts_cursor.fetchall()]
            
            result = SearchResult(
                text_id=row['id'],
                title=row['title_sanskrit'],
                category=row['category'],
                period=row['period'],
                relevance_score=row['manuscript_count'],
                matching_verses=[],
                manuscripts=manuscripts,
                references=[]
            )
            results.append(result)
        
        return results
    
    def get_text_details(self, text_id: int) -> Optional[Dict]:
        """Get complete details for a specific text"""
        sql = """
        SELECT * FROM texts WHERE id = ?
        """
        cursor = self.conn.execute(sql, (text_id,))
        text = cursor.fetchone()
        
        if not text:
            return None
        
        # Get verses
        verses_sql = """
        SELECT * FROM verses WHERE text_id = ? ORDER BY chapter_number, verse_number
        """
        verses_cursor = self.conn.execute(verses_sql, (text_id,))
        verses = [dict(v) for v in verses_cursor.fetchall()]
        
        # Get manuscripts
        manuscripts_sql = """
        SELECT * FROM manuscripts WHERE text_id = ?
        """
        manuscripts_cursor = self.conn.execute(manuscripts_sql, (text_id,))
        manuscripts = [dict(m) for m in manuscripts_cursor.fetchall()]
        
        # Get references
        references_sql = """
        SELECT * FROM academic_references WHERE text_id = ?
        """
        references_cursor = self.conn.execute(references_sql, (text_id,))
        references = [dict(r) for r in references_cursor.fetchall()]
        
        # Get geographical data
        geo_sql = """
        SELECT * FROM geographical_data WHERE text_id = ?
        """
        geo_cursor = self.conn.execute(geo_sql, (text_id,))
        geographical_data = [dict(g) for g in geo_cursor.fetchall()]
        
        # Get philosophical schools
        schools_sql = """
        SELECT * FROM philosophical_schools WHERE text_id = ?
        """
        schools_cursor = self.conn.execute(schools_sql, (text_id,))
        philosophical_schools = [dict(s) for s in schools_cursor.fetchall()]
        
        return {
            'text': dict(text),
            'verses': verses,
            'manuscripts': manuscripts,
            'references': references,
            'geographical_data': geographical_data,
            'philosophical_schools': philosophical_schools
        }
    
    def advanced_search(self, 
                       query: Optional[str] = None,
                       category: Optional[str] = None,
                       period: Optional[str] = None,
                       century_min: Optional[int] = None,
                       century_max: Optional[int] = None,
                       repository: Optional[str] = None,
                       script: Optional[str] = None,
                       region: Optional[str] = None,
                       school: Optional[str] = None,
                       limit: int = 50) -> List[SearchResult]:
        """Advanced search with multiple filters"""
        
        conditions = []
        params = []
        
        if query:
            normalized_query = self._normalize_iast(query)
            conditions.append("""
                (t.title_sanskrit LIKE ? OR 
                 t.title_english LIKE ? OR 
                 v.sanskrit_text LIKE ? OR 
                 v.iast_transliteration LIKE ? OR 
                 v.english_translation LIKE ?)
            """)
            pattern = f"%{normalized_query}%"
            params.extend([pattern, pattern, pattern, pattern, pattern])
        
        if category:
            conditions.append("t.category = ?")
            params.append(category)
        
        if period:
            conditions.append("t.period = ?")
            params.append(period)
        
        if century_min is not None:
            conditions.append("t.century_min >= ?")
            params.append(century_min)
        
        if century_max is not None:
            conditions.append("t.century_max <= ?")
            params.append(century_max)
        
        if repository:
            conditions.append("m.repository = ?")
            params.append(repository)
        
        if script:
            conditions.append("m.script = ?")
            params.append(script)
        
        if region:
            conditions.append("g.region = ?")
            params.append(region)
        
        if school:
            conditions.append("ps.school_name = ?")
            params.append(school)
        
        where_clause = " AND ".join(conditions) if conditions else "1=1"
        
        sql = f"""
        SELECT DISTINCT 
            t.id, t.title_sanskrit, t.title_english, t.category, t.period,
            COUNT(v.id) as verse_matches,
            COUNT(m.id) as manuscript_count
        FROM texts t
        LEFT JOIN verses v ON t.id = v.text_id
        LEFT JOIN manuscripts m ON t.id = m.text_id
        LEFT JOIN geographical_data g ON t.id = g.text_id
        LEFT JOIN philosophical_schools ps ON t.id = ps.text_id
        WHERE {where_clause}
        GROUP BY t.id
        ORDER BY verse_matches DESC, manuscript_count DESC
        LIMIT ?
        """
        
        params.append(limit)
        cursor = self.conn.execute(sql, params)
        results = []
        
        for row in cursor.fetchall():
            verses_sql = """
            SELECT sanskrit_text, iast_transliteration, english_translation, chapter_number, verse_number
            FROM verses 
            WHERE text_id = ?
            LIMIT 5
            """
            verses_cursor = self.conn.execute(verses_sql, (row['id'],))
            verses = [dict(v) for v in verses_cursor.fetchall()]
            
            manuscripts_sql = """
            SELECT repository, manuscript_id, script, century_min, century_max, location
            FROM manuscripts 
            WHERE text_id = ?
            """
            manuscripts_cursor = self.conn.execute(manuscripts_sql, (row['id'],))
            manuscripts = [dict(m) for m in manuscripts_cursor.fetchall()]
            
            result = SearchResult(
                text_id=row['id'],
                title=row['title_sanskrit'],
                category=row['category'],
                period=row['period'],
                relevance_score=row['verse_matches'],
                matching_verses=verses,
                manuscripts=manuscripts,
                references=[]
            )
            results.append(result)
        
        return results
    
    def get_statistics(self) -> Dict:
        """Get database statistics"""
        stats = {}
        
        # Text counts by category
        sql = """
        SELECT category, COUNT(*) as count 
        FROM texts 
        GROUP BY category
        """
        cursor = self.conn.execute(sql)
        stats['texts_by_category'] = {row['category']: row['count'] for row in cursor.fetchall()}
        
        # Text counts by period
        sql = """
        SELECT period, COUNT(*) as count 
        FROM texts 
        GROUP BY period
        """
        cursor = self.conn.execute(sql)
        stats['texts_by_period'] = {row['period']: row['count'] for row in cursor.fetchall()}
        
        # Manuscript counts by repository
        sql = """
        SELECT repository, COUNT(*) as count 
        FROM manuscripts 
        GROUP BY repository
        """
        cursor = self.conn.execute(sql)
        stats['manuscripts_by_repository'] = {row['repository']: row['count'] for row in cursor.fetchall()}
        
        # Total counts
        stats['total_texts'] = self.conn.execute("SELECT COUNT(*) FROM texts").fetchone()[0]
        stats['total_verses'] = self.conn.execute("SELECT COUNT(*) FROM verses").fetchone()[0]
        stats['total_manuscripts'] = self.conn.execute("SELECT COUNT(*) FROM manuscripts").fetchone()[0]
        stats['total_references'] = self.conn.execute("SELECT COUNT(*) FROM academic_references").fetchone()[0]
        
        return stats
    
    def close(self):
        """Close database connection"""
        self.conn.close()
```

---

## 🌐 Web Interface Implementation

### Flask Application

```python
from flask import Flask, render_template, request, jsonify
from typing import Dict, List
import json

app = Flask(__name__)
kb = SanskritKnowledgeBase('sanskrit_knowledge_base.db')

@app.route('/')
def index():
    """Main search interface"""
    return render_template('index.html')

@app.route('/api/search')
def search():
    """API endpoint for search"""
    query = request.args.get('q', '')
    category = request.args.get('category', '')
    period = request.args.get('period', '')
    repository = request.args.get('repository', '')
    
    results = kb.advanced_search(
        query=query if query else None,
        category=category if category else None,
        period=period if period else None,
        repository=repository if repository else None
    )
    
    return jsonify([{
        'id': r.text_id,
        'title': r.title,
        'category': r.category,
        'period': r.period,
        'relevance_score': r.relevance_score,
        'verses': r.matching_verses[:3],  # Limit verses in API response
        'manuscripts': r.manuscripts[:3]  # Limit manuscripts in API response
    } for r in results])

@app.route('/api/text/<int:text_id>')
def get_text(text_id: int):
    """API endpoint for text details"""
    text_details = kb.get_text_details(text_id)
    
    if not text_details:
        return jsonify({'error': 'Text not found'}), 404
    
    return jsonify(text_details)

@app.route('/api/statistics')
def statistics():
    """API endpoint for database statistics"""
    stats = kb.get_statistics()
    return jsonify(stats)

@app.route('/api/autocomplete')
def autocomplete():
    """API endpoint for search autocomplete"""
    query = request.args.get('q', '')
    
    if len(query) < 2:
        return jsonify([])
    
    # Simple autocomplete based on titles
    sql = """
    SELECT DISTINCT title_sanskrit, title_english 
    FROM texts 
    WHERE title_sanskrit LIKE ? OR title_english LIKE ?
    LIMIT 10
    """
    
    pattern = f"%{query}%"
    cursor = kb.conn.execute(sql, (pattern, pattern))
    results = [{'sanskrit': row['title_sanskrit'], 'english': row['title_english']} for row in cursor.fetchall()]
    
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
```

---

## 📱 Frontend Implementation

### HTML Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sanskrit Knowledge Base</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>🕉️ Sanskrit Knowledge Base</h1>
            <p>Research-Grade Digital Library of Hinduism and Sanskrit</p>
        </header>
        
        <main>
            <section class="search-section">
                <div class="search-form">
                    <input type="text" id="search-input" placeholder="Search Sanskrit texts, verses, or concepts...">
                    <div class="filters">
                        <select id="category-filter">
                            <option value="">All Categories</option>
                            <option value="Veda">Vedas</option>
                            <option value="Upanishad">Upanishads</option>
                            <option value="Darshana">Philosophy</option>
                            <option value="Itihasa">Epics</option>
                            <option value="Purana">Puranas</option>
                            <option value="Dharmashastra">Dharmashastra</option>
                        </select>
                        
                        <select id="period-filter">
                            <option value="">All Periods</option>
                            <option value="Vedic">Vedic (1500-500 BCE)</option>
                            <option value="Classical">Classical (500 BCE-1000 CE)</option>
                            <option value="Medieval">Medieval (1000-1800 CE)</option>
                            <option value="Modern">Modern (1800 CE-present)</option>
                        </select>
                        
                        <select id="repository-filter">
                            <option value="">All Repositories</option>
                            <option value="BORI">Bhandarkar Oriental Research Institute</option>
                            <option value="Cambridge">Cambridge University Library</option>
                            <option value="GRETIL">GRETIL Database</option>
                            <option value="Muktabodha">Muktabodha Digital Library</option>
                        </select>
                        
                        <button id="search-btn">Search</button>
                    </div>
                </div>
                
                <div id="search-results" class="search-results"></div>
            </section>
            
            <section class="statistics-section">
                <h2>Database Statistics</h2>
                <div id="statistics" class="stats-grid"></div>
            </section>
        </main>
    </div>
    
    <script src="app.js"></script>
</body>
</html>
```

### CSS Styles

```css
:root {
    --primary-color: #8B4513;
    --secondary-color: #DAA520;
    --background-color: #FFF8DC;
    --text-color: #2C1810;
    --border-color: #DEB887;
    --shadow-color: rgba(139, 69, 19, 0.1);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Georgia', serif;
    background-color: var(--background-color);
    color: var(--text-color);
    line-height: 1.6;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

header {
    text-align: center;
    margin-bottom: 40px;
    padding: 20px;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px var(--shadow-color);
}

header h1 {
    font-size: 2.5em;
    margin-bottom: 10px;
}

.search-section {
    margin-bottom: 40px;
}

.search-form {
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 2px 4px var(--shadow-color);
    margin-bottom: 20px;
}

#search-input {
    width: 100%;
    padding: 15px;
    font-size: 1.2em;
    border: 2px solid var(--border-color);
    border-radius: 5px;
    margin-bottom: 20px;
    font-family: 'Georgia', serif;
}

.filters {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    margin-bottom: 20px;
}

.filters select {
    padding: 10px;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    background: white;
    font-family: 'Georgia', serif;
}

#search-btn {
    background: var(--primary-color);
    color: white;
    border: none;
    padding: 12px 30px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.1em;
    transition: background-color 0.3s ease;
}

#search-btn:hover {
    background: var(--secondary-color);
}

.search-results {
    display: grid;
    gap: 20px;
}

.result-card {
    background: white;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 0 2px 4px var(--shadow-color);
    border-left: 5px solid var(--primary-color);
}

.result-card h3 {
    color: var(--primary-color);
    margin-bottom: 10px;
}

.result-card .meta {
    color: #666;
    font-size: 0.9em;
    margin-bottom: 15px;
}

.result-card .verses {
    background: var(--background-color);
    padding: 15px;
    border-radius: 5px;
    margin-bottom: 15px;
}

.result-card .verse {
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--border-color);
}

.result-card .verse:last-child {
    border-bottom: none;
}

.sanskrit-text {
    font-family: 'Sanskrit 2003', 'Devanagari MT', sans-serif;
    font-size: 1.1em;
    color: var(--text-color);
    margin-bottom: 5px;
}

.iast-text {
    font-style: italic;
    color: #666;
    margin-bottom: 5px;
}

.english-translation {
    color: var(--text-color);
}

.manuscripts {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 15px;
}

.manuscript-tag {
    background: var(--secondary-color);
    color: white;
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 0.8em;
}

.statistics-section {
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 2px 4px var(--shadow-color);
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.stat-card {
    background: var(--background-color);
    padding: 20px;
    border-radius: 5px;
    text-align: center;
    border: 1px solid var(--border-color);
}

.stat-number {
    font-size: 2em;
    font-weight: bold;
    color: var(--primary-color);
}

.stat-label {
    color: var(--text-color);
    margin-top: 5px;
}

.loading {
    text-align: center;
    padding: 20px;
    color: #666;
}

.error {
    background: #ffdddd;
    color: #cc0000;
    padding: 15px;
    border-radius: 5px;
    margin-bottom: 20px;
}

@media (max-width: 768px) {
    .container {
        padding: 10px;
    }
    
    .search-form {
        padding: 20px;
    }
    
    .filters {
        grid-template-columns: 1fr;
    }
    
    header h1 {
        font-size: 2em;
    }
}
```

### JavaScript Implementation

```javascript
class SanskritKnowledgeBase {
    constructor() {
        this.searchInput = document.getElementById('search-input');
        this.searchBtn = document.getElementById('search-btn');
        this.categoryFilter = document.getElementById('category-filter');
        this.periodFilter = document.getElementById('period-filter');
        this.repositoryFilter = document.getElementById('repository-filter');
        this.searchResults = document.getElementById('search-results');
        this.statistics = document.getElementById('statistics');
        
        this.initializeEventListeners();
        this.loadStatistics();
    }
    
    initializeEventListeners() {
        this.searchBtn.addEventListener('click', () => this.performSearch());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.performSearch();
        });
        
        // Add autocomplete
        this.searchInput.addEventListener('input', (e) => {
            if (e.target.value.length >= 2) {
                this.autocomplete(e.target.value);
            }
        });
        
        // Filter changes
        [this.categoryFilter, this.periodFilter, this.repositoryFilter].forEach(filter => {
            filter.addEventListener('change', () => this.performSearch());
        });
    }
    
    async performSearch() {
        const query = this.searchInput.value.trim();
        const category = this.categoryFilter.value;
        const period = this.periodFilter.value;
        const repository = this.repositoryFilter.value;
        
        this.showLoading();
        
        try {
            const params = new URLSearchParams();
            if (query) params.append('q', query);
            if (category) params.append('category', category);
            if (period) params.append('period', period);
            if (repository) params.append('repository', repository);
            
            const response = await fetch(`/api/search?${params}`);
            const results = await response.json();
            
            this.displayResults(results);
        } catch (error) {
            this.showError('Search failed. Please try again.');
        }
    }
    
    displayResults(results) {
        if (results.length === 0) {
            this.searchResults.innerHTML = '<div class="no-results">No results found.</div>';
            return;
        }
        
        const html = results.map(result => `
            <div class="result-card">
                <h3>${result.title}</h3>
                <div class="meta">
                    ${result.category} • ${result.period} • Relevance: ${result.relevance_score}
                </div>
                
                ${result.verses.length > 0 ? `
                    <div class="verses">
                        ${result.verses.map(verse => `
                            <div class="verse">
                                <div class="sanskrit-text">${verse.sanskrit_text}</div>
                                <div class="iast-text">${verse.iast_transliteration}</div>
                                <div class="english-translation">${verse.english_translation}</div>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                
                ${result.manuscripts.length > 0 ? `
                    <div class="manuscripts">
                        ${result.manuscripts.map(manuscript => `
                            <span class="manuscript-tag">${manuscript.repository}</span>
                        `).join('')}
                    </div>
                ` : ''}
                
                <button onclick="viewDetails(${result.id})" class="view-details-btn">View Details</button>
            </div>
        `).join('');
        
        this.searchResults.innerHTML = html;
    }
    
    async autocomplete(query) {
        try {
            const response = await fetch(`/api/autocomplete?q=${encodeURIComponent(query)}`);
            const suggestions = await response.json();
            
            // Display suggestions (implementation depends on UI design)
            console.log('Autocomplete suggestions:', suggestions);
        } catch (error) {
            console.error('Autocomplete failed:', error);
        }
    }
    
    async loadStatistics() {
        try {
            const response = await fetch('/api/statistics');
            const stats = await response.json();
            
            const html = `
                <div class="stat-card">
                    <div class="stat-number">${stats.total_texts}</div>
                    <div class="stat-label">Total Texts</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${stats.total_verses}</div>
                    <div class="stat-label">Total Verses</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${stats.total_manuscripts}</div>
                    <div class="stat-label">Manuscripts</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${stats.total_references}</div>
                    <div class="stat-label">References</div>
                </div>
            `;
            
            this.statistics.innerHTML = html;
        } catch (error) {
            console.error('Failed to load statistics:', error);
        }
    }
    
    showLoading() {
        this.searchResults.innerHTML = '<div class="loading">Searching...</div>';
    }
    
    showError(message) {
        this.searchResults.innerHTML = `<div class="error">${message}</div>`;
    }
}

// Global function for viewing details
async function viewDetails(textId) {
    try {
        const response = await fetch(`/api/text/${textId}`);
        const details = await response.json();
        
        // Display detailed view (implementation depends on UI design)
        console.log('Text details:', details);
        
        // For now, show a simple alert
        alert(`Viewing details for text ID: ${textId}`);
    } catch (error) {
        console.error('Failed to load text details:', error);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new SanskritKnowledgeBase();
});
```

---

## 📊 Data Import Scripts

### Sample Data Import

```python
import sqlite3
import json
from typing import Dict, List

class DataImporter:
    def __init__(self, db_path: str):
        self.db_path = db_path
        self.conn = sqlite3.connect(db_path)
        self.conn.row_factory = sqlite3.Row
    
    def import_texts(self, texts_data: List[Dict]):
        """Import texts from JSON data"""
        for text in texts_data:
            sql = """
            INSERT OR REPLACE INTO texts (
                id, title_sanskrit, title_english, title_hindi, category, subcategory,
                period, century_min, century_max, author_sanskrit, author_english,
                editor, publisher, year_published, isbn, manuscript_count,
                verse_count, word_count, language_script, critical_edition,
                digital_available, gretil_id, muktabodha_id
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """
            
            self.conn.execute(sql, (
                text['id'],
                text['title_sanskrit'],
                text['title_english'],
                text.get('title_hindi'),
                text['category'],
                text.get('subcategory'),
                text['period'],
                text.get('century_min'),
                text.get('century_max'),
                text.get('author_sanskrit'),
                text.get('author_english'),
                text.get('editor'),
                text.get('publisher'),
                text.get('year_published'),
                text.get('isbn'),
                text.get('manuscript_count'),
                text.get('verse_count'),
                text.get('word_count'),
                text.get('language_script'),
                text.get('critical_edition'),
                text.get('digital_available'),
                text.get('gretil_id'),
                text.get('muktabodha_id')
            ))
        
        self.conn.commit()
    
    def import_manuscripts(self, manuscripts_data: List[Dict]):
        """Import manuscript data"""
        for manuscript in manuscripts_data:
            sql = """
            INSERT OR REPLACE INTO manuscripts (
                id, text_id, repository, manuscript_id, script, material,
                century_min, century_max, location, catalog_number,
                digitized, digital_url, provenance, condition, folios, lines_per_folio
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """
            
            self.conn.execute(sql, (
                manuscript['id'],
                manuscript['text_id'],
                manuscript['repository'],
                manuscript['manuscript_id'],
                manuscript['script'],
                manuscript.get('material'),
                manuscript.get('century_min'),
                manuscript.get('century_max'),
                manuscript.get('location'),
                manuscript.get('catalog_number'),
                manuscript.get('digitized'),
                manuscript.get('digital_url'),
                manuscript.get('provenance'),
                manuscript.get('condition'),
                manuscript.get('folios'),
                manuscript.get('lines_per_folio')
            ))
        
        self.conn.commit()
    
    def import_verses(self, verses_data: List[Dict]):
        """Import verse data"""
        for verse in verses_data:
            sql = """
            INSERT OR REPLACE INTO verses (
                id, text_id, chapter_number, verse_number, sanskrit_text,
                iast_transliteration, english_translation, hindi_translation,
                commentary_sanskrit, commentary_english, keywords, themes,
                meter, deities, concepts
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """
            
            self.conn.execute(sql, (
                verse['id'],
                verse['text_id'],
                verse['chapter_number'],
                verse['verse_number'],
                verse['sanskrit_text'],
                verse['iast_transliteration'],
                verse.get('english_translation'),
                verse.get('hindi_translation'),
                verse.get('commentary_sanskrit'),
                verse.get('commentary_english'),
                verse.get('keywords'),
                verse.get('themes'),
                verse.get('meter'),
                verse.get('deities'),
                verse.get('concepts')
            ))
        
        self.conn.commit()
    
    def close(self):
        self.conn.close()

# Example usage
if __name__ == "__main__":
    importer = DataImporter('sanskrit_knowledge_base.db')
    
    # Load sample data from JSON files
    with open('texts.json', 'r') as f:
        texts_data = json.load(f)
    importer.import_texts(texts_data)
    
    with open('manuscripts.json', 'r') as f:
        manuscripts_data = json.load(f)
    importer.import_manuscripts(manuscripts_data)
    
    with open('verses.json', 'r') as f:
        verses_data = json.load(f)
    importer.import_verses(verses_data)
    
    importer.close()
```

This comprehensive implementation provides a complete digital knowledge base system with:
- Full-text search with IAST support
- Advanced filtering by multiple criteria
- Complete manuscript tracking
- Academic reference management
- Statistical analysis
- Web interface with responsive design
- Data import capabilities
- Professional academic standards

The system is designed to handle the complete corpus of Sanskrit and Hindu texts with proper scholarly attribution and manuscript provenance tracking.
