"use client";

import { useState, useEffect, useRef } from "react";
import {
  Loader2,
  LogIn,
  CheckCircle,
  Clock,
  AlertCircle,
  RefreshCw,
  MessageSquare,
  Send,
} from "lucide-react";

type Request = {
  id: string;
  name: string;
  email: string;
  service: string;
  description: string;
  status: "pending" | "in_progress" | "done";
  created_at: string;
};

type ChatMessage = {
  id: string;
  content: string;
  sender: "visitor" | "admin";
  created_at: string;
};

type ChatSession = {
  id: string;
  created_at: string;
  chat_messages: ChatMessage[];
};

const SERVICE_LABELS: Record<string, string> = {
  whatsapp: "WhatsApp Bot",
  workflows: "Flujos / Workflows",
  chatbot: "Chatbot IA",
  crm: "CRM Integration",
};

const STATUS_CONFIG = {
  pending: {
    label: "Pendiente",
    color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  },
  in_progress: {
    label: "En proceso",
    color: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  },
  done: {
    label: "Completado",
    color: "text-[#6BBF9E] bg-[#6BBF9E]/10 border-[#6BBF9E]/20",
  },
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);
  const [tab, setTab] = useState<"requests" | "chats">("requests");

  // Chat state
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [sendingReply, setSendingReply] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const chatPollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchRequests = async (pwd: string) => {
    setLoading(true);
    setLoginError("");
    try {
      const res = await fetch("/api/admin", {
        headers: { "x-admin-password": pwd },
      });
      if (res.status === 401) {
        setLoginError("Contraseña incorrecta.");
        setLoading(false);
        return;
      }
      const data = await res.json();
      setRequests(data);
      setAuthed(true);
    } catch {
      setLoginError("Error de conexión. Inténtalo de nuevo.");
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    await fetch(`/api/admin/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": password,
      },
      body: JSON.stringify({ status }),
    });
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: status as Request["status"] } : r
      )
    );
    setUpdating(null);
  };

  const fetchChatSessions = async () => {
    try {
      const res = await fetch("/api/chat/sessions", {
        headers: { "x-admin-password": password },
      });
      const data = await res.json();
      if (Array.isArray(data)) setChatSessions(data);
    } catch {
      // ignore
    }
  };

  const sendAdminReply = async (sessionId: string) => {
    if (!replyText.trim()) return;
    setSendingReply(true);
    await fetch(`/api/chat/${sessionId}/reply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": password,
      },
      body: JSON.stringify({ content: replyText }),
    });
    setReplyText("");
    setSendingReply(false);
    await fetchChatSessions();
  };

  // Poll chat sessions when on chats tab
  useEffect(() => {
    if (tab === "chats" && authed) {
      fetchChatSessions();
      chatPollRef.current = setInterval(fetchChatSessions, 4000);
      return () => {
        if (chatPollRef.current) clearInterval(chatPollRef.current);
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, authed]);

  // Scroll to bottom of active chat
  useEffect(() => {
    setTimeout(
      () => chatBottomRef.current?.scrollIntoView({ behavior: "smooth" }),
      50
    );
  }, [activeChat, chatSessions]);

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold text-[#6BBF9E] tracking-[0.18em] uppercase mb-2">
              Admin
            </p>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              avalito panel
            </h1>
            <p className="text-[#6E6E73] text-sm mt-2">
              Gestión de solicitudes de servicios
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchRequests(password);
            }}
            className="flex flex-col gap-4"
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#6E6E73] text-sm focus:outline-none focus:border-[#6BBF9E]/50 transition-colors"
            />
            {loginError && (
              <p className="text-red-400 text-sm">{loginError}</p>
            )}
            <button
              type="submit"
              disabled={loading || !password}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#A8D5C2] to-[#A8C8E8] text-[#1D1D1F] font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <LogIn size={16} />
              )}
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const counts = {
    pending: requests.filter((r) => r.status === "pending").length,
    in_progress: requests.filter((r) => r.status === "in_progress").length,
    done: requests.filter((r) => r.status === "done").length,
  };

  const activeSession = chatSessions.find((s) => s.id === activeChat);
  const sortedMessages = activeSession
    ? [...activeSession.chat_messages].sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )
    : [];

  return (
    <div className="min-h-screen bg-[#0d0d0d] px-4 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-semibold text-[#6BBF9E] tracking-[0.18em] uppercase mb-1">
              Admin
            </p>
            <h1 className="text-2xl font-bold text-white">avalito panel</h1>
          </div>
          <button
            onClick={() =>
              tab === "requests"
                ? fetchRequests(password)
                : fetchChatSessions()
            }
            className="flex items-center gap-2 text-sm text-[#6E6E73] hover:text-white transition-colors"
          >
            <RefreshCw size={14} />
            Actualizar
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-white/5 border border-white/8 rounded-xl p-1 w-fit">
          <button
            onClick={() => setTab("requests")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              tab === "requests"
                ? "bg-white/10 text-white"
                : "text-[#6E6E73] hover:text-white"
            }`}
          >
            Solicitudes
          </button>
          <button
            onClick={() => setTab("chats")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              tab === "chats"
                ? "bg-white/10 text-white"
                : "text-[#6E6E73] hover:text-white"
            }`}
          >
            <MessageSquare size={14} />
            Chats
            {chatSessions.length > 0 && (
              <span className="text-xs bg-[#6BBF9E]/20 text-[#6BBF9E] px-1.5 py-0.5 rounded-full">
                {chatSessions.length}
              </span>
            )}
          </button>
        </div>

        {/* ── REQUESTS TAB ── */}
        {tab === "requests" && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white/5 border border-white/8 rounded-2xl p-5 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Clock size={14} className="text-yellow-400" />
                  <span className="text-xs text-[#6E6E73] uppercase tracking-wide">
                    Pendientes
                  </span>
                </div>
                <p className="text-3xl font-bold text-white">{counts.pending}</p>
              </div>
              <div className="bg-white/5 border border-white/8 rounded-2xl p-5 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <AlertCircle size={14} className="text-blue-400" />
                  <span className="text-xs text-[#6E6E73] uppercase tracking-wide">
                    En proceso
                  </span>
                </div>
                <p className="text-3xl font-bold text-white">
                  {counts.in_progress}
                </p>
              </div>
              <div className="bg-white/5 border border-white/8 rounded-2xl p-5 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <CheckCircle size={14} className="text-[#6BBF9E]" />
                  <span className="text-xs text-[#6E6E73] uppercase tracking-wide">
                    Completados
                  </span>
                </div>
                <p className="text-3xl font-bold text-white">{counts.done}</p>
              </div>
            </div>

            {/* Requests list */}
            {requests.length === 0 ? (
              <div className="text-center py-20 text-[#6E6E73]">
                <p className="text-lg">No hay solicitudes todavía.</p>
                <p className="text-sm mt-1">
                  Cuando alguien use el formulario aparecerán aquí.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {requests.map((req) => (
                  <div
                    key={req.id}
                    className="bg-white/5 border border-white/8 rounded-2xl p-6"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-white">
                            {req.name}
                          </h3>
                          <span
                            className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${
                              STATUS_CONFIG[req.status].color
                            }`}
                          >
                            {STATUS_CONFIG[req.status].label}
                          </span>
                        </div>
                        <p className="text-[#6E6E73] text-sm mb-1">
                          {req.email}
                        </p>
                        <p className="text-xs text-[#5BA8D4] font-medium mb-3">
                          {SERVICE_LABELS[req.service] ?? req.service}
                        </p>
                        <p className="text-[#8E8E93] text-sm leading-relaxed">
                          {req.description}
                        </p>
                        <p className="text-xs text-[#6E6E73] mt-3">
                          {new Date(req.created_at).toLocaleDateString(
                            "es-ES",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </p>
                      </div>

                      <div className="flex flex-col gap-2 min-w-[140px]">
                        {(
                          ["pending", "in_progress", "done"] as const
                        ).map((s) => (
                          <button
                            key={s}
                            onClick={() => updateStatus(req.id, s)}
                            disabled={
                              req.status === s || updating === req.id
                            }
                            className={`text-xs font-medium px-3 py-2 rounded-lg border transition-all duration-200 ${
                              req.status === s
                                ? STATUS_CONFIG[s].color
                                : "border-white/10 text-[#6E6E73] hover:border-white/20 hover:text-white"
                            } disabled:opacity-50`}
                          >
                            {updating === req.id
                              ? "..."
                              : STATUS_CONFIG[s].label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── CHATS TAB ── */}
        {tab === "chats" && (
          <div className="flex gap-5 h-[600px]">
            {/* Sessions list */}
            <div className="w-64 flex-shrink-0 flex flex-col gap-2 overflow-y-auto">
              {chatSessions.length === 0 ? (
                <div className="text-center py-16 text-[#6E6E73]">
                  <MessageSquare size={28} className="mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No hay chats todavía.</p>
                </div>
              ) : (
                chatSessions.map((session) => {
                  const msgs = [...session.chat_messages].sort(
                    (a, b) =>
                      new Date(a.created_at).getTime() -
                      new Date(b.created_at).getTime()
                  );
                  const last = msgs[msgs.length - 1];
                  return (
                    <button
                      key={session.id}
                      onClick={() => setActiveChat(session.id)}
                      className={`text-left px-4 py-3 rounded-xl border transition-all duration-200 ${
                        activeChat === session.id
                          ? "bg-white/10 border-white/20"
                          : "bg-white/5 border-white/8 hover:bg-white/8"
                      }`}
                    >
                      <p className="text-xs text-[#6BBF9E] font-mono mb-1">
                        #{session.id.slice(0, 8)}
                      </p>
                      {last ? (
                        <p className="text-xs text-[#8E8E93] truncate">
                          <span className="text-[#6E6E73]">
                            {last.sender === "admin" ? "Tú: " : ""}
                          </span>
                          {last.content}
                        </p>
                      ) : (
                        <p className="text-xs text-[#6E6E73] italic">
                          Sin mensajes
                        </p>
                      )}
                      <p className="text-xs text-[#6E6E73] mt-1">
                        {new Date(session.created_at).toLocaleDateString(
                          "es-ES",
                          { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }
                        )}
                      </p>
                    </button>
                  );
                })
              )}
            </div>

            {/* Conversation */}
            <div className="flex-1 flex flex-col bg-white/5 border border-white/8 rounded-2xl overflow-hidden">
              {!activeChat ? (
                <div className="flex-1 flex items-center justify-center text-[#6E6E73]">
                  <p className="text-sm">Selecciona un chat para ver la conversación.</p>
                </div>
              ) : (
                <>
                  {/* Chat header */}
                  <div className="px-5 py-3.5 border-b border-white/8 flex-shrink-0">
                    <p className="text-xs text-[#6BBF9E] font-mono">
                      Sesión #{activeChat.slice(0, 8)}
                    </p>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
                    {sortedMessages.length === 0 ? (
                      <p className="text-xs text-[#6E6E73] text-center mt-8">
                        Sin mensajes en esta sesión.
                      </p>
                    ) : (
                      sortedMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${
                            msg.sender === "admin"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[72%] px-3.5 py-2 text-sm leading-relaxed ${
                              msg.sender === "admin"
                                ? "text-[#1D1D1F]"
                                : "bg-white/10 text-white"
                            }`}
                            style={{
                              borderRadius: 10,
                              ...(msg.sender === "admin" && {
                                background:
                                  "linear-gradient(135deg, #A8D5C2, #A8C8E8)",
                              }),
                            }}
                          >
                            {msg.content}
                          </div>
                        </div>
                      ))
                    )}
                    <div ref={chatBottomRef} />
                  </div>

                  {/* Reply input */}
                  <div className="px-4 py-3 border-t border-white/8 flex items-center gap-2 flex-shrink-0">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          sendAdminReply(activeChat);
                        }
                      }}
                      placeholder="Responder..."
                      className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-white placeholder-[#6E6E73] text-sm focus:outline-none focus:border-[#6BBF9E]/50 transition-colors"
                    />
                    <button
                      onClick={() => sendAdminReply(activeChat)}
                      disabled={!replyText.trim() || sendingReply}
                      className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center disabled:opacity-40 transition-opacity"
                      style={{
                        background:
                          "linear-gradient(135deg, #A8D5C2, #A8C8E8)",
                      }}
                    >
                      {sendingReply ? (
                        <Loader2 size={14} className="text-[#1D1D1F] animate-spin" />
                      ) : (
                        <Send size={14} className="text-[#1D1D1F]" />
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
