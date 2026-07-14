// Utility untuk parse metadata dari Markdown
export const parseMarkdownMetadata = (content) => {
  const metadataRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(metadataRegex);
  
  if (!match) {
    return { metadata: {}, content };
  }

  const metadataString = match[1];
  const metadata = {};
  
  metadataString.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > -1) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();
      metadata[key] = value;
    }
  });

  const markdownContent = content.replace(metadataRegex, '').trim();
  
  return { metadata, content: markdownContent };
};

// Ambil semua artikel dari folder artikle
export const getAllArticles = async () => {
  const articlesPath = process.env.REACT_APP_ARTICLES_PATH || '/artikle';
  
  try {
    // Ambil daftar artikel dari index file (auto-generated)
    const indexResponse = await fetch(`${articlesPath}/articleIndex.json`);
    if (!indexResponse.ok) {
      throw new Error('articleIndex.json not found. Run: npm run articles:index');
    }
    const articleFiles = await indexResponse.json();

    const articles = await Promise.all(
      articleFiles.map(async (filename) => {
        const response = await fetch(`${articlesPath}/${filename}`);
        const content = await response.text();
        const { metadata, content: markdownContent } = parseMarkdownMetadata(content);
        
        return {
          slug: filename.replace('.md', ''),
          filename,
          metadata,
          content: markdownContent,
          excerpt: markdownContent.substring(0, 200) + '...'
        };
      })
    );

    // Sort by date (newest first)
    return articles.sort((a, b) => {
      const dateA = new Date(a.metadata.date || 0);
      const dateB = new Date(b.metadata.date || 0);
      return dateB - dateA;
    });
  } catch (error) {
    console.error('Error loading articles:', error);
    return [];
  }
};

// Ambil satu artikel berdasarkan slug
export const getArticleBySlug = async (slug) => {
  const articlesPath = process.env.REACT_APP_ARTICLES_PATH || '/artikle';
  
  try {
    const response = await fetch(`${articlesPath}/${slug}.md`);
    if (!response.ok) {
      throw new Error('Article not found');
    }
    
    const content = await response.text();
    const { metadata, content: markdownContent } = parseMarkdownMetadata(content);
    
    return {
      slug,
      metadata,
      content: markdownContent
    };
  } catch (error) {
    console.error('Error loading article:', error);
    return null;
  }
};

// Format tanggal
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};
