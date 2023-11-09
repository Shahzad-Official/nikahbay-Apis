import path from "path";
import fs from "fs";
import nodemailer from "nodemailer";

function capitalizeFirstLetter(word) {
  return `${word[0].toUpperCase()}${word.slice(1)}`;
}

function saveBase64Image(base64image, folderName, filename, fileExtension) {
  if (base64image.includes("base64,")) {
    base64image = base64image.split("base64,")[1];
  }
  const publicPath = path.join(process.cwd(), "/public");
  const folderPath = path.join(publicPath, folderName);
  const fileName = filename + Date.now() + "." + fileExtension;
  const filePath = path.join(folderPath, fileName);
  if (!fs.existsSync(publicPath)) {
    fs.mkdirSync(publicPath);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  } else {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  }
  fs.writeFileSync(filePath, Buffer.from(base64image, "base64"));

  return filePath;
}
function generateShortCode(referrer) {
  referrer = referrer || "";
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*abcdefghijklmnopqrstuvwxyz0123456789" +
    referrer;
  let code = "";
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    code += charset.charAt(randomIndex);
  }

  return `NB-${code}`;
}

function sendEmail(email, otp) {
  const html = fs.readFileSync(process.cwd() + "/html/index.html", "utf-8");
  var otpTemplate = html
    .replace("otpPlaceholder", otp)
    .replace("emailplaceholder", email);
  const transport = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    auth: {
      user: "bytestechsol@gmail.com",
      pass: "(TRFn,=Zdsp3n5r",
    },
  });

  return new Promise(async (resolve, rejects) => {
    try {
      const info = await transport.sendMail({
        from: "bytestechsol@gmail.com",
        to: email,
        subject: "Otp Verification",
        html: otpTemplate,
      });
      console.log("Email sent " + info.response);
      resolve();
    } catch (err) {
      rejects(err);
    }
  });
}
function profilePercentage(user) {
  const profileCompletionCriteria = [
    "firstName",
    "lastName",
    "userName",
    "email",
    "mobile",
    "password",
    "profile",
    "location",
    "gender",
    "age",
    "weight",
    "bio",
    "dob",
    "status",
    "education",
    "religion",
    "languages",
    "height",
    "occupation",
    "income",
  ];

  const completedFields = profileCompletionCriteria.filter((field) => {
    var value = user[field];
    if (
      value === user["location"] &&
      typeof value === "object" &&
      value != null
    ) {
      return value["address"] != "";
    } else if (
      value === user["height"] &&
      typeof value === "object" &&
      value != null
    ) {
      return value["feet"] != "";
    } else if (Array.isArray(value)) {
      return !value.includes("");
    } else {
      return value != "";
    }
  }).length;

  const totalCriteria = profileCompletionCriteria.length;
  const profileCompletionPercentage = (completedFields / totalCriteria) * 100;
  return profileCompletionPercentage;
}

export {
  saveBase64Image,
  generateShortCode,
  sendEmail,
  capitalizeFirstLetter,
  profilePercentage,
};
