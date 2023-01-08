export const RepositoryHelper = {
  mapValidKeys: (defaultParams: any, data: any): any => {
    const params = {
      ...defaultParams
    }

    for (const prop in data) {
      /* istanbul ignore next */
      if (data[prop] || typeof data[prop] === 'boolean') {
        params[prop] = data[prop]
      }
    }

    return params
  }
}
