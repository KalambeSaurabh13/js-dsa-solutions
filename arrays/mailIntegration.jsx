import nodemailer from "nodemailer";
export async function POST(req) {
  try {
    const contentType = req.headers.get("content-type") || "";
    console.log("Content-Type:", contentType);

    let data = {};
    let file = null;

    // ✅ JSON (Contact Us)
    if (contentType.includes("application/json")) {
      data = await req.json();
    }

    // ✅ multipart/form-data (Job form)
    else if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();

      data = {
        valid: formData.get("valid"),
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        message: formData.get("message"),
        career: formData.get("career"),
        product: formData.get("product"),
        website: formData.get("website"),
      };

      file = formData.get("file");
    }

    // ❌ Unsupported content-type
    else {
      return Response.json(
        { error: "Unsupported Content-Type" },
        { status: 415 }
      );
    }

    // 🔀 ROUTING
    if (data.valid === "contactUS") {
      await sendContactMail(data);
    } else if (data.valid === "job") {
      await sendJobMail({ ...data, file });
    } else {
      return Response.json(
        { error: "Invalid form type" },
        { status: 400 }
      );
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("MAIL ERROR 👉", err);
    return Response.json(
      { error: err.message },
      { status: 500 }
    );
  }
}







async function sendContactMail({  
  name,
  email,
  phone,
  message,
  career,
  product,
  website,
}) {
  const transporter = getTransporter();

  await transporter.sendMail({
    from: `"Enquiry Form" <${process.env.EMAIL_USER}>`,
    to: "anurag.zade@vgipl.in",
    subject: "Enquiry Form",
    html: `
      <h3>New Message</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Career:</strong> ${career}</p>
      <p><strong>Product:</strong> ${product}</p>
      <p><strong>Website:</strong> ${website}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  });
}

async function sendJobMail({
  name,
  email,
  phone,
  message,
  file,
}) {
  if (!file) {
    throw new Error("PDF file missing");
  }

  if (file.type !== "application/pdf") {
    throw new Error("Only PDF files allowed");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const transporter = getTransporter();

  await transporter.sendMail({
    from: `"Website Job Form" <${process.env.EMAIL_USER}>`,
    to: "anurag.zade@vgipl.in",
    subject: "New Job Application",
    html: `
      <h3>New Job Application</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
    attachments: [
      {
        filename: file.name,
        content: buffer,
        contentType: "application/pdf",
      },
    ],
  });
}




function getTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}























// export async function POST(req) {
//   try {
//     const formData = await req.formData();
//     console.log("Content-Type: cto", req.headers.get("content-type"));
//     const valid = formData.get("valid");
//     const name = formData.get("name");
//     const email = formData.get("email");
//     const phone = formData.get("phone");
//     const message = formData.get("message");
//     const career = formData.get("career");
//     const product = formData.get("product");
//     const website = formData.get("website");
//     const file = formData.get("file"); // 👈 PDF FILE

//     if (!file) {
//       return Response.json(
//         { error: "PDF file missing" },
//         { status: 400 }
//       );
//     }

//     // Validate PDF
//     if (file.type !== "application/pdf") {
//       return Response.json(
//         { error: "Only PDF files allowed" },
//         { status: 400 }
//       );
//     }

//     // Convert file to buffer
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     valid === "contactUS"?
//     await transporter.sendMail({
//       from: `"Enquiry Form" <${process.env.EMAIL_USER}>`,
//       to: "anurag.zade@vgipl.in",
//       subject: "Enquiry Form",
//       html:  `
//           <h3>New Message</h3>
//           <p><strong>Name:</strong> ${name}</p>
//           <p><strong>Email:</strong> ${email}</p>
//           <p><strong>Phone:</strong> ${phone}</p>
//           <p><strong>Career:</strong> ${career}</p>
//           <p><strong>Product:</strong> ${product}</p>
//           <p><strong>Website:</strong> ${website}</p>
//           <p><strong>Message:</strong> ${message}</p>
//         `
//     }):
//     await transporter.sendMail({
//       from: `"Website Job Form" <${process.env.EMAIL_USER}>`,
//       to: "anurag.zade@vgipl.in",
//       subject: "New Job Application",
//       html: `
//           <h3>New Message</h3>
//           <p><strong>Name:</strong> ${name}</p>
//           <p><strong>Email:</strong> ${email}</p>
//           <p><strong>Phone:</strong> ${phone}</p>
//           <p><strong>Message:</strong> ${message}</p>
//         `,
//       attachments: [
//         {
//           filename: file.name,
//           content: buffer,
//           contentType: "application/pdf",
//         },
//       ],
//     })
//     ;

//     return Response.json({ success: true });

//   } catch (error) {
//     console.error("UPLOAD ERROR 👉", error);
//     return Response.json(
//       { error: error.message },
//       { status: 500 }
//     );
//   }
// }
