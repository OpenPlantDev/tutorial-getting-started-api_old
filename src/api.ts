import express from "express";

export class Api {

  public Start(): void {
    const api = express();

    api.get("/api", (req, res) => {
      return res.send("Hello from the API");

    });

    // Start the server
    const port = process.env.PORT || 4040;

    api.listen(port, () => {
      console.log(`Api is listening on http://localhost:${port}`);
    });
  }
}
