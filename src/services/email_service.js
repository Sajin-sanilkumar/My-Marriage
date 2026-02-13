
import emailjs from '@emailjs/browser';


export const sendEmail = async (formRef) => {
  if (!formRef.current) {
    throw new Error("failed to Send!");
  }

  return await emailjs.sendForm(
    'service_9y4tibl',
    'template_xw0l2mu',
    formRef.current,
    { publicKey: 'RUR2P_6JEMyN8Fo1D' }
  );
};

