import { useState, useEffect } from 'react';
import TerminalWindow from '../TerminalWindow';
import { fetchAllPosts, BlogPost } from '../../lib/blog';
// 1. Import the markdown component
import ReactMarkdown from 'react-markdown';

const BlogSection = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllPosts()
      .then(setPosts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section id='blog' className='space-y-6'>
        <div className='text-muted-foreground text-base mb-4'>
          <span className='text-accent'>$</span> cat /var/logs/blog/*
          <span className='text-primary ml-2 animate-pulse'>loading...</span>
        </div>
      </section>
    );
  }

  return (
    <section id='blog' className='space-y-6'>
      <div className='text-muted-foreground text-base mb-4'>
        <span className='text-accent'>$</span> cat /var/logs/blog/* |
        <span className='text-accent animate-pulse'> {posts.length} entries</span>
      </div>

      {selectedPost ? (
        <TerminalWindow title={`~/blog/${selectedPost.id}.md`}>
          <div className='space-y-4'>
            <button
              onClick={() => setSelectedPost(null)}
              className='terminal-link text-base mb-4 inline-block'
            >
              <span className='text-accent'>⭠</span> cd ..
            </button>

            <div className='border-b border-white/10 pb-4 mb-6'>
              <h3 className='text-primary text-glow text-2xl font-bold mb-2'>
                {selectedPost.title}
              </h3>
              <div className='flex items-center gap-4 text-base text-muted-foreground'>
                <span>
                  <span className='text-accent'>date:</span> {selectedPost.date}
                </span>
                <div className='flex gap-2'>
                  {selectedPost.tags.map((tag) => (
                    <span key={tag} className='text-secondary-foreground'>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. REPLACED <pre> with <ReactMarkdown> */}
            <div className='markdown-container py-4'>
              <ReactMarkdown
                components={{
                  // Style headings
                  h1: ({ children }) => (
                    <h1 className='text-3xl font-bold text-primary text-glow mt-8 mb-4 border-b border-primary/20 pb-2'>
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className='text-2xl font-bold text-primary mt-6 mb-3'>
                      {children}
                    </h2>
                  ),
                  // Style paragraphs
                  p: ({ children }) => (
                    <p className='text-primary/90 leading-relaxed mb-4'>
                      {children}
                    </p>
                  ),
                  // Style lists
                  ul: ({ children }) => (
                    <ul className='list-none space-y-2 mb-4 ml-2'>
                      {children}
                    </ul>
                  ),
                  li: ({ children }) => (
                    <li className='flex gap-2'>
                      <span className='text-accent'>*</span>
                      <span>{children}</span>
                    </li>
                  ),
                  // Style bold text
                  strong: ({ children }) => (
                    <strong className='text-accent font-bold text-glow-sm'>
                      {children}
                    </strong>
                  ),
                  // Style code blocks
                  code: ({ children }) => (
                    <code className='bg-white/10 px-1.5 py-0.5 rounded text-accent font-mono text-base border border-white/5'>
                      {children}
                    </code>
                  ),
                }}
              >
                {selectedPost.content}
              </ReactMarkdown>
            </div>
          </div>
        </TerminalWindow>
      ) : (
        <div className='space-y-4'>
          {posts.map((post, index) => (
            <TerminalWindow key={post.id} title={`${post.id}.md`}>
              <button
                onClick={() => setSelectedPost(post)}
                className='w-full text-left space-y-3 boot-line group'
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className='text-accent font-bold group-hover:text-glow transition-colors'>
                  {post.title}
                </h3>
                <div className='flex items-center gap-4 text-base text-muted-foreground'>
                  <span>
                    <span className='text-accent'>@</span> {post.date}
                  </span>
                  <div className='flex gap-2'>
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className='text-secondary-foreground opacity-80'
                      >
                        [{tag.toUpperCase()}]
                      </span>
                    ))}
                  </div>
                </div>
                <p className='text-muted-foreground text-base'>{post.excerpt}</p>
                <div className='text-accent text-base pt-2'>
                  <span className='group-hover:animate-pulse'>→</span> cat
                  full_post.md
                </div>
              </button>
            </TerminalWindow>
          ))}
        </div>
      )}
    </section>
  );
};

export default BlogSection;
