import React, { useState, useEffect } from "react";
import "./App.css";
import { QUESTIONS, ALL_SUBJECTS } from "./data/questionBank";

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {	
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}

function getRandomQuestions(subject, count) {
  const bank = QUESTIONS[subject] || [];
  const shuffled = shuffleArray(bank);
  const picked = shuffled.slice(0, Math.min(count, shuffled.length));
  return picked.map((q) => ({ ...q, subject }));
}

function App() {
  const [view, setView] = useState("home");
  const [installPrompt, setInstallPrompt] = useState(null);
  const [countdown, setCountdown] = useState(10);
  const [canContinue, setCanContinue] = useState(false);

  const [selectedSubject, setSelectedSubject] = useState("English");
  const [cbtQuestions, setCbtQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showResumePrompt, setShowResumePrompt] = useState(false);
  const [isJambMode, setIsJambMode] = useState(false);
  const [jambSubjects, setJambSubjects] = useState(["English"]);
  const [showJambPicker, setShowJambPicker] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const unansweredCount = cbtQuestions.length - answeredCount;

  useEffect(() => {
    const isInstalled =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;
    if (isInstalled) {
      setView("home");
    } else {
      setView("download");
    }
  }, []);

  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
  }, []);

  useEffect(() => {
    const handleInstalled = () => setView("home");
    window.addEventListener("appinstalled", handleInstalled);
    return () => window.removeEventListener("appinstalled", handleInstalled);
  }, []);

  useEffect(() => {
    if (view !== "download") return;
    setCountdown(10);
    setCanContinue(false);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanContinue(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [view]);

  useEffect(() => {
    const saved = localStorage.getItem("cbt_history");
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const savedAnswers = localStorage.getItem("cbt_answers");
    const savedSubject = localStorage.getItem("cbt_subject");
    if (savedAnswers && savedSubject) {
      const parsed = JSON.parse(savedAnswers);
      if (Object.keys(parsed).length > 0) {
        const hasProgress = localStorage.getItem("cbt_in_progress") === "true";
        if (hasProgress) {
          setShowResumePrompt(true);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (view === "cbt") {
      localStorage.setItem("cbt_answers", JSON.stringify(answers));
      localStorage.setItem("cbt_question", currentQuestion);
      localStorage.setItem("cbt_time", timeLeft);
      localStorage.setItem("cbt_subject", selectedSubject);
      localStorage.setItem("cbt_questions", JSON.stringify(cbtQuestions));
      localStorage.setItem("cbt_jamb", isJambMode ? "true" : "false");
      localStorage.setItem("cbt_jamb_subjects", JSON.stringify(jambSubjects));
      localStorage.setItem("cbt_in_progress", "true");
    }
  }, [answers, currentQuestion, timeLeft, view, selectedSubject, cbtQuestions, isJambMode, jambSubjects]);

  useEffect(() => {
    if (view !== "cbt") return;
    if (timeLeft <= 0) {
      submitExam();
      return;
    }
    const t = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(t);
  }, [view, timeLeft]);

  const handleInstall = async () => {
    if (!installPrompt) {
      alert("To install ExamPilot, open Chrome menu (⋮) and tap Install App or Add to Home Screen.");
      return;
    }
    installPrompt.prompt();
    const result = await installPrompt.userChoice;
    if (result.outcome === "accepted") {
      console.log("User installed ExamPilot");
      setView("home");
    }
    setInstallPrompt(null);
  };

  const handleContinue = () => setView("home");

  const clearSavedCbt = () => {
    localStorage.removeItem("cbt_answers");
    localStorage.removeItem("cbt_question");
    localStorage.removeItem("cbt_time");
    localStorage.removeItem("cbt_subject");
    localStorage.removeItem("cbt_questions");
    localStorage.removeItem("cbt_jamb");
    localStorage.removeItem("cbt_jamb_subjects");
    localStorage.removeItem("cbt_in_progress");
    setShowResumePrompt(false);
  };

  const startExam = (subject) => {
    clearSavedCbt();
    setIsJambMode(false);
    setSelectedSubject(subject);
    const questions = getRandomQuestions(subject, 40);
    setCbtQuestions(questions);
    setCurrentQuestion(0);
    setAnswers({});
    setTimeLeft(1800);
    setShowSubmitModal(false);
    setView("cbt");
  };

  const toggleJambSubject = (subject) => {
    if (subject === "English") return;
    if (jambSubjects.includes(subject)) {
      setJambSubjects(jambSubjects.filter((s) => s !== subject));
    } else {
      if (jambSubjects.length >= 4) {
        alert("JAMB allows only 4 subjects. Remove one first.");
        return;
      }
      setJambSubjects([...jambSubjects, subject]);
    }
  };

  const startJambExam = () => {
    if (jambSubjects.length !== 4) {
      alert("Please select exactly 4 subjects for JAMB. English is compulsory.");
      return;
    }
    clearSavedCbt();
    setIsJambMode(true);
    setSelectedSubject("JAMB - " + jambSubjects.join(", "));
    let combined = [];
    jambSubjects.forEach((subj) => {
      const count = subj === "English" ? 60 : 40;
      combined = [...combined, ...getRandomQuestions(subj, count)];
    });
    combined = shuffleArray(combined);
    setCbtQuestions(combined);
    setCurrentQuestion(0);
    setAnswers({});
    setTimeLeft(10800);
    setShowSubmitModal(false);
    setShowJambPicker(false);
    setView("cbt");
  };

  const resumeCbt = () => {
    const savedAnswers = JSON.parse(localStorage.getItem("cbt_answers") || "{}");
    const savedQuestion = parseInt(localStorage.getItem("cbt_question") || "0");
    const savedTime = parseInt(localStorage.getItem("cbt_time") || "300");
    const savedSubject = localStorage.getItem("cbt_subject") || "English";
    const savedQuestions = JSON.parse(localStorage.getItem("cbt_questions") || "[]");
    const savedJamb = localStorage.getItem("cbt_jamb") === "true";
    const savedJambSubjects = JSON.parse(localStorage.getItem("cbt_jamb_subjects") || '["English"]');
    setSelectedSubject(savedSubject);
    setIsJambMode(savedJamb);
    setJambSubjects(savedJambSubjects);
    setCbtQuestions(savedQuestions.length > 0 ? savedQuestions : QUESTIONS[savedSubject] || []);
    setAnswers(savedAnswers);
    setCurrentQuestion(savedQuestion);
    setTimeLeft(savedTime);
    setShowSubmitModal(false);
    setShowResumePrompt(false);
    setView("cbt");
  };

  const selectAnswer = (optionIndex) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: optionIndex }));
  };

  const submitExam = () => {
    let s = 0;
    cbtQuestions.forEach((q, i) => {
      if (answers[i] === q.answer) s++;
    });
    setScore(s);
    const percentage = Math.round((s / cbtQuestions.length) * 100);
    const jambScore = isJambMode ? Math.round((s / cbtQuestions.length) * 400) : null;
    const newHistory = [
      {
        subject: selectedSubject,
        score: s,
        total: cbtQuestions.length,
        percentage: percentage,
        jambScore: jambScore,
        date: new Date().toLocaleString(),
      },
      ...history,
    ];
    setHistory(newHistory);
    localStorage.setItem("cbt_history", JSON.stringify(newHistory));
    clearSavedCbt();
    setView("result");
  };

  const formatTime = (sec) => {
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    const seconds = sec % 60;
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  if (view === "download") {
    return (
      <div style={{ minHeight: "100vh", background: "#0B2C4A", color: "white", textAlign: "center", padding: "30px 20px", fontFamily: "Arial" }}>
        <div style={{ fontSize: "60px" }}>🎓</div>
        <h1 style={{ fontSize: "28px", margin: "10px 0" }}>Download ExamPilot Free JAMB CBT App</h1>
        <p style={{ color: "#FFC107", fontWeight: "bold", fontSize: "16px" }}>Practice JAMB, WAEC and School Exams. Play Games. Pass with Confidence.</p>
        <div style={{ background: "white", color: "#0B2C4A", borderRadius: "15px", padding: "20px", margin: "20px 0", textAlign: "left" }}>
          <p style={{ margin: "5px 0" }}>✅ Free Forever</p>
          <p style={{ margin: "5px 0" }}>📴 Works Offline</p>
          <p style={{ margin: "5px 0" }}>📚 100+ Questions</p>
          <p style={{ margin: "5px 0" }}>🎮 Play Games and Learn</p>
          <p style={{ margin: "5px 0" }}>⚡ Fast and Light - Works on any phone</p>
        </div>
        <button onClick={handleInstall} style={{ background: "#FFC107", color: "#0B2C4A", border: "none", padding: "16px", borderRadius: "12px", fontWeight: "bold", fontSize: "17px", width: "100%", cursor: "pointer" }}>📲 Install ExamPilot App</button>
        <p style={{ fontSize: "13px", color: "#ccc", marginTop: "12px" }}>Install ExamPilot for offline practice and faster access.</p>
        <p style={{ fontSize: "13px", color: "#ccc", marginTop: "4px" }}>{installPrompt ? "Tap the button above to install ExamPilot" : "Tap ⋮ in Chrome → Install App or Add to Home Screen"}</p>
        <p style={{ color: "#FFC107", fontWeight: "bold" }}>⭐⭐⭐⭐⭐ 4.9 • Loved by students in Gombe & Nigeria</p>
        <div style={{ marginTop: "25px" }}>
          {canContinue ? (
            <button onClick={handleContinue} style={{ background: "white", color: "#0B2C4A", border: "none", padding: "14px", borderRadius: "10px", fontWeight: "bold", fontSize: "15px", width: "100%", cursor: "pointer" }}>Continue on Website →</button>
          ) : (
            <p style={{ background: "rgba(255,255,255,0.15)", padding: "12px", borderRadius: "10px" }}>Continue in {countdown} seconds...</p>
          )}
          <p style={{ fontSize: "12px", color: "#aaa", marginTop: "8px" }}>For people who do not want to install yet</p>
        </div>
        <div style={{ marginTop: "30px", fontSize: "12px", color: "#ccc", lineHeight: "1.8" }}>
          <p>Built by Eleazar Alhaji Maaji | ellbezalel9@gmail.com</p>
          <p>Privacy Policy | Terms and Services | Contact</p>
        </div>
      </div>
    );
  }

  if (view === "cbt") {
    const currentQ = cbtQuestions[currentQuestion];
    if (!currentQ) {
      return (
        <div style={{ minHeight: "100vh", background: "#F5F7FA", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "Arial" }}>
          <p style={{ color: "#0B2C4A", fontWeight: "bold" }}>Loading CBT...</p>
        </div>
      );
    }
    return (
      <div style={{ minHeight: "100vh", background: "#F5F7FA", fontFamily: "Arial", padding: "15px", paddingBottom: "30px" }}>
        <div style={{ background: "#0B2C4A", color: "white", padding: "15px", borderRadius: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <b>{isJambMode ? "JAMB CBT" : selectedSubject + " CBT"}</b>
            <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#FFC107" }}>Question {currentQuestion + 1} of {cbtQuestions.length} {isJambMode ? "• " + currentQ.subject : ""}</p>
          </div>
          <div style={{ background: timeLeft < 60 ? "#EF4444" : "#FFC107", color: timeLeft < 60 ? "white" : "#0B2C4A", padding: "8px 12px", borderRadius: "20px", fontWeight: "bold" }}>⏰ {formatTime(timeLeft)}</div>
        </div>

        <div style={{ background: "white", padding: "12px", borderRadius: "12px", marginTop: "15px", boxShadow: "0 1px 5px rgba(0,0,0,0.05)" }}>
          <p style={{ fontWeight: "bold", color: "#0B2C4A", fontSize: "13px", marginBottom: "8px", textAlign: "center" }}>Question Navigator</p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginBottom: "5px" }}>
            {cbtQuestions.map((_, index) => {
              const answered = answers[index] !== undefined;
              const current = index === currentQuestion;
              return (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  style={{
                    width: "42px",
                    height: "42px",
                    margin: "4px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    fontWeight: "bold",
                    background: current ? "#FFC107" : answered ? "#22C55E" : "#FFFFFF",
                    color: current || answered ? "white" : "#0B2C4A",
                    cursor: "pointer"
                  }}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", fontSize: "11px", color: "#666" }}>
            <span>🟡 Current</span><span>🟢 Answered</span><span>⚪ Unanswered</span>
          </div>
        </div>

        <div style={{ background: "white", padding: "20px", borderRadius: "12px", marginTop: "15px", boxShadow: "0 1px 5px rgba(0,0,0,0.05)" }}>
          {isJambMode && (
            <span style={{ background: "#0B2C4A", color: "white", padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "bold" }}>{currentQ.subject}</span>
          )}
          <h3 style={{ color: "#0B2C4A", lineHeight: "1.5", marginTop: "10px" }}>{currentQ.q}</h3>
          <div style={{ marginTop: "15px" }}>
            {currentQ.options.map((opt, i) => (
              <div
                key={i}
                onClick={() => selectAnswer(i)}
                style={{
                  padding: "14px",
                  borderRadius: "10px",
                  marginBottom: "10px",
                  cursor: "pointer",
                  border: answers[currentQuestion] === i ? "2px solid #0B2C4A" : "1px solid #ddd",
                  background: answers[currentQuestion] === i ? "#FFF7CC" : "white",
                  fontWeight: answers[currentQuestion] === i ? "bold" : "normal",
                  color: "#0B2C4A"
                }}
              >
                {String.fromCharCode(65 + i)}. {opt}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "1px solid #0B2C4A", background: "white", color: "#0B2C4A", fontWeight: "bold", cursor: "pointer", opacity: currentQuestion === 0 ? 0.5 : 1 }}
            >
              ← Previous
            </button>
            {currentQuestion < cbtQuestions.length - 1 ? (
              <button onClick={() => setCurrentQuestion(currentQuestion + 1)} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "none", background: "#0B2C4A", color: "white", fontWeight: "bold", cursor: "pointer" }}>Next →</button>
            ) : (
              <button onClick={() => setShowSubmitModal(true)} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "none", background: "#22C55E", color: "white", fontWeight: "bold", cursor: "pointer" }}>Submit Exam</button>
            )}
          </div>
          <button onClick={() => setShowSubmitModal(true)} style={{ width: "100%", marginTop: "12px", padding: "12px", borderRadius: "10px", border: "none", background: "#FFC107", color: "#0B2C4A", fontWeight: "bold", cursor: "pointer" }}>Submit Exam</button>
        </div>

        {showSubmitModal && (
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999, padding: "15px" }}>
            <div style={{ background: "white", padding: "24px", borderRadius: "16px", width: "90%", maxWidth: "400px", textAlign: "center" }}>
              <h2 style={{ color: "#0B2C4A" }}>Submit Exam?</h2>
              <p style={{ color: "#666", marginTop: "8px", lineHeight: "1.5" }}>Are you sure you want to submit your CBT?</p>
              <div style={{ background: "#F5F7FA", padding: "14px", borderRadius: "12px", margin: "16px 0", textAlign: "left" }}>
                <p style={{ fontWeight: "bold", color: "#0B2C4A" }}>✅ Answered: {answeredCount}</p>
                <p style={{ fontWeight: "bold", color: "#0B2C4A", marginTop: "6px" }}>❓ Unanswered: {unansweredCount}</p>
              </div>
              {unansweredCount > 0 ? (
                <p style={{ color: "#EF4444", fontWeight: "bold", fontSize: "13px", marginBottom: "14px" }}>⚠️ You still have {unansweredCount} unanswered questions.</p>
              ) : (
                <p style={{ color: "#22C55E", fontWeight: "bold", fontSize: "13px", marginBottom: "14px" }}>✅ All questions answered.</p>
              )}
              <button onClick={() => setShowSubmitModal(false)} style={{ width: "100%", padding: "13px", borderRadius: "10px", border: "1px solid #0B2C4A", background: "white", color: "#0B2C4A", fontWeight: "bold", cursor: "pointer", marginBottom: "10px" }}>Continue Exam</button>
              <button onClick={() => { setShowSubmitModal(false); submitExam(); }} style={{ width: "100%", padding: "13px", borderRadius: "10px", border: "none", background: "#22C55E", color: "white", fontWeight: "bold", cursor: "pointer" }}>Submit Now</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (view === "result") {
    const total = cbtQuestions.length;
    const percent = total > 0 ? Math.round((score / total) * 100) : 0;
    const failed = total - score;
    const jambScore = isJambMode ? Math.round((score / total) * 400) : null;
    return (
      <div style={{ minHeight: "100vh", background: "#F5F7FA", fontFamily: "Arial", padding: "20px", textAlign: "center" }}>
        <div style={{ background: "white", padding: "25px", borderRadius: "16px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
          <div style={{ fontSize: "50px" }}>{percent >= 50 ? "🎉" : "💪"}</div>
          <h2 style={{ color: "#0B2C4A" }}>{isJambMode ? "JAMB Result" : selectedSubject + " Result"}</h2>
          {isJambMode ? (
            <div>
              <h1 style={{ fontSize: "48px", color: "#0B2C4A", margin: "10px 0" }}>{jambScore} / 400</h1>
              <p style={{ color: "#666", fontSize: "13px" }}>{score} correct out of {total} ({percent}%)</p>
            </div>
          ) : (
            <h1 style={{ fontSize: "48px", color: "#0B2C4A", margin: "10px 0" }}>{score} / {total}</h1>
          )}
          <p style={{ fontWeight: "bold", color: percent >= 50 ? "#22C55E" : "#EF4444" }}>{percent}% {percent >= 50 ? " - Excellent! Keep it up" : " - Keep practicing, you can do better"}</p>
          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <div style={{ flex: 1, background: "#E8FDF0", padding: "12px", borderRadius: "10px" }}><b style={{ color: "#22C55E" }}>✅ Correct</b><p>{score}</p></div>
            <div style={{ flex: 1, background: "#FDECEC", padding: "12px", borderRadius: "10px" }}><b style={{ color: "#EF4444" }}>❌ Wrong</b><p>{failed}</p></div>
            <div style={{ flex: 1, background: "#FFF7CC", padding: "12px", borderRadius: "10px" }}><b style={{ color: "#0B2C4A" }}>❓ Unanswered</b><p>{unansweredCount}</p></div>
          </div>
          {isJambMode && (
            <div style={{ marginTop: "20px", textAlign: "left", background: "#F5F7FA", padding: "14px", borderRadius: "12px" }}>
              <h3 style={{ color: "#0B2C4A", fontSize: "14px" }}>Score by Subject</h3>
              {jambSubjects.map((subj) => {
                const subjQs = cbtQuestions.filter((q) => q.subject === subj);
                const subjScore = cbtQuestions.reduce((acc, q, idx) => {
                  if (q.subject === subj && answers[idx] === q.answer) return acc + 1;
                  return acc;
                }, 0);
                return (
                  <div key={subj} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: "13px" }}>
                    <span>{subj}</span><b>{subjScore} / {subjQs.length}</b>
                  </div>
                );
              })}
            </div>
          )}
          <div style={{ marginTop: "20px", textAlign: "left" }}>
            <h3 style={{ color: "#0B2C4A", fontSize: "15px" }}>Review Answers</h3>
            {cbtQuestions.map((q, i) => (
              <div key={i} style={{ background: "#F5F7FA", padding: "12px", borderRadius: "10px", marginTop: "8px", fontSize: "13px", lineHeight: "1.5" }}>
                <b>Q{i + 1} {q.subject ? "(" + q.subject + ")" : ""}: {q.q}</b>
                <p>Your answer: {answers[i] !== undefined ? q.options[answers[i]] : "Not answered"} {answers[i] === q.answer ? "✅" : "❌"}</p>
                <p>Correct answer: {q.options[q.answer]}</p>
              </div>
            ))}
          </div>
          <button onClick={() => { if (isJambMode) { startJambExam(); } else { startExam(selectedSubject); } }} style={{ width: "100%", marginTop: "20px", padding: "13px", borderRadius: "10px", border: "none", background: "#0B2C4A", color: "white", fontWeight: "bold", cursor: "pointer" }}>Retry Exam</button>
          <button onClick={() => setView("home")} style={{ width: "100%", marginTop: "10px", padding: "13px", borderRadius: "10px", border: "1px solid #0B2C4A", background: "white", color: "#0B2C4A", fontWeight: "bold", cursor: "pointer" }}>Back to Home</button>
        </div>

        {history.length > 0 && (
          <div style={{ background: "white", padding: "20px", borderRadius: "16px", marginTop: "15px", textAlign: "left" }}>
            <h3 style={{ color: "#0B2C4A" }}>CBT History</h3>
            {history.map((h, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #eee", fontSize: "13px" }}>
                <span>{h.subject} - {h.date}</span>
                <b>{h.score} / {h.total} ({h.percentage !== undefined ? h.percentage : Math.round((h.score / h.total) * 100)}%){h.jambScore !== null && h.jambScore !== undefined ? " • JAMB: " + h.jambScore + " / 400" : ""}</b>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F5F7FA", fontFamily: "Arial", paddingBottom: "30px" }}>
      <div style={{ background: "#0B2C4A", color: "white", padding: "20px", borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: "22px" }}>Hello, Student 👋</h2>
            <p style={{ margin: "5px 0 0", color: "#FFC107", fontSize: "13px" }}>Ready to pass with confidence?</p>
          </div>
          <div style={{ fontSize: "32px" }}>🎓</div>
        </div>
        <div style={{ background: "white", color: "#0B2C4A", borderRadius: "12px", padding: "15px", marginTop: "15px", display: "flex", justifyContent: "space-between" }}>
          <div>
            <p style={{ margin: 0, fontSize: "12px", color: "#666" }}>JAMB Score</p>
            <p style={{ margin: 0, fontSize: "24px", fontWeight: "bold" }}>280 / 400</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ margin: 0, fontSize: "12px", color: "#666" }}>Streak</p>
            <p style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>🔥 5 Days</p>
          </div>
        </div>
      </div>

      <div style={{ padding: "15px" }}>
        {showResumePrompt && (
          <div style={{ background: "#FFF7CC", border: "2px solid #FFC107", padding: "16px", borderRadius: "12px", marginBottom: "15px", textAlign: "center" }}>
            <h3 style={{ color: "#0B2C4A", fontSize: "16px" }}>Resume Previous CBT?</h3>
            <p style={{ fontSize: "13px", color: "#666", margin: "8px 0" }}>You have an unfinished exam. Do you want to continue where you stopped?</p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={resumeCbt} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "none", background: "#0B2C4A", color: "white", fontWeight: "bold", cursor: "pointer" }}>Resume</button>
              <button onClick={() => { clearSavedCbt(); }} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "1px solid #0B2C4A", background: "white", color: "#0B2C4A", fontWeight: "bold", cursor: "pointer" }}>Start New CBT</button>
            </div>
          </div>
        )}

        <h3 style={{ color: "#0B2C4A", fontSize: "16px" }}>Start Practicing</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "10px" }}>
          <div onClick={() => setShowJambPicker(true)} style={{ background: "#0B2C4A", color: "white", padding: "18px", borderRadius: "12px", cursor: "pointer" }}>
            <div style={{ fontSize: "28px" }}>📝</div><b>JAMB CBT</b><p style={{ margin: "5px 0 0", fontSize: "12px", color: "#ccc" }}>180 Questions • 3 Hours • 4 Subjects</p>
          </div>
          <div onClick={() => startExam("English")} style={{ background: "#FFC107", color: "#0B2C4A", padding: "18px", borderRadius: "12px", cursor: "pointer" }}>
            <div style={{ fontSize: "28px" }}>📚</div><b>WAEC</b><p style={{ margin: "5px 0 0", fontSize: "12px" }}>All Subjects</p>
          </div>
          <div onClick={() => startExam("Mathematics")} style={{ background: "white", color: "#0B2C4A", padding: "18px", borderRadius: "12px", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <div style={{ fontSize: "28px" }}>🏫</div><b>School Exams</b><p style={{ margin: "5px 0 0", fontSize: "12px", color: "#666" }}>JS1 - SS3</p>
          </div>
          <div onClick={() => alert("Games - Coming in next update")} style={{ background: "#22C55E", color: "white", padding: "18px", borderRadius: "12px", cursor: "pointer" }}>
            <div style={{ fontSize: "28px" }}>🎮</div><b>Play Games</b><p style={{ margin: "5px 0 0", fontSize: "12px" }}>NEPA Game • Soccer</p>
          </div>
        </div>

        {showJambPicker && (
          <div style={{ background: "white", padding: "16px", borderRadius: "12px", marginTop: "15px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
            <h3 style={{ color: "#0B2C4A", fontSize: "16px" }}>Choose Your 4 JAMB Subjects</h3>
            <p style={{ fontSize: "12px", color: "#666", margin: "6px 0" }}>English is compulsory. Select exactly 3 additional subjects.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "10px" }}>
              {ALL_SUBJECTS.map((subj) => {
                const selected = jambSubjects.includes(subj);
                const isEnglish = subj === "English";
                return (
                  <button
                    key={subj}
                    onClick={() => toggleJambSubject(subj)}
                    style={{
                      padding: "9px 12px",
                      borderRadius: "20px",
                      border: selected ? "2px solid #0B2C4A" : "1px solid #ddd",
                      background: selected ? "#0B2C4A" : "white",
                      color: selected ? "white" : "#0B2C4A",
                      fontWeight: "bold",
                      fontSize: "12px",
                      cursor: isEnglish ? "not-allowed" : "pointer",
                      opacity: isEnglish ? 0.9 : 1
                    }}
                  >
                    {subj} {isEnglish ? "(Compulsory)" : selected ? "✓" : ""}
                  </button>
                );
              })}
            </div>
            <p style={{ fontSize: "12px", marginTop: "10px" }}>Selected: {jambSubjects.length} / 4</p>
            <div style={{ background: "#F5F7FA", padding: "12px", borderRadius: "10px", marginTop: "10px" }}>
              <p style={{ fontSize: "13px", color: "#0B2C4A", fontWeight: "bold" }}>Selected Subjects: {jambSubjects.join(", ")}</p>
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "14px" }}>
              <button onClick={startJambExam} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "none", background: "#22C55E", color: "white", fontWeight: "bold", cursor: "pointer" }}>Start JAMB CBT →</button>
              <button onClick={() => setShowJambPicker(false)} style={{ padding: "12px 16px", borderRadius: "10px", border: "1px solid #ccc", background: "white", cursor: "pointer" }}>Cancel</button>
            </div>
            <p style={{ fontSize: "11px", color: "#666", marginTop: "8px", textAlign: "center" }}>English 60 • Others 40 each = 180 questions • Randomly picked and mixed from your bank</p>
          </div>
        )}

        <h3 style={{ color: "#0B2C4A", fontSize: "16px", marginTop: "20px" }}>Single Subject Practice - Tap to Start</h3>
        {ALL_SUBJECTS.map((subject) => (
          <div key={subject} onClick={() => startExam(subject)} style={{ background: "white", padding: "14px", borderRadius: "10px", marginBottom: "8px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 1px 5px rgba(0,0,0,0.05)", cursor: "pointer" }}>
            <span style={{ fontWeight: "bold", color: "#0B2C4A" }}>{subject} <span style={{ fontWeight: "normal", color: "#888", fontSize: "11px" }}>({QUESTIONS[subject].length} Qs)</span></span>
            <span style={{ background: "#0B2C4A", color: "white", padding: "6px 12px", borderRadius: "20px", fontSize: "12px" }}>Practice →</span>
          </div>
        ))}

        {history.length > 0 && (
          <div style={{ background: "white", padding: "15px", borderRadius: "12px", marginTop: "15px" }}>
            <h3 style={{ color: "#0B2C4A", fontSize: "15px" }}>CBT History</h3>
            {history.map((h, i) => {
              const pct = h.percentage !== undefined ? h.percentage : Math.round((h.score / h.total) * 100);
              return (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: "13px", borderBottom: "1px solid #eee" }}>
                  <span>{h.subject} - {h.date}</span>
                  <b>{h.score} / {h.total} ({pct}%){h.jambScore !== null && h.jambScore !== undefined ? " • JAMB: " + h.jambScore + " / 400" : ""}</b>
                </div>
              );
            })}
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "25px", fontSize: "12px", color: "#666", lineHeight: "1.8" }}>
          <p>Built by Eleazar Alhaji Maaji | ellbezalel9@gmail.com</p>
          <p>Privacy Policy | Terms and Services | Contact</p>
          <p>⭐⭐⭐⭐⭐ 4.9 • Loved by students in Gombe & Nigeria</p>
        </div>
      </div>
    </div>
  );
}

export default App;
