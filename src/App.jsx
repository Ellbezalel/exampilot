import React, { useState, useEffect } from "react";
import "./App.css";

const subjectsData = {
  English: [
    { q: "Choose the correct word: She ___ to school every day.", options: ["go", "goes", "going", "gone"], answer: 1 },
    { q: "What is the synonym of Happy?", options: ["Sad", "Joyful", "Angry", "Tired"], answer: 1 },
    { q: "Choose the correctly spelt word.", options: ["Occassion", "Occasion", "Ocassion", "Occason"], answer: 1 },
    { q: "The plural of Child is?", options: ["Childs", "Children", "Childrens", "Childes"], answer: 1 },
    { q: "He is ___ honest man.", options: ["a", "an", "the", "no article"], answer: 1 },
    { q: "What is the past tense of Teach?", options: ["Teached", "Taught", "Teaching", "Teaches"], answer: 1 },
    { q: "Choose the antonym of Brave.", options: ["Bold", "Fearful", "Strong", "Smart"], answer: 1 },
    { q: "She has been working ___ morning.", options: ["since", "for", "from", "at"], answer: 0 },
    { q: "Which is a noun?", options: ["Quickly", "Happiness", "Run", "Beautiful"], answer: 1 },
    { q: "Complete: Neither John nor Mary ___ here.", options: ["are", "is", "were", "have"], answer: 1 },
  ],
  Mathematics: [
    { q: "What is 12 + 18?", options: ["28", "30", "32", "20"], answer: 1 },
    { q: "What is 15 x 4?", options: ["50", "60", "45", "65"], answer: 1 },
    { q: "What is square root of 144?", options: ["10", "12", "14", "16"], answer: 1 },
    { q: "What is 50% of 200?", options: ["50", "100", "150", "200"], answer: 1 },
    { q: "Solve: 3x = 21, x = ?", options: ["6", "7", "8", "9"], answer: 1 },
    { q: "What is 2 to the power 4?", options: ["8", "12", "16", "20"], answer: 2 },
    { q: "What is the area of square with side 5?", options: ["10", "20", "25", "15"], answer: 2 },
    { q: "What is 100 - 37?", options: ["63", "73", "53", "67"], answer: 0 },
    { q: "What is 7 x 8?", options: ["54", "56", "48", "64"], answer: 1 },
    { q: "What is 1/2 + 1/2?", options: ["1", "2", "0.5", "1.5"], answer: 0 },
  ],
  Physics: [
    { q: "What is the unit of Force?", options: ["Joule", "Newton", "Watt", "Volt"], answer: 1 },
    { q: "What is the speed of light?", options: ["3 x 10^8 m/s", "3 x 10^6 m/s", "3 x 10^5 m/s", "3 x 10^4 m/s"], answer: 0 },
    { q: "What is the unit of Energy?", options: ["Newton", "Joule", "Watt", "Ampere"], answer: 1 },
    { q: "Gravity on Earth is about?", options: ["5 m/s2", "10 m/s2", "15 m/s2", "20 m/s2"], answer: 1 },
    { q: "Which is a vector quantity?", options: ["Speed", "Distance", "Velocity", "Time"], answer: 2 },
    { q: "What is the formula for Force?", options: ["F = m/a", "F = ma", "F = m + a", "F = m - a"], answer: 1 },
    { q: "Unit of Power is?", options: ["Joule", "Watt", "Newton", "Ohm"], answer: 1 },
    { q: "What do we use to measure current?", options: ["Voltmeter", "Ammeter", "Thermometer", "Barometer"], answer: 1 },
    { q: "Which color has highest wavelength?", options: ["Red", "Blue", "Green", "Violet"], answer: 0 },
    { q: "Sound travels fastest in?", options: ["Air", "Vacuum", "Water", "Solid"], answer: 3 },
  ],
  Chemistry: [
    { q: "What is the chemical symbol for Water?", options: ["CO2", "H2O", "O2", "NaCl"], answer: 1 },
    { q: "What is the atomic number of Carbon?", options: ["6", "8", "12", "4"], answer: 0 },
    { q: "What is pH of neutral solution?", options: ["0", "7", "14", "1"], answer: 1 },
    { q: "What is NaCl commonly called?", options: ["Sugar", "Salt", "Water", "Acid"], answer: 1 },
    { q: "Which gas do plants absorb?", options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"], answer: 1 },
    { q: "What is the symbol for Gold?", options: ["Ag", "Au", "Gd", "Go"], answer: 1 },
    { q: "What is H2SO4?", options: ["Hydrochloric acid", "Sulphuric acid", "Nitric acid", "Acetic acid"], answer: 1 },
    { q: "Which element is needed for breathing?", options: ["Carbon", "Oxygen", "Iron", "Calcium"], answer: 1 },
    { q: "What is the chemical formula for Carbon dioxide?", options: ["CO", "CO2", "C2O", "O2"], answer: 1 },
    { q: "Which is a metal?", options: ["Oxygen", "Iron", "Sulphur", "Carbon"], answer: 1 },
  ],
  Biology: [
    { q: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi body"], answer: 1 },
    { q: "What do plants use for photosynthesis?", options: ["Oxygen", "Sunlight", "Nitrogen", "Carbon"], answer: 1 },
    { q: "What is the function of Red Blood Cells?", options: ["Fight disease", "Carry oxygen", "Clot blood", "Produce hormones"], answer: 1 },
    { q: "How many legs does a spider have?", options: ["6", "8", "4", "10"], answer: 1 },
    { q: "What is DNA full meaning?", options: ["Deoxyribonucleic acid", "Deoxyribose acid", "Diribonucleic acid", "Deoxy acid"], answer: 0 },
    { q: "Which organ pumps blood?", options: ["Liver", "Heart", "Lung", "Kidney"], answer: 1 },
    { q: "Photosynthesis happens in?", options: ["Mitochondria", "Chloroplast", "Nucleus", "Vacuole"], answer: 1 },
    { q: "What is the largest organ in human body?", options: ["Heart", "Liver", "Skin", "Brain"], answer: 2 },
    { q: "Which vitamin is from sunlight?", options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin B"], answer: 2 },
    { q: "What is the young of a frog called?", options: ["Tadpole", "Puppy", "Calf", "Chick"], answer: 0 },
  ],
};

const wordGames = [
  { name: "Word Guess", word: "SCHOOL", hint: "A place where you learn" },
  { name: "Anagram", word: "GOMBE", hint: "Unscramble: EBMOG" },
  { name: "Spelling", word: "EXAMINATION", hint: "A test you write in school" },
];

function App() {
  const [view, setView] = useState("home");
  const [subject, setSubject] = useState("English");
  const [mode, setMode] = useState("practice");
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState(subjectsData.English);
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

  // --- DOWNLOAD APP / INSTALL ---
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
      setShowInstall(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      await installPrompt.userChoice;
      setInstallPrompt(null);
      setShowInstall(false);
    } else {
      alert("To install: Click 3 dots in Chrome > Add to Home Screen / Install App");
    }
  };

  const yellowBtn = { background: "#FFC107", color: "#0B2C4A", border: "none", padding: "12px 10px", borderRadius: "10px", fontWeight: "bold", cursor: "pointer", fontSize: "14px", width: "100%" };
  const yellowBtnSmall = { background: "#FFC107", color: "#0B2C4A", border: "none", padding: "10px 14px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", fontSize: "13px", margin: "5px" };
  const darkBlueBtn = { background: "#0B2C4A", color: "white", border: "none", padding: "10px 14px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", fontSize: "13px", margin: "5px" };
  const optionStyle = (isCorrect, isWrong) => ({
    display: "block", width: "100%", textAlign: "left",
    background: isCorrect ? "#C8F7C5" : isWrong ? "#FFCCCC" : "white",
    border: isCorrect ? "2px solid green" : isWrong ? "2px solid red" : "2px solid #0B2C4A",
    color: "#0B2C4A", padding: "12px", borderRadius: "8px", cursor: "pointer", margin: "6px 0", fontSize: "14px", fontWeight: "bold",
  });

  useEffect(() => {
    const savedLeader = localStorage.getItem("exampilot_leaderboard");
    if (savedLeader) setLeaderboard(JSON.parse(savedLeader));
    const savedSchools = localStorage.getItem("exampilot_schools");
    if (savedSchools) setSchools(JSON.parse(savedSchools));
    const saved = localStorage.getItem("exampilot_comments");
    if (saved) {
      const loaded = JSON.parse(saved);
      const fixed = loaded.map((c) => ({ ...c, id: c.id || Date.now() + Math.random(), likes: c.likes || 0, liked: c.liked || false, replies: c.replies || [] }));
      setComments(fixed);
    } else {
      setComments([
        { id: 1, name: "Mary - Gombe", email: "mary@gmail.com", text: "This app helped me practice JAMB questions very well. I love the AI Test.", likes: 5, liked: false, replies: [{ id: 11, name: "Eleazar - Founder", text: "Thank you, Mary. Keep practicing. You will do very well.", likes: 2, liked: false }] },
        { id: 2, name: "Ahmed - Port Harcourt", email: "ahmed@gmail.com", text: "This is a good app. Please add more Physics questions.", likes: 3, liked: false, replies: [{ id: 22, name: "Eleazar - Founder", text: "Thank you, Ahmed. We have added more Physics questions. Please check again.", likes: 1, liked: false }] },
      ]);
    }
  }, []);

  useEffect(() => {
    if (!gameActive) return;
    if (gameTime <= 0) { setGameActive(false); setGameMessage("Time is up. Your score is " + gameScore); return; }
    const timer = setTimeout(() => setGameTime(gameTime - 1), 1000);
    return () => clearTimeout(timer);
  }, [gameTime, gameActive, gameScore]);

  const startPractice = (subj, testMode) => {
    setSubject(subj); setMode(testMode);
    let qs = [...subjectsData[subj]];
    if (testMode === "aitest") { qs = qs.sort(() => 0.5 - Math.random()).slice(0, 10); }
    setQuizQuestions(qs); setCurrentQ(0); setScore(0); setSelected(null); setShowResult(false); setView("quiz");
  };

  const answerQuestion = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === quizQuestions[currentQ].answer) { setScore(score + 1); }
  };

  const nextQuestion = () => {
    if (currentQ + 1 >= quizQuestions.length) {
      setShowResult(true);
      const finalScore = score + (selected === quizQuestions[currentQ].answer ? 1 : 0);
      if (playerName || mode === "aitest") {
        const entry = { name: playerName || "Anonymous Student", subject, score: finalScore, total: quizQuestions.length, mode, date: new Date().toLocaleDateString() };
        const updated = [entry, ...leaderboard].slice(0, 20);
        setLeaderboard(updated);
        localStorage.setItem("exampilot_leaderboard", JSON.stringify(updated));
      }
      return;
    }
    setCurrentQ(currentQ + 1); setSelected(null);
  };

  const registerSchool = () => {
    if (!schoolName || !schoolEmail) { alert("Please enter the school name and email address."); return; }
    const newSchool = { name: schoolName, email: schoolEmail, students: schoolStudents, date: new Date().toLocaleDateString() };
    const updated = [newSchool, ...schools];
    setSchools(updated);
    localStorage.setItem("exampilot_schools", JSON.stringify(updated));
    alert("Thank you. Your school has been registered. We will contact you at " + schoolEmail);
    setSchoolName(""); setSchoolEmail(""); setSchoolStudents("");
  };

  const addComment = () => {
    if (!commentName || !commentEmail || !commentText) { alert("Please enter your name, email address and comment."); return; }
    const newComment = { id: Date.now(), name: commentName, email: commentEmail, text: commentText, likes: 0, liked: false, replies: [] };
    const updated = [newComment, ...comments];
    setComments(updated);
    localStorage.setItem("exampilot_comments", JSON.stringify(updated));
    setCommentName(""); setCommentEmail(""); setCommentText("");
  };

  const likeComment = (id) => {
    const updated = comments.map((c) => { if (c.id === id) return { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 }; return c; });
    setComments(updated); localStorage.setItem("exampilot_comments", JSON.stringify(updated));
  };

  const addReply = (commentId) => {
    if (!replyName || !replyText) { alert("Please enter your name and reply."); return; }
    const updated = comments.map((c) => { if (c.id === commentId) { return { ...c, replies: [...c.replies, { id: Date.now(), name: replyName, text: replyText, likes: 0, liked: false }] }; } return c; });
    setComments(updated); localStorage.setItem("exampilot_comments", JSON.stringify(updated));
    setReplyName(""); setReplyText(""); setReplyingTo(null);
  };

  const likeReply = (commentId, replyId) => {
    const updated = comments.map((c) => {
      if (c.id === commentId) {
        const newReplies = c.replies.map((r) => { if (r.id === replyId) return { ...r, liked: !r.liked, likes: r.liked ? (r.likes || 0) - 1 : (r.likes || 0) + 1 }; return r; });
        return { ...c, replies: newReplies };
      }
      return c;
    });
    setComments(updated); localStorage.setItem("exampilot_comments", JSON.stringify(updated));
  };

  const startGame = () => { setGameTime(60); setGameScore(0); setGameActive(true); setGameMessage(""); setGameInput(""); };

  const checkGame = () => {
    const correct = wordGames[gameIndex].word;
    if (gameInput.toUpperCase().trim() === correct) { setGameScore(gameScore + 10); setGameMessage("Correct. You earned 10 points."); setGameIndex((gameIndex + 1) % wordGames.length); setGameInput(""); }
    else { setGameMessage("Please try again. Hint: " + wordGames[gameIndex].hint); }
  };

  const BottomMenu = () => (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#0B2C4A", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 6px", gap: "5px", zIndex: 100, borderTop: "3px solid #FFC107" }}>
      <button onClick={() => setView("home")} style={{ flex: 1, background: view === "home" ? "#FFC107" : "#FFD54A", color: "#0B2C4A", border: "none", padding: "10px 2px", borderRadius: "8px", fontWeight: "bold", fontSize: "11px", cursor: "pointer" }}>🏠<br />Home</button>
      <button onClick={() => setView("subjects")} style={{ flex: 1, background: view === "subjects" ? "#FFC107" : "#FFD54A", color: "#0B2C4A", border: "none", padding: "10px 2px", borderRadius: "8px", fontWeight: "bold", fontSize: "11px", cursor: "pointer" }}>📚<br />Subjects</button>
      <button onClick={() => setView("games")} style={{ flex: 1, background: view === "games" ? "#FFC107" : "#FFD54A", color: "#0B2C4A", border: "none", padding: "10px 2px", borderRadius: "8px", fontWeight: "bold", fontSize: "11px", cursor: "pointer" }}>🎮<br />Games</button>
      <button onClick={() => setView("leaderboard")} style={{ flex: 1, background: view === "leaderboard" ? "#FFC107" : "#FFD54A", color: "#0B2C4A", border: "none", padding: "10px 2px", borderRadius: "8px", fontWeight: "bold", fontSize: "11px", cursor: "pointer" }}>🏆<br />Leaderboard</button>
      <button onClick={() => setView("comments")} style={{ flex: 1, background: view === "comments" ? "#FFC107" : "#FFD54A", color: "#0B2C4A", border: "none", padding: "10px 2px", borderRadius: "8px", fontWeight: "bold", fontSize: "11px", cursor: "pointer" }}>💬<br />Comments</button>
    </div>
  );

  if (view === "quiz") {
    if (showResult) {
      return (
        <div className="App"><div className="App-content">
          <h1>Your Result</h1><h2>{score} / {quizQuestions.length}</h2>
          <p>{subject} - {mode === "aitest" ? "AI Test" : "Practice"}</p>
          <p>{score >= quizQuestions.length * 0.7 ? "Excellent. You are ready for JAMB." : score >= quizQuestions.length * 0.5 ? "Good work. Keep practicing." : "Do not give up. Practice more and you will improve."}</p>
          <button onClick={() => setView("subjects")} style={yellowBtnSmall}>Try Another Subject</button>
          <button onClick={() => setView("home")} style={darkBlueBtn}>Go Home</button>
          <BottomMenu />
        </div></div>
      );
    }
    const q = quizQuestions[currentQ];
    return (
      <div className="App"><div className="App-content">
        <h2>{subject} - {mode === "aitest" ? "AI Test" : "Practice"}</h2>
        <p>Question {currentQ + 1} of {quizQuestions.length} | Score: {score}</p>
        <div className="question-box"><h3>{q.q}</h3>
          {q.options.map((opt, idx) => (<button key={idx} onClick={() => answerQuestion(idx)} style={optionStyle(selected !== null && idx === q.answer, selected === idx && idx !== q.answer)}>{opt}</button>))}
        </div>
        {selected !== null && <button onClick={nextQuestion} style={yellowBtnSmall}>{currentQ + 1 === quizQuestions.length ? "Finish" : "Next Question"}</button>}
        <BottomMenu />
      </div></div>
    );
  }

  if (view === "comments") {
    return (
      <div className="App"><div className="top-banner"></div><div className="App-content">
        <h1>What Students Are Saying</h1>
        <input placeholder="Your Full Name, for example Musa Bello" value={commentName} onChange={(e) => setCommentName(e.target.value)} className="input-box" />
        <input placeholder="Your Email Address, for example musa@gmail.com" value={commentEmail} onChange={(e) => setCommentEmail(e.target.value)} className="input-box" type="email" />
        <textarea placeholder="Write your comment here." value={commentText} onChange={(e) => setCommentText(e.target.value)} className="textarea-box" />
        <button onClick={addComment} style={yellowBtnSmall}>Post Comment</button><hr />
        {comments.map((c) => (
          <div key={c.id} className="comment-card">
            <b>{c.name}</b><p className="comment-email">{c.email}</p><p>{c.text}</p>
            <div className="comment-actions">
              <button onClick={() => likeComment(c.id)} style={{ background: c.liked ? "#FFC107" : "white", color: "#0B2C4A", border: "1px solid #FFC107", padding: "6px 10px", borderRadius: "8px", fontWeight: "bold", fontSize: "12px", cursor: "pointer" }}>{c.liked ? "❤️" : "🤍"} {c.likes} Like</button>
              <button onClick={() => setReplyingTo(replyingTo === c.id ? null : c.id)} style={darkBlueBtn}>💬 Reply ({c.replies.length})</button>
            </div>
            {replyingTo === c.id && (
              <div className="reply-box">
                <input placeholder="Your Name, for example Eleazar - Founder" value={replyName} onChange={(e) => setReplyName(e.target.value)} className="input-box" />
                <textarea placeholder="Write your reply." value={replyText} onChange={(e) => setReplyText(e.target.value)} className="textarea-box" />
                <button onClick={() => addReply(c.id)} style={yellowBtnSmall}>Send Reply</button>
                <button onClick={() => setReplyingTo(null)} style={darkBlueBtn}>Cancel</button>
              </div>
            )}
            {c.replies.map((r) => (
              <div key={r.id} className="reply-card"><b>{r.name}</b><p>{r.text}</p>
                <button onClick={() => likeReply(c.id, r.id)} style={{ background: r.liked ? "#FFC107" : "white", color: "#0B2C4A", border: "1px solid #FFC107", padding: "4px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: "bold", cursor: "pointer" }}>{r.liked ? "❤️" : "🤍"} {r.likes || 0}</button>
              </div>
            ))}
          </div>
        ))}
        <BottomMenu />
      </div></div>
    );
  }

  if (view === "leaderboard") {
    return (
      <div className="App"><div className="top-banner"></div><div className="App-content">
        <h1>Leaderboard</h1><p>Top Students on ExamPilot</p>
        {leaderboard.length === 0 && <p>No scores yet. Be the first to play.</p>}
        {leaderboard.map((l, i) => (<div key={i} className="leader-card"><b>#{i + 1} {l.name}</b> - {l.subject} - {l.score}/{l.total} - {l.mode} - {l.date}</div>))}
        <BottomMenu />
      </div></div>
    );
  }

  if (view === "schools") {
    return (
      <div className="App"><div className="top-banner"></div><div className="App-content">
        <h1>For Schools</h1><p>Register your school to get ExamPilot for your students.</p>
        <input placeholder="School Name" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} className="input-box" />
        <input placeholder="School Email Address" value={schoolEmail} onChange={(e) => setSchoolEmail(e.target.value)} className="input-box" />
        <input placeholder="Number of Students, for example 200" value={schoolStudents} onChange={(e) => setSchoolStudents(e.target.value)} className="input-box" />
        <button onClick={registerSchool} style={yellowBtnSmall}>Register School</button>
        <h3>Registered Schools ({schools.length})</h3>
        {schools.map((s, i) => (<div key={i} className="leader-card"><b>{s.name}</b> - {s.email} - {s.students} students - {s.date}</div>))}
        <BottomMenu />
      </div></div>
    );
  }

  if (view === "games") {
    return (
      <div className="App"><div className="top-banner"></div><div className="App-content">
        <h1>Word Game Bar</h1><p>Five Games, Timer, Puzzle and Word Search</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", justifyContent: "center" }}>
          <button onClick={() => { setGameIndex(0); }} style={yellowBtnSmall}>Word Guess</button>
          <button onClick={() => { setGameIndex(1); }} style={yellowBtnSmall}>Anagram</button>
          <button onClick={() => { setGameIndex(2); }} style={yellowBtnSmall}>Spelling</button>
          <button onClick={() => setView("puzzle")} style={yellowBtnSmall}>Puzzle</button>
          <button onClick={() => setView("wordsearch")} style={yellowBtnSmall}>Word Search</button>
        </div>
        <h2>{wordGames[gameIndex].name}</h2><p>Hint: {wordGames[gameIndex].hint}</p>
        <p>Time Left: {gameTime}s | Score: {gameScore}</p>
        {!gameActive && <button onClick={startGame} style={yellowBtnSmall}>Start Game (60 Seconds)</button>}
        {gameActive && (<div><input placeholder="Type your answer" value={gameInput} onChange={(e) => setGameInput(e.target.value)} className="input-box" /><button onClick={checkGame} style={yellowBtnSmall}>Check</button></div>)}
        <p>{gameMessage}</p>
        <h3>Memory Game</h3><p>Remember the words: SCHOOL, BOOK, PEN, EXAM. Close your eyes, recall them, and test your memory. Practice makes you sharper.</p>
        <BottomMenu />
      </div></div>
    );
  }

  if (view === "puzzle") {
    return (
      <div className="App"><div className="App-content">
        <h1>Puzzle</h1><p>Fill in the missing word: G _ M B E is a state in Nigeria. What is it?</p>
        <input placeholder="Type your answer" value={puzzleInput} onChange={(e) => setPuzzleInput(e.target.value)} className="input-box" />
        <button onClick={() => alert(puzzleInput.toUpperCase() === "GOMBE" ? "Correct. You are very smart." : "Please try again.")} style={yellowBtnSmall}>Check Puzzle</button>
        <p>Another puzzle: _ X A M is what you write in school. The answer is EXAM.</p>
        <button onClick={() => setView("games")} style={darkBlueBtn}>Back to Games</button>
        <BottomMenu />
      </div></div>
    );
  }

  if (view === "wordsearch") {
    return (
      <div className="App"><div className="App-content">
        <h1>Word Search</h1><p>Find these words in the grid: SCHOOL, BOOK, EXAM, GOMBE, PEN</p>
        <div className="wordsearch-grid"><p>S C H O O L</p><p>B O O K P E</p><p>E X A M N N</p><p>G O M B E S</p><p>P E N S O N</p></div>
        <input placeholder="Type the word you found" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className="input-box" />
        <button onClick={() => { const w = searchInput.toUpperCase().trim(); if (["SCHOOL","BOOK","EXAM","GOMBE","PEN"].includes(w)) alert("Great. You found " + w); else alert("That word is not in the list. Please try again."); }} style={yellowBtnSmall}>Check Word</button>
        <button onClick={() => setView("games")} style={darkBlueBtn}>Back to Games</button>
        <BottomMenu />
      </div></div>
    );
  }

  if (view === "about") {
    return (
      <div className="App"><div className="top-banner"></div><div className="App-content">
        <h1>About ExamPilot</h1>
        <p>ExamPilot was built by Eleazar Alhaji Maaji, a student of Computer Science Education at Gombe State University. He completed JAMB and WAEC and wanted to help other students in Gombe and across Nigeria prepare better for JAMB, WAEC and school examinations.</p>
        <p>Our mission: To make examination practice easy, fun and free for every student, even with a small phone and limited data.</p>
        <button onClick={() => setView("home")} style={yellowBtnSmall}>Go Home</button>
        <BottomMenu />
      </div></div>
    );
  }

  if (view === "contact") {
    return (
      <div className="App"><div className="top-banner"></div><div className="App-content">
        <h1>Contact Us</h1>
        <p><b>Founder:</b> Eleazar Alhaji Maaji</p>
        <p><b>Email:</b> ellbezalel9@gmail.com</p>
        <p><b>WhatsApp:</b> +234 913 635 5760</p>
        <p><b>Location:</b> Gombe, Gombe State, Nigeria</p>
        <p>Please send us a message on WhatsApp or Email for school partnerships, questions or feedback.</p>
        <button onClick={() => setView("home")} style={yellowBtnSmall}>Go Home</button>
        <BottomMenu />
      </div></div>
    );
  }

  if (view === "subjects") {
    return (
      <div className="App"><div className="top-banner"></div><div className="App-content">
        <h1>Choose a Subject</h1>
        <input placeholder="Your Name for the Leaderboard (optional)" value={playerName} onChange={(e) => setPlayerName(e.target.value)} className="input-box" />
        {Object.keys(subjectsData).map((subj) => (
          <div key={subj} className="subject-card">
            <h2>{subj}</h2><p>{subjectsData[subj].length} Questions Available</p>
            <button onClick={() => startPractice(subj, "practice")} style={yellowBtnSmall}>Practice</button>
            <button onClick={() => startPractice(subj, "aitest")} style={darkBlueBtn}>AI Test</button>
          </div>
        ))}
        <BottomMenu />
      </div></div>
    );
  }

  return (
    <div className="App"><div className="top-banner"></div><div className="App-content">
      <div className="hero">
        <h1>ExamPilot</h1>
        <p>Practice JAMB, WAEC and School Examinations. Play Games. Pass with Confidence.</p>
        <button onClick={() => setView("subjects")} style={yellowBtnSmall}>Start Practicing Now</button>
        <button onClick={handleInstall} style={{ background: "#0B2C4A", color: "#FFC107", padding: "14px 20px", borderRadius: "12px", border: "2px solid #FFC107", fontWeight: "bold", width: "100%", marginTop: "10px", cursor: "pointer", fontSize: "15px" }}>
          📲 Download ExamPilot App - 1 Click
        </button>
        <p style={{ fontSize: "12px", marginTop: "6px" }}>No long process. One click to install.</p>
        {showInstall && <p style={{ fontSize: "12px", color: "#0B2C4A" }}>✅ Your phone is ready to install ExamPilot!</p>}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", margin: "14px 0" }}>
        <button onClick={() => setView("subjects")} style={yellowBtn}>📚<br />Subjects</button>
        <button onClick={() => setView("games")} style={yellowBtn}>🎮<br />Games</button>
        <button onClick={() => setView("leaderboard")} style={yellowBtn}>🏆<br />Leaderboard</button>
        <button onClick={() => setView("schools")} style={yellowBtn}>🏫<br />For Schools</button>
        <button onClick={() => setView("comments")} style={yellowBtn}>💬<br />Comments</button>
        <button onClick={() => setView("about")} style={yellowBtn}>ℹ️<br />About</button>
        <button onClick={() => setView("contact")} style={{ ...yellowBtn, gridColumn: "span 2" }}>📞<br />Contact</button>
      </div>
      <div className="info-box">
        <h3>Why ExamPilot?</h3>
        <p>Free practice, AI Test, Leaderboard, Games and School Registration. Built for students in Gombe and across Nigeria.</p>
      </div>
      <footer>
        <p>Built by Eleazar Alhaji Maaji | ellbezalel9@gmail.com | +234 913 635 5760</p>
        <p>Gombe State University - Computer Science Education</p>
      </footer>
      <BottomMenu />
    </div></div>
  );
}

export default App;
