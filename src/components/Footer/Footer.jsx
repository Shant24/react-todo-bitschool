import React from 'react';
import styles from './footer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedin,
  faFacebookSquare,
  faGithubSquare,
} from '@fortawesome/free-brands-svg-icons';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.author}>
        Powered by Shant Sargsyan with{' '}
        <a
          href="https://bitschool.am/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <OverlayTrigger
            placement="top"
            transition={false}
            overlay={
              <Tooltip className="white-tooltip">
                <strong>Go to Bitschool page</strong>
              </Tooltip>
            }
          >
            <span>
              Bitschool{' '}
              <span role="img" aria-label="rocket">
                🚀
              </span>
            </span>
          </OverlayTrigger>
        </a>
      </div>

      <div className={styles.social}>
        <a
          href="https://github.com/Shant24"
          target="_blank"
          rel="noopener noreferrer"
        >
          <OverlayTrigger
            placement="top"
            transition={false}
            overlay={
              <Tooltip className="white-tooltip">
                <strong>GitHub</strong>
              </Tooltip>
            }
          >
            <FontAwesomeIcon icon={faGithubSquare} />
          </OverlayTrigger>
        </a>

        <a
          href="https://www.linkedin.com/in/shant-sargsyan/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <OverlayTrigger
            placement="top"
            transition={false}
            overlay={
              <Tooltip className="white-tooltip">
                <strong>Linked.in</strong>
              </Tooltip>
            }
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </OverlayTrigger>
        </a>

        <a
          href="https://www.facebook.com/shant24"
          target="_blank"
          rel="noopener noreferrer"
        >
          <OverlayTrigger
            placement="top"
            transition={false}
            overlay={
              <Tooltip className="white-tooltip">
                <strong>Facebook</strong>
              </Tooltip>
            }
          >
            <FontAwesomeIcon icon={faFacebookSquare} />
          </OverlayTrigger>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
