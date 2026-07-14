import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { FaExclamationTriangle, FaCalendarAlt, FaPen } from 'react-icons/fa';
import { getArticleBySlug, formatDate, DEFAULT_THUMBNAIL } from '../utils/articleUtils';
import './ArticleDetail.css';

function ArticleDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArticle = async () => {
      setLoading(true);
      setError(null);
      const data = await getArticleBySlug(slug);
      
      if (data) {
        setArticle(data);
      } else {
        setError('Article not found');
      }
      
      setLoading(false);
    };

    loadArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="article-detail">
        <div className="container">
          <div className="loading">Loading article...</div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="article-detail">
        <div className="container">
          <div className="error">
            <div className="error-icon"><FaExclamationTriangle /></div>
            <h2>{error || 'Article not found'}</h2>
            <Link to="/articles" className="back-link">← Back to Articles</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="article-detail">
      <div className="container">
        <Link to="/articles" className="back-link">← Back to Articles</Link>
        
        <article className="article">
          <div className="article-hero">
            <img 
              src={article.metadata.thumbnail || DEFAULT_THUMBNAIL}
              alt={article.metadata.title}
              className="article-hero-image"
              onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_THUMBNAIL; }}
            />
          </div>
          
          <div className="article-header">
            <h1 className="article-title-detail">{article.metadata.title}</h1>
            
            <div className="article-meta-detail">
              {article.metadata.date && (
                <span className="meta-item">
                  <FaCalendarAlt /> {formatDate(article.metadata.date)}
                </span>
              )}
              {article.metadata.author && (
                <span className="meta-item">
                  <FaPen /> {article.metadata.author}
                </span>
              )}
            </div>
            
            {article.metadata.tags && (
              <div className="article-tags-detail">
                {article.metadata.tags.split(',').map((tag, index) => (
                  <span key={index} className="tag">
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <div className="article-body">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>
        </article>
        
        <div className="article-footer">
          <Link to="/articles" className="btn-back">← Back to All Articles</Link>
        </div>
      </div>
    </div>
  );
}

export default ArticleDetail;
