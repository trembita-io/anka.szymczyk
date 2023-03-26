const fetch = (...args) =>
  import(`node-fetch`).then(({ default: fetch }) => fetch(...args))

const PROJECT_TYPE_NODE = 'Project';

exports.sourceNodes = async ({
    actions,
    createContentDigest,
    createNodeId,
  }) => {
    const { createNode } = actions
  
    const data = {
      posts: [
        { id: 1, description: `Hello world!` },
        { id: 2, description: `Second post!` },
      ],
    }
  
    // loop through data and create Gatsby nodes
    data.posts.forEach(post =>
      createNode({
        ...post,
        id: createNodeId(`${PROJECT_TYPE_NODE}-${post.id}`),
        parent: null,
        children: [],
        internal: {
          type: PROJECT_TYPE_NODE,
          contentDigest: createContentDigest(post),
        },
      })
    )
  
    return
  }

  exports.onPostBuild = async ({ cache }) => {
    await cache.set(`key`, `value`)
    const cachedValue = await cache.get(`key`)
    console.log(cachedValue) // logs `value`
  }