import { config } from "./src/config";
import app from "./src/app";
import { db } from "./src/db/connection"; 

(async () => {
  try {
    await db.selectFrom("users").select("id").limit(1).executeTakeFirst();

    console.log("DATABASE CONNECTED SUCCESSFULLY");

    app.listen(config.PORT, () => {
      console.log(`Server is Listening on http://localhost:${config.PORT}`);
    });
  } catch (error) {
    console.error("ERROR CONNECTING TO DATABASE:", error);
    throw error; 
  }
})();
