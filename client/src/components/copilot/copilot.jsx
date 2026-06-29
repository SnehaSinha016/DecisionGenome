import { useState } from "react";
import {
  Send,
  Bot,
  User,
  Loader2,
  Sparkles,
} from "lucide-react";

import { askCopilot } from "../../services/copilotService";

export default function Copilot({ setHighlightedNodes }) {

  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content:
        "Hello! I'm DecisionGenome Copilot.\n\nAsk me anything about your organization's decisions, departments, stakeholders, risks or strategy.",
      intent: null,
      context: null,
      timestamp: new Date().toISOString(),
    },
  ]);

  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {

    if (!question.trim()) return;

    const currentQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        role: "user",
        content: currentQuestion,
        timestamp: new Date().toISOString(),
      },
    ]);

    setQuestion("");

    setLoading(true);

    try {

      const res = await askCopilot(currentQuestion);

      setHighlightedNodes(
        res.graphActions?.highlightNodes || []
      );

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: res.answer,
          intent: res.intent,
          context: res.context,
          timestamp: new Date().toISOString(),
        },
      ]);

    } catch (err) {

      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content:
            "Sorry, something went wrong while contacting the AI Copilot.",
          timestamp: new Date().toISOString(),
        },
      ]);

    } finally {

      setLoading(false);

    }

  };

  const handleKeyDown = (e) => {

    if (e.key === "Enter" && !e.shiftKey) {

      e.preventDefault();

      handleAsk();

    }

  };
  return (

<div className="flex flex-col h-full rounded-3xl border border-gray-200 bg-white shadow-xl overflow-hidden">

    {/* Header */}

    <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">

        <Sparkles size={22} />

        <div>

            <h2 className="text-lg font-semibold">

                Decision Copilot

            </h2>

            <p className="text-xs text-indigo-100">

                Enterprise Decision Intelligence Assistant

            </p>

        </div>

    </div>

    {/* Suggested Prompts */}

    <div className="px-5 py-3 border-b flex flex-wrap gap-2">

        {[
            "Show high-risk decisions",
            "Summarize the organization",
            "Which departments collaborate the most?",
            "Recommend the next strategic action"
        ].map(prompt => (

            <button

                key={prompt}

                onClick={() => setQuestion(prompt)}

                className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 hover:bg-indigo-100 transition"

            >

                {prompt}

            </button>

        ))}

    </div>

    {/* Messages */}

      <div className="flex-1 overflow-y-auto p-5 space-y-5">

      {messages.map((msg) => (

  <div
    key={msg.id}
    className={`flex ${
      msg.role === "user"
        ? "justify-end"
        : "justify-start"
    }`}
  >

    <div
      className={`flex gap-3 max-w-[90%] ${
        msg.role === "user"
          ? "flex-row-reverse"
          : ""
      }`}
    >

      {/* Avatar */}

      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
          msg.role === "assistant"
            ? "bg-indigo-100 text-indigo-700"
            : "bg-blue-600 text-white"
        }`}
      >

        {msg.role === "assistant"
          ? <Bot size={18}/>
          : <User size={18}/>}

      </div>

      {/* Message */}

      <div
        className={`rounded-2xl px-4 py-3 whitespace-pre-wrap leading-7 shadow-sm ${
          msg.role === "assistant"
            ? "bg-gray-100"
            : "bg-blue-600 text-white"
        }`}
      >

        <p>{msg.content}</p>

        {/* Intent */}

        {msg.intent && (

          <div className="mt-4 inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">

            Intent: {msg.intent}

          </div>

        )}

        {/* Enterprise Context */}

        {msg.context && (

          <div className="mt-4 rounded-xl border bg-white p-4 text-gray-700">

            <h4 className="font-semibold text-sm mb-3">

              Enterprise Context

            </h4>

            <div className="grid grid-cols-2 gap-3 text-sm">

              <div>

                <span className="font-semibold">

                  Decisions

                </span>

                <p>

                  {msg.context.decisions?.length || 0}

                </p>

              </div>

              <div>

                <span className="font-semibold">

                  Departments

                </span>

                <p>

                  {msg.context.departments?.length || 0}

                </p>

              </div>

              <div>

                <span className="font-semibold">

                  Risks

                </span>

                <p>

                  {msg.context.risks?.length || 0}

                </p>

              </div>

              <div>

                <span className="font-semibold">

                  Stakeholders

                </span>

                <p>

                  {msg.context.stakeholders?.length || 0}

                </p>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>

  </div>

))}

       {/* Loading */}

{loading && (

  <div className="flex gap-3">

    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">

      <Bot
        size={18}
        className="text-indigo-700"
      />

    </div>

    <div className="rounded-2xl bg-gray-100 px-5 py-4 flex items-center gap-2 shadow-sm">

      <Loader2
        className="animate-spin text-indigo-600"
        size={18}
      />

      <span className="text-gray-600">

        Thinking...

      </span>

    </div>

  </div>

)}

</div>

{/* Input */}

<div className="border-t bg-white p-4">

    <div className="flex items-end gap-3">

        <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Ask anything about your organization..."
            className="
                flex-1
                h-12
                resize-none
                rounded-xl
                border
                border-gray-300
                px-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-indigo-500
            "
        />

        <button
            onClick={handleAsk}
            disabled={loading}
            className="
                h-12
                w-12
                rounded-xl
                bg-indigo-600
                hover:bg-indigo-700
                disabled:bg-gray-400
                flex
                items-center
                justify-center
                transition
            "
        >

            <Send size={18} />

        </button>

    </div>

</div>
</div>

);
}