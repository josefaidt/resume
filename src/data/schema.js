import { makeExecutableSchema } from 'graphql-tools'
import contacts from './contacts.json'
import experience from './experience.json'
import projects from './projects.json'

const typeDefs = `
type Experience {
  title: String!
  company: String!
  startDate: String!
  endDate: String!
  responsibilities: [String]!
}

type Contact {
  name: String!
  link: String!
  linkText: String!
}

type Project {
  name: String!
  type: String!
  url: String!
  description: String!
  technologies: [String]!
}

type Query {
  allExperiences: [Experience]!
  allContacts: [Contact]!
  allProjects: [Project]!
}
`

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: {
      allExperiences: (parent, args, ctx, info) => {
        return experience
      },
      allContacts: (parent, args, ctx, info) => {
        return contacts
      },
      allProjects: (parent, args, ctx, info) => {
        return projects
      },
    },
  },
})
