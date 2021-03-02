import { graphqlHTTP } from 'express-graphql'
import { schema } from '../../data/schema'

let handler = function handler(req, res) {
  res.send('OK')
}

if (process.env.NODE_ENV !== 'production') {
  const context = {
    root: process.cwd(),
  }
  handler = graphqlHTTP({
    schema,
    graphiql: true,
    context,
    customFormatErrorFn: error => ({
      message: error.message,
      locations: error.locations,
      stack: error.stack,
      path: error.path,
    }),
  })
}

export default handler
