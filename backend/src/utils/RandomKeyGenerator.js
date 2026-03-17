import crypto from "crypto";

const generateRandomKey = () => {
    return crypto.randomBytes(32).toString("hex");
};

console.log(generateRandomKey());
