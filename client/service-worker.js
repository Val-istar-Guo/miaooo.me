importScripts('/sw-toolbox.js')


toolbox.precache(['/', '/manifest.json'])

toolbox.router.get('/', toolbox.networkFirst)
toolbox.router.get('/*.css', toolbox.cacheFirst)
toolbox.router.get('/article/*', toolbox.networkFirst)

toolbox.router.get('/manifest.json', toolbox.cacheFirst)
toolbox.router.get('/runtime.*.js', toolbox.cacheFirst)
toolbox.router.get('/*.png', toolbox.cacheFirst)
toolbox.router.get('/*.svg', toolbox.cacheFirst)
toolbox.router.get('/bundle.*.js', toolbox.cacheFirst)
toolbox.router.get('/chunk.*.js', toolbox.cacheFirst)

toolbox.router.get('/api/tree', toolbox.networkFirst)
toolbox.router.get('/api/article/*', toolbox.networkFirst)
