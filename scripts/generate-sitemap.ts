import { services } from '../src/data/services';
import { blogPosts } from '../src/data/blogPosts';
import fs from 'fs';

const urls = [
    'https://hrdnsh.com/',
    'https://hrdnsh.com/?view=resume',
    'https://hrdnsh.com/?view=consultation',
    'https://hrdnsh.com/?view=billing-portal',
    'https://hrdnsh.com/?view=recommend',
    'https://hrdnsh.com/?view=blog',
];

blogPosts.forEach(post => {
    urls.push(`https://hrdnsh.com/?view=blog-post&slug=${post.slug}`);
});

services.forEach(service => {
    urls.push(`https://hrdnsh.com/?view=service-detail&service=${service.id}`);
});

fs.writeFileSync('.sitemap', urls.join('\n'));
console.log(`Generated ${urls.length} routes in .sitemap`);
