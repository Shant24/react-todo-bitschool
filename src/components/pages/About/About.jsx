import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './about.module.scss';
import authorPhoto from '../../../assets/images/shant-sargsyan.jpg';
import LazyImage from '../../LazyImage/LazyImage';

const About = () => {
  return (
    <div className={styles.container}>
      <Container className={styles.bootstrapContainer}>
        <Row className={styles.row}>
          <Col md={12} lg={10} className={styles.aboutContainer}>
            <section>
              <h2>About creating an application</h2>

              <p>
                This application was created while learning React.js at{' '}
                <a href="https://bitschool.am/">
                  <b>Bitschool</b>
                </a>
                . It uses technologies like <b>React</b>, <b>Redux</b>,{' '}
                <b>Redux Thunk</b>, <b>SASS</b> and <b>React Bootstrap</b>.
              </p>
            </section>

            <section>
              <h2>
                About the <span>ToDo App</span> features
              </h2>

              <div className={styles.aboutAppTextContainer}>
                <b>The application gives us the opportunity</b>

                <ul>
                  <li>Create tasks</li>
                  <li>Set a deadline for your task</li>
                  <li>
                    Mark <b>the status</b> of your task as <b>Done</b> or{' '}
                    <b>active</b>
                  </li>
                  <li>Edit task</li>
                  <li>Delete task</li>
                  <li>Delete multiple tasks at once</li>
                  <li>Search tasks</li>
                  <li>
                    Searching a task using filtering
                    <ul>
                      <li>
                        Filtering by <b>Status</b>
                        <ul>
                          <li>Done</li>
                          <li>Active</li>
                        </ul>
                      </li>
                      <li>
                        Filtering by <b>Sort</b>
                        <ul>
                          <li>A-Z</li>
                          <li>Z-A</li>
                          <li>Creation date oldest</li>
                          <li>Creation date newest</li>
                          <li>Completion date oldest</li>
                          <li>Completion date newest</li>
                        </ul>
                      </li>
                      <li>
                        Filtering by <b>Date</b>
                        <ul>
                          <li>Creation before</li>
                          <li>Creation after</li>
                          <li>Completion before</li>
                          <li>Completion after</li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    Change <b>User</b> information such as <b>Name</b>,{' '}
                    <b>Surname</b> and <b>Password</b>
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2>About author</h2>

              <div className={styles.authorTextContainer}>
                <div className={styles.authorWrapper}>
                  <div className={styles.imgContainer}>
                    <LazyImage
                      img={{ src: authorPhoto, alt: "Shant's_photo" }}
                    />
                  </div>

                  <div className={styles.authorInformation}>
                    <h3>Shant Sargsyan</h3>

                    <p className={styles.aboutAuthor}>
                      Hi, I'm Shant. I am a web developer. I learned programming
                      at two great companies. The first company is called{' '}
                      <a
                        href="https://www.mic.am/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Microsoft innovation center Armenia
                      </a>
                      , where I learned HTML, CSS and JavaScript. The second
                      company is called{' '}
                      <a
                        href="https://bitschool.am/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Bitschool
                      </a>
                      , in which I learned React.js. I am grateful to these two
                      companies for giving me the opportunity to learn from them
                      and I am very grateful to my two mentors for their
                      patience, willingness to help and great attention.
                    </p>

                    <p>
                      To familiarize yourself with my works, you can look at my{' '}
                      <a
                        href="https://github.com/Shant24"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub
                      </a>{' '}
                      page, there are works in which I practiced and learned all
                      what I know and more.
                    </p>

                    <p>
                      I have big goals in programming, I strive for it and will
                      do everything. I will learn new things and continue
                      improving my skills. I made this app with love and from
                      heart while learning React.js. This application was
                      created for you, dear user. Hope you enjoy using this app.
                      Best of luck to all of you!
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2>Feedback</h2>

              <div className={styles.feedbackTextContainer}>
                <span>Hey, have you tried the ToDo app?</span>{' '}
                <Link to="/contact">
                  If you have any questions feel free to ask at this link.
                </Link>{' '}
                <span>
                  We will definitely reply as soon as possible!{' '}
                  <span
                    role="img"
                    aria-label="A yellow face with a slight smile shown winking"
                  >
                    😉
                  </span>
                </span>
              </div>
            </section>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
