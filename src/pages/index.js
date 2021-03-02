import React from 'react'
import Card from '../components/Card'
import Grid from '../components/Grid'
import Container from '../components/Container'
import { query } from '../helpers/query'
import { technologies as cardTechnologies } from '../components/Card/Card.module.css'
import styles from '../styles.module.css'

const HomePage = ({ projects, experience, contacts }) => {
  return (
    <Container>
      <section aria-label="contact information" className={styles.section}>
        <header>
          <h1>Josef Aidt</h1>
        </header>
        <ul className={styles.contactList}>
          {contacts.map((contact, i) => (
            <li key={i} className={styles.contactListNode}>
              <strong>{contact.name}:</strong>{' '}
              <a href={contact.link} target="_blank" rel="noopener noreferrer">
                {contact.linkText}
              </a>{' '}
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.section}>
        <header>
          <h2>Personal Projects</h2>
        </header>
        <Grid>
          {projects.map((project, i) => (
            <Card key={i}>
              <header className={styles.cardHeader}>
                <h4 className={styles.cardTitle}>{project.name}</h4>
                <a
                  className={styles.cardLaunch}
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ alignSelf: 'flex-start' }}
                >
                  {project.type.toLowerCase() !== 'download' ? 'Launch ' : ''}
                  {[
                    project.type[0].toUpperCase(),
                    project.type.toLowerCase() === 'npm'
                      ? project.type.slice(1).toUpperCase()
                      : project.type.slice(1).toLowerCase(),
                  ].join('')}{' '}
                  <svg className={styles.cardLaunchIcon} height="32" width="32" viewBox="0 0 32 32">
                    <title>Launch Project</title>
                    <path d="M6 2v24h24v-24h-24zM28 24h-20v-20h20v20zM4 28v-21l-2-2v25h25l-2-2h-21z" />
                    <path d="M11 8l5 5-6 6 3 3 6-6 5 5v-13z" />
                  </svg>
                </a>
              </header>
              {/* <p>
                <a href={project.url}>
                {project.urlLabel || project.url.replace(/https?:\/\//, '')} &rarr;
                </a>
              </p> */}
              <p className={styles.cardDescription}>{project.description}</p>
              <div className={cardTechnologies}>
                {project.technologies.map((technology, k) => (
                  <div key={k}>{technology}</div>
                ))}
              </div>
            </Card>
          ))}
        </Grid>
      </section>
      <section className={styles.section}>
        <header>
          <h2>Work Experience</h2>
        </header>
        {experience.map((xp, i) => (
          <article key={i}>
            <header className={styles.xpHeader}>
              <h3 className={styles.xpTitle}>
                {xp.title} at {xp.company}
              </h3>
              <p className={styles.xpDate}>
                {xp.startDate} &ndash; {xp.endDate}
              </p>
            </header>
            {Array.isArray(xp.responsibilities) && xp.responsibilities.length > 0 ? (
              <ul>
                {xp.responsibilities.map((responsibility, k) => (
                  <li key={k}>{responsibility}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </section>
    </Container>
  )
}

export async function getStaticProps(context) {
  // const getGithubData = async () => {
  //   const res = await fetch('https://api.github.com/graphql', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //       Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  //     },
  //     body: JSON.stringify({ query }),
  //   })
  //   const data = await res.json()
  //   return data?.data
  // }
  const { data } = await query(`
    query {
      allContacts {
        name
        link
        linkText
      }
      allExperiences {
        title
        company
        startDate
        endDate
        responsibilities
      }
      allProjects {
        name
        type
        url
        description
        technologies
      }
    }
  `)
  const { allContacts: contacts, allExperiences: experience, allProjects: projects } = data || {}
  return {
    props: { projects, experience, contacts }, // will be passed to the page component as props
  }
}

export default HomePage
