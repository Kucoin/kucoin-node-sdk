/**
 * Http middleware
 */
module.exports = class Middleware {

  // middlewares = [];

  constructor() {
    this.middlewares = [];
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  async run(ctx) {
    const middlewares = [...this.middlewares];
    const func = middlewares.reduceRight(
      (next, middle) => {
        return async () => {
          await middle(ctx, next);
        };
      },
      async () => {
        Promise.resolve();
      }
    );
    const result = await func(ctx);
    return result;
  }
}
