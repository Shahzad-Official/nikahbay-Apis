import path from "path";
import fs from "fs";
import nodemailer from "nodemailer";


function capitalizeFirstLetter(word) {
  return `${word[0].toUpperCase()}${word.slice(1)}`;
}


function saveBase64Image(base64image, folderName, filename, fileExtension) {
  const publicPath = path.join(process.cwd(), "/public");
  const folderPath = path.join(publicPath, folderName);
  const filePath = path.join(
    folderPath,
    filename + Date.now() + "." + fileExtension
  );
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

function sendEmail(email,otp){
  const html=fs.readFileSync(process.cwd()+"/html/index.html","utf-8");
  var otpTemplate = html
    .replace("otpPlaceholder", otp)
    .replace("emailplaceholder", email);
const transport=  nodemailer.createTransport({
  host:"smtp.office365.com",
  port:587,
  auth:{
    user:"bytestechsol@gmail.com",
    pass:"(TRFn,=Zdsp3n5r",
  }
  },);

  
  return new Promise(async (resolve,rejects)=>{
    try{
      const info=await transport.sendMail({
        from:"bytestechsol@gmail.com",
        to:email,
        subject:"Otp Verification",
        html:otpTemplate,
      });
      console.log("Email sent " + info.response);
      resolve();
    }catch(err){
      rejects(err);
    }
  });
}


export { saveBase64Image, generateShortCode, sendEmail,capitalizeFirstLetter };
