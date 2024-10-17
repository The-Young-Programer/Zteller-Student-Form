
// // server.js

// const express = require('express');
// const bodyParser = require('body-parser');
// const admin = require('firebase-admin');
// const path = require('path');

// // Initialize Firebase Admin SDK
// const serviceAccount = require('./serviceAccountKey.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://zteller-db-default-rtdb.firebaseio.com"
// });

// const db = admin.firestore();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Serve static files (e.g., your HTML form)
// app.use(express.static(path.join(__dirname, 'public')));

// // Endpoint to handle form submission
// app.post('/submit-form', async (req, res) => {
//   try {
//     const formData = req.body; // Get form data from the request body

//     // Add form data to Firestore
//     await db.collection('studentData').add(formData);

//     // Fetch the Paystack link based on the association from the 'paystackLink' collection
//     const { association } = formData;
//     const snapshot = await db.collection('paystackLink').where('association', '==', association).get();

//     if (snapshot.empty) {
//       return res.status(404).json({ message: 'No payment link found for the selected association' });
//     }

//     const paystackData = snapshot.docs[0].data();
//     const paymentLink = paystackData.paymentLink;

//     // Return the payment link in the response
//     res.status(200).json({ paymentLink });
//   } catch (error) {
//     console.error('Error retrieving payment link: ', error);
//     res.status(500).json({ message: 'Error retrieving payment link. Please try again.' });
//   }
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });



// //////////////////////////////////////////////////////////


// // const express = require('express');
// // const bodyParser = require('body-parser');
// // const cors = require('cors');
// // const nodemailer = require('nodemailer');
// // const admin = require('firebase-admin');

// // // Initialize Firebase
// // admin.initializeApp({
// //   credential: admin.credential.applicationDefault(),
// // });
// // const db = admin.firestore();

// // const app = express();
// // const PORT = process.env.PORT || 3000;

// // // Middleware
// // app.use(cors());
// // app.use(bodyParser.json());

// // // const PAYSTACK_SECRET_KEY = 'your_paystack_secret_key';

// // // Paystack Webhook Endpoint
// // app.post('/paystack-webhook', async (req, res) => {
// //   const event = req.body; // The event object from Paystack

// //   if (event.event === 'charge.success' || event.event === 'charge.pending' || event.event === 'charge.failed') {
// //     const paymentDetails = event.data;

// //     // Retrieve the user data based on the paymentDetails (you can use paymentDetails.reference)
// //     const userRef = await db.collection('studentData').where('paymentReference', '==', paymentDetails.reference).get();
    
// //     if (!userRef.empty) {
// //       const userData = userRef.docs[0].data();
// //       // Generate the receipt HTML
// //       const receiptHTML = generateReceiptHTML(userData, paymentDetails);
      
// //       // Send the receipt to the user's email
// //       await sendEmailWithReceipt(userData.email, receiptHTML);

// //       // Send the receipt HTML as a response
// //       res.status(200).send(receiptHTML); // You can also render it directly if you want
// //     } else {
// //       res.status(404).send('User data not found.');
// //     }
// //   } else {
// //     res.status(200).send('Event not handled.');
// //   }
// // });

// // // Function to generate receipt HTML
// // function generateReceiptHTML(userData, paymentDetails) {
// //   return `
// //   <!DOCTYPE html>
// //   <html lang="en">
// //     <head>
// //       <meta charset="UTF-8">
// //       <meta name="viewport" content="width=device-width, initial-scale=1.0">
// //       <script src="https://cdn.tailwindcss.com"></script>
// //       <title>Receipt | Zteller.com</title>
// //     </head>
// //     <body class="sm:bg-gray-300">
// //       <div class="w-full sm:w-[620px] sm:py-3 my-5 rounded-sm h-full sm:h-fit mx-auto bg-white rounded-[200px] relative">
// //         <header class="mx-5 mt-5 flex flex-row justify-between items-center">
// //           <div class="w-[80px] h-[80px]">
// //             <img src="uniben-logo.png" />
// //           </div>
// //           <div class="text-center text-black">
// //             <p class="text-2xl font-bold">${userData.schoolName}</p>
// //             <p>${userData.associationFullName}</p>
// //             <p>${userData.associationShortName}</p>
// //           </div>
// //           <div class="w-[80px] h-[80px]">
// //             <img src="uniben-logo.png">
// //           </div>
// //         </header>

// //         <div class="mx-5 mt-5 px-3 ">
// //           <div class="flex flex-row justify-between font-bold">
// //             <p>Payment Receipt</p>
// //             <p>${paymentDetails.status}</p>
// //           </div>
// //           <img src="REceipt Gradient Line .png">
// //         </div>

// //         <div class="text-[12px] text-center mt-2 font-mono">
// //           <p class="font-bold">${paymentDetails.id}</p>
// //           <p>Visit <a href="zzz.zteller.com">www.zteller.com/verify</a> to validate payment</p>
// //         </div>

