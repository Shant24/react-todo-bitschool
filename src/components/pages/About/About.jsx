import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './about.module.scss';

const About = () => {
  return (
    <div className={styles.container}>
      <Container className={styles.bootstrapContainer}>
        <Row className={styles.row}>
          <Col
            xs={12}
            lg={10}
            // sm={10} md={8} lg={6}
            className={styles.formContainer}
          >
            About
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
