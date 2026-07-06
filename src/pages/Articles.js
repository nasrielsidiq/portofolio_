import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaRegFileAlt, FaCalendarAlt, FaPen } from 'react-icons/fa';
import { getAllArticles, formatDate } from '../utils/articleUtils';
import './Articles.css';

function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'project', label: 'Project' },
    { id: 'knowledge', label: 'Knowledge' },
    { id: 'confession', label: 'Confession' }
  ];

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      const data = await getAllArticles();
      setArticles(data);
      setLoading(false);
    };

    loadArticles();
  }, []);

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.metadata.category === selectedCategory);

  if (loading) {
    return (
      <div className="articles">
        <div className="container">
          <div className="loading">Loading articles...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="articles">
      <div className="container">
        <div className="articles-header">
          <h1>Articles</h1>
          <p>Thoughts, tutorials, and insights about web development</p>
        </div>

        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {filteredArticles.length === 0 ? (
          <div className="no-articles">
            <div className="no-articles-icon"><FaRegFileAlt /></div>
            <p>No articles found. Check back soon!</p>
          </div>
        ) : (
          <div className="articles-grid">
            {filteredArticles.map((article) => (
              <article key={article.slug} className="article-card">
                {article.metadata.thumbnail && (
                  <img 
                    src={article.metadata.thumbnail} 
                    alt={article.metadata.title}
                    className="article-thumbnail"
                  />
                )}
                <div className="article-content">
                  <div className="article-meta">
                    {article.metadata.date && (
                      <span className="article-date">
                        <FaCalendarAlt /> {formatDate(article.metadata.date)}
                      </span>
                    )}
                    {article.metadata.author && (
                      <span className="article-author">
                        <FaPen /> {article.metadata.author}
                      </span>
                    )}
                  </div>
                  <h2 className="article-title">{article.metadata.title}</h2>
                  <p className="article-excerpt">{article.excerpt}</p>
                  {article.metadata.tags && (
                    <div className="article-tags">
                      {article.metadata.tags.split(',').map((tag, index) => (
                        <span key={index} className="article-tag">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                  <Link to={`/article/${article.slug}`} className="read-more">
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Articles;
