// Cloudflare Pages Worker for environment variable injection

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Handle requests to auth.js
    if (url.pathname.endsWith('/js/auth.js')) {
      // Fetch the original file
      const response = await env.ASSETS.fetch(request);
      let content = await response.text();
      
      // Replace placeholders with actual environment variables
      content = content.replace('__SUPABASE_URL__', env.SUPABASE_URL || '');
      content = content.replace('__SUPABASE_ANON_KEY__', env.SUPABASE_ANON_KEY || '');
      
      // Return modified content
      return new Response(content, {
        headers: {
          'Content-Type': 'application/javascript',
          'Cache-Control': 'no-cache'
        }
      });
    }
    
    // For all other requests, return as normal
    return env.ASSETS.fetch(request);
  }
};