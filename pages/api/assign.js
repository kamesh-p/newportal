import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const client = await clientPromise;
      const db = client.db("projects");

      const { selectedTrainee, id } = req.body;

      const result = await db
        .collection("details")
        .updateOne(
          { "projects.id": id },
          { $set: { "projects.$.assist": selectedTrainee } }
        );

      if (result.modifiedCount === 1) {
        res.status(200).json({ message: "Assist field updated successfully!" });
      } else {
        res.status(400).json({ error: "Failed to update assist field." });
      }
    } catch (error) {
      console.error("Error updating assist field:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
