import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { promises as fs } from "fs";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const usersFilePath = "./data/users.ts";

// Helper Function: Read Users
const readUsers = async () => {
  const { userData } = await import(usersFilePath);
  return userData;
};

// Helper Function: Write Users
const writeUsers = async (data: any) => {
  const fileContent = `export const userData = ${JSON.stringify(
    data,
    null,
    2
  )};`;
  await fs.writeFile(usersFilePath, fileContent, "utf-8");
};

// GET /users/:email
app.get("/users/:email", async (req, res) => {
  try {
    const users = await readUsers();
    const user = users.find((u: any) => u.email === req.params.email);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error reading user data", error });
  }
});

// POST /users/:email/weights
app.post("/users/:email/weights", async (req, res) => {
  try {
    const users = await readUsers();
    const userIndex = users.findIndex((u: any) => u.email === req.params.email);

    if (userIndex > -1) {
      const newWeight = {
        weight: req.body.weight,
        timestamp: new Date().toISOString(),
      };
      users[userIndex].measurements.push(newWeight);

      await writeUsers(users);
      res.status(201).json(newWeight);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating user data", error });
  }
});

// DELETE /users/:email/weights/:timestamp
app.delete("/users/:email/weights/:timestamp", async (req, res) => {
  try {
    const users = await readUsers();
    const userIndex = users.findIndex((u: any) => u.email === req.params.email);

    if (userIndex > -1) {
      users[userIndex].measurements = users[userIndex].measurements.filter(
        (m: any) => m.timestamp !== req.params.timestamp
      );

      await writeUsers(users);
      res.status(204).send();
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating user data", error });
  }
});

// PUT /users/:email/weights/:timestamp
app.put("/users/:email/weights/:timestamp", async (req, res) => {
  try {
    const users = await readUsers();
    const userIndex = users.findIndex((u: any) => u.email === req.params.email);

    if (userIndex > -1) {
      const weightIndex = users[userIndex].measurements.findIndex(
        (m: any) => m.timestamp === req.params.timestamp
      );

      if (weightIndex > -1) {
        users[userIndex].measurements[weightIndex] = {
          ...users[userIndex].measurements[weightIndex],
          ...req.body,
        };

        await writeUsers(users);
        res.json(users[userIndex].measurements[weightIndex]);
      } else {
        res.status(404).json({ message: "Weight entry not found" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating user data", error });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

// PUT /users/:email/goal
app.put("/users/:email/goal", async (req, res) => {
  try {
    const users = await readUsers();
    const userIndex = users.findIndex((u: any) => u.email === req.params.email);

    if (userIndex > -1) {
      users[userIndex].goal = req.body.goal;

      await writeUsers(users);
      res.json({ goal: users[userIndex].goal });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating user goal", error });
  }
});
