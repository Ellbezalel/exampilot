import React, { useState, useEffect } from "react";
import "./App.css";

const h = React.createElement;

function App() {
  const [view, setView] = useState("home");
  const [installPrompt, setInstallPrompt] = useState(null);
  const [countdown, setCountdown] = useState(10);
  const [canContinue, setCanContinue] = useState(false);

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
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  useEffect(() => {
    const handleInstalled = () => {
      setView("home");
    };

    window.addEventListener("appinstalled", handleInstalled);
    return () => {
      window.removeEventListener("appinstalled", handleInstalled);
    };
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
      console.log("User installed ExamPilot");
      setView("home");
    }
    setInstallPrompt(null);
  };

  const handleContinue = () => {
    setView("home");
  };

  if (view === "download") {
    return h(
      "div",
      { style: { minHeight: "100vh", background: "#0B2C4A", color: "white", textAlign: "center", padding: "30px 20px", fontFamily: "Arial" } },
      h("div", { style: { fontSize: "60px" } }, "🎓"),
      h("h1", { style: { fontSize: "28px", margin: "10px 0" } }, "Download ExamPilot Free JAMB CBT App"),
      h("p", { style: { color: "#FFC107", fontWeight: "bold", fontSize: "16px" } }, "Practice JAMB, WAEC and School Exams. Play Games. Pass with Confidence."),
      h(
        "div",
        { style: { background: "white", color: "#0B2C4A", borderRadius: "15px", padding: "20px", margin: "20px 0", textAlign: "left" } },
        h("p", { style: { margin: "5px 0" } }, "✅ Free Forever"),
        h("p", { style: { margin: "5px 0" } }, "📴 Works Offline"),
        h("p", { style: { margin: "5px 0" } }, "📚 100+ Questions"),
        h("p", { style: { margin: "5px 0" } }, "🎮 Play Games and Learn"),
        h("p", { style: { margin: "5px 0" } }, "⚡ Fast and Light - Works on any phone")
      ),
      h(
        "button",
        {
          onClick: handleInstall,
          style: { background: "#FFC107", color: "#0B2C4A", border: "none", padding: "16px", borderRadius: "12px", fontWeight: "bold", fontSize: "17px", width: "100%", cursor: "pointer" }
        },
        "📲 Install ExamPilot App"
      ),
      h("p", { style: { fontSize: "13px", color: "#ccc", marginTop: "12px", lineHeight: "1.6" } }, "Install ExamPilot for offline practice and faster access."),
      h(
        "p",
        { style: { fontSize: "13px", color: "#ccc", marginTop: "4px" } },
        installPrompt ? "Tap the button above to install ExamPilot" : "Tap ⋮ in Chrome → Install App or Add to Home Screen"
      ),
      h("p", { style: { color: "#FFC107", fontWeight: "bold" } }, "⭐⭐⭐⭐⭐ 4.9 • Loved by students in Gombe & Nigeria"),
      h(
        "div",
        { style: { marginTop: "25px" } },
        canContinue
          ? h(
              "button",
              {
                onClick: handleContinue,
                style: { background: "white", color: "#0B2C4A", border: "none", padding: "14px", borderRadius: "10px", fontWeight: "bold", fontSize: "15px", width: "100%", cursor: "pointer" }
              },
              "Continue on Website →"
            )
          : h(
              "p",
              { style: { background: "rgba(255,255,255,0.15)", padding: "12px", borderRadius: "10px" } },
              "Continue in " + countdown + " seconds..."
            ),
        h("p", { style: { fontSize: "12px", color: "#aaa", marginTop: "8px" } }, "For people who do not want to install yet")
      ),
      h(
        "div",
        { style: { marginTop: "30px", fontSize: "12px", color: "#ccc", lineHeight: "1.8" } },
        h("p", null, "Built by Eleazar Alhaji Maaji | ellbezalel9@gmail.com"),
        h("p", null, "Privacy Policy | Terms and Services | Contact")
      )
    );
  }

  const subjects = ["English", "Mathematics", "Physics", "Chemistry", "Biology", "Economics"];

  return h(
    "div",
    { style: { minHeight: "100vh", background: "#F5F7FA", fontFamily: "Arial", paddingBottom: "30px" } },
    h(
      "div",
      { style: { background: "#0B2C4A", color: "white", padding: "20px", borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px" } },
      h(
        "div",
        { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } },
        h(
          "div",
          null,
          h("h2", { style: { margin: 0, fontSize: "22px" } }, "Hello, Student 👋"),
          h("p", { style: { margin: "5px 0 0", color: "#FFC107", fontSize: "13px" } }, "Ready to pass with confidence?")
        ),
        h("div", { style: { fontSize: "32px" } }, "🎓")
      ),
      h(
        "div",
        { style: { background: "white", color: "#0B2C4A", borderRadius: "12px", padding: "15px", marginTop: "15px", display: "flex", justifyContent: "space-between" } },
        h(
          "div",
          null,
          h("p", { style: { margin: 0, fontSize: "12px", color: "#666" } }, "JAMB Score"),
          h("p", { style: { margin: 0, fontSize: "24px", fontWeight: "bold" } }, "280 / 400")
        ),
        h(
          "div",
          { style: { textAlign: "right" } },
          h("p", { style: { margin: 0, fontSize: "12px", color: "#666" } }, "Streak"),
          h("p", { style: { margin: 0, fontSize: "18px", fontWeight: "bold" } }, "🔥 5 Days")
        )
      )
    ),
    h(
      "div",
      { style: { padding: "15px" } },
      h("h3", { style: { color: "#0B2C4A", fontSize: "16px" } }, "Start Practicing"),
      h(
        "div",
        { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" } },
        h(
          "div",
          { onClick: () => alert("JAMB CBT Practice - Coming in next update"), style: { background: "#0B2C4A", color: "white", padding: "18px", borderRadius: "12px", cursor: "pointer" } },
          h("div", { style: { fontSize: "28px" } }, "📝"),
          h("b", null, "JAMB CBT"),
          h("p", { style: { margin: "5px 0 0", fontSize: "12px", color: "#ccc" } }, "400 Questions • Timed")
        ),
        h(
          "div",
          { onClick: () => alert("WAEC Practice - Coming in next update"), style: { background: "#FFC107", color: "#0B2C4A", padding: "18px", borderRadius: "12px", cursor: "pointer" } },
          h("div", { style: { fontSize: "28px" } }, "📚"),
          h("b", null, "WAEC"),
          h("p", { style: { margin: "5px 0 0", fontSize: "12px" } }, "All Subjects")
        ),
        h(
          "div",
          { onClick: () => alert("School Exams - Coming in next update"), style: { background: "white", color: "#0B2C4A", padding: "18px", borderRadius: "12px", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" } },
          h("div", { style: { fontSize: "28px" } }, "🏫"),
          h("b", null, "School Exams"),
          h("p", { style: { margin: "5px 0 0", fontSize: "12px", color: "#666" } }, "JS1 - SS3")
        ),
        h(
          "div",
          { onClick: () => alert("Games - Coming in next update"), style: { background: "#22C55E", color: "white", padding: "18px", borderRadius: "12px", cursor: "pointer" } },
          h("div", { style: { fontSize: "28px" } }, "🎮"),
          h("b", null, "Play Games"),
          h("p", { style: { margin: "5px 0 0", fontSize: "12px" } }, "NEPA Game • Soccer")
        )
      ),
      h("h3", { style: { color: "#0B2C4A", fontSize: "16px", marginTop: "20px" } }, "Subjects"),
      h(
        "div",
        null,
        subjects.map((subject) =>
          h(
            "div",
            { key: subject, style: { background: "white", padding: "14px", borderRadius: "10px", marginBottom: "8px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 1px 5px rgba(0,0,0,0.05)" } },
            h("span", { style: { fontWeight: "bold", color: "#0B2C4A" } }, subject),
            h("span", { style: { background: "#0B2C4A", color: "white", padding: "6px 12px", borderRadius: "20px", fontSize: "12px" } }, "Practice →")
          )
        )
      ),
      h(
        "div",
        { style: { textAlign: "center", marginTop: "25px", fontSize: "12px", color: "#666", lineHeight: "1.8" } },
        h("p", null, "Built by Eleazar Alhaji Maaji | ellbezalel9@gmail.com"),
        h("p", null, "Privacy Policy | Terms and Services | Contact"),
        h("p", null, "⭐⭐⭐⭐⭐ 4.9 • Loved by students in Gombe & Nigeria")
      )
    )
  );
}

export default App;
