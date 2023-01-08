import components from './components'
import paths from './paths'
import schemas from './schema'

export default {
  openapi: '3.0.0',
  info: {
    title: 'TODO MVC API',
    version: '1.0.0'
  },
  servers: [
    {
      url: '/api',
      description: 'Servidor Principal'
    }
  ],
  paths,
  schemas,
  components
}