// //         <main class="mx-5 my-5 flex flex-col gap-3 justify-center items-center font-mono">
// //           <div class="py-3 w-[93%] h-[fit] sm:w-[500px] sm:h-[200px] rounded-lg bg-gray-300 text-black flex flex-row justify-between items-center">
// //             <div class="h-full flex flex-col gap-[1px] ml-4 justify-center text-[12px]">
// //               <img class="w-[170px] my-2" src="REceipt Student Information.png">
// //               <p><span class="font-bold">Name:</span> ${userData.fullName}</p>
// //               <p><span class="font-bold">Mat No:</span> ${userData.matNumber}</p>
// //               <p><span class="font-bold">Email:</span> ${userData.email}</p>
// //               <!-- Add other user details here -->
// //             </div>
// //           </div>
// //         </main>

// //         <footer class="mx-5 relative z-[2]">
// //           <div class="mt-2 font-bold mb-8 flex w-[80%] sm:w-[40%] mx-auto gap-3 flex-row items-center justify-between">
// //             <img class="w-[70px] relative z-[2]" src="REceipt Total.png">
// //             <div class="border-2 border-black w-2/3 h-[1px]"></div>
// //             <p>${paymentDetails.amount} NGN</p>
// //           </div>
// //           <div class="w-fit mt-10 mb-8 mx-auto text-sm flex flex-row">
// //             <span>Powered by: </span>
// //             <img src="Ztellalogo (1).png" class="w-[50px]">
// //           </div>
// //         </footer>
// //       </div>
// //     </body>
// //   </html>`;
// // }

// // // Function to send email with the receipt
// // async function sendEmailWithReceipt(to, receiptHTML) {
// //   const transporter = nodemailer.createTransport({
// //     service: 'gmail', // Use your email service
// //     auth: {
// //       user: 'your_email@gmail.com',
// //       pass: 'your_email_password'
// //     }
// //   });

// //   const mailOptions = {
// //     from: 'your_email@gmail.com',
// //     to: to,
// //     subject: 'Your Payment Receipt',
// //     html: receiptHTML
// //   };

// //   return transporter.sendMail(mailOptions);
// // }

// // // Start the server
// // app.listen(PORT, () => {
// //   console.log(`Server is running on http://localhost:${PORT}`);
// // });




// server.js

const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const path = require('path');
const ejs = require('ejs'); // Use EJS for templating

// Initialize Firebase Admin SDK
// const serviceAccount = require('./serviceAccountKey.json');

const serviceAccountBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
const serviceAccountBuffer = Buffer.from(serviceAccountBase64, 'base64');
const serviceAccount = JSON.parse(serviceAccountBuffer.toString());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://zteller-db-default-rtdb.firebaseio.com"
});

const db = admin.firestore();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Create a 'views' directory for your templates

// Endpoint to handle form submission
app.post('/submit-form', async (req, res) => {
  try {
    const formData = req.body; // Get form data from the request body

    // Add form data to Firestore
    await db.collection('studentData').add(formData);

    // Fetch the Paystack link based on the association from the 'paystackLink' collection
    const { association } = formData;
    const snapshot = await db.collection('paystackLink').where('association', '==', association).get();

    if (snapshot.empty) {
      return res.status(404).json({ message: 'No payment link found for the selected association' });
    }

    const paystackData = snapshot.docs[0].data();
    const paymentLink = paystackData.paymentLink;

    // Return the payment link in the response
    res.status(200).json({ paymentLink });
  } catch (error) {
    console.error('Error retrieving payment link: ', error);
    res.status(500).json({ message: 'Error retrieving payment link. Please try again.' });
  }
});

// Paystack payment callback
app.post('/paystack/callback', async (req, res) => {
  const paymentData = req.body; // Assuming Paystack sends payment data in the body


  // Verify payment with Paystack API
  const verificationUrl = `https://api.paystack.co/transaction/verify/${paymentData.transaction_id}`;
  const response = await fetch(verificationUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer sk_test_5bb8105221855a7ed3fcc2ab823a43a74394bc76`, // Replace with your actual secret key
    },
  });



//   // Save the payment data to Firestore or your database
//   await db.collection('paymentData').add(paymentData);

  if (paymentVerification.status) {
    // Payment is successful, proceed to render the receipt

  // Extract user details from paymentData
  const {
    email,
    first_name,
    last_name,
    othername,
    school,
    entry,
    association,
    mat_number,
    faculty, // Ensure these fields exist in the payment data
    department,
    level,
    phone_number,
    status, // e.g., "success", "pending", "failed"
    amount,
    transaction_id, // Ensure the payment ID is received
    createdAt // Date of payment
  } = paymentVerification.data;

  // Create a payment record
  const charges = 100.00; // Your fixed charge
  const VAT = 0.00; // Your VAT amount
  const totalAmount = amount + charges + VAT; // Total amount

  // Render the receipt with EJS
  res.render('receipt', {
    first_name,
    last_name,
    email,
    othername,
    school,
    entry,
    association,
    mat_number,
    faculty,
    department,
    level,
    phone_number,
    payment_status: paymentVerification.data.status,
    payment_date: new Date(createdAt).toLocaleDateString(),
    payment_time: new Date(createdAt).toLocaleTimeString(),
    transaction_id,
    amount,
    charges,
    VAT,
    totalAmount,
  });

} else {
    // Handle payment failure or pending status
    res.status(400).send('Payment verification failed.');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
