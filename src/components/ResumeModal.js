import React, { useState, useEffect } from 'react';
import { FaDownload, FaTimes, FaSpinner } from 'react-icons/fa';
import './ResumeModal.css';

function ResumeModal({ isOpen, onClose }) {
  const [htmlContent, setHtmlContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const loadResume = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch('/resume.md');
        if (!res.ok) throw new Error('Not found');
        const text = await res.text();
        
        // Remove YAML frontmatter from the beginning of the file
        // Frontmatter is enclosed by --- and --- at the start
        const cleanedText = text.replace(/^---[\s\S]*?---\s*/, '');
        
        setHtmlContent(cleanedText);
      } catch (e) {
        setError(true);
        setHtmlContent('<p style="color: red; text-align: center;">Resume not available. Please generate it first with <code>npm run resume:generate</code>.</p>');
      }
      setLoading(false);
    };

    loadResume();
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="resume-modal-overlay" onClick={onClose}>
      <div className="resume-modal" onClick={e => e.stopPropagation()}>
        <div className="resume-modal-header">
          <h2>Resume Preview</h2>
          <div className="resume-modal-actions">
            <a href="/resume.pdf" download className="resume-download-btn">
              <FaDownload /> Download PDF
            </a>
            <button className="resume-close-btn" onClick={onClose}>
              <FaTimes />
            </button>
          </div>
        </div>
        <div className="resume-modal-body">
          {loading ? (
            <div className="resume-loading">
              <FaSpinner className="spin-icon" />
              <p>Loading resume preview...</p>
            </div>
          ) : error ? (
            <div className="resume-error" dangerouslySetInnerHTML={{ __html: htmlContent }} />
          ) : (
            <div className="resume-paper-preview-container">
              <div 
                className="resume-paper-preview" 
                dangerouslySetInnerHTML={{ __html: htmlContent }} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResumeModal;
