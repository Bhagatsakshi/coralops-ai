import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function App() {

  const [githubUsers, setGithubUsers] = useState([]);
  const [slackUsers, setSlackUsers] = useState([]);
  const [insights, setInsights] = useState("");
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [query, setQuery] = useState("");
  const [queryResult, setQueryResult] = useState(null);
  const [queryLoading, setQueryLoading] = useState(false);
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    fetchGithubUsers();
    fetchSlackUsers();
    fetchRepositories();
  }, []);



  const fetchGithubUsers = async () => {


    try {

      const response = await axios.get(
        "http://localhost:5000/github-users"
      );

      setGithubUsers(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const fetchSlackUsers = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/slack-users"
      );

      setSlackUsers(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const generateInsights = async () => {

    try {

      setLoadingInsights(true);

      const response = await axios.get(
        "http://localhost:5000/generate-insights"
      );

      setInsights(response.data.insights);

      setLoadingInsights(false);

    } catch (error) {

      console.log(error);

      setLoadingInsights(false);

    }

  };

  const runCoralQuery = async () => {

    try {

      setQueryLoading(true);

      const response = await axios.post(
        "http://localhost:5000/run-query",
        {
          query,
        }
      );

      setQueryResult(response.data);

      setQueryLoading(false);

    } catch (error) {

      console.log(error);

      setQueryLoading(false);

    }

  };

  const fetchRepositories = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/repositories"
      );

      setRepositories(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white px-6 py-10">

      {/* HEADER */}

      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >

        <h1 className="text-6xl font-extrabold text-center mb-4">
          CoralOps AI
        </h1>

        <p className="text-center text-zinc-400 text-lg mb-12">
          Unified Engineering Intelligence Dashboard powered by Coral
        </p>

      </motion.div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-3xl p-6">
          <h3 className="text-zinc-400 text-lg">GitHub Users</h3>
          <p className="text-5xl font-bold text-cyan-400 mt-2">
            {githubUsers.length}
          </p>
        </div>

        <div className="bg-green-500/10 border border-green-500/20 rounded-3xl p-6">
          <h3 className="text-zinc-400 text-lg">Slack Users</h3>
          <p className="text-5xl font-bold text-green-400 mt-2">
            {slackUsers.length}
          </p>
        </div>

        <div className="bg-purple-500/10 border border-purple-500/20 rounded-3xl p-6">
          <h3 className="text-zinc-400 text-lg">Connected Sources</h3>
          <p className="text-5xl font-bold text-purple-400 mt-2">
            2
          </p>
        </div>

      </div>

      {/* MAIN GRID */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* GITHUB */}

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl"
        >

          <h2 className="text-3xl font-bold mb-6 text-cyan-400">
            GitHub Intelligence
          </h2>

          <div className="space-y-4">

            {githubUsers.map((user, index) => (

              <div
                key={index}
                className="bg-black/40 border border-white/5 rounded-2xl p-4 flex items-center justify-between"
              >

                <div className="flex items-center gap-4">

                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="w-14 h-14 rounded-full border border-cyan-400"
                  />

                  <div>

                    <h3 className="text-xl font-semibold">
                      {user.login}
                    </h3>

                    <p className="text-zinc-400">
                      {user.type}
                    </p>

                  </div>

                </div>

                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-cyan-500 hover:bg-cyan-400 transition px-4 py-2 rounded-xl text-black font-semibold"
                >
                  View
                </a>

              </div>

            ))}

          </div>

        </motion.div>

        {/* SLACK */}

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl"
        >

          <h2 className="text-3xl font-bold mb-6 text-green-400">
            Slack Workspace
          </h2>

          <div className="space-y-4">

            {slackUsers.map((user, index) => (

              <div
                key={index}
                className="bg-black/40 border border-white/5 rounded-2xl p-4 flex items-center justify-between"
              >

                <div>

                  <h3 className="text-xl font-semibold">
                    {user.name}
                  </h3>

                  <p className="text-zinc-400">
                    {user.real_name}
                  </p>

                </div>

                <div
                  className={`px-4 py-2 rounded-xl font-semibold ${user.is_bot
                    ? "bg-purple-500/20 text-purple-400"
                    : "bg-green-500/20 text-green-400"
                    }`}
                >
                  {user.is_bot ? "Bot" : "Member"}
                </div>

              </div>

            ))}

          </div>

        </motion.div>

      </div>

      {/* REPOSITORY INTELLIGENCE */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mt-10 backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl"
      >

        <h2 className="text-3xl font-bold mb-6 text-orange-400">
          Repository Intelligence
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {repositories.map((repo, index) => (

            <div
              key={index}
              className="bg-black/40 border border-white/5 rounded-2xl p-5"
            >

              <h3 className="text-xl font-bold mb-3">
                {repo.name}
              </h3>

              <div
                className={`inline-block px-4 py-2 rounded-xl text-sm font-semibold ${(repo.visibility || "public") === "public"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                  }`}
              >
                {repo.visibility || "public"}
              </div>

            </div>

          ))}

        </div>

      </motion.div>

      {/* QUERIES */}

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mt-10 backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl"
      >

        <h2 className="text-3xl font-bold mb-6 text-yellow-400">
          Coral SQL Playground
        </h2>

        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Example: SELECT login, type FROM github.users LIMIT 5;'
          className="w-full h-32 bg-black/40 border border-white/10 rounded-2xl p-4 text-white outline-none resize-none"
        />

        <button
          onClick={runCoralQuery}
          className="mt-4 bg-yellow-500 hover:bg-yellow-400 transition px-6 py-3 rounded-2xl text-black font-bold"
        >
          Run Query
        </button>

        {queryLoading && (

          <div className="mt-6 text-zinc-400 animate-pulse">
            Running Coral query...
          </div>

        )}

        {queryResult && (

          <div className="mt-6 bg-black/40 rounded-2xl p-4 overflow-auto">

            <pre className="text-sm text-zinc-300 whitespace-pre-wrap">
              {JSON.stringify(queryResult, null, 2)}
            </pre>

          </div>

        )}

      </motion.div>

      {/* AI INSIGHTS */}

      <motion.div
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mt-10 backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl"
      >

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-3xl font-bold text-purple-400">
            AI Engineering Insights
          </h2>

          <button
            onClick={generateInsights}
            className="bg-purple-500 hover:bg-purple-400 transition px-6 py-3 rounded-2xl font-semibold"
          >
            Generate Insights
          </button>

        </div>

        {loadingInsights ? (

          <div className="text-zinc-400 text-lg animate-pulse">
            Generating AI insights...
          </div>

        ) : (

          <div className="space-y-4 text-zinc-300 leading-8 text-lg whitespace-pre-wrap">

            {insights || `
CoralOps AI analyzes engineering workspace data using Coral integrations.

Click "Generate Insights" to produce AI-powered operational summaries.
      `}

          </div>

        )}

      </motion.div>

    </div>

  );

}

export default App;