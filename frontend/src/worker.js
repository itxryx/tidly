export default {
  async fetch(request, env, ctx) {
    const response = await env.ASSETS.fetch(request);

    const newResponse = new Response(response.body, response);
    newResponse.headers.set('X-Robots-Tag', 'noindex, nofollow');

    return newResponse;
  }
}
