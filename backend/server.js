require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

app.get("/", (req, res) => {
    res.send("CoralOps AI Backend Running");
});

app.get("/github-users", (req, res) => {

    const command =
        `"${process.env.CORAL_PATH}" sql --format json "SELECT login, avatar_url, html_url, type FROM github.users LIMIT 10;"`;

    exec(command, (error, stdout, stderr) => {

        if (error) {
            return res.status(500).json({
                error: error.message,
            });
        }

        if (stderr) {
            return res.status(500).json({
                error: stderr,
            });
        }

        try {

            const parsedData = JSON.parse(stdout);

            res.json(parsedData);

        } catch (parseError) {

            res.status(500).json({
                error: "Failed to parse Coral JSON output",
            });

        }

    });

});

app.get("/slack-users", (req, res) => {

    const command =
        `"${process.env.CORAL_PATH}" sql --format json "SELECT * FROM slack.users LIMIT 10;"`;

    exec(command, (error, stdout, stderr) => {

        if (error) {
            return res.status(500).json({
                error: error.message,
            });
        }

        if (stderr) {
            return res.status(500).json({
                error: stderr,
            });
        }

        try {

            const parsedData = JSON.parse(stdout);

            res.json(parsedData);

        } catch (parseError) {

            res.status(500).json({
                error: "Failed to parse Coral JSON output",
            });

        }

    });

});

app.get("/generate-insights", async (req, res) => {

    try {

        const githubCommand =
            `"${process.env.CORAL_PATH}" sql --format json "SELECT login, type FROM github.users LIMIT 10;"`;

        const slackCommand =
            `"${process.env.CORAL_PATH}" sql --format json "SELECT name, is_bot, is_admin FROM slack.users LIMIT 10;"`;

        exec(githubCommand, async (githubError, githubStdout) => {

            if (githubError) {

                return res.status(500).json({
                    error: githubError.message,
                });

            }

            exec(slackCommand, async (slackError, slackStdout) => {

                if (slackError) {

                    return res.status(500).json({
                        error: slackError.message,
                    });

                }

                const githubData = JSON.parse(githubStdout);
                const slackData = JSON.parse(slackStdout);

                const githubUsers = githubData.length;

                const slackUsers = slackData.filter(
                    user => !user.is_bot
                ).length;

                const bots = slackData.filter(
                    user => user.is_bot
                ).length;

                const admins = slackData.filter(
                    user => user.is_admin
                ).length;

                const insights = `
🚀 Engineering Workspace Summary

• Connected platforms: GitHub + Slack
• Total GitHub users analyzed: ${githubUsers}
• Active Slack members: ${slackUsers}
• Bot integrations detected: ${bots}
• Admin accounts detected: ${admins}

🔍 Operational Insights

• Multi-source engineering visibility successfully established using Coral SQL integrations.
• Workspace collaboration systems are active and properly connected.
• Slack bot integrations indicate automation capabilities inside the workspace.
• GitHub contributor visibility enables engineering intelligence analysis.

💡 Recommendations

• Add workflow analytics and repository monitoring.
• Integrate AI anomaly detection for operational insights.
• Expand Coral integrations with Jira, Sentry, or Datadog.
• Enable real-time engineering observability dashboards.
`;

                res.json({
                    insights,
                });

            });

        });

    } catch (error) {

        res.status(500).json({
            error: error.message,
        });

    }

});

app.post("/run-query", (req, res) => {

    try {

        const { query } = req.body;

        if (!query) {

            return res.status(400).json({
                error: "SQL query required",
            });

        }

        const command =
            `"${process.env.CORAL_PATH}" sql --format json "${query}"`;

        exec(command, (error, stdout, stderr) => {

            if (error) {

                return res.status(500).json({
                    error: error.message,
                });

            }

            if (stderr) {

                return res.status(500).json({
                    error: stderr,
                });

            }

            try {

                const parsedData = JSON.parse(stdout);

                res.json(parsedData);

            } catch {

                res.json({
                    raw: stdout,
                });

            }

        });

    } catch (error) {

        res.status(500).json({
            error: error.message,
        });

    }

});

app.get("/repositories", (req, res) => {

  const command =
    `"${process.env.CORAL_PATH}" sql --format json "SELECT name, visibility FROM github.repositories LIMIT 6;"`;

  exec(command, (error, stdout, stderr) => {

    if (error) {

      return res.status(500).json({
        error: error.message,
      });

    }

    if (stderr) {

      return res.status(500).json({
        error: stderr,
      });

    }

    try {

      const parsedData = JSON.parse(stdout);

      res.json(parsedData);

    } catch {

      res.status(500).json({
        error: "Failed to parse JSON",
      });

    }

  });

});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});