import * as emailjs from 'emailjs-com';

const sendFeedbackToEmail = (data) => {
  const templateParams = {
    from_name: data.name,
    from_email: data.email,
    to_name: process.env.REACT_APP_YOUR_NAME_FOR_EMAIL_TEMPLATE,
    message: data.message,
  };

  emailjs.send(
    process.env.REACT_APP_EMAIL_SERVICE_ID,
    process.env.REACT_APP_EMAIL_TEMPLATE_ID,
    templateParams,
    process.env.REACT_APP_EMAIL_USER_ID
  );
};

export default sendFeedbackToEmail;
