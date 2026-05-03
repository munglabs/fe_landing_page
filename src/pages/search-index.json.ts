import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('blog');
  const index = posts.map(post => ({
    id: post.id.replace(/\/index$/, ''),
    title: post.data.title,
    description: post.data.description,
    date: post.data.date.toISOString(),
    tags: post.data.tags,
    content: post.body,
  }));

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
}
