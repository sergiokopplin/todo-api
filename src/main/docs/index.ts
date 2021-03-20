import paths from './paths'
import components from './components'
import schemas from './schema'

export default {
  openapi: '3.0.0',
  info: {
    title: 'TODO MVC API',
    version: '1.0.0',
    contact: {
      name: 'Sérgio A. Kopplin',
      email: 'sergiokopplin@gmail.com',
      url: 'https://www.linkedin.com/in/kopplin'
    },
    license: {
      name: 'GPL-3.0-or-later',
      url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
    }
  },
  servers: [
    {
      url: '/api',
      description: 'Servidor Principal'
    }
  ],
  tags: [
    {
      name: 'Login',
      description: 'APIs relacionadas a Login'
    }
  ],
  paths,
  schemas,
  components
}
