import React, { useState, useEffect } from "react";
import "./App.css";

// Real Question Banks (Ensure each file exports default an array of ~100 questions)
import english from "./data/english";
import mathematics from "./data/mathematics";
import physics from "./data/physics";
import chemistry from "./data/chemistry";
import economics from "./data/economics";
import government from "./data/government";
import geography from "./data/geography";
import CRS from "./data/CRS";
import IRS from "./data/IRS";

const realQuestionBanks = {
  English: english,
  Mathematics: mathematics,
  Physics: physics,
  Chemistry: chemistry,
  Economics: economics,
  Government: government,
  Geography: geography,
  CRS: CRS,
  IRS: IRS,
};

const optionalSubjectsList = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Economics",
  "Government",
  "Geography",
  "CRS",
  "IRS",
];

const wordGames = [
  { name: "Word Guess", word: "SCHOOL", hint: "A place where you learn" },
  { name: "Anagram", word: "GOMBE", hint: "Unscramble: EBMOG" },
  { name: "Spelling", word: "EXAMINATION", hint: "A test you write in school" },
];

function App() {
  // --- PWA INSTALL & INITIAL VIEW STATES ---
  const [view, setView] = useState("home");
  const [installPrompt, setInstallPrompt] = useState(null);
  const [countdown, setCountdown] = useState(10);
  const [canContinue, setCanContinue] = useState(false);

  // --- JAMB CBT ENGINE STATES ---
  const [selectedCbtSubjects, setSelectedCbtSubjects] = useState([
    "Mathematics",
    "Physics",
    "Chemistry",
  ]);
  const [cbtQuestions, setCbtQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(10800); // 03:00:00 in seconds
  const [examStarted, setExamStarted] = useState(false);
  const [examFinished, setExamFinished] = useState(false);
  const [cbtScore, setCbtScore] = useState(0);
  const [cbtAnalysis, setCbtAnalysis] = useState(null);
  const [cbtHistory, setCbtHistory] = useState([]);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [unansweredNotice, setUnansweredNotice] = useState("");

  // --- PRACTICE, AI TEST & COMMUNITY STATES ---
  const [subject, setSubject] = useState("English");
  const [mode, setMode] = useState("practice");
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState(english || []);
  const [leaderboard, setLeaderboard] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [schoolEmail, setSchoolEmail] = useState("");
  const [schoolStudents, setSchoolStudents] = useState("");
  const [schools, setSchools] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [commentText, setCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyName, setReplyName] = useState("");
  const [replyText, setReplyText] = useState("");
  const [gameIndex, setGameIndex] = useState(0);
  const [gameInput, setGameInput] = useState("");
  const [gameScore, setGameScore] = useState(0);
  const [gameTime, setGameTime] = useState(60);
  const [gameActive, setGameActive] = useState(false);
  const [gameMessage, setGameMessage] = useState("");
  const [puzzleInput, setPuzzleInput] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // --- 1. EXISTING INSTALL PAGE & PWA DETECTION ---
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

  const handleInstall = async () => {
    if (!installPrompt) {
      alert(
        "To install ExamPilot, open Chrome menu (⋮) and tap Install App or Add to Home Screen."
      );
      return;
    }
    installPrompt.prompt();
    const result = await installPrompt.userChoice;
    if (result.outcome === "accepted") {
      setView("home");
    }
    setInstallPrompt(null);
  };
  // --- 4. EXISTING PRACTICE, GAMES & COMMUNITY FUNCTIONS ---
  useEffect(() => {
    if (!gameActive) return;
    if (gameTime <= 0) {
      setGameActive(false);
      setGameMessage("Time is up. Your score is " + gameScore);
      return;
    }
    const timer = setTimeout(() => setGameTime(gameTime - 1), 1000);
    return () => clearTimeout(timer);
  }, [gameTime, gameActive, gameScore]);

  const startPractice = (subj, testMode) => {
    setSubject(subj);
    setMode(testMode);
    let qs = [...(realQuestionBanks[subj] || [])];
    if (testMode === "aitest") {
      qs = qs.sort(() => 0.5 - Math.random()).slice(0, 20);
    }
    setQuizQuestions(qs);
    setCurrentQ(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setView("quiz");
  };

  const isOptionCorrect = (qObj, idx) => {
    const letters = ["A", "B", "C", "D"];
    return qObj.answer === idx || qObj.answer === letters[idx];
  };

  const answerQuestion = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    if (isOptionCorrect(quizQuestions[currentQ], idx)) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ + 1 >= quizQuestions.length) {
      setShowResult(true);
      const finalScore =
        score + (isOptionCorrect(quizQuestions[currentQ], selected) ? 1 : 0);
      if (playerName || mode === "aitest") {
        const entry = {
          name: playerName || "Anonymous Student",
          subject,
          score: finalScore,
          total: quizQuestions.length,
          mode,
          date: new Date().toLocaleDateString(),
        };
        const updated = [entry, ...leaderboard].slice(0, 20);
        setLeaderboard(updated);
        localStorage.setItem("exampilot_leaderboard", JSON.stringify(updated));
      }
      return;
    }
    setCurrentQ(currentQ + 1);
    setSelected(null);
  };

  const registerSchool = () => {
    if (!schoolName || !schoolEmail) {
      alert("Please enter the school name and email address.");
      return;
    }
    const newSchool = {
      name: schoolName,
      email: schoolEmail,
      students: schoolStudents,
      date: new Date().toLocaleDateString(),
    };
    const updated = [newSchool, ...schools];
    setSchools(updated);
    localStorage.setItem("exampilot_schools", JSON.stringify(updated));
    alert("Thank you. Your school has been registered. We will contact you at " + schoolEmail);
    setSchoolName("");
    setSchoolEmail("");
    setSchoolStudents("");
  };

  const addComment = () => {
    if (!commentName || !commentEmail || !commentText) {
      alert("Please enter your name, email address and comment.");
      return;
    }
    const newComment = {
      id: Date.now(),
      name: commentName,
      email: commentEmail,
      text: commentText,
      likes: 0,
      liked: false,
      replies: [],
    };
    const updated = [newComment, ...comments];
    setComments(updated);
    localStorage.setItem("exampilot_comments", JSON.stringify(updated));
    setCommentName("");
    setCommentEmail("");
    setCommentText("");
  };

  const likeComment = (id) => {
    const updated = comments.map((c) =>
      c.id === id
        ? { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 }
        : c
    );
    setComments(updated);
    localStorage.setItem("exampilot_comments", JSON.stringify(updated));
  };

  const addReply = (commentId) => {
    if (!replyName || !replyText) {
      alert("Please enter your name and reply.");
      return;
    }
    const updated = comments.map((c) =>
      c.id === commentId
        ? {
            ...c,
            replies: [
              ...c.replies,
              { id: Date.now(), name: replyName, text: replyText, likes: 0, liked: false },
            ],
          }
        : c
    );
    setComments(updated);
    localStorage.setItem("exampilot_comments", JSON.stringify(updated));
    setReplyName("");
    setReplyText("");
    setReplyingTo(null);
  };

  const likeReply = (commentId, replyId) => {
    const updated = comments.map((c) => {
      if (c.id === commentId) {
        const newReplies = c.replies.map((r) =>
          r.id === replyId
            ? {
                ...r,
                liked: !r.liked,
                likes: r.liked ? (r.likes || 0) - 1 : (r.likes || 0) + 1,
              }
            : r
        );
        return { ...c, replies: newReplies };
      }
      return c;
    });
    setComments(updated);
    localStorage.setItem("exampilot_comments", JSON.stringify(updated));
  };

  const startGame = () => {
    setGameTime(60);
    setGameScore(0);
    setGameActive(true);
    setGameMessage("");
    setGameInput("");
  };

  const checkGame = () => {
    const correct = wordGames[gameIndex].word;
    if (gameInput.toUpperCase().trim() === correct) {
      setGameScore(gameScore + 10);
      setGameMessage("Correct. You earned 10 points.");
      setGameIndex((gameIndex + 1) % wordGames.length);
      setGameInput("");
    } else {
      setGameMessage("Please try again. Hint: " + wordGames[gameIndex].hint);
    }
  };

  // --- SHARED UI STYLES & COMPONENTS ---
  const yellowBtn = {
    background: "#FFC107",
    color: "#0B2C4A",
    border: "none",
    padding: "12px 10px",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "14px",
    width: "100%",
  };
  const yellowBtnSmall = {
    background: "#FFC107",
    color: "#0B2C4A",
    border: "none",
    padding: "10px 14px",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "13px",
    margin: "5px",
  };
  const darkBlueBtn = {
    background: "#0B2C4A",
    color: "white",
    border: "none",
    padding: "10px 14px",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "13px",
    margin: "5px",
  };
  const optionStyle = (isCorrect, isWrong) => ({
    display: "block",
    width: "100%",
    textAlign: "left",
    background: isCorrect ? "#C8F7C5" : isWrong ? "#FFCCCC" : "white",
    border: isCorrect ? "2px solid green" : isWrong ? "2px solid red" : "2px solid #0B2C4A",
    color: "#0B2C4A",
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
    margin: "6px 0",
    fontSize: "14px",
    fontWeight: "bold",
  });

  const BottomMenu = () => (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#0B2C4A",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 6px",
        gap: "5px",
        zIndex: 100,
        borderTop: "3px solid #FFC107",
      }}
    >
      <button onClick={() => setView("home")} style={{ flex: 1, background: view === "home" ? "#FFC107" : "#FFD54A", color: "#0B2C4A", border: "none", padding: "10px 2px", borderRadius: "8px", fontWeight: "bold", fontSize: "11px", cursor: "pointer" }}>🏠<br />Home</button>
      <button onClick={() => setView("cbt_setup")} style={{ flex: 1, background: view === "cbt_setup" ? "#FFC107" : "#FFD54A", color: "#0B2C4A", border: "none", padding: "10px 2px", borderRadius: "8px", fontWeight: "bold", fontSize: "11px", cursor: "pointer" }}>📝<br />JAMB CBT</button>
      <button onClick={() => setView("subjects")} style={{ flex: 1, background: view === "subjects" ? "#FFC107" : "#FFD54A", color: "#0B2C4A", border: "none", padding: "10px 2px", borderRadius: "8px", fontWeight: "bold", fontSize: "11px", cursor: "pointer" }}>📚<br />Subjects</button>
      <button onClick={() => setView("cbt_history")} style={{ flex: 1, background: view === "cbt_history" ? "#FFC107" : "#FFD54A", color: "#0B2C4A", border: "none", padding: "10px 2px", borderRadius: "8px", fontWeight: "bold", fontSize: "11px", cursor: "pointer" }}>📊<br />History</button>
      <button onClick={() => setView("leaderboard")} style={{ flex: 1, background: view === "leaderboard" ? "#FFC107" : "#FFD54A", color: "#0B2C4A", border: "none", padding: "10px 2px", borderRadius: "8px", fontWeight: "bold", fontSize: "11px", cursor: "pointer" }}>🏆<br />Leaders</button>
    </div>
  );
  // --- 2. LOAD SAVED STORAGE DATA ---
  useEffect(() => {
    const savedHistory = localStorage.getItem("exampilot_cbt_history");
    if (savedHistory) setCbtHistory(JSON.parse(savedHistory));

    const savedLeader = localStorage.getItem("exampilot_leaderboard");
    if (savedLeader) setLeaderboard(JSON.parse(savedLeader));

    const savedSchools = localStorage.getItem("exampilot_schools");
    if (savedSchools) setSchools(JSON.parse(savedSchools));

    const saved = localStorage.getItem("exampilot_comments");
    if (saved) {
      const loaded = JSON.parse(saved);
      const fixed = loaded.map((c) => ({
        ...c,
        id: c.id || Date.now() + Math.random(),
        likes: c.likes || 0,
        liked: c.liked || false,
        replies: c.replies || [],
      }));
      setComments(fixed);
    } else {
      setComments([
        {
          id: 1,
          name: "Mary - Gombe",
          email: "mary@gmail.com",
          text: "This app helped me practice JAMB questions very well. I love the AI Test.",
          likes: 5,
          liked: false,
          replies: [
            {
              id: 11,
              name: "Eleazar - Founder",
              text: "Thank you, Mary. Keep practicing. You will do very well.",
              likes: 2,
              liked: false,
            },
          ],
        },
        {
          id: 2,
          name: "Ahmed - Port Harcourt",
          email: "ahmed@gmail.com",
          text: "This is a good app. Please add more Physics questions.",
          likes: 3,
          liked: false,
          replies: [
            {
              id: 22,
              name: "Eleazar - Founder",
              text: "Thank you, Ahmed. We have added more Physics questions. Please check again.",
              likes: 1,
              liked: false,
            },
          ],
        },
      ]);
    }
  }, []);

  // --- 3. CBT HELPER & TIMER FUNCTIONS ---
  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const formatTimer = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  const toggleCbtSubject = (subj) => {
    if (selectedCbtSubjects.includes(subj)) {
      setSelectedCbtSubjects(selectedCbtSubjects.filter((s) => s !== subj));
    } else {
      if (selectedCbtSubjects.length >= 3) {
        alert("You can only select 3 subjects alongside English (4 subjects total).");
        return;
      }
      setSelectedCbtSubjects([...selectedCbtSubjects, subj]);
    }
  };

  const startJambCBT = () => {
    if (selectedCbtSubjects.length !== 3) {
      alert("Please select exactly 3 subjects to combine with English.");
      return;
    }

    const tagSubject = (arr, subjName) =>
      shuffle(arr || []).map((item) => ({ ...item, subjectName: subjName }));

    const engQuestions = tagSubject(realQuestionBanks.English, "English").slice(0, 60);
    const sub1Questions = tagSubject(
      realQuestionBanks[selectedCbtSubjects[0]],
      selectedCbtSubjects[0]
    ).slice(0, 40);
    const sub2Questions = tagSubject(
      realQuestionBanks[selectedCbtSubjects[1]],
      selectedCbtSubjects[1]
    ).slice(0, 40);
    const sub3Questions = tagSubject(
      realQuestionBanks[selectedCbtSubjects[2]],
      selectedCbtSubjects[2]
    ).slice(0, 40);

    const fullExam = shuffle([
      ...engQuestions,
      ...sub1Questions,
      ...sub2Questions,
      ...sub3Questions,
    ]);

    if (fullExam.length === 0) {
      alert("Question banks are empty. Check your src/data/ files.");
      return;
    }

    setCbtQuestions(fullExam);
    setCurrentQuestion(0);
    setAnswers({});
    setTimeLeft(10800); // 03:00:00
    setExamStarted(true);
    setExamFinished(false);
    setShowSubmitModal(false);
    setUnansweredNotice("");
    setView("cbt");
  };

  const selectAnswer = (answerIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: answerIndex,
    }));
    setUnansweredNotice("");
  };

  const reviewUnanswered = () => {
    const firstUnansweredIndex = cbtQuestions.findIndex(
      (_, idx) => answers[idx] === undefined
    );
    if (firstUnansweredIndex === -1) {
      setUnansweredNotice("All questions answered.");
    } else {
      setCurrentQuestion(firstUnansweredIndex);
      setShowSubmitModal(false);
    }
  };

  const submitExam = () => {
    let totalCorrect = 0;
    const optionLetters = ["A", "B", "C", "D"];
    const activeSubjects = ["English", ...selectedCbtSubjects];

    // Initialize subject breakdown counters
    const breakdown = {};
    activeSubjects.forEach((subj) => {
      breakdown[subj] = { correct: 0, total: 0 };
    });

    cbtQuestions.forEach((q, idx) => {
      const subj = q.subjectName || "English";
      if (!breakdown[subj]) breakdown[subj] = { correct: 0, total: 0 };
      breakdown[subj].total += 1;

      const userAns = answers[idx];
      if (userAns !== undefined) {
        if (userAns === q.answer || optionLetters[userAns] === q.answer) {
          totalCorrect += 1;
          breakdown[subj].correct += 1;
        }
      }
    });

    // Determine Strongest & Weakest Subjects based on percentage accuracy
    let strongest = activeSubjects[0];
    let weakest = activeSubjects[0];
    let highestPct = -1;
    let lowestPct = 101;

    activeSubjects.forEach((subj) => {
      const { correct, total } = breakdown[subj];
      const pct = total > 0 ? (correct / total) * 100 : 0;
      if (pct > highestPct) {
        highestPct = pct;
        strongest = subj;
      }
      if (pct < lowestPct) {
        lowestPct = pct;
        weakest = subj;
      }
    });

    const totalQuestions = cbtQuestions.length;
    const percentage = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;
    const estimatedJamb = Math.round((percentage / 100) * 400);

    const resultRecord = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      subjects: activeSubjects,
      breakdown,
      strongest,
      weakest,
      score: totalCorrect,
      total: totalQuestions,
      percentage: percentage.toFixed(1),
      estimatedJamb,
    };

    // Save to CBT History
    const updatedHistory = [resultRecord, ...cbtHistory].slice(0, 30);
    setCbtHistory(updatedHistory);
    localStorage.setItem("exampilot_cbt_history", JSON.stringify(updatedHistory));

    // Also log to Leaderboard
    const leaderEntry = {
      name: playerName || "JAMB Candidate",
      subject: "JAMB CBT (4 Subjects)",
      score: totalCorrect,
      total: totalQuestions,
      mode: `Est. ${estimatedJamb}/400`,
      date: new Date().toLocaleDateString(),
    };
    const updatedLeader = [leaderEntry, ...leaderboard].slice(0, 20);
    setLeaderboard(updatedLeader);
    localStorage.setItem("exampilot_leaderboard", JSON.stringify(updatedLeader));

    setCbtScore(totalCorrect);
    setCbtAnalysis(resultRecord);
    setShowSubmitModal(false);
    setExamFinished(true);
    setExamStarted(false);
    setView("result");
  };

  useEffect(() => {
    if (!examStarted || examFinished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          submitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examStarted, examFinished]);
  // --- 4. EXISTING PRACTICE, GAMES & COMMUNITY FUNCTIONS ---
  useEffect(() => {
    if (!gameActive) return;
    if (gameTime <= 0) {
      setGameActive(false);
      setGameMessage("Time is up. Your score is " + gameScore);
      return;
    }
    const timer = setTimeout(() => setGameTime(gameTime - 1), 1000);
    return () => clearTimeout(timer);
  }, [gameTime, gameActive, gameScore]);

  const startPractice = (subj, testMode) => {
    setSubject(subj);
    setMode(testMode);
    let qs = [...(realQuestionBanks[subj] || [])];
    if (testMode === "aitest") {
      qs = qs.sort(() => 0.5 - Math.random()).slice(0, 20);
    }
    setQuizQuestions(qs);
    setCurrentQ(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setView("quiz");
  };

  const isOptionCorrect = (qObj, idx) => {
    const letters = ["A", "B", "C", "D"];
    return qObj.answer === idx || qObj.answer === letters[idx];
  };

  const answerQuestion = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    if (isOptionCorrect(quizQuestions[currentQ], idx)) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ + 1 >= quizQuestions.length) {
      setShowResult(true);
      const finalScore =
        score + (isOptionCorrect(quizQuestions[currentQ], selected) ? 1 : 0);
      if (playerName || mode === "aitest") {
        const entry = {
          name: playerName || "Anonymous Student",
          subject,
          score: finalScore,
          total: quizQuestions.length,
          mode,
          date: new Date().toLocaleDateString(),
        };
        const updated = [entry, ...leaderboard].slice(0, 20);
        setLeaderboard(updated);
        localStorage.setItem("exampilot_leaderboard", JSON.stringify(updated));
      }
      return;
    }
    setCurrentQ(currentQ + 1);
    setSelected(null);
  };

  const registerSchool = () => {
    if (!schoolName || !schoolEmail) {
      alert("Please enter the school name and email address.");
      return;
    }
    const newSchool = {
      name: schoolName,
      email: schoolEmail,
      students: schoolStudents,
      date: new Date().toLocaleDateString(),
    };
    const updated = [newSchool, ...schools];
    setSchools(updated);
    localStorage.setItem("exampilot_schools", JSON.stringify(updated));
    alert("Thank you. Your school has been registered. We will contact you at " + schoolEmail);
    setSchoolName("");
    setSchoolEmail("");
    setSchoolStudents("");
  };

  const addComment = () => {
    if (!commentName || !commentEmail || !commentText) {
      alert("Please enter your name, email address and comment.");
      return;
    }
    const newComment = {
      id: Date.now(),
      name: commentName,
      email: commentEmail,
      text: commentText,
      likes: 0,
      liked: false,
      replies: [],
    };
    const updated = [newComment, ...comments];
    setComments(updated);
    localStorage.setItem("exampilot_comments", JSON.stringify(updated));
    setCommentName("");
    setCommentEmail("");
    setCommentText("");
  };

  const likeComment = (id) => {
    const updated = comments.map((c) =>
      c.id === id
        ? { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 }
        : c
    );
    setComments(updated);
    localStorage.setItem("exampilot_comments", JSON.stringify(updated));
  };

  const addReply = (commentId) => {
    if (!replyName || !replyText) {
      alert("Please enter your name and reply.");
      return;
    }
    const updated = comments.map((c) =>
      c.id === commentId
        ? {
            ...c,
            replies: [
              ...c.replies,
              { id: Date.now(), name: replyName, text: replyText, likes: 0, liked: false },
            ],
          }
        : c
    );
    setComments(updated);
    localStorage.setItem("exampilot_comments", JSON.stringify(updated));
    setReplyName("");
    setReplyText("");
    setReplyingTo(null);
  };

  const likeReply = (commentId, replyId) => {
    const updated = comments.map((c) => {
      if (c.id === commentId) {
        const newReplies = c.replies.map((r) =>
          r.id === replyId
            ? {
                ...r,
                liked: !r.liked,
                likes: r.liked ? (r.likes || 0) - 1 : (r.likes || 0) + 1,
              }
            : r
        );
        return { ...c, replies: newReplies };
      }
      return c;
    });
    setComments(updated);
    localStorage.setItem("exampilot_comments", JSON.stringify(updated));
  };

  const startGame = () => {
    setGameTime(60);
    setGameScore(0);
    setGameActive(true);
    setGameMessage("");
    setGameInput("");
  };

  const checkGame = () => {
    const correct = wordGames[gameIndex].word;
    if (gameInput.toUpperCase().trim() === correct) {
      setGameScore(gameScore + 10);
      setGameMessage("Correct. You earned 10 points.");
      setGameIndex((gameIndex + 1) % wordGames.length);
      setGameInput("");
    } else {
      setGameMessage("Please try again. Hint: " + wordGames[gameIndex].hint);
    }
  };

  // --- SHARED UI STYLES & COMPONENTS ---
  const yellowBtn = {
    background: "#FFC107",
    color: "#0B2C4A",
    border: "none",
    padding: "12px 10px",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "14px",
    width: "100%",
  };
  const yellowBtnSmall = {
    background: "#FFC107",
    color: "#0B2C4A",
    border: "none",
    padding: "10px 14px",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "13px",
    margin: "5px",
  };
  const darkBlueBtn = {
    background: "#0B2C4A",
    color: "white",
    border: "none",
    padding: "10px 14px",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "13px",
    margin: "5px",
  };
  const optionStyle = (isCorrect, isWrong) => ({
    display: "block",
    width: "100%",
    textAlign: "left",
    background: isCorrect ? "#C8F7C5" : isWrong ? "#FFCCCC" : "white",
    border: isCorrect ? "2px solid green" : isWrong ? "2px solid red" : "2px solid #0B2C4A",
    color: "#0B2C4A",
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
    margin: "6px 0",
    fontSize: "14px",
    fontWeight: "bold",
  });

  const BottomMenu = () => (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#0B2C4A",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 6px",
        gap: "5px",
        zIndex: 100,
        borderTop: "3px solid #FFC107",
      }}
    >
      <button onClick={() => setView("home")} style={{ flex: 1, background: view === "home" ? "#FFC107" : "#FFD54A", color: "#0B2C4A", border: "none", padding: "10px 2px", borderRadius: "8px", fontWeight: "bold", fontSize: "11px", cursor: "pointer" }}>🏠<br />Home</button>
      <button onClick={() => setView("cbt_setup")} style={{ flex: 1, background: view === "cbt_setup" ? "#FFC107" : "#FFD54A", color: "#0B2C4A", border: "none", padding: "10px 2px", borderRadius: "8px", fontWeight: "bold", fontSize: "11px", cursor: "pointer" }}>📝<br />JAMB CBT</button>
      <button onClick={() => setView("subjects")} style={{ flex: 1, background: view === "subjects" ? "#FFC107" : "#FFD54A", color: "#0B2C4A", border: "none", padding: "10px 2px", borderRadius: "8px", fontWeight: "bold", fontSize: "11px", cursor: "pointer" }}>📚<br />Subjects</button>
      <button onClick={() => setView("cbt_history")} style={{ flex: 1, background: view === "cbt_history" ? "#FFC107" : "#FFD54A", color: "#0B2C4A", border: "none", padding: "10px 2px", borderRadius: "8px", fontWeight: "bold", fontSize: "11px", cursor: "pointer" }}>📊<br />History</button>
      <button onClick={() => setView("leaderboard")} style={{ flex: 1, background: view === "leaderboard" ? "#FFC107" : "#FFD54A", color: "#0B2C4A", border: "none", padding: "10px 2px", borderRadius: "8px", fontWeight: "bold", fontSize: "11px", cursor: "pointer" }}>🏆<br />Leaders</button>
    </div>
  );
  // =========================================================
  // VIEW: JAMB CBT RESULT & SUBJECT SCORE ANALYSIS
  // =========================================================
  if (view === "result" && cbtAnalysis) {
    const pct = parseFloat(cbtAnalysis.percentage);

    let levelLabel = "Needs Improvement";
    let levelBg = "#f8d7da";
    let levelColor = "#721c24";

    if (pct >= 90) {
      levelLabel = "Excellent";
      levelBg = "#d4edda";
      levelColor = "#155724";
    } else if (pct >= 75) {
      levelLabel = "Very Good";
      levelBg = "#d1ecf1";
      levelColor = "#0c5460";
    } else if (pct >= 60) {
      levelLabel = "Good";
      levelBg = "#fff3cd";
      levelColor = "#856404";
    } else if (pct >= 50) {
      levelLabel = "Fair";
      levelBg = "#ffeeba";
      levelColor = "#856404";
    }

    return (
      <div className="App">
        <div className="top-banner"></div>
        <div className="App-content" style={{ paddingBottom: "95px" }}>
          <h1>JAMB CBT RESULT</h1>

          {/* Colored Summary Performance Card */}
          <div
            style={{
              background: levelBg,
              color: levelColor,
              padding: "16px",
              borderRadius: "12px",
              marginBottom: "15px",
              border: `2px solid ${levelColor}`,
            }}
          >
            <h2 style={{ margin: "0 0 5px" }}>{levelLabel}</h2>
            <p style={{ margin: 0, fontWeight: "bold" }}>
              Estimated JAMB Score: {cbtAnalysis.estimatedJamb} / 400
            </p>
          </div>

          {/* Subject Breakdown Box */}
          <div
            style={{
              background: "white",
              padding: "16px",
              borderRadius: "12px",
              textAlign: "left",
              marginBottom: "15px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
            }}
          >
            <h3 style={{ marginTop: 0, color: "#0B2C4A" }}>Subject Score Breakdown</h3>
            {cbtAnalysis.subjects.map((subj) => {
              const item = cbtAnalysis.breakdown[subj] || { correct: 0, total: 0 };
              return (
                <p
                  key={subj}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #eee",
                    paddingBottom: "6px",
                    margin: "8px 0",
                    fontWeight: "bold",
                  }}
                >
                  <span>{subj}:</span>
                  <span>
                    {item.correct} / {item.total}
                  </span>
                </p>
              );
            })}

            <div style={{ marginTop: "12px", paddingTop: "8px", borderTop: "2px solid #0B2C4A" }}>
              <p style={{ margin: "4px 0" }}>
                <b>Total:</b> {cbtAnalysis.score} / {cbtAnalysis.total}
              </p>
              <p style={{ margin: "4px 0" }}>
                <b>Percentage:</b> {cbtAnalysis.percentage}%
              </p>
              <p style={{ margin: "4px 0", color: "green" }}>
                <b>Strongest Subject:</b> {cbtAnalysis.strongest}
              </p>
              <p style={{ margin: "4px 0", color: "#d9534f" }}>
                <b>Weakest Subject:</b> {cbtAnalysis.weakest}
              </p>
            </div>
          </div>

          <button onClick={() => setView("cbt_setup")} style={yellowBtnSmall}>
            Take Another CBT
          </button>
          <button onClick={() => setView("cbt_history")} style={darkBlueBtn}>
            My CBT History
          </button>
          <button onClick={() => setView("home")} style={darkBlueBtn}>
            Back Home
          </button>

          <BottomMenu />
        </div>
      </div>
    );
  }

  // =========================================================
  // VIEW: MY CBT HISTORY
  // =========================================================
  if (view === "cbt_history") {
    return (
      <div className="App">
        <div className="top-banner"></div>
        <div className="App-content" style={{ paddingBottom: "95px" }}>
          <h1>My CBT History</h1>
          <p>Previous 180-Question JAMB CBT Attempts</p>

          {cbtHistory.length === 0 && (
            <p>No CBT attempts recorded yet. Start a JAMB CBT exam to track your progress!</p>
          )}

          {cbtHistory.map((item) => (
            <div
              key={item.id}
              className="leader-card"
              style={{ textAlign: "left", padding: "14px", marginBottom: "10px" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <b>Est. JAMB: {item.estimatedJamb}/400</b>
                <span style={{ fontSize: "12px", color: "#666" }}>{item.date}</span>
              </div>
              <p style={{ margin: "6px 0", fontSize: "13px" }}>
                <b>Subjects:</b> {item.subjects.join(", ")}
              </p>
              <p style={{ margin: 0, fontSize: "13px" }}>
                <b>Score:</b> {item.score}/{item.total} ({item.percentage}%)
              </p>
            </div>
          ))}

          <button onClick={() => setView("cbt_setup")} style={yellowBtnSmall}>
            New JAMB CBT
          </button>
          <button onClick={() => setView("home")} style={darkBlueBtn}>
            Go Home
          </button>
          <BottomMenu />
        </div>
      </div>
    );
  }

  // =========================================================
  // EXISTING PRACTICE, COMMUNITY, GAMES & HOME VIEWS
  // =========================================================
  if (view === "quiz") {
    if (showResult) {
      return (
        <div className="App">
          <div className="App-content">
            <h1>Your Result</h1>
            <h2>
              {score} / {quizQuestions.length}
            </h2>
            <p>
              {subject} - {mode === "aitest" ? "AI Test" : "Practice"}
            </p>
            <p>
              {score >= quizQuestions.length * 0.7
                ? "Excellent. You are ready for JAMB."
                : score >= quizQuestions.length * 0.5
                ? "Good work. Keep practicing."
                : "Do not give up. Practice more and you will improve."}
            </p>
            <button onClick={() => setView("subjects")} style={yellowBtnSmall}>
              Try Another Subject
            </button>
            <button onClick={() => setView("home")} style={darkBlueBtn}>
              Go Home
            </button>
            <BottomMenu />
          </div>
        </div>
      );
    }
    const q = quizQuestions[currentQ];
    const qText = q.question || q.q;
    return (
      <div className="App">
        <div className="App-content">
          <h2>
            {subject} - {mode === "aitest" ? "AI Test" : "Practice"}
          </h2>
          <p>
            Question {currentQ + 1} of {quizQuestions.length} | Score: {score}
          </p>
          <div className="question-box">
            <h3>{qText}</h3>
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => answerQuestion(idx)}
                style={optionStyle(
                  selected !== null && isOptionCorrect(q, idx),
                  selected === idx && !isOptionCorrect(q, idx)
                )}
              >
                {opt}
              </button>
            ))}
          </div>
          {selected !== null && (
            <button onClick={nextQuestion} style={yellowBtnSmall}>
              {currentQ + 1 === quizQuestions.length ? "Finish" : "Next Question"}
            </button>
          )}
          <BottomMenu />
        </div>
      </div>
    );
  }

  if (view === "comments") {
    return (
      <div className="App">
        <div className="top-banner"></div>
        <div className="App-content" style={{ paddingBottom: "90px" }}>
          <h1>What Students Are Saying</h1>
          <input placeholder="Your Full Name, for example Musa Bello" value={commentName} onChange={(e) => setCommentName(e.target.value)} className="input-box" />
          <input placeholder="Your Email Address, for example musa@gmail.com" value={commentEmail} onChange={(e) => setCommentEmail(e.target.value)} className="input-box" type="email" />
          <textarea placeholder="Write your comment here." value={commentText} onChange={(e) => setCommentText(e.target.value)} className="textarea-box" />
          <button onClick={addComment} style={yellowBtnSmall}>Post Comment</button>
          <hr />
          {comments.map((c) => (
            <div key={c.id} className="comment-card">
              <b>{c.name}</b>
              <p className="comment-email">{c.email}</p>
              <p>{c.text}</p>
              <div className="comment-actions">
                <button onClick={() => likeComment(c.id)} style={{ background: c.liked ? "#FFC107" : "white", color: "#0B2C4A", border: "1px solid #FFC107", padding: "6px 10px", borderRadius: "8px", fontWeight: "bold", fontSize: "12px", cursor: "pointer" }}>
                  {c.liked ? "❤️" : "🤍"} {c.likes} Like
                </button>
                <button onClick={() => setReplyingTo(replyingTo === c.id ? null : c.id)} style={darkBlueBtn}>
                  💬 Reply ({c.replies.length})
                </button>
              </div>
              {replyingTo === c.id && (
                <div className="reply-box">
                  <input placeholder="Your Name, for example Eleazar - Founder" value={replyName} onChange={(e) => setReplyName(e.target.value)} className="input-box" />
                  <textarea placeholder="Write your reply." value={replyText} onChange={(e) => setReplyText(e.target.value)} className="textarea-box" />
                  <button onClick={() => addReply(c.id)} style={yellowBtnSmall}>Send Reply</button>
<button onClick={() => setReplyingTo(null)} style={darkBlueBtn}>Cancel

)}
{c.replies.map((r) => (

{r.name}
{r.text}
<button onClick={() => likeReply(c.id, r.id)} style={{ background: r.liked ? "#FFC107" : "white", color: "#0B2C4A", border: "1px solid #FFC107", padding: "4px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: "bold", cursor: "pointer" }}>
{r.liked ? "❤️" : "🤍"} {r.likes || 0}


))}

))}



);
}
if (view === "leaderboard") {
return (


<div className="App-content" style={{ paddingBottom: "90px" }}>
Leaderboard
Top Students on ExamPilot
{leaderboard.length === 0 && No scores yet. Be the first to play.}
{leaderboard.map((l, i) => (

#{i + 1} {l.name} - {l.subject} - {l.score}/{l.total} - {l.mode} - {l.date}

))}



);
}
if (view === "schools") {
return (


<div className="App-content" style={{ paddingBottom: "90px" }}>
For Schools
Register your school to get ExamPilot for your students.
<input placeholder="School Name" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} className="input-box" />
<input placeholder="School Email Address" value={schoolEmail} onChange={(e) => setSchoolEmail(e.target.value)} className="input-box" />
<input placeholder="Number of Students, for example 200" value={schoolStudents} onChange={(e) => setSchoolStudents(e.target.value)} className="input-box" />
Register School
Registered Schools ({schools.length})
{schools.map((s, i) => (

{s.name} - {s.email} - {s.students} students - {s.date}

))}



);
}
if (view === "games") {
return (


<div className="App-content" style={{ paddingBottom: "90px" }}>
Word Game Bar
Five Games, Timer, Puzzle and Word Search
<div style={{ display: "flex", flexWrap: "wrap", gap: "6px", justifyContent: "center" }}>
<button onClick={() => setGameIndex(0)} style={yellowBtnSmall}>Word Guess
<button onClick={() => setGameIndex(1)} style={yellowBtnSmall}>Anagram
<button onClick={() => setGameIndex(2)} style={yellowBtnSmall}>Spelling
<button onClick={() => setView("puzzle")} style={yellowBtnSmall}>Puzzle
<button onClick={() => setView("wordsearch")} style={yellowBtnSmall}>Word Search

{wordGames[gameIndex].name}
Hint: {wordGames[gameIndex].hint}
Time Left: {gameTime}s | Score: {gameScore}
{!gameActive && Start Game (60 Seconds)}
{gameActive && (

<input placeholder="Type your answer" value={gameInput} onChange={(e) => setGameInput(e.target.value)} className="input-box" />
Check

)}
{gameMessage}
Memory Game
Remember the words: SCHOOL, BOOK, PEN, EXAM. Close your eyes, recall them, and test your memory. Practice makes you sharper.



);
}
if (view === "puzzle") {
return (


Puzzle
Fill in the missing word: G _ M B E is a state in Nigeria. What is it?
<input placeholder="Type your answer" value={puzzleInput} onChange={(e) => setPuzzleInput(e.target.value)} className="input-box" />
<button onClick={() => alert(puzzleInput.toUpperCase() === "GOMBE" ? "Correct. You are very smart." : "Please try again.")} style={yellowBtnSmall}>Check Puzzle
Another puzzle: _ X A M is what you write in school. The answer is EXAM.
<button onClick={() => setView("games")} style={darkBlueBtn}>Back to Games



);
}
if (view === "wordsearch") {
return (


Word Search
Find these words in the grid: SCHOOL, BOOK, EXAM, GOMBE, PEN

S C H O O L
B O O K P E
E X A M N N
G O M B E S
P E N S O N

<input placeholder="Type the word you found" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className="input-box" />
<button onClick={() => { const w = searchInput.toUpperCase().trim(); if (["SCHOOL", "BOOK", "EXAM", "GOMBE", "PEN"].includes(w)) alert("Great. You found " + w); else alert("That word is not in the list. Please try again."); }} style={yellowBtnSmall}>Check Word
<button onClick={() => setView("games")} style={darkBlueBtn}>Back to Games



);
}
if (view === "about") {
return (


<div className="App-content" style={{ paddingBottom: "90px" }}>
About ExamPilot
ExamPilot was built by Eleazar Alhaji Maaji, a student of Computer Science Education at Gombe State University. He completed JAMB and WAEC and wanted to help other students in Gombe and across Nigeria prepare better for JAMB, WAEC and school examinations.
Our mission: To make examination practice easy, fun and free for every student, even with a small phone and limited data.
<button onClick={() => setView("home")} style={yellowBtnSmall}>Go Home



);
}
if (view === "contact") {
return (


<div className="App-content" style={{ paddingBottom: "90px" }}>
Contact Us
Founder: Eleazar Alhaji Maaji
Email: ellbezalel9@gmail.com
WhatsApp: +234 913 635 5760
Location: Gombe, Gombe State, Nigeria
Please send us a message on WhatsApp or Email for school partnerships, questions or feedback.
<button onClick={() => setView("home")} style={yellowBtnSmall}>Go Home



);
}
if (view === "subjects") {
return (


<div className="App-content" style={{ paddingBottom: "90px" }}>
Choose a Subject
<input placeholder="Your Name for the Leaderboard (optional)" value={playerName} onChange={(e) => setPlayerName(e.target.value)} className="input-box" />
{Object.keys(realQuestionBanks).map((subj) => (

{subj}
{(realQuestionBanks[subj] || []).length} Questions Available
<button onClick={() => startPractice(subj, "practice")} style={yellowBtnSmall}>Practice
<button onClick={() => startPractice(subj, "aitest")} style={darkBlueBtn}>AI Test

))}



);
}
// =========================================================
// VIEW: HOME DASHBOARD
// =========================================================
return (


<div className="App-content" style={{ paddingBottom: "95px" }}>

ExamPilot
<p style={{ color: "#FFFFFF", fontSize: "16px", lineHeight: "1.6" }}>
Practice JAMB, WAEC and School Examinations. Play Games. Pass with Confidence.

<button onClick={() => setView("cbt_setup")} style={yellowBtnSmall}>
📝 Start JAMB CBT (180 Qs)

<button onClick={() => setView("subjects")} style={darkBlueBtn}>
📚 Practice Subjects


<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", margin: "14px 0" }}>
<button onClick={() => setView("cbt_setup")} style={yellowBtn}>📝
JAMB CBT
<button onClick={() => setView("cbt_history")} style={yellowBtn}>📊
My CBT History
<button onClick={() => setView("subjects")} style={yellowBtn}>📚
Subjects (9)
<button onClick={() => setView("games")} style={yellowBtn}>🎮
Games
<button onClick={() => setView("leaderboard")} style={yellowBtn}>🏆
Leaderboard
<button onClick={() => setView("schools")} style={yellowBtn}>🏫
For Schools
<button onClick={() => setView("comments")} style={yellowBtn}>💬
Comments
<button onClick={() => setView("about")} style={yellowBtn}>ℹ️
About
<button onClick={() => setView("contact")} style={{ ...yellowBtn, gridColumn: "span 2" }}>📞
Contact

Why ExamPilot?

Real 180-Question JAMB CBT Simulator, Subject Breakdown Analysis, AI Test, Leaderboard, Games and School Registration. Built for students in Gombe and across Nigeria.


Built by Eleazar Alhaji Maaji | ellbezalel9@gmail.com | +234 913 635 5760
Gombe State University - Computer Science Education

);
}
export default App;

