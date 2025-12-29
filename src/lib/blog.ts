/**
 * ===========================================
 * BLOG UTILITIES (FIXED - NO BUFFER ERROR)
 * ===========================================
 */

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
}

/**
 * Simple parser to replace 'gray-matter'
 * This extracts the metadata between the --- lines
 */
function parseFrontmatter(rawContent: string) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = rawContent.match(frontmatterRegex);

  if (!match) {
    return { data: {}, content: rawContent };
  }

  const yamlBlock = match[1];
  const content = match[2];
  const data: any = {};

  yamlBlock.split('\n').forEach(line => {
    const [key, ...val] = line.split(':');
    if (key && val) {
      const value = val.join(':').trim().replace(/^["']|["']$/g, '');
      if (key.trim() === 'tags') {
        // Handle tags as an array: [tech, web] -> ["tech", "web"]
        data[key.trim()] = value.replace(/[\[\]]/g, '').split(',').map(t => t.trim());
      } else {
        data[key.trim()] = value;
      }
    }
  });

  return { data, content };
}

async function fetchPostList(): Promise<string[]> {
  try {
    const response = await fetch('/posts/index.json');
    if (!response.ok) return []; // Return empty if no blogs yet
    return response.json();
  } catch (e) {
    console.error("Index.json not found in /public/posts/");
    return [];
  }
}

async function fetchPost(filename: string): Promise<BlogPost> {
  const response = await fetch(`/posts/${filename}`);
  if (!response.ok) throw new Error(`Failed to fetch post: ${filename}`);
  
  const rawContent = await response.text();
  const { data, content } = parseFrontmatter(rawContent);
  
  const id = filename.replace(/\.md$/, '');
  
  return {
    id,
    title: data.title || 'Untitled',
    date: data.date || 'Unknown',
    excerpt: data.excerpt || '',
    content: content.trim(),
    tags: data.tags || [],
  };
}

export async function fetchAllPosts(): Promise<BlogPost[]> {
  const filenames = await fetchPostList();
  if (filenames.length === 0) return [];
  
  const posts = await Promise.all(filenames.map(fetchPost));
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}