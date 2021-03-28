import morgan from 'morgan';

export const logger = morgan('tiny', {
  skip: (_req, _res) => {
    return process.env.NODE_ENV === 'test';
  },
});
