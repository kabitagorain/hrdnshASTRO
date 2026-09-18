import { services } from '../src/data/services';
import { blogPosts } from '../src/data/blogPosts';
import fs from 'fs';

const urls = [
    'https://hrdnsh.com/',
    'https://hrdnsh.com/services/',
    'https://hrdnsh.com/resume/',
    'https://hrdnsh.com/consultation/',
    'https://hrdnsh.com/billing/',
    'https://hrdnsh.com/recommend/',
    'https://hrdnsh.com/blog/',
];

blogPosts.forEach(post => {
    urls.push(`https://hrdnsh.com/blog/${post.slug}/`);
});

services.forEach(service => {
    urls.push(`https://hrdnsh.com/services/${service.id}/`);
});

fs.writeFileSync('.sitemap', urls.join('\n'));
console.log(`Generated ${urls.length} clean routes in .sitemap`);
