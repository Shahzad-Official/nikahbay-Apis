import path from "path";
import fs from "fs";
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
export { saveBase64Image, generateShortCode };
