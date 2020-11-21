const nodemailer = require('nodemailer');

const generateOrderEmail = ({ order, total }) => `
    <div>
       <h2>Your Recent Order for ${total}</h2>
       <p>Please start walking over, we will have your order ready in the next 20 mins</p>
        <ul>
            ${order
              .map(
                (item) => `<li>
            <img src="${item.thumbnail}" alt="${item.name}"/>
            ${item.size} ${item.name} ${item.price}
            </li>`
              )
              .join('')}
        </ul>
        <p> Your Total is $${total} due at pickup </p>
    </div>
    `;

// transport for nodemailer

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  console.log(body.maplesyrup);
  //  check honeypot field
  if (body.maplesyrup !== '') {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Boop beep bop zsst good bye ERR 34234',
      }),
    };
  }
  //  validate data coming is correct
  const requiredFields = ['email', 'name', 'order'];
  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Opps you are missing field' }),
      };
    }
  }

  if (body.order.length < 1) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Opps order is empty' }),
    };
  }
  // send email

  // send success or error

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  //   send test email
  const info = await transporter.sendMail({
    from: 'SlickSlices<slick@example.com>',
    to: `${body.name} <${body.email}>`,
    subject: 'new order',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'success' }),
  };
};

// Jacinthe Hansen
