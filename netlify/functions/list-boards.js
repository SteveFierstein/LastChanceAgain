const fs = require("fs");
const path = require("path");

exports.handler = async () => {
  try {
    // Correct path: site root + /boards
    const boardsDir = path.join(process.cwd(), "boards");

    const files = fs.readdirSync(boardsDir);

    const bases = new Set();

    files.forEach(file => {
      const lower = file.toLowerCase();
      if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) {
        const base = file.replace(/\.(jpg|jpeg)$/i, "");
        bases.add(base);
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify([...bases])
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};

