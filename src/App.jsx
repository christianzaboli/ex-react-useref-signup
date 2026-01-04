import "./App.css";
import { useState, useEffect, useRef } from "react";
function App() {
  const fullNameInput = useRef();
  const specializzioneInput = useRef();
  const yearExpInput = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");

  const letters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

  // validazioni booleane
  const [usernameValidationTXT, setUsernameValidationTXT] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState(false);
  const [bioValidation, setBioValidation] = useState(false);

  // validazione username
  useEffect(() => {
    const isValid = [...username].some((char) => symbols.includes(char));
    if (username.trim("").length >= 6 && !isValid) {
      return setUsernameValidationTXT(true);
    } else return setUsernameValidationTXT(false);
  }, [username]);

  // validazione password
  useEffect(() => {
    const isValid =
      [...password].length >= 8 &&
      [...password].some((char) => letters.includes(char)) &&
      [...password].some((char) => letters.toUpperCase().includes(char)) &&
      [...password].some((char) => numbers.includes(char));
    if (isValid) {
      return setPasswordValidation(true);
    } else return setPasswordValidation(false);
  }, [password]);

  // validazione Descrizione
  useEffect(() => {
    const isValid =
      bio.trim("").split("").length >= 100 &&
      bio.trim("").split("").length <= 1000;

    if (isValid) setBioValidation(true);
    else return setBioValidation(false);
  }, [bio]);

  // Submit finale
  const handleSubmit = (e) => {
    e.preventDefault();
    const campi = [
      fullNameInput.current.value.trim(""),
      username.trim(""),
      password.trim(""),
      specializzioneInput.current.value,
      Number(yearExpInput.current.value),
      bio.trim(""),
    ];

    if (
      campi.every((c) => c !== "") &&
      usernameValidationTXT &&
      passwordValidation &&
      bioValidation
    ) {
      const campiFormAtted = {
        fullname: campi[0],
        username: campi[1],
        password: campi[2],
        specializzazione: campi[3],
        anniDiExp: campi[4],
        descrizione: campi[5],
      };
      console.log(campiFormAtted);
      handleReset(e);
    } else console.error("Ricontrolla i campi");
  };

  // funzione di reset dei campi
  const handleReset = (e) => {
    e.preventDefault();
    fullNameInput.current.value = "";
    setUsername("");
    setPassword("");
    specializzioneInput.current.value = "";
    yearExpInput.current.value = "";
    setBio("");
    fullNameInput.current.focus();

    console.log("Campi resettati");
  };

  // better ux
  useEffect(() => {
    fullNameInput.current.focus();
  }, []);

  // tasto per tornare top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <h1>Signup</h1>
      <div>
        <form action="submit" onSubmit={(e) => handleSubmit(e.target.value)}>
          {/* Nome */}
          <section>
            <input
              type="text"
              name="nome completo"
              autoCapitalize="words"
              placeholder="Nome completo"
              ref={fullNameInput}
            />
          </section>
          {/* Username */}
          <section>
            <input
              type="text"
              name="username"
              autoComplete="current-username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <p className={usernameValidationTXT ? "greenTXT" : "redTXT"}>
              Deve contenere solo alfanumerici e almeno 6 caratteri
            </p>
          </section>
          {/* Password */}
          <section>
            <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className={passwordValidation ? "greenTXT" : "redTXT"}>
              Deve contenere almeno 8 caratteri, 1 lettera, 1 numero e 1 simbolo
            </p>
          </section>
          {/* Specializzazione */}
          <section>
            <label>Specializzazione</label>
            <select name="Spec" ref={specializzioneInput}>
              <option value="">Scegli</option>
              <option value="Full Stack">Full Stack</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
            </select>
          </section>
          {/* Esperienza */}
          <section>
            <input
              type="number"
              placeholder="Anni di esperienza"
              ref={yearExpInput}
              min={0}
            />
          </section>
          {/* Dettagli */}
          <section>
            <textarea
              type="text"
              placeholder="Dettagli aggiuntivi"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <p className={bioValidation ? "greenTXT" : "redTXT"}>
              Deve contenere tra 100 e 1000 caratteri
            </p>
          </section>
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
          <button onClick={handleReset}>Reset</button>
        </form>
        <div id="back-to-top" onClick={scrollToTop}></div>
      </div>
    </>
  );
}

export default App;
