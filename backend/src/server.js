import app from "./app.js";
import "dotenv/config.js";

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`Server running on the port: http://localhost:${PORT}`);
});
